import { BaseEntity, Column, Entity, JoinColumn, ManyToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Usuarios } from './user.entity.js';
import { Oportunidades } from './oportunidade.entity.js';

@Entity({ name: 'parceiros' })
export class Parceiros extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ type: 'varchar', length: 255 })
  public nome: string;

  @Column({ type: 'varchar', length: 255 })
  public email: string;

  @Column({ type: 'varchar', length: 255 })
  public telefone: string;

  @Column({ type: 'bool', default: true })
  public ativo: boolean;

  @Column({ type: 'bigint', nullable: true })
  public userID: number;

  @ManyToMany(() => Oportunidades, (oportunidade) => oportunidade.parceiros, { cascade: true })
  oportunidades: Oportunidades[];
}
