import Message from "../models/message.model.js";
import Conversation from "../models/conversation.model.js";

export const sendMessage = async (req, res, next) => {
  try {
    const message = req.body.message;
    const receiverId = req.params.id;
    const senderId = req.authUser._id;

    let conversation = await Conversation.findOne({
      participants: {
        $all: [senderId, receiverId],
      },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });

    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }

    await Promise.all([conversation.save(), newMessage.save()]);

    res.status(201).json({
      result: newMessage,
      message: "Message sent successfully",
    });
  } catch (except) {
    res.status(500).json({
      result: except.result ?? null,
      message: except.message ?? "Internal server error",
    });
  }
};

export const getMessages = async (req, res, next) => {
  try {
    const receiverId = req.params.id;
    const senderId = req.authUser._id;

    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    }).populate("messages");

    if (!conversation) {
      return res.status(200).json({
        result: [],
        message: "Conversation hasn't been started",
        meta: 0,
      });
    }

    res.status(200).json({
      result: conversation.messages,
      message: "Conversation Fetched Successfully",
      meta: conversation.messages.length,
    });
  } catch (except) {
    res.status(500).json({
      result: except.result ?? null,
      message: except.message ?? "Internal server error",
    });
  }
};
