import {
    ALL_PRODUCT_FAIL,
    ALL_PRODUCT_REQUEST,
    ALL_PRODUCT_SUCCESS,
} from "../Constant/productConstant.js";
import axios from "axios";

export const getProduct = (category) => async (dispatch) => {
    try {
        dispatch({ type: ALL_PRODUCT_REQUEST });

        let link = `https://dummyjson.com/products`;
        if (category) {
            link = `https://dummyjson.com/products/category/${category}`;
        }
        const { data } = await axios.get(link);
        dispatch({
            type: ALL_PRODUCT_SUCCESS,
            payload: data.products,
        });
    } catch (error) {
        dispatch({
            type: ALL_PRODUCT_FAIL,
        })
    }
}