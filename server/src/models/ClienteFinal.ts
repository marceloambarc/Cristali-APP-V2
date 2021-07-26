import { Column, Entity, Index, OneToMany, JoinTable, PrimaryGeneratedColumn } from 'typeorm';
import Ordem  from "./Ordem";

@Entity()
export default class ClienteFinal {

  @PrimaryGeneratedColumn({name: "PK_ClienteFinal"})
  CD_Pessoa: number;

  @Index("IX_ClientFinal1")
  @Column("nvarchar", { length: 100 })
  NM_Nome: string;

  @Column("nvarchar", { length: 14 })
  @Index("IX_ClientFinal2")
  TX_Fone: string;

  @Column("nvarchar", { length: 100 })
  TX_email: string;

  @Column("nvarchar", { length: 200 })
  @Index("IX_ClientFinal3")
  TX_OBS: string;

  @OneToMany(() => Ordem, ordem => ordem.CD_ClienteFinal)
  @Index("IX_ClientFinal14")
  @JoinTable()
  CD_OrdemId: Ordem[];

}