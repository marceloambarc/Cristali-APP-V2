import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class Clientefinal {

  @PrimaryGeneratedColumn({name: "PK_clientefinal"})
  cd_pessoa: number;

  @Index("ix_clientefinal1", { synchronize: false })
  @Column("nvarchar", { length: 100 })
  nm_nome: string;

  @Column("nvarchar", { length: 14 })
  @Index("ix_clientefinal2", { synchronize: false })
  tx_cgc: string;

  @Column("nvarchar", { length: 14 })
  @Index("ix_clientefinal3", { synchronize: false })
  tx_fone: string;

  @Column("nvarchar", { length: 100 })
  tx_email: string;

  @Column("nvarchar", { length: 200 })
  @Index("ix_clientefinal4", { synchronize: false })
  tx_obs: string;

  @Index("ix_clientefinal5", { synchronize: false })
  @Column("nvarchar", { length: 6 })
  cd_id_ccli: string;

}