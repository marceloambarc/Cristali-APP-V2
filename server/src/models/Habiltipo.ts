import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export default class Habiltipo {

  @PrimaryGeneratedColumn()
  cd_tipo: number;

  @Column("nvarchar", { length: 100 })
  ds_tipo: string;

  @Column("smallint")
  tp_tipo: number;

  @Column("ntext")
  tx_obs: string;

  @Column('smallint')
  cd_referencia: number;

}
