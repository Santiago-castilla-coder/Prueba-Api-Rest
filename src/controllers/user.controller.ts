import { Request, Response } from "express";
import { User } from "../models/user.model";

export const getUsers = async (_req: Request, res: Response) => {
  try {
    // Exclude the "password" field from the query results
    const users = await User.findAll({
      attributes: { exclude: ["password"] },
    });

    // Return the list of users without passwords
    res.json(users);
  } catch (error) {
    // Handle any unexpected errors
    res.status(500).json({ message: "Error fetching users", error });
  }
};
