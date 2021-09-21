"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    render(senha) {
        return {
            id: senha.id,
            isActive: senha.in_ativo,
            userCode: senha.cd_ccli,
            userName: senha.nm_nomecli,
            cgc: senha.tx_cgc,
        };
    },
    renderMany(senhas) {
        return senhas.map(senha => this.render(senha));
    }
};
