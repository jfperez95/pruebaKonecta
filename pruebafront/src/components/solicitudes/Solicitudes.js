import React, {useEffect, useState, Fragment, useContext} from "react";
import { Link } from "react-router-dom";
import clienteAxios from '../../config/axios'
import Solicitud from "./Solicitud";
import { useNavigate } from "react-router-dom";
import { CRMContext } from "../../context/CRMContext";

function Solicitudes(){

    let navigate = useNavigate();

    const [auth, guardarAuth] = useContext(CRMContext);

    const [solicitudes, guardarSolicitudes] = useState([]);

    const consultarApi = async () =>{
        const solicitudesConsulta = await clienteAxios.get('/solicitudes', {
            headers: {
                Authorization: `Bearer ${auth.token}`
            }
          });

        guardarSolicitudes(solicitudesConsulta.data);
    }

    useEffect(()=>{
        if(auth.token !== ''){
            try {
                consultarApi();
            } catch (error) {
                if(error.response.status === 500){
                    navigate('/iniciar-sesion', {replace:true});
                }
            }            
        }else{
            navigate('/iniciar-sesion', {replace:true});
        }   
    }, [solicitudes])

    if(!auth.auth){
        navigate('/iniciar-sesion', {replace:true});
    }

    return(
        <Fragment>
            <h2>Solicitudes</h2>

            <Link to={"/solicitudes/nuevo"} className="btn btn-verde nvo-cliente"> <i className="fas fa-plus-circle"></i>
                Nueva Solicitud
            </Link>

            <ul className="listado-clientes">
                {solicitudes.map(solicitud => (
                    <Solicitud key={solicitud.ID} solicitud={solicitud} />
                ))}
            </ul>
        </Fragment>
    )
}

export default Solicitudes