import { Column, Entity, Index, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import Ordem  from "./Ordem";

@Entity()
export default class Clientefinal {

  @PrimaryGeneratedColumn({name: "PK_clientefinal"})
  cd_pessoa: number;

  @Index("ix_clientefinal1")
  @Column("nvarchar", { length: 100 })
  nm_nome: string;

  @Column("nvarchar", { length: 14 })
  @Index("ix_clientefinal2")
  tx_fone: string;

  @Column("nvarchar", { length: 100 })
  tx_email: string;

  @Column("nvarchar", { length: 200 })
  @Index("ix_clientefinal3")
  tx_obs: string;

  @OneToMany(() => Ordem, ordem => ordem.cliente)
  ordens: Ordem[];

}