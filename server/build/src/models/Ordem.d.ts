import Ordemitem from './OrdemItem';
export default class Ordem {
    cd_id: number;
    cd_id_ccli: string;
    dt_criado: Date;
    vl_total: string;
    tx_obs: string;
    cd_habil_tipo: number;
    cd_clientefinal: number;
    itens: Ordemitem[];
}
