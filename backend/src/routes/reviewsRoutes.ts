import { Router, RequestHandler } from "express";

import authMiddleware from "../middlewares/auth.js";
import { authorize } from "../middlewares/authorize.js";
import ReviewsController from "../controllers/ReviewsController.js";

const router = Router();

router.get("/public", ReviewsController.loadReviews as RequestHandler);

router.get(
  "/mine",
  authMiddleware,
  authorize(["user"]),
  ReviewsController.getMyReviews as RequestHandler,
);

router.post(
  "/:id",
  authMiddleware,
  authorize(["user"]),
  ReviewsController.createOne as RequestHandler,
);

router.get(
  "/pending",
  authMiddleware,
  authorize(["employee", "admin"]),
  ReviewsController.getPendingReviews as RequestHandler,
);

router.patch(
  "/:id/approve",
  authMiddleware,
  authorize(["employee", "admin"]),
  ReviewsController.approveReview as RequestHandler,
);

router.patch(
  "/:id/reject",
  authMiddleware,
  authorize(["employee", "admin"]),
  ReviewsController.rejectReview as RequestHandler,
);

router.delete(
  "/:id",
  authMiddleware,
  authorize(["admin"]),
  ReviewsController.deleteReview as RequestHandler,
);

export default router;
