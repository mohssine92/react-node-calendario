
export const types = {
   
    // [ui] esta relacionado a la interfaz del user
    uiOpenModal: '[ui] Open modal',
    uiCloseModal: '[ui] Close modal',

    // eventos del calendario 
    evetStartAddNew: '[event] Start add new',
    eventSetActive: '[event] Set Active',
    eventLogout: '[event] Logout event',
    eventAddNew: '[event] Add new',
    eventClearActiveEvent: '[event] Clear active event',
    eventUpdated: '[event] Event updated',
    eventDeleted: '[event] Event deleted',
    eventLoaded: '[event] Events loaded',

    // tipes que voy a estar usando en la parte de autenticacion 
    authCheckingFinish: '[auth] Finish checking login state',
    authStartLogin: '[auth] Start login',
    authLogin: '[auth] Login',
    authStartRegister: '[auth] Start Register',
    authStartStartTokenRenew: '[auth] Start token renew',
    authLogout: '[auth] Logout',


} //recuerda que es solo un objeto donde tenemos centralizados todos los tipos de mis acciones