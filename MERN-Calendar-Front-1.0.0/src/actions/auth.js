import { fetchSinToken , fetchConToken } from '../helpers/fetch';
import { types } from '../types/types';
import Swal from 'sweetalert2';
import { cleanCalendar } from './events';



export const startLogin = ( email, password ) => {
    return async( dispatch ) => {
        
        
        const resp = await fetchSinToken( 'auth', { email, password }, 'POST' );
        const body = await resp.json();

       
        if( body.ok ) { // true , false boolean
            localStorage.setItem('token', body.token );
            localStorage.setItem('token-init-date', new Date().getTime() )
            dispatch( login({
                uid: body.uid,
                name: body.name
            }) )
        } else {
            Swal.fire('Error', body.msg, 'error');
        }
        

    } 

  
}

export const startRegister = ( email, password, name ) => {
    return async( dispatch ) => {

        const resp = await fetchSinToken( 'auth/new', { email, password, name }, 'POST' );
        const body = await resp.json();

        if( body.ok ) { // true
            localStorage.setItem('token', body.token );
            localStorage.setItem('token-init-date', new Date().getTime() ); // teken dura lo que ha sido programado en backend - persisto saber fecha de creacion de ese token 

            dispatch( login({
                uid: body.uid,
                name: body.name
            }) )
 
        } else {  // false
            Swal.fire('Error', body.msg, 'error'); // backend nos alementa delmsg del error
        }


    }
}

export const startChecking = () => {
    return async(dispatch) => {

        // este peticion requiere solo token para verificar y renovar - uso : refresh del nav etc .. mantener estado para proteccion de rutas
        const resp = await fetchConToken( 'auth/renew' ); 
        const body = await resp.json();

        if( body.ok ) {
          
            localStorage.setItem('token', body.token );
            localStorage.setItem('token-init-date', new Date().getTime() );
            
            dispatch( login({  // persiste el estado 
                uid: body.uid,
                name: body.name
            }) )
        } else {
           // Swal.fire('Error', body.msg, 'error');
           dispatch( checkingFinish() );
        }
    }
}

const checkingFinish = () => ({ type: types.authCheckingFinish });



const login = ( user ) => ({ // sicrona
    type: types.authLogin,
    payload: user
});


export const startLogout = () => {
    return ( dispatch ) => { // necesito hacer mas procesos asi sera asyncrona 

        localStorage.clear(); // esta instruccion limpia todas variables de localstorage , tener en cuenta no dejar storage puede ser la computador saturada y afecta nuestro redux
        dispatch( cleanCalendar() ); // vaciar calendar estado inicial 
        dispatch( logout() ); // limpiar state reducer etc ,,,
        
    }
}

const logout = () => ({ type: types.authLogout }) 


