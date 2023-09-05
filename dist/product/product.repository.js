"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRepository = void 0;
class ProductRepository {
    constructor(_orm) {
        this._orm = _orm;
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield this._orm.client.tires.create({
                data: {
                    name: data.name,
                    description: data.description,
                    price: data.price,
                    size: data.generatedSize,
                    quantity: data.quantity,
                    type: data.type,
                },
            });
            return product;
        });
    }
    createImage(url, tiresId) {
        return __awaiter(this, void 0, void 0, function* () {
            const images = yield this._orm.client.images.create({
                data: {
                    tiresId: tiresId,
                    url: url,
                },
            });
            return images;
        });
    }
    getForCustomer(size, type, skip) {
        return __awaiter(this, void 0, void 0, function* () {
            const pageSize = 3;
            const skipPage = skip || 0;
            const products = yield this._orm.client.tires.findMany({
                include: {
                    images: true,
                },
                where: {
                    size: size,
                    type: type,
                },
                take: pageSize,
                skip: pageSize * skipPage,
            });
            const total = yield this._orm.client.tires.count({
                where: {
                    size: size,
                    type: type,
                },
            });
            const totalPages = Math.ceil(total / pageSize);
            const currentPage = skipPage > totalPages ? totalPages : skipPage;
            return {
                data: products,
                page: currentPage,
                total: total,
                lastPage: totalPages - 1,
            };
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield this._orm.client.tires.findFirst({
                where: {
                    id: id,
                },
                include: {
                    images: true,
                },
            });
            return product;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const del = yield this._orm.client.tires.delete({
                where: {
                    id: id,
                },
            });
            return del.id ? true : false;
        });
    }
    update(data, productID) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedProduct = yield this._orm.client.tires.update({
                where: {
                    id: productID,
                },
                data: Object.assign({}, data),
            });
            return updatedProduct;
        });
    }
    getByFields(data, skip) {
        return __awaiter(this, void 0, void 0, function* () {
            const pageSize = 3;
            const skipPage = skip || 0;
            const products = yield this._orm.client.tires.findMany({
                where: Object.assign({}, data),
                include: {
                    images: true,
                },
                skip: skip,
                take: pageSize,
            });
            const total = yield this._orm.client.tires.count({
                where: Object.assign({}, data),
            });
            const totalPages = Math.ceil(total / pageSize);
            const currentPage = skipPage > totalPages ? totalPages : skipPage;
            return {
                data: products,
                page: currentPage,
                total: total,
                lastPage: totalPages - 1,
            };
        });
    }
}
exports.ProductRepository = ProductRepository;
