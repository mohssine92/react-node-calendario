import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    BrowserRouter as Router,
    Switch,
   /*  Route, */
    Redirect
} from 'react-router-dom';
import { startChecking } from '../actions/auth';

import { LoginScreen } from '../components/auth/LoginScreen';
import { CalendarScreen } from '../components/calendar/CalendarScreen';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

export const AppRouter = () => {

    const dispatch = useDispatch();
    const { checking, uid } = useSelector( state => state.auth); // obtener data del store
    
    //console.log(checking)

    useEffect(() => {

      dispatch( startChecking() ); 
       
    }, [dispatch])

    if ( checking ) {
        return (<h5>Espere...</h5>);
    }



     // uid en caso no hay autenticaccion es null - en caso de autenticacion es id strinng
     // asi usamos !!uid : convierte algo existe en true , null en false
     //console.log(!!uid)

    return (
        <Router> {/* solo rutas principal */}
        <div>
            <Switch>
                       {/* uid pude ser si no hay auenticacion no existe - si hay autenticacion es un string */}
                <PublicRoute  
                    exact 
                    path="/login" 
                    component={ LoginScreen }
                    isAuthenticated={ !!uid } 
                />

                <PrivateRoute
                    exact 
                    path="/" 
                    component={ CalendarScreen } 
                    isAuthenticated={ !!uid }
                />

                <Redirect to="/" />   
            </Switch>
        </div>
    </Router>
    )

    
}
  // si borro uid del store me saca de la route private - porque se esta dependiende del store  - cualquier cambio en el store dara cuenta 