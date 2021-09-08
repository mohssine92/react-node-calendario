import { types } from "../types/types";

const initialState = {
    modalOpen: false,
}



export const uiReducer = ( state = initialState, action ) => {

    switch ( action.type ) {

        case types.uiOpenModal:
            return {
                ...state,
                modalOpen: true
            }

        case types.uiCloseModal:
            return {
                ...state,
                modalOpen: false
            }
    
        default:
            return state;
    }


}

// reducer exporta un state que estar disponible en el store , reducer por defecto tiene un state ,este state se actualiza depende del type y action dispatchada 