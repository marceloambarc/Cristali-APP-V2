import { Entity, PrimaryGeneratedColumn, Column, Index } from 'typeorm';

@Entity()
export default class Senha {

  @PrimaryGeneratedColumn()
  ID: number;

  @Index("IX_SENHA1")
  @Column()
  IN_Ativo: number;

  @Column("nvarchar", { length: 255 })
  TX_Senha: string;

  @Column("nvarchar", { length: 6 })
  @Index("IX_SENHA2")
  CD_ccli: string;

  @Column("nvarchar", { length: 100 })
  @Index("IX_SENHA3")
  NM_nomecli: string;

  @Column("nvarchar", { length: 14 })
  @Index("IX_SENHA4")
  TX_CGC: string;
  
}