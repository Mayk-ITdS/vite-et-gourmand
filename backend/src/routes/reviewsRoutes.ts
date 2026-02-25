import { Router } from "express";
import ReviewsController from "../controllers/ReviewsController.js";
import authMiddleware from "../middlewares/auth.js";
import { authorize } from "../middlewares/authorize.js";

const router = Router();

/**
 * ======================
 * PUBLIC (homepage)
 * ======================
 */
router.get("/public", ReviewsController.loadReviews);

/**
 * ======================
 * USER
 * ======================
 */
router.post(
  "/:id",
  authMiddleware,
  authorize(["user"]),
  ReviewsController.createOne,
);

/**
 * ======================
 * EMPLOYEE / ADMIN
 * ======================
 */
router.get(
  "/pending",
  authMiddleware,
  authorize(["employee", "admin"]),
  ReviewsController.getPendingReviews,
);

router.patch(
  "/:id/approve",
  authMiddleware,
  authorize(["employee"]),
  ReviewsController.approveReview,
);

router.delete(
  "/:id",
  authMiddleware,
  authorize(["employee"]),
  ReviewsController.deleteReview,
);

export default router;
