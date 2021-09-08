import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import moment from 'moment';
import Modal from 'react-modal'; 
import DateTimePicker from 'react-datetime-picker';
import Swal from 'sweetalert2';

import { uiCloseModal } from '../../actions/ui';
import { eventAddNew, eventClearActiveEvent, eventUpdated } from '../../actions/events';


const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
}; /* para posizionar en medio el modal */

Modal.setAppElement('#root'); /* public/index - root  */


const now = moment().minutes(0).seconds(0).add(1,'hours'); // 3:00:00 - aprox siguiente hora wa9fa
const nowPlus1 = now.clone().add(1, 'hours'); // clonar objeto definido y añadirle una hora de dif

const initEvent = {
    title: '',
    notes: '',
    start: now.toDate(),
    end: nowPlus1.toDate()
}


export const CalendarModal = () => {

                        
    const { modalOpen } = useSelector( state => state.ui );     /* obtener state del store */
    const { activeEvent } = useSelector( state => state.calendar ); 
    const dispatch = useDispatch(); // disptchar accion - redux

    const [ dateStart, setDateStart ] = useState( now.toDate() );  //console.log(dateStart)
    const [ dateEnd, setDateEnd ] = useState( nowPlus1.toDate() );
    const [ titleValid, setTitleValid ] = useState(true);
    
    // trabajamos control de state de form de una manera differente - no usamos nuestro cutmo hook
    const [formValues, setFormValues] = useState( initEvent );
    const { notes, title, start, end }  = formValues;



    useEffect(() => {
        if ( activeEvent ) {
            setFormValues( activeEvent );
        } else {
            setFormValues( initEvent );
        }
    }, [activeEvent, setFormValues]) // dependencia : cuando evennto esta activo - diferente a null va ser el estado de mi form 



    const handleInputChange = ({ target }) => { // actualiza  el state asociado al form html - trabajamos form de manera diff - tenemo sla opcion del cutom hook form 
        setFormValues({
            ...formValues,
            [target.name]: target.value
        });
    }


    const closeModal = () => {
        // TODO: cerrar el modal
        dispatch( uiCloseModal() ); // cerra modal boolean
        dispatch( eventClearActiveEvent() ); // purgar , null
        setFormValues( initEvent ); // form a su estado inicial -
    }

    const handleStartDateChange = ( e ) => { // e => fecha . es instancia de object date de js no es de moment libreria , hora seleccionada
        setDateStart( e ); // update value form html  
       // console.log(e)
        setFormValues({ // control state form 
            ...formValues,
            start: e
        })
    }
    
    const handleEndDateChange = ( e ) => {
        setDateEnd( e );
        setFormValues({ // controstate form 
            ...formValues,
            end: e
        })
    }

    const handleSubmitForm = (e) => {
        e.preventDefault(); // no refresh 

        // tenemso formvalues , antes de dispatch hacemos valifaciones
        

        // fechas estan instancia de js y lo convierto en instancias de moment - para que me permite todas funciones de compracion de moment .
        const momentStart = moment( start );
        const momentEnd = moment( end );
        const momentActual = moment().minutes(0).seconds(0);

        if ( momentStart.isSameOrAfter( momentEnd ) ) { // 310
            return Swal.fire('Error','La fecha fin debe de ser mayor a la fecha de inicio', 'error');
        }

        if( momentStart.isBefore(momentActual)){
            return Swal.fire('Error','no puede asignar fecha que ha pasado ', 'error');
        }
             
    

        if ( title.trim().length < 2 ) {
            return setTitleValid(false);
            // usada por validacion de boostrap de un input
        }

        if ( activeEvent ) { // si exist , actualizamos
            dispatch( eventUpdated( formValues ) )
        } else {
            dispatch( eventAddNew({
                ...formValues,
                id: new Date().getTime(),
                user: {
                    _id: '123',
                    name: 'Mohssine'
                }
            }) );
        }


        setTitleValid(true); // redefinir validacion de input boostrap
        closeModal();
        
    }


    return (
        <Modal /* es un h-r-componente : es decir dentro del mismo tendremos tofdos elementos que necesitamos  */
          isOpen={ modalOpen } // boolean - encarga de mostrar o occultar el modal
          onRequestClose={ closeModal } // esta en escucha de tocar fuera del modal - objetivo cerra el modal 
          style={ customStyles } // estilo del modal 
          closeTimeoutMS={ 200 } // quiero que se cierra en xxxx m/s , efecto de cierre
          className="modal" //estilos del modal en styles.css  
          overlayClassName="modal-fondo"
        >  
             {/* contenido literal que va tener ese modal  */}
            <h1> { (activeEvent)? 'Editar evento': 'Nuevo evento' } </h1> {/* 307 */}
            <hr />
            <form 
                className="container"
                onSubmit={ handleSubmitForm }
            >

                <div className="form-group">
                    <label>Fecha y hora inicio</label>
                    <DateTimePicker
                        onChange={ handleStartDateChange }
                        value={ dateStart } // hora inicial por defecto 
                        className="form-control" /* sobre escribir classes del mismo  */
                    /> {/* 308 - terceros */}
                </div>

                <div className="form-group">
                    <label>Fecha y hora fin</label>
                    <DateTimePicker
                        onChange={ handleEndDateChange }
                        value={ dateEnd }
                        minDate={ dateStart } // validacion propia del paquete - no es logico la fecha inico sera mas que fecha de end docs 308 - al momento de submit 
                        className="form-control"
                    />
                </div>

                <hr />
                <div className="form-group">
                    <label>Titulo y notas</label>
                    <input 
                        type="text" 
                        className={ `form-control ${ !titleValid && 'is-invalid' } `} // dif a true es invalid . - valdacion de boostarp
                        placeholder="Título del evento"
                        name="title" // es el target name 
                        autoComplete="off"
                        value={ title } // control form - target value
                        onChange={ handleInputChange } // dispara event de tipo target 
                    />
                    <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
                </div>

                <div className="form-group">
                    <textarea 
                        type="text" 
                        className="form-control"
                        placeholder="Notas"
                        rows="5"
                        name="notes"
                        value={ notes }
                        onChange={ handleInputChange }
                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">Información adicional</small>
                </div>

                <button
                    type="submit"
                    className="btn btn-outline-primary btn-block"
                >
                    <i className="far fa-save"></i>
                    <span> Guardar</span>
                </button>

            </form>

        </Modal>
    )
}

/*  isopen , puede manejarla por un use state localmenete , pero el motivo porque voy a usar redux es porque poder manipular el boolean por otra parte 
    desde otro componente disptachando accion , es mas facil sin precupar de pasar porps etc ..
    podemos decir la variable bool no se va manejar localmente se maneja desde ele stado de mi app*/



    /* 
       al seleccionar una nota podra parecer un button de eleminar , para eso necesito comunicacion entre componentes , 
       - puedo usar context propiamente de rect - en este caso usamos redux , context y redux son diferenrtes patrones para manejar el estado de la app
       - al final del dia usamos lo que se acomoda a nuestro necesidaeds
     
    */