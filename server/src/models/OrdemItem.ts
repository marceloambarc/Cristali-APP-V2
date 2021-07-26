import { Entity, PrimaryColumn, ManyToOne, Column, Index } from 'typeorm';
import Ordem from './Ordem';

@Entity()
export default class OrdemItem {

  @PrimaryColumn()
  @Index("IX_OrdemiTEM1")
  @ManyToOne( () => Ordem, (ordem) => ordem.CD_ID, { primary: true, })
  CD_Ordem_ID: number;

  @PrimaryColumn("numeric")
  @Index("IX_OrdemiTEM2")
  CD_ID: number;

  @Column("nvarchar", { length: 100 })
  @Index("IX_OrdemiTEM3")
  NM_Produto: string;

  @Column("nvarchar", { length: 255 })
  CD_codigoGerado: string;

  @Column("numeric")
  VL_Preco: number;
}