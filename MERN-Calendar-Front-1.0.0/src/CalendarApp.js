import React from 'react';
import { Provider } from 'react-redux';

import { store } from './store/store';
import { AppRouter } from './router/AppRouter'

export const CalendarApp = () => {
    return (
        <Provider store={ store }> {/* prover stor de redux */} {/* es un nivel muy alto - incluso aqui empiezan las separacion de routas */}
            <AppRouter />
        </Provider>
    )
}
