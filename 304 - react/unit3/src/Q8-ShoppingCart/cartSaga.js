import { call, put, takeEvery } from "redux-saga/effects";

import {
    fetchProducts,
    fetchProductsSuccess,
    fetchProductsFailure,
} from "./productSlice";

function* fetchProductsSaga() {
    try {
        const response = yield call(
            fetch,
            "https://fakestoreapi.com/products"
        );

        if (!response.ok) {
            throw new Error("Failed to fetch products");
        }

        const data = yield call([response, "json"]);

        yield put(fetchProductsSuccess(data));
    } catch (error) {
        yield put(fetchProductsFailure(error.message));
    }
}

function* cartSaga() {
    yield takeEvery(
        fetchProducts.type,
        fetchProductsSaga
    );
}

export default cartSaga;