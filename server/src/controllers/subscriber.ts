import { NextFunction, Request, Response } from "express";

export const getSubscriberPage = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    res.render("pages/subscriber");
  } catch (error) {
    console.error(error);
    res
      .status(400)
      .json({ status: 400, message: "Error getting subscriber page" });
  }
};
