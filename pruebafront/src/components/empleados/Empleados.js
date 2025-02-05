import React, {useEffect, useState, Fragment, useContext} from "react";
import { Link } from "react-router-dom";
import clienteAxios from '../../config/axios'
import Empleado from "./Empleado";
import { useNavigate } from "react-router-dom";
import { CRMContext } from "../../context/CRMContext";

function Empleados(){

    let navigate = useNavigate();

    const [empleados, guardarEmpleados] = useState([]);

    const [auth, guardarAuth] = useContext(CRMContext);

    const consultarApi = async () =>{
        const empleadosConsulta = await clienteAxios.get('/empleados', {
            headers:{
                Authorization: `Bearer ${auth.token}`
            }
        });

        guardarEmpleados(empleadosConsulta.data);
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
    }, [empleados])

    if(!auth.auth){
        navigate('/iniciar-sesion', {replace:true});
    }

    return(
        <Fragment>
            <h2>Empleados</h2>

            <Link to={"/empleados/nuevo"} className="btn btn-verde nvo-cliente"> <i className="fas fa-plus-circle"></i>
                Nuevo Empleado
            </Link>

            <ul className="listado-clientes">
                {empleados.map(empleado => (
                    <Empleado key={empleado.ID} empleado={empleado} />
                ))}
            </ul>
        </Fragment>
    )
}

export default Empleados