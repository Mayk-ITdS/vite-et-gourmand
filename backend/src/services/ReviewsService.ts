import { getDBMongo } from "../config/db.js";
import { ReviewDocument, ReviewDTO } from "../dtos/reviews.dto.js";
import { OrderRepository } from "../repositories/orders.repository.js";
import { ReviewsRepository } from "../repositories/reviews.repositories.js";
import { ApiError } from "../types/users.js";
console.log("REVIEWS REPO FILE LOADED");
export class ReviewsService {
  constructor(
    private reviewsRepo = new ReviewsRepository(),
    private orderRepo = new OrderRepository(),
  ) {}

  findOneByOrderId = async (id: number) => {
    if (!id) {
      throw new ApiError(400, "OrderId is required");
    }
    const postgresReview = await this.orderRepo.findOrderById(id);
    if (!postgresReview) {
      throw new ApiError(404, "Review not found", false);
    }
    const review = await this.reviewsRepo.findByOrderId(id);
    if (!review) {
      throw new ApiError(404, "Review not found", false);
    }

    return review;
  };
  async createReview(data: ReviewDTO, userId: number) {
    const orderId = Number(data.orderId);
    const order = await this.orderRepo.findOrderById(orderId);

    if (!order) {
      throw new ApiError(404, "Order not found");
    }

    if (order.status !== "completed") {
      throw new ApiError(400, "Cannot review unfinished order");
    }

    const existing = await this.reviewsRepo.findByOrderId(orderId);

    if (existing) {
      throw new ApiError(400, "Review already exists for this order");
    }
    const reviewToSave: ReviewDocument = {
      orderId,
      pseudo: data.pseudo,
      content: data.content,
      score: data.score,
      avatar: data.avatar,
      createdAt: new Date(),
      createdBy: String(userId),
      isApproved: false,
    };
    await this.reviewsRepo.createReview(reviewToSave);

    const result = await this.reviewsRepo.insertOne(reviewToSave);
    return result;
  }
  getLatestReviews = async () => {
    const reviews = await getDBMongo()
      .collection<ReviewDocument>("reviews")
      .find({ isApproved: true })
      .sort({ createdAt: -1 })
      .toArray();
    if (reviews.length === 0) {
      return [];
    }
    return reviews;
  };
  async getPendingReviews() {
    return await this.reviewsRepo.findPending();
  }

  async getMyReviews(userId: number) {
    return await this.reviewsRepo.findByCreatedBy(userId);
  }

  async approveReview(id: string, moderatorId: string) {
    return await this.reviewsRepo.approve(id, moderatorId);
  }

  async rejectReview(id: string, reason: string, moderatorId: string) {
    const cleanReason = reason?.trim()
      ? reason.trim()
      : "Non-respect des standards de publication";
    return await this.reviewsRepo.reject(id, cleanReason, moderatorId);
  }

  async deleteReview(id: string) {
    return await this.reviewsRepo.deleteReview(id);
  }
}
