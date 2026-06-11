import { z } from "zod";

export const reviewZodSchema = z.object({
  orderId: z.number(),
  pseudo: z.string().min(2).max(20),
  content: z.string().min(25).max(300),
  score: z.number().int().min(1).max(5),
  avatar: z.string().url().optional().nullable(),
});
export type ReviewDTO = z.infer<typeof reviewZodSchema>;

export type ReviewStatus = "pending" | "approved" | "rejected";

export interface ReviewDocument extends ReviewDTO {
  createdAt: Date;
  createdBy: string;
  isApproved: boolean;
  status?: ReviewStatus;
  rejectionReason?: string | null;
  moderatedBy?: string | null;
  moderatedAt?: Date | null;
}
