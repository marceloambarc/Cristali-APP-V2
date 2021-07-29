import { Entity, PrimaryGeneratedColumn, Column, Index, JoinTable, OneToMany } from 'typeorm';
import Clientefinal from './Clientefinal';

@Entity()
export default class Senha {

  @PrimaryGeneratedColumn()
  id: number;

  @Index("ix_senha1", { synchronize: false })
  @Column()
  in_ativo: number;

  @Column("nvarchar", { length: 255 })
  tx_senha: string;

  @Column("nvarchar", { length: 6 })
  @Index("ix_senha2", { synchronize: false })
  cd_ccli: string;

  @Column("nvarchar", { length: 100 })
  @Index("ix_senha3", { synchronize: false })
  nm_nomecli: string;

  @Column("nvarchar", { length: 14 })
  @Index("ix_senha4", { synchronize: false })
  tx_cgc: string;

  @OneToMany(() => Clientefinal, cliente => cliente.senhas)
  @JoinTable()
  clientes: Clientefinal[];
  
}