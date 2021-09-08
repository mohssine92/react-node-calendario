import { types } from "../types/types";



export const eventAddNew = (event) => ({ // recibo evento que quiero grabar
   type: types.eventAddNew,
   payload: event
});
 
export const eventSetActive = (event) => ({ // evento activo 
    type: types.eventSetActive,
    payload: event
});

export const eventClearActiveEvent = () => ({ type: types.eventClearActiveEvent });

export const eventUpdated = ( event ) => ({
    type: types.eventUpdated,
    payload: event
});


export const eventDeleted = () => ({ type: types.eventDeleted });


