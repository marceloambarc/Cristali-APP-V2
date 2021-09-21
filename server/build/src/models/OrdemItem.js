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
const Ordem_1 = __importDefault(require("./Ordem"));
let Ordemitem = class Ordemitem {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    typeorm_1.Index("ix_ordemitem2", { synchronize: false }),
    __metadata("design:type", Number)
], Ordemitem.prototype, "cd_id", void 0);
__decorate([
    typeorm_1.Column("nvarchar", { length: 100 }),
    typeorm_1.Index("ix_ordemitem3", { synchronize: false }),
    __metadata("design:type", String)
], Ordemitem.prototype, "nm_produto", void 0);
__decorate([
    typeorm_1.Column("nvarchar", { length: 255 }),
    __metadata("design:type", String)
], Ordemitem.prototype, "cd_codigogerado", void 0);
__decorate([
    typeorm_1.Column("numeric"),
    __metadata("design:type", Number)
], Ordemitem.prototype, "vl_preco", void 0);
__decorate([
    typeorm_1.Index("ix_ordemitem1", { synchronize: false }),
    typeorm_1.ManyToOne(() => Ordem_1.default, ordem => ordem.itens, { onDelete: "CASCADE" }),
    typeorm_1.JoinColumn({ name: 'cd_ordem_id' }),
    __metadata("design:type", Ordem_1.default)
], Ordemitem.prototype, "ordem", void 0);
Ordemitem = __decorate([
    typeorm_1.Entity()
], Ordemitem);
exports.default = Ordemitem;
