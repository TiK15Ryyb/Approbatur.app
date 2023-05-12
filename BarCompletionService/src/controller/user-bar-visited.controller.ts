import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { UserBarVisited } from "../entity/user-bar-visited";

export class UserBarVisitedController {
  private userRepository = AppDataSource.getRepository(UserBarVisited);

  async getAll(request: Request, response: Response, next: NextFunction) {
    return this.userRepository.find();
  }

  async getByUserId(request: Request, response: Response, next: NextFunction) {
    const { userId } = request.body;
    return this.userRepository.findBy({ userId });
  }

  async saveOne(request: Request, response: Response, next: NextFunction) {
    console.log(request);
    const { userId, barId } = request.params;

    const visit = Object.assign(new UserBarVisited(), {
      userId,
      barId,
    });

    return this.userRepository.save(visit);
  }
}
