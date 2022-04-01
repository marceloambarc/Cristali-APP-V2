import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, Index, JoinColumn } from 'typeorm';
import Ordemreserva from './OrdemReserva';

@Entity()
export default class Ordemreservaitem {

  @PrimaryGeneratedColumn()
  @Index("ix_ordemreservaitem2", { synchronize: false })
  cd_id: number;

  @Column("nvarchar", { length: 100 })
  @Index("ix_rdemreservaitem3", { synchronize: false })
  nm_produto: string;

  @Column("nvarchar", { length: 255 })
  cd_codigogerado: string;

  @Column("numeric")
  vl_preco: number;

  @Index("ix_rdemreservaitem1", { synchronize: false })
  @ManyToOne(() => Ordemreserva, ordem => ordem.itens, { onDelete: "CASCADE" })
  @JoinColumn({ name: 'cd_ordem_id' })
  ordem: Ordemreserva;
}