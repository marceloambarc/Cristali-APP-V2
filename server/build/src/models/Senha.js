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
let Senha = class Senha {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Senha.prototype, "id", void 0);
__decorate([
    typeorm_1.Index("ix_senha1", { synchronize: false }),
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Senha.prototype, "in_ativo", void 0);
__decorate([
    typeorm_1.Column("nvarchar", { length: 255 }),
    __metadata("design:type", String)
], Senha.prototype, "tx_senha", void 0);
__decorate([
    typeorm_1.Column("nvarchar", { length: 6 }),
    typeorm_1.Index("ix_senha2", { synchronize: false }),
    __metadata("design:type", String)
], Senha.prototype, "cd_ccli", void 0);
__decorate([
    typeorm_1.Column("nvarchar", { length: 100 }),
    typeorm_1.Index("ix_senha3", { synchronize: false }),
    __metadata("design:type", String)
], Senha.prototype, "nm_nomecli", void 0);
__decorate([
    typeorm_1.Column("nvarchar", { length: 14 }),
    typeorm_1.Index("ix_senha4", { synchronize: false }),
    __metadata("design:type", String)
], Senha.prototype, "tx_cgc", void 0);
Senha = __decorate([
    typeorm_1.Entity()
], Senha);
exports.default = Senha;
