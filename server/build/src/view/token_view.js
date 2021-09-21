"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    render(token) {
        return {
            id: token.id,
            token_celular: token.token_celular,
            dt_criado: token.dt_criado,
            dt_modificado: token.dt_modificado
        };
    },
    renderMany(tokens) {
        return tokens.map(token => this.render(token));
    }
};
