import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';// calendario de terceros 
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

import { Navbar } from '../ui/Navbar';
import { messages } from '../../helpers/calendar-messages-es';
import { CalendarEvent } from './CalendarEvent'; // custumizar evento del calendario
import { CalendarModal } from './CalendarModal';

import { uiOpenModal } from '../../actions/ui';

import 'react-big-calendar/lib/css/react-big-calendar.css'; // docs big-calendario
import 'moment/locale/es'; // cambiar idioma de moment - porque en algunas parte trabaja calendario con moment : dias de la semana
import { eventSetActive, eventClearActiveEvent, eventStartLoading } from '../../actions/events';
import { AddNewFab } from '../ui/AddNewFab';
import { DeleteEventFab } from '../ui/DeleteEventFab';

moment.locale('es');

const localizer = momentLocalizer(moment); // docs de calendar



export const CalendarScreen = () => {

    const dispatch = useDispatch(); // para dispatchar accion usando redux como fuente de verdad

    const { events, activeEvent } = useSelector( state => state.calendar ); // obtener cierto state del store del redux

    const [lastView, setLastView] = useState( localStorage.getItem('lastView') || 'month' ); // month primer uso , controlar state localmente

    const { uid } = useSelector( state => state.auth ); // leer stor - obtener uid del user autenticado
    
    // disparo efecto , cuando se carga por primera vez el componente - requiere eventos - alimentar store por eventos from db  
    useEffect(() => {
        
      dispatch( eventStartLoading() );
     

    }, [ dispatch ])


    // voy a crear un par de Eventos para estar pendiente de acciones que van a suceder , y obviamente voy a occupar reccionar en base de esas acciones

    const onDoubleClick = (e) => {
       //console.log(e);
         dispatch( uiOpenModal() );
    }

    const onSelectEvent = (e) => { // evento object 
      dispatch( eventSetActive( e ) );
    }

    const onViewChange = (e) => { // e => vista del calendario 
       setLastView(e); // actualziar state de use state localmenete
       localStorage.setItem('lastView', e);
       // save on storage - decir al calendario que empieze alli
    }

    const onSelectSlot = (e) => {
         console.log(e)
        dispatch( eventClearActiveEvent() );
    }


    const eventStyleGetter = ( event, start, end, isSelected ) => { // args disparados gracias a este calendario
       // console.log(event) // en este punto tenemos instancias ed ebventos - traer objeto del user creador , comparo con user autenticado lo tengo en el store
       // asi doy estilo diff a mis eventos ser como user autenticado .. y mas logica perzonalizada
        
        const style = {
            backgroundColor: ( uid === event.user._id ) ? '#367CF7' : '#465660', // ternario 
            borderRadius: '0px',
            opacity: 0.8,
            display: 'block',
            color: 'white'
        }


        return {
            style
        }
    };


    return (
        <div className="calendar-screen">  {/* tener en cuenta estilos 304 */}
            <Navbar />
            
            {/* calendario emite varios eventos ver docs */} {/* esas emmisiones sirve paraque lo que necesitan ustedes */}
            
            <Calendar
                localizer={ localizer } 
                events={ events } // informacion eventos que voy a mandar al calendario 
                startAccessor="start"
                endAccessor="end"
                messages={ messages } // objeto para cambiar idioma del calendario 
                eventPropGetter={ eventStyleGetter } // regresa el estilo que le va a aplicar a ese event en particular 
                onDoubleClickEvent={ onDoubleClick } // evento sobre el evento 
                onSelectEvent={ onSelectEvent } // when has selected event 
                onView={ onViewChange } //  cuando vista cambia de mes a dia etc ...
                onSelectSlot={ onSelectSlot } // cada cvlick dentro del calendario
                selectable={ true }  // true paraque funcione  onSelectSlot
                view={ lastView } // la vista a mnostrar por default , refresh 
                components={{  
                    event: CalendarEvent // es un componente recibe el event , asi lo personalizamos 
                }}  // noten no estoy renderizando componente - solo le mando referencia al componente 
            />


            <AddNewFab /> {/* + */}


            {    /* por ddefault es null , selecciinado es objeto */
                (activeEvent) && <DeleteEventFab />
            }
            

            <CalendarModal />  {/*  no recibe ningun arg - trabajo con redux - voy a saber cual es el evento activo del store directamenet ... */}



        </div>
    )
}
