import { getRepository, Repository } from "typeorm";

import { IFindUserWithGamesDTO, IFindUserByFullNameDTO } from "../../dtos";
import { User } from "../../entities/User";
import { IUsersRepository } from "../IUsersRepository";

export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async findUserWithGamesById({
    user_id,
  }: IFindUserWithGamesDTO): Promise<User> {
    const user = (await this.repository.findOne(user_id, {
      relations: ["games"],
    })) as User;

    return user;
  }

  async findAllUsersOrderedByFirstName(): Promise<User[]> {   
    return this.repository.query("select * from users order by first_name"); // Complete usando raw query
  }

  async findUserByFullName({
    first_name,
    last_name,
  }: IFindUserByFullNameDTO): Promise<User[] | undefined> {    
    return this.repository.query("select * from users where lower(first_name) = :first and lower(last_name) = 'leão'", {

    }); // Complete usando raw query
  }
}
