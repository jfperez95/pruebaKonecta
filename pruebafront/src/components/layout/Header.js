import React, { useContext } from "react";
import { CRMContext } from "../../context/CRMContext";
import { useNavigate } from "react-router-dom";

const Header = ()=>{

    let navigate = useNavigate();

    const [auth, guardarAuth]= useContext(CRMContext);

    const cerrarSesion = () =>{
        guardarAuth({
            token: '',
            auth: false
        });

        localStorage.setItem('token', '');

        navigate('/iniciar-sesion', {replace:true});
    }

    return(
        <header className="barra">
        <div className="contenedor">
            <div className="contenido-barra">
                <h1>Prueba Konecta</h1>

                {auth.auth ? (
                    <button type="button" className="btn btn-rojo" onClick={cerrarSesion}>
                        <i className="far fa-times-circle"></i>
                        Cerrar Sesión
                    </button>
                ): null}
                
            </div>
        </div>
    </header>
    )
}

export default Header