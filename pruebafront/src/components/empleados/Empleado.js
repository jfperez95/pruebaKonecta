import React, {useContext} from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import clienteAxios from "../../config/axios";
import { useNavigate } from "react-router-dom";
import { CRMContext } from "../../context/CRMContext";

function Empleado({empleado}){

    const [auth, guardarAuth] = useContext(CRMContext);

    let navigate = useNavigate();

    const {FECHA_INGRESO, NOMBRE, SALARIO, EMAIL, ID} = empleado

    const eliminarCliente = ID => {
        if(auth.token !== ''){
            try {
                Swal.fire({
                    title: "Estas seguro de eliminar al empleado?",
                    text: "No se van a poder reversar los cambios",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Sí, eliminar!"
                  }).then((result) => {
                    if (result.isConfirmed) {
                      clienteAxios.delete(`/empleados/${ID}`, {
                        headers: {
                            Authorization: `Bearer ${auth.token}`
                        }
                      }).then(res=>{
        
                      })
                      Swal.fire({
                        title: "Eliminado!",
                        text: "El registro ha sido eliminado.",
                        icon: "success"
                      });
                    }
                  });
            } catch (error) {
                if(error.response.status === 500){
                    navigate('/iniciar-sesion', {replace:true});
                }
            }
        }
    }
    if(!auth.auth){
        navigate('/iniciar-sesion', {replace:true});
    }
    return(
        <li className="cliente">
            <div className="info-cliente">
                <p className="nombre">{NOMBRE}</p>
                <p className="empresa">Fecha de ingreso: {FECHA_INGRESO}</p>
                <p>Salario: {SALARIO}</p>
                <p>Usuario: {EMAIL}</p>
            </div>
            <div className="acciones">
                <Link to={`/empleados/editar/${ID}`} className="btn btn-azul">
                    <i className="fas fa-pen-alt"></i>
                    Editar Cliente
                </Link>
                <button type="button" className="btn btn-rojo btn-eliminar" onClick={() => eliminarCliente(ID)}>
                    <i className="fas fa-times"></i>
                    Eliminar Cliente
                </button>
            </div>
        </li>
    )
}

export default Empleado;