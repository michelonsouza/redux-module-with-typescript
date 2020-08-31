import { all, takeLatest, select, call, put } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';

import api from '../../../services/api';
import { IState } from './../../index';
import { addProductToCartRequest, addProductToCartSuccess, addProductToCartFail } from './actions';
import {ActionTypes} from './types';

type CheckProductStockRequest = ReturnType<typeof addProductToCartRequest>

interface IStockResponse {
  id: number;
  quantity: number;
}

function* checkProductStock({payload}: CheckProductStockRequest) {
  const {product} = payload;
  const currentQuantity: number = yield select((state: IState) => {
    return state.cart.items.find(item => item.product.id === product.id)?.quantity ?? 0;
  });

  try {
    const {data: availableStockResponse}: AxiosResponse<IStockResponse> = yield call(api.get, `/stock/${product.id}`);

    if (availableStockResponse.quantity > currentQuantity) {
      yield put(addProductToCartSuccess(product));
    } else {
      yield put(addProductToCartFail(product.id));
      alert('falta de estoque');
    }
  } catch (error) {
    alert('internal server error')
    yield put(addProductToCartFail(product.id));
  }

}

export default all([takeLatest(ActionTypes.ADD_PRODUCT_TO_CART_REQUEST, checkProductStock)]);
