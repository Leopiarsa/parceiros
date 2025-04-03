import { Repository } from 'typeorm';
import { Parceiros } from '../entities/parceiro.entity.js';
import dataSource from '../db/data-source.js';

export class ParceiroService {
  private parceiroRepository: Repository<Parceiros>;

  constructor() {
    this.parceiroRepository = dataSource.getRepository(Parceiros);
  }

  async getAllParceiros(): Promise<Parceiros[]> {
    const parceiros = await this.parceiroRepository.find({ where: { ativo: true } });

    return parceiros;
  }
}
