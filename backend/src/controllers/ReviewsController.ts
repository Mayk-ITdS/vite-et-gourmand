import { ReviewDTO } from "../dtos/reviews.dto.js";
import { ReviewsService } from "../services/ReviewsService.js";
import { Request, Response } from "express";
import { ApiError, UserRequest } from "../types/users.js";
class ReviewsController {
  constructor(private reviewService = new ReviewsService()) {}
  createOne = async (req: UserRequest, res: Response) => {
    try {
      if (!req.user) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      const orderId = Number(req.params.id);
      const userId = Number(req.user.user_id);
      const payload: ReviewDTO = {
        ...req.body,
        orderId,
      };

      const result = await this.reviewService.createReview(payload, userId);

      return res.status(201).json({
        message: "Review created",
        id: result.insertedId,
      });
    } catch (err) {
      throw new ApiError(500, String(err), false);
    }
  };
  loadReviews = async (_req: Request, res: Response) => {
    const reviews = await this.reviewService.getLatestReviews();
    return res.json(reviews);
  };
  getPendingReviews = async (_req: Request, res: Response) => {
    const reviews = await this.reviewService.getPendingReviews();
    res.json(reviews);
  };

  getMyReviews = async (req: UserRequest, res: Response) => {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const reviews = await this.reviewService.getMyReviews(Number(req.user.user_id));
    return res.json(reviews);
  };

  approveReview = async (req: UserRequest, res: Response) => {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    await this.reviewService.approveReview(
      String(req.params.id),
      String(req.user.user_id),
    );
    res.json({ message: "Approved" });
  };

  rejectReview = async (req: UserRequest, res: Response) => {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const reason = typeof req.body?.reason === "string" ? req.body.reason : "";
    await this.reviewService.rejectReview(
      String(req.params.id),
      reason,
      String(req.user.user_id),
    );
    res.json({ message: "Rejected" });
  };

  deleteReview = async (req: Request, res: Response) => {
    await this.reviewService.deleteReview(String(req.params.id));
    res.json({ message: "Deleted" });
  };
}
export default new ReviewsController();
