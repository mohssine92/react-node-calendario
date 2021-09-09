import { types } from '../types/types';

const initialState = {
    checking: true, // verificar si esta autenticado - con fin de redireccionar a la autenticacion  
    // uid: null, 
    // name: null
}

export const authReducer = ( state = initialState, action ) => {

    switch ( action.type ) {
        
        case types.authLogin:
            return {
                ...state,
                ...action.payload,
                checking: false
            }

        case types.authCheckingFinish:
            return {
                ...state,
                checking: false
            }

        
        case types.authLogout:
            return {
                checking: false
            } // secreto no uso ...state , es decir returno objet nuevo , se pierde informaciond de user desconectado del state en mi store 


        default:
            return state;
    }

}

// este reducer para controlar estado de autenticacion de user es decir como tiene que ser el objeto de user autenticado y de user no autenticado
