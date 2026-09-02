import { call, put, takeLatest } from "redux-saga/effects";
import {
    searchProducts,
    searchProductsSuccess,
    searchProductsFailure,
} from "./searchSlice";

function* searchProductsSaga(action) {
    try {
        const response = yield call(
            fetch,
            "https://fakestoreapi.com/products"
        );

        if (!response.ok) {
            throw new Error("Failed to fetch products");
        }

        const data = yield call([response, "json"]);

        const searchTerm = action.payload.toLowerCase();

        const filteredProducts = data.filter((product) =>
            product.title.toLowerCase().includes(searchTerm)
        );

        yield put(searchProductsSuccess(filteredProducts));
    } catch (error) {
        yield put(searchProductsFailure(error.message));
    }
}

function* searchSaga() {
    yield takeLatest(
        searchProducts.type,
        searchProductsSaga
    );
}

export default searchSaga;