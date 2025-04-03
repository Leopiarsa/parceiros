import { UserService } from '../service/user.service.js';
import { Request, Response } from 'express';

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }
  async sendFile(req: Request, res: Response) {
    try {
      await this.userService.sendFile;
      res.status(200).send('File sent');
    } catch (error) {
      console.error('Error in UserController.sendFile:', error);
      res.status(500).send('Internal server error');
    }
  }

  async verifyEmail(req: Request, res: Response) {
    try {
      const { email } = req.body;

      return await this.userService.verifyExistentEmail(email);
    } catch (error) {
      console.error('Error in UserController.sendFile:', error);
      res.status(500).send('Internal server error');
    }
  }
}
