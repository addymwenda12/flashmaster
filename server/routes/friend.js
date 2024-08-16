import express from "express";
import friendController from "../controllers/friendController.js";

const router = express.Router();

router.post("/send-request", friendController.sendFriendRequest);
router.post("/accept-request", friendController.acceptFriendRequest);
router.post("/reject-request", friendController.rejectFriendRequest);
router.get("/requests", friendController.getFriendRequests);

export default router;
