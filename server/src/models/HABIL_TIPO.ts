import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export default class HABIL_TIPO {

  @PrimaryGeneratedColumn()
  CD_TIPO: number;

  @Column("nvarchar", { length: 100 })
  DS_TIPO: string;

  @Column("smallint")
  TP_TIPO: number;

  @Column("ntext")
  TX_OBS: string;

  @Column('smallint')
  CD_REFERENCIA: number;

}
