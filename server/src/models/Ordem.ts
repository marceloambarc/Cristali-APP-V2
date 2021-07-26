import { Column, Entity, Index, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import ClienteFinal from './Clientefinal';

@Entity()
export default class Ordem {

  @PrimaryGeneratedColumn()
  cd_id: number;

  @Index("ix_ordem1", { synchronize: false })
  @Column("nvarchar", { length: 6 })
  cd_id_ccli: string;

  @Column("datetime")
  @Index("ix_ordem3", { synchronize: false })
  dt_criado: Date;

  @Column("nvarchar", { length: 255 })
  vl_total: string;

  @Column("nvarchar", { length: 255 })
  tx_obs: string;

  @Column()
  @Index("ix_ordem4", { synchronize: false })
  cd_habil_tipo: number;

  @ManyToOne(() => ClienteFinal, cliente => cliente.ordens)
  cliente: ClienteFinal;

}