import moment from 'moment'


export const prepareEvents = ( events = [] ) => {

    return events.map(
        (e) => ({
            ...e,
            end: moment( e.end ).toDate(), // convertir en tipo date - la forma que ecepta calendario 
            start: moment( e.start ).toDate(),
        }) 
    );

} 
// convertir date de tipo string a date de tipo objeto compatible a nuestro calendario 