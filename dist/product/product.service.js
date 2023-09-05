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
exports.ProductService = void 0;
const product_entity_1 = require("./entity/product.entity");
class ProductService {
    constructor(_productRepository, _configService, _fetchService, _storageService, _loggerService) {
        this._productRepository = _productRepository;
        this._configService = _configService;
        this._fetchService = _fetchService;
        this._storageService = _storageService;
        this._loggerService = _loggerService;
        this._loggerService.info('ProductService initialized');
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!data) {
                    this._loggerService.error('No data');
                    throw new Error('No data');
                }
                const newTires = new product_entity_1.ProductEntity({
                    name: data.name,
                    price: data.price,
                    type: '',
                    width: data.width,
                    radius: data.radius,
                    description: data.description,
                    height: data.height,
                    generatedSize: '',
                    quantity: data.quantity,
                })
                    .validateType(data.type)
                    .createSize(data.width, data.height, data.radius);
                const createdTire = yield this._productRepository.create(newTires);
                if (!createdTire) {
                    this._loggerService.error('Problems with create product');
                    throw new Error('Problems with create product');
                }
                return createdTire;
            }
            catch (error) {
                if (error instanceof Error) {
                    this._loggerService.error(error.message);
                    throw new Error(error.message);
                }
            }
        });
    }
    createImage(id, tiresID) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = this._configService.get('BOT_SECRET');
                const isTires = yield this.getById(tiresID);
                if (!(isTires === null || isTires === void 0 ? void 0 : isTires.id) || isTires.id !== tiresID)
                    return;
                if (!token) {
                    this._loggerService.error('Problems with get token from .env');
                    throw new Error('Problems with get token from .env');
                }
                const responseWithPath = yield this._fetchService.GET(`https://api.telegram.org/bot${token}/getFile?file_id=${id}`);
                if (!responseWithPath.data.result.file_path) {
                    this._loggerService.error('No path to download image');
                    throw new Error('No path to download image');
                }
                const responseWithBuffer = yield this._fetchService.GET(`https://api.telegram.org/file/bot${token}/${responseWithPath.data.result.file_path}`, {
                    responseType: 'arraybuffer',
                });
                if (!responseWithBuffer.data) {
                    this._loggerService.error('No buffer from telegram');
                    throw new Error('No buffer from telegram');
                }
                const uploadedPhoto = yield this._storageService.handleFile({
                    data: responseWithBuffer.data,
                    filename: 'tires-bot',
                    encoding: 'utf8',
                    mimetype: 'image/jpeg',
                    limit: false,
                });
                if (!uploadedPhoto) {
                    this._loggerService.error('Problem with upload to cloud');
                    throw new Error('Problem with upload to cloud');
                }
                const image = yield this._productRepository.createImage(uploadedPhoto.url, tiresID);
                return image;
            }
            catch (error) {
                if (error instanceof Error) {
                    this._loggerService.error(error.message);
                    throw new Error(error.message);
                }
            }
        });
    }
    update(data, productID) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const isCorrectID = yield this.getById(productID);
                if (!isCorrectID) {
                    this._loggerService.error('Incorrect product ID');
                    throw new Error('Incorrect product ID');
                }
                const updatedProduct = yield this._productRepository.update(Object.assign({}, data), productID);
                return updatedProduct;
            }
            catch (error) {
                if (error instanceof Error) {
                    this._loggerService.error(error.message);
                    throw new Error(error.message);
                }
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const product = yield this.getById(id);
                if (!product) {
                    this._loggerService.error('Incorrect id');
                    throw new Error('Incorrect id');
                }
                if (product.images) {
                    for (let i = 0; i < product.images.length; i++) {
                        const baseURL = 'https://tiresbotbucket.s3.eu-central-1.amazonaws.com/';
                        const key = decodeURIComponent(product.images[i].url.replace(baseURL, ''));
                        yield this._storageService.deleteFile(key);
                    }
                }
                const delResult = yield this._productRepository.delete(id);
                return delResult;
            }
            catch (error) {
                if (error instanceof Error) {
                    this._loggerService.error(error.message);
                    throw new Error(error.message);
                }
            }
        });
    }
    getForCustomer(size, type, page) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!size) {
                    this._loggerService.error('No size');
                    throw new Error('Size is required.');
                }
                const products = yield this._productRepository.getForCustomer(size, type, page);
                return products;
            }
            catch (error) {
                if (error instanceof Error) {
                    this._loggerService.error(error.message);
                    throw new Error(error.message);
                }
            }
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!id) {
                    this._loggerService.error('No id');
                    return;
                }
                const product = yield this._productRepository.getById(id);
                if (!product) {
                    this._loggerService.error('Bad ID or another problem');
                    return;
                }
                return product;
            }
            catch (error) {
                if (error instanceof Error) {
                    this._loggerService.error(error.message);
                    throw new Error(error.message);
                }
            }
        });
    }
    getByFields(data, page) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const findProduct = yield this._productRepository.getByFields(Object.assign({}, data), page);
                if (!findProduct) {
                    this._loggerService.error('No product or problem');
                    throw new Error('No product or problem');
                }
                return findProduct;
            }
            catch (error) {
                if (error instanceof Error) {
                    this._loggerService.error(error.message);
                    throw new Error(error.message);
                }
            }
        });
    }
}
exports.ProductService = ProductService;
