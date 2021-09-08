import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk' //para aplicar mdlr para funciones asyncronas

import { rootReducer } from '../reducers/rootReducer';


const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

export const store = createStore(
    rootReducer,  // exporta state generados por reducers
    composeEnhancers(
        applyMiddleware( thunk )
    ) // applicar herramienta de dev del nav y los mdlrs thunk - para ejecucion de tareas de asynronas
);
// despues de crear el store necesito proverlo al arbol del componentes del app , paraque cualquier componente podra obtener estados y dispatacha acciones 



