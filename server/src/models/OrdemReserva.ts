import { Column, Entity, Index, JoinColumn, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import Ordemreservaitem from './OrdemReservaItem';

@Entity()
export default class Ordemreserva {

  @PrimaryColumn()
  cd_id: number;

  @Index("ix_ordemreserva1", { synchronize: false })
  @Column("nvarchar", { length: 6 })
  cd_id_ccli: string;

  @Column("datetime")
  @Index("ix_ordemreserva3", { synchronize: false })
  dt_criado: Date;

  @Column("nvarchar", { length: 255 })
  vl_total: string;

  @Column("nvarchar", { length: 255 })
  tx_obs: string;

  @Column()
  @Index("ix_ordemreserva4", { synchronize: false })
  cd_habil_tipo: number;

  @Column()
  cd_clientefinal: number;

  @OneToMany(() => Ordemreservaitem, item => item.ordem,{
    cascade: ['insert', 'update']
  })
  @JoinColumn({ name: 'cd_ordem_id' })
  itens: Ordemreservaitem[];

}