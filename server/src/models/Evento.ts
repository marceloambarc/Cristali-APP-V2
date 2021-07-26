import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class Evento {

  @PrimaryGeneratedColumn()
  ID_Evento: number;

  @Index('IX_Evento1')
  @Column("datetime")
  DT_Evento: Date;

  @Column("nvarchar", { length: 6 })
  @Index('IX_Evento2')
  CD_ccli: string;

  @Column("nvarchar", { length: 250 })
  @Index('IX_Evento3')
  TX_Evento: string;

  @Column("nvarchar", { length: 250 })
  Token_Cliente: string;

  @Column("nvarchar", { length: 250 })
  Token_Celular: string;

}