import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import Ordem from './Ordem';

@Entity()
export default class OrdemPagamento {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  cd_habil_tipo: number;

  @Column("datetime")
  dt_evento: Date;

  @Column("datetime")
  dt_retorno: Date;

  @Column("nvarchar", { length: 255 })
  vl_total: string;

  @Column("nvarchar", { length: 6 })
  token_cliente: string;

  @Column("nvarchar", { length: 255 })
  code_doc: string;

  @Column()
  cd_ordem: number;

}