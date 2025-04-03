import bcrypt from 'bcryptjs';
import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  getRepository,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Roles } from '../enums/roles.enum.js';
import { Parceiros } from './parceiro.entity.js';
import DataSource from '../db/data-source.js';
import { sendNewUserEmail } from '../service/email/email.service.js';
@Entity({ name: 'usuarios' })
export class Usuarios extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ type: 'varchar', length: 255 })
  public name: string;

  @Column({ type: 'varchar', length: 255 })
  public email: string;

  @Column({ type: 'varchar', length: 255 })
  public password: string;

  @Column({ type: 'enum', enum: Roles, default: Roles.Parceiro })
  public role: Roles;

  @CreateDateColumn({ name: 'created_at' })
  public createdAt: Date;

  @AfterInsert()
  async createPartnerIfNecessary() {
    if (this.role === Roles.Parceiro) {
      const parceiro = new Parceiros();
      parceiro.email = this.email;
      parceiro.nome = this.name;
      parceiro.userID = this.id;
      parceiro.save();
    }
  }

  @AfterInsert()
  async sendUserEmail() {
    sendNewUserEmail(this, this.email, `${this.name}, a sua Conta foi Criada no Sistema de Parceiros`);
  }

  @AfterUpdate()
  async updatePartnerIfNecessary() {
    if (this.role === Roles.Parceiro) {
      const partnerRepo = DataSource.getRepository(Parceiros);
      const partner = await Parceiros.findOne({ where: { userID: this.id } });

      if (partner) {
        partner.email = this.email;
        partner.nome = this.name;

        await partnerRepo.save(partner);
      }
    }
  }

  @AfterRemove()
  async removePartner() {
    if (this.role === Roles.Parceiro) {
      const parceiro = await Parceiros.findOne({ where: { email: this.email } });
      if (parceiro) {
        parceiro.remove();
      }
    }
  }
}
