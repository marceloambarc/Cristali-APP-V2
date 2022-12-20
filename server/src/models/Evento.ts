import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class Evento {

  @PrimaryGeneratedColumn()
  id_evento: number;

  @Index('ix_evento1', { synchronize: false })
  @Column("datetime")
  dt_evento: Date;

  @Column("nvarchar", { length: 6 })
  @Index('ix_evento2', { synchronize: false })
  cd_ccli: string;

  @Column("nvarchar", { length: 250 })
  @Index('ix_evento3', { synchronize: false })
  tx_evento: string;

  @Column("nvarchar", { length: 250 })
  token_cliente: string;

  @Column("nvarchar", { length: 250 })
  token_celular: string;

  @Column()
  in_acerto: number;
}