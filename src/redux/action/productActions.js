import * as actionTypes from './actionTypes';
import axios from 'axios';

export const setProduct = (product) => {
    return {
        type: actionTypes.GET_PRODUCTBYID,
        payload: product
    };
};
export const fetchProduct = (productId = "") => dispatch =>  {
    if (!productId) productId = 9001143;
    // return axios.get('http://dipx-mcom-126.tbe.zeus.fds.com:8080/xapi/digital/v1/product/' + productId)
        return axios.get('./products.json')
        .then(({ data }) => {
            dispatch(setProduct(data.product[0]));
        })
        .catch((error) => {
            console.log(error);
        });
};

export const loadColors = (colorId) => ({
    type: actionTypes.GET_COLORS,
    payload: colorId
});

export const setColorName = (color) => {
    console.log('action', color)
    return {
        type: actionTypes.GET_COLORNAME,
        payload: color
    }
};

export const expandColor = (expandColor) => {
    return {
        type: actionTypes.EXPAND_COLOR,
        payload: expandColor
    }
};

export const expandSize = (expandSize) => {
    return {
        type: actionTypes.EXPAND_SIZE,
        payload: expandSize
    }
};

export const isSurvey = (survey) =>{
    return{
        type: actionTypes.IS_SURVEY,
        payload: survey
    }
}

export const pageType = (page) =>{
    return{
        type: actionTypes.PAGE_TYPE,
        payload: page
    }
}
