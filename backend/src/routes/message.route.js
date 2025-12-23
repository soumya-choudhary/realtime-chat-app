import express from "express";
import {
  getAllContacts,
  getChatPartners,
  getMessagesByUserId,
  sendMessage,
} from "../controllers/message.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
import { userRateLimit } from "../middleware/userRatelimit.js";
router.use(arcjetProtection, protectRoute);


const router = express.Router();

router.use(protectRoute);

router.get("/contacts", getAllContacts);
router.get("/chats", getChatPartners);
router.get("/:id", getMessagesByUserId);
router.post(
  "/send/:id",
  userRateLimit(20, 10_000),
  sendMessage
);

export default router;
