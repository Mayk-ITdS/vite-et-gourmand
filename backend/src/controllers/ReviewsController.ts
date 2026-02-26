import { ReviewDTO } from "../dtos/reviews.dto.js";
import { ReviewsService } from "../services/ReviewsService.js";
import { Request, Response } from "express";
import { ApiError } from "../types/users.js";
class ReviewsController {
  constructor(private reviewService = new ReviewsService()) {}
  createOne = async (req: Request, res: Response) => {
    try {
      const orderId = Number(req.params.id);

      const payload: ReviewDTO = {
        ...req.body,
        orderId,
      };

      const result = await this.reviewService.createReview(payload);

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

  approveReview = async (req: Request, res: Response) => {
    await this.reviewService.approveReview(String(req.params.id));
    res.json({ message: "Approved" });
  };

  deleteReview = async (req: Request, res: Response) => {
    await this.reviewService.deleteReview(String(req.params.id));
    res.json({ message: "Deleted" });
  };
}
export default new ReviewsController();
