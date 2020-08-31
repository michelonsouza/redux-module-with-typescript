import { IProduct, ActionTypes } from './types';

export function addProductToCartRequest(product: IProduct) {
  return {
    type: ActionTypes.ADD_PRODUCT_TO_CART_REQUEST,
    payload: { product }
  }
}

export function addProductToCartSuccess(product: IProduct) {
  return {
    type: ActionTypes.ADD_PRODUCT_TO_CART_SUCCESS,
    payload: { product }
  }
}

export function addProductToCartFail(productID: number) {
  return {
    type: ActionTypes.ADD_PRODUCT_TO_CART_FAILURE,
    payload: { productID }
  }
}
