import { getRepository, Repository } from "typeorm";

import { User } from "../../../users/entities/User";
import { Game } from "../../entities/Game";

import { IGamesRepository } from "../IGamesRepository";

export class GamesRepository implements IGamesRepository {
  private repository: Repository<Game>;

  constructor() {
    this.repository = getRepository(Game);
  }

  async findByTitleContaining(param: string): Promise<Game[]> {   
    return this.repository
      .createQueryBuilder()
      .select('')
    
  }

  async countAllGames(): Promise<[{ count: string }]> {
    return [{ count: "0" }];
    // return this.repository.query(); // Complete usando raw query
  }

  async findUsersByGameId(id: string): Promise<User[]> {
    return [];
    // return this.repository
    //   .createQueryBuilder()
    // Complete usando query builder
  }
}