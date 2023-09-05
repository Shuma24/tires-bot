"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProductReplyGenerator = void 0;
const updateProductReplyGenerator = (product) => {
    const msg = `
<b>Обновлено продукт:</b>
<b>id:</b> ${product.id};
<b>name:</b> ${product.name};
<b>description:</b> ${product.description};
<b>price:</b> ${product.price} UAH;
<b>type:</b> ${product.type};
<b>size:</b> ${product.size};
<b>quantity:</b> ${product.quantity};`;
    return msg;
};
exports.updateProductReplyGenerator = updateProductReplyGenerator;
