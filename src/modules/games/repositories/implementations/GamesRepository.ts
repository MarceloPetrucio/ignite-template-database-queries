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
    return await this.repository
      .createQueryBuilder()
      .where('title ilike :title', {
        title: `%${param}%`
      }).getMany();    
  }

  async countAllGames(): Promise<[{ count: string }]> {    
    return this.repository.query('select count(*) count from games;');
  }

  async findUsersByGameId(id: string): Promise<User[]> {
    const games =  await this.repository
      .createQueryBuilder("games")
      .innerJoinAndSelect('games.users','users')
      .where('games.id = :id', {id}).getOne();

    return games?.users || [];
  }
}
