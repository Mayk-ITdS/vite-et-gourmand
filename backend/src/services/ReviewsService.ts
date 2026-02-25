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
  async createReview(data: ReviewDTO) {
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
    await this.reviewsRepo.createReview(orderId, data.score, data.content);
    const reviewToSave: ReviewDocument = {
      orderId,
      pseudo: data.pseudo,
      content: data.content,
      score: data.score,
      avatar: data.avatar,
      createdAt: new Date(),
      isApproved: false,
    };

    const result = await this.reviewsRepo.insertOne(reviewToSave);
    return result;
  }
  getLatestReviews = async () => {
    const reviews = await getDBMongo()
      .collection<ReviewDocument>("reviews")
      .find({})
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

  async approveReview(id: string) {
    return await this.reviewsRepo.approve(id);
  }

  async deleteReview(id: string) {
    return await this.reviewsRepo.deleteReview(id);
  }
}
