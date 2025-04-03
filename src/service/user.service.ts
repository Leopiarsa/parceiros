import { Repository } from 'typeorm';
import { Usuarios } from '../entities/user.entity.js';
import dataSource from '../db/data-source.js';

export class UserService {
  private userRepository: Repository<Usuarios>;

  constructor() {
    this.userRepository = dataSource.getRepository(Usuarios);
  }

  async sendFile() {
    //send file to S3
    return;
  }

  async verifyExistentEmail(email: string): Promise<boolean> {
    const alreadyExists = await this.userRepository.findOne({ where: { email: email } });

    return alreadyExists ? true : false;
  }
}
