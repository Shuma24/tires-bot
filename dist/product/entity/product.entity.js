"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductEntity = void 0;
class ProductEntity {
    constructor(data) {
        this.radius = data.radius;
        this.width = data.width;
        this.height = data.height;
        this.type = data.type;
        this.generatedSize = data.generatedSize;
        this.name = data.name;
        this.description = data.description;
        this.price = data.price;
        this.quantity = data.quantity;
    }
    validateType(type) {
        if (type === 'summer' || type === 'winter' || type === 'allseason') {
            this.type = type;
        }
        else {
            this.type = 'summer';
        }
        return this;
    }
    createSize(width, height, radius) {
        this.generatedSize = `${width}/${height}/${radius}`;
        return this;
    }
}
exports.ProductEntity = ProductEntity;
