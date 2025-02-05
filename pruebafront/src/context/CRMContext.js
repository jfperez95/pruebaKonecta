import React, {useState} from "react";

const CRMContext = React.createContext([{}, () =>{}])

const CRMProvider = props=>{
    const [auth, guardarToken] = useState({
        token: '',
        auth:false
    });

    return(
        <CRMContext.Provider value={[auth, guardarToken]}>
            {props.children}
        </CRMContext.Provider>
    )
}

export {CRMContext, CRMProvider}