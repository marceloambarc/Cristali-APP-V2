import { Entity, PrimaryColumn, ManyToOne, Column, Index } from 'typeorm';
import Ordem from './Ordem';

@Entity()
export default class Ordemitem {

  @PrimaryColumn()
  @Index("ix_ordemitem1", { synchronize: false })
  @ManyToOne( () => Ordem, (ordem) => ordem.cd_id, { primary: true, })
  cd_ordem_id: number;

  @PrimaryColumn("numeric")
  @Index("ix_ordemitem2", { synchronize: false })
  cd_id: number;

  @Column("nvarchar", { length: 100 })
  @Index("ix_ordemitem3", { synchronize: false })
  nm_produto: string;

  @Column("nvarchar", { length: 255 })
  cd_codigogerado: string;

  @Column("numeric")
  vl_preco: number;
}