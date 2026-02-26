import type {
  Request,
  Response,
  NextFunction,
} from "express-serve-static-core";
import { RequestHandler } from "express-serve-static-core";
import { ReviewsService } from "../services/ReviewsService.js";
import { ApiError, UserRequest } from "../types/users.js";

const service = new ReviewsService();

class ReviewsController {
  loadReviews: RequestHandler = async (
    _req: Request,
    res: Response,
    _next: NextFunction,
  ): Promise<void> => {
    try {
      const reviews = await service.getLatestReviews();
      res.status(200).json(reviews);
    } catch (err) {
      throw new ApiError(500, String(err), false);
    }
  };

  createOne = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const review = await service.createReview(req.body);
      res.status(201).json(review);
    } catch (err) {
      next(err);
    }
  };

  getPendingReviews: RequestHandler = async (
    _req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const reviews = await service.getPendingReviews();
      res.status(200).json(reviews);
    } catch (err) {
      next(err);
    }
  };

  approveReview: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const id = req.params.id;
      const updated = await service.approveReview(String(id));
      res.status(200).json(updated);
    } catch (err) {
      next(err);
    }
  };

  deleteReview = async (
    req: UserRequest,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const id = req.params.id;
      await service.deleteReview(String(req.params.id));
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  };
}

export default new ReviewsController();
