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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const OrdemItem_1 = __importDefault(require("./OrdemItem"));
let Ordem = class Ordem {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Ordem.prototype, "cd_id", void 0);
__decorate([
    typeorm_1.Index("ix_ordem1", { synchronize: false }),
    typeorm_1.Column("nvarchar", { length: 6 }),
    __metadata("design:type", String)
], Ordem.prototype, "cd_id_ccli", void 0);
__decorate([
    typeorm_1.Column("datetime"),
    typeorm_1.Index("ix_ordem3", { synchronize: false }),
    __metadata("design:type", Date)
], Ordem.prototype, "dt_criado", void 0);
__decorate([
    typeorm_1.Column("nvarchar", { length: 255 }),
    __metadata("design:type", String)
], Ordem.prototype, "vl_total", void 0);
__decorate([
    typeorm_1.Column("nvarchar", { length: 255 }),
    __metadata("design:type", String)
], Ordem.prototype, "tx_obs", void 0);
__decorate([
    typeorm_1.Column(),
    typeorm_1.Index("ix_ordem4", { synchronize: false }),
    __metadata("design:type", Number)
], Ordem.prototype, "cd_habil_tipo", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Ordem.prototype, "cd_clientefinal", void 0);
__decorate([
    typeorm_1.OneToMany(() => OrdemItem_1.default, item => item.ordem, {
        cascade: ['insert', 'update']
    }),
    typeorm_1.JoinColumn({ name: 'cd_ordem_id' }),
    __metadata("design:type", Array)
], Ordem.prototype, "itens", void 0);
Ordem = __decorate([
    typeorm_1.Entity()
], Ordem);
exports.default = Ordem;
