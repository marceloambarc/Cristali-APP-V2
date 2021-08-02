import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, Index, JoinColumn } from 'typeorm';
import Ordem from './Ordem';

@Entity()
export default class Ordemitem {

  @PrimaryGeneratedColumn()
  @Index("ix_ordemitem2", { synchronize: false })
  cd_id: number;

  @Column("nvarchar", { length: 100 })
  @Index("ix_ordemitem3", { synchronize: false })
  nm_produto: string;

  @Column("nvarchar", { length: 255 })
  cd_codigogerado: string;

  @Column("numeric")
  vl_preco: number;

  @Index("ix_ordemitem1", { synchronize: false })
  @ManyToOne(() => Ordem, ordem => ordem.itens, { primary: true, })
  @JoinColumn({ name: 'cd_ordem_id' })
  ordem: Ordem;
  
}