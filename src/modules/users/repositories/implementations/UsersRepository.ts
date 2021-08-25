import { getRepository, Repository } from 'typeorm';

import { IFindUserWithGamesDTO, IFindUserByFullNameDTO } from '../../dtos';
import { User } from '../../entities/User';
import { IUsersRepository } from '../IUsersRepository';

export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async findUserWithGamesById({
    user_id,
  }: IFindUserWithGamesDTO): Promise<User> {
      const user = await this.repository.find({relations:["games"], where:{id : user_id}})

      return user[0];

      


      
    
  }

  async findAllUsersOrderedByFirstName(): Promise<User[]> {
    return this.repository.query("Select * from users order by first_name"); // Complete usando raw query
  }

  async findUserByFullName({
    first_name,
    last_name,
  }: IFindUserByFullNameDTO): Promise<User[] | undefined> {
    const fn = first_name.toLowerCase();
    const ln = last_name.toLowerCase()
    return this.repository.query("Select * from users where lower(first_name)=lower($1) and lower(last_name)=lower($2)",[first_name,last_name] ); // Complete usando raw query
  }
}
