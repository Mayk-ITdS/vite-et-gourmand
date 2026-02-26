import { IngestProductsQuery } from "../types/stock.js";
import { NextFunction, Request, Response } from "express";
class StockController {
  loadData = async (
    req: Request<{}, {}, IngestProductsQuery>,
    res: Response,
    next: NextFunction,
  ) => {
    if (!req.body) return new Error("No data my son!");
    try {
    } catch (e) {}
  };
}
