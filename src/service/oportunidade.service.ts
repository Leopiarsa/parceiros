import { In, Repository } from 'typeorm';
import { Oportunidades } from '../entities/oportunidade.entity.js';
import dataSource from '../db/data-source.js';
import { Parceiros } from '../entities/parceiro.entity.js';

export class OportunidadeService {
  private oportunidadeRepository: Repository<Oportunidades>;
  private parceiroRepository: Repository<Parceiros>;

  constructor() {
    this.oportunidadeRepository = dataSource.getRepository(Oportunidades);
    this.parceiroRepository = dataSource.getRepository(Parceiros);
  }

  async getAllOportunidades(): Promise<Oportunidades[]> {
    const oportunidades = await this.oportunidadeRepository.find();

    return oportunidades;
  }

  async getAllOportunidadesByParceiros(parceiroId: number): Promise<Oportunidades[]> {
    const oportunidades = await this.getAllOportunidades();

    const ids = oportunidades.map((oportunidade) => oportunidade.id);

    const oportunidadesComParceiros = await Oportunidades.find({
      where: { id: In(ids) },
      relations: ['parceiros'],
    });

    const filteredOportunidades = oportunidades.filter((currentOportunidade) => {
      const oportunidade = oportunidadesComParceiros.find((o) => o.id === currentOportunidade.id);

      return oportunidade && oportunidade.parceiros.some((parceiro) => Number(parceiro.userID) === parceiroId);
    });

    return filteredOportunidades;
  }

  async filterOportunidadesByDate(initDate: string, endDate: string, parceiroId: number) {
    const oportunidades = await this.getAllOportunidadesByParceiros(parceiroId);

    const start = new Date(`${initDate}`);
    const end = new Date(`${endDate}`);

    start.setHours(0, 0, 0, 0);
    end.setHours(23, 59, 59, 999);

    const filteredByDate = oportunidades.filter((oportunidade) => {
      const createdAt = new Date(oportunidade.createdAt);

      return createdAt >= start && createdAt <= end;
    });

    return filteredByDate;
  }
}
