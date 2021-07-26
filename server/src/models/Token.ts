import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm';

@Entity()
export default class Token {

  @PrimaryGeneratedColumn()
  id: number;

  @Index("IX_Token1")
  @Column("nvarchar", { length: 255 })
  Token_Celular: string;

  @Column("datetime")
  @Index("IX_Token2")
  DT_Criado: Date;

  @Column("datetime")
  @Index("IX_Token3")
  DT_Modificado: Date;
  
}