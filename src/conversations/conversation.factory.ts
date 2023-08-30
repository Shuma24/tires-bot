import { BaseConversation } from './conversation';
import { IConversationFactory } from './interfaces/conversation-factory.interface';

export class ConversationFactory implements IConversationFactory {
  constructor(
    private readonly _addProductConversation: BaseConversation,
    private readonly _orderProductConversation: BaseConversation,
    private readonly _setProductsImageConversation: BaseConversation,
    private readonly _deleteProductConversation: BaseConversation,
    private readonly _updateProductConversation: BaseConversation,
    private readonly _getProductConversation: BaseConversation,
    private readonly _banConversation: BaseConversation,
    private readonly _unbanConversation: BaseConversation,
  ) {}

  createConversation(): BaseConversation[] {
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
