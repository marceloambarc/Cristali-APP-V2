import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class Ordem {

  @PrimaryGeneratedColumn()
  CD_ID: number;

  @Index("IX_Ordem1")
  @Column("nvarchar", { length: 6 })
  CD_ID_ccli: string;

  @Column("numeric")
  @Index("IX_Ordem5")
  CD_ClienteFinal: number;

  @Column("datetime")
  @Index("IX_Ordem3")
  DT_Criado: Date;

  @Column("nvarchar", { length: 255 })
  VL_Total: string;

  @Column("nvarchar", { length: 255 })
  TX_OBS: string;

  @Column()
  @Index("IX_Ordem4")
  CD_HABIL_TIPO: number;

}