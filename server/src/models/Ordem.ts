import { Column, Entity, Index, JoinColumn, OneToMany, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';
import Ordemitem from './OrdemItem';

@Entity()
export default class Ordem {

  @PrimaryGeneratedColumn()
  cd_id: number;

  @Index("ix_ordem1", { synchronize: false })
  @Column("nvarchar", { length: 6 })
  cd_id_ccli: string;

  @CreateDateColumn() 
  @Index("ix_ordemreserva3")
  dt_criado: Date;

  @Column("nvarchar", { length: 255 })
  vl_total: string;

  @Column("nvarchar", { length: 255 })
  tx_obs: string;

  @Column()
  @Index("ix_ordem4", { synchronize: false })
  cd_habil_tipo: number;

  @Column()
  cd_clientefinal: number;

  @Column("nvarchar", { length: 250 })
  tx_referencia: string;

  @OneToMany(() => Ordemitem, item => item.ordem,{
    cascade: ['insert', 'update']
  })
  @JoinColumn({ name: 'cd_ordem_id' })
  itens: Ordemitem[];

}