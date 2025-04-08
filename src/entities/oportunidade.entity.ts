import {
  AfterInsert,
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  In,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { sendNewOpportunityEmail } from '../service/email/email.service.js';
import { Parceiros } from './parceiro.entity.js';

@Entity({ name: 'oportunidades' })
export class Oportunidades extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ type: 'varchar', length: 255 })
  public nome: string;

  @Column({ type: 'varchar', length: 30 })
  public cpf: string;

  @Column({ type: 'varchar', length: 255 })
  public cep: string;

  @Column({ type: 'varchar', length: 255 })
  public cidade: string;

  @Column({ type: 'varchar', length: 255 })
  public logradouro: string;

  @Column({ type: 'varchar', length: 255 })
  public email: string;

  @Column({ type: 'varchar', length: 255 })
  public telefone: string;

  @Column({ type: 'varchar', length: 255 })
  public fonte: string;

  @Column({ type: 'varchar', length: 255 })
  public tipoDeContato: string;

  @Column({ type: 'varchar', length: 255 })
  public tipoDeAcao: string;

  @Column({ type: 'varchar', length: 255 })
  public principioAtivo: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  public observacao: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  public comentario: string;

  @ManyToMany(() => Parceiros, (parceiro) => parceiro.oportunidades, { cascade: false })
  @JoinTable()
  public parceiros: Parceiros[];

  // Não alterar a ordem desse campo, pois altera a visualizaçao no form de criar/editar oportunidade
  @Column({ name: 'file_path', nullable: true, type: 'text' })
  public arquivo: string;

  @CreateDateColumn({ name: 'created_at' })
  public createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  public updatedAt: Date;

  @BeforeInsert()
  @BeforeUpdate()
  async handleBeforeInsertOrUpdate() {
    console.log('PARCEIROS NA ENTITY: ', this);
    if (this.parceiros && Array.isArray(this.parceiros) && this.parceiros.length > 0) {
      const partnersIds = this.parceiros.map((user) => (typeof user === 'object' ? user.id : user));

      if (partnersIds.every((id) => typeof id === 'number')) {
        const partnersFromDB = await Parceiros.find({ where: { id: In(partnersIds) } });

        this.parceiros = partnersFromDB;
      }
    }
  }

  @AfterInsert()
  send() {
    if (this.parceiros?.length) {
      const emails = this.parceiros.map((parceiro) => parceiro.email);
      sendNewOpportunityEmail('Parceiro', this.id, emails);
    }
  }
}
