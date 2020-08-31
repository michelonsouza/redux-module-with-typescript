import { Reducer } from 'redux';
import produce from 'immer';

import { ICartState, ActionTypes } from './types';

const INITIAL_STATE: ICartState = {
  items: [],
  failedStockCheck: [],
};

const cart: Reducer<ICartState> = (state = INITIAL_STATE, { type, payload }) => {
  return produce(state, draft => {
    switch(type) {
      case ActionTypes.ADD_PRODUCT_TO_CART_SUCCESS: {
        const { product } = payload;
        const productInCart = draft.items.find(item => item.product.id === product.id);

        if (productInCart) {
          productInCart.quantity += 1;
        } else {
          draft.items.push({
            product,
            quantity: 1
          });
        }

        break;
      }
      case ActionTypes.ADD_PRODUCT_TO_CART_FAILURE: {
        draft.failedStockCheck.push(payload.productID)

        break;
      }
      default:
        return draft
    }
  });
}

export default cart;
