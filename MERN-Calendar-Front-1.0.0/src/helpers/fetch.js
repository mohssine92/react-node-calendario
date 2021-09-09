const baseUrl = process.env.REACT_APP_API_URL;
 
const fetchSinToken = ( endpoint, data, method = 'GET' ) => { // por default es get , asi si no manda nada ....

    const url = `${ baseUrl }/${ endpoint }`; // endpoint => /auth , /event 
 
    if ( method === 'GET' ) {
        return fetch( url );
    } else {
        return fetch( url, {
            method,  // post put delet etc
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify( data )
        });
    }
}

const fetchConToken = ( endpoint, data, method = 'GET' ) => {

    const url = `${ baseUrl }/${ endpoint }`;
    const token = localStorage.getItem('token') || '';

    if ( method === 'GET' ) { // verificar renovar , refresh
        return fetch( url, {
            method,
            headers: {
              'x-token': token
            }
        });
    } else {
        return fetch( url, { // en caso request a service protegido 
            method,
            headers: {
                'Content-type': 'application/json',
                'x-token': token
            },
            body: JSON.stringify( data )
        });
    }


}



export {
    fetchSinToken,
    fetchConToken
}