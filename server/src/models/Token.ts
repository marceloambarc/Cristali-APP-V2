import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm';

@Entity()
export default class Token {

  @PrimaryGeneratedColumn()
  id: number;

  @Index("ix_token1", { synchronize: false })
  @Column("nvarchar", { length: 255 })
  token_celular: string;

  @Column("datetime")
  @Index("ix_token2", { synchronize: false })
  dt_criado: Date;

  @Column("datetime")
  @Index("ix_token3", { synchronize: false })
  dt_modificado: Date;
  
}