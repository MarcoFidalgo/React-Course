import React from 'react';

const authContext = React.createContext({
    authenticated: false,
    login: () => { }//função anónima vazia. 

});


export default authContext;