"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
let Evento = class Evento {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Evento.prototype, "id_evento", void 0);
__decorate([
    typeorm_1.Index('ix_evento1', { synchronize: false }),
    typeorm_1.Column("datetime"),
    __metadata("design:type", Date)
], Evento.prototype, "dt_evento", void 0);
__decorate([
    typeorm_1.Column("nvarchar", { length: 6 }),
    typeorm_1.Index('ix_evento2', { synchronize: false }),
    __metadata("design:type", String)
], Evento.prototype, "cd_ccli", void 0);
__decorate([
    typeorm_1.Column("nvarchar", { length: 250 }),
    typeorm_1.Index('ix_evento3', { synchronize: false }),
    __metadata("design:type", String)
], Evento.prototype, "tx_evento", void 0);
__decorate([
    typeorm_1.Column("nvarchar", { length: 250 }),
    __metadata("design:type", String)
], Evento.prototype, "token_cliente", void 0);
__decorate([
    typeorm_1.Column("nvarchar", { length: 250 }),
    __metadata("design:type", String)
], Evento.prototype, "token_celular", void 0);
Evento = __decorate([
    typeorm_1.Entity()
], Evento);
exports.default = Evento;
