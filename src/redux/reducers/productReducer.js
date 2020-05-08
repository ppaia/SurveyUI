import * as actionTypes from '../action/actionTypes';

const setProductId = (state, action) => {
    return {
        ...state,
        productId: action.payload
    }
};
const getProductByID = (state, action) => {
    return {
        ...state,
        productData: action.payload
    }
};
const getColors = (state, action) => {
    console.log("reducer", action.payload)
    return {
        ...state,
        productData: {
            ...state.productData,

            imagery: {
                images: action.payload.imagery.images
            }

        }
    }
}
const getColorName=(state,action)=>{
    console.log('reducer colorname',action.payload)
    return{
        ...state,
        productData:{
            ...state.productData,
            traits:{
                ...state.productData.traits,
                colors:{
                    ...state.productData.traits.colors,
                    colorName:action.payload
                }
            }

        }
    }
}

const expandColor=(state, action) => {
    console.log("reducer expandColor", action.payload);
    return{
        ...state,
        expandColor: action.payload
    }
}

const expandSize=(state, action) => {
    console.log("reducer expandSize", action.payload);
    return{
        ...state,
        expandSize: action.payload
    }
}

export default (state = {}, action) => {
    switch (action.type) {
        case actionTypes.SET_PRODUCTID:
            return setProductId(state, action);
        case actionTypes.GET_PRODUCTBYID:
            return getProductByID(state, action);
        case actionTypes.GET_COLORS:
            return getColors(state, action);
        case actionTypes.GET_COLORNAME:
            return getColorName(state, action);
        case actionTypes.EXPAND_COLOR:
            return expandColor(state, action);
        case actionTypes.EXPAND_SIZE:
            return expandSize(state, action);
        default:
            return state
    }
}