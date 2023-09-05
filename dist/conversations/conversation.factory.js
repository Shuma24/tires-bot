"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConversationFactory = void 0;
class ConversationFactory {
    constructor(_addProductConversation, _orderProductConversation, _setProductsImageConversation, _deleteProductConversation, _updateProductConversation, _getProductConversation, _banConversation, _unbanConversation) {
        this._addProductConversation = _addProductConversation;
        this._orderProductConversation = _orderProductConversation;
        this._setProductsImageConversation = _setProductsImageConversation;
        this._deleteProductConversation = _deleteProductConversation;
        this._updateProductConversation = _updateProductConversation;
        this._getProductConversation = _getProductConversation;
        this._banConversation = _banConversation;
        this._unbanConversation = _unbanConversation;
    }
    createConversation() {
        return [
            this._addProductConversation,
            this._orderProductConversation,
            this._setProductsImageConversation,
            this._deleteProductConversation,
            this._updateProductConversation,
            this._getProductConversation,
            this._banConversation,
            this._unbanConversation,
        ];
    }
}
exports.ConversationFactory = ConversationFactory;
