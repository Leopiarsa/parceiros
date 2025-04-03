import { OportunidadeService } from '../service/oportunidade.service.js';

export class OportunidadeController {
  private oportunidadeService: OportunidadeService;

  constructor() {
    this.oportunidadeService = new OportunidadeService();
  }

  async getOportunidadesByParceiro(req, res) {
    const { parceiroID } = req.params;

    const response = await this.oportunidadeService.getAllOportunidadesByParceiros(Number(parceiroID));

    return res.json(response);
  }

  async filterOportunidadesByDate(req, res) {
    try {
      const { initDate, endDate, parceiroID } = req.body;

      if (!initDate || !endDate || !parceiroID) {
        return res.status(400).json({ message: 'initDate, endDate, and parceiroId are required' });
      }

      const response = await this.oportunidadeService.filterOportunidadesByDate(initDate, endDate, Number(parceiroID));

      return res.json(response);
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
}
