import { ParceiroService } from '../service/parceiros.service.js';

export class ParceiroController {
  private parceiroService: ParceiroService;

  constructor() {
    this.parceiroService = new ParceiroService();
  }

  async getAllParceiros(req, res) {
    const { oportunidadeID } = req.params;

    const response = await this.parceiroService.getAllParceiros();

    return res.json(response);
  }
}
