import React, {useContext} from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import clienteAxios from "../../config/axios";
import { useNavigate } from "react-router-dom";
import { CRMContext } from "../../context/CRMContext";

function Solicitud({solicitud}){

    const [auth, guardarAuth] = useContext(CRMContext);

    let navigate = useNavigate();

    const {CODIGO, DESCRIPCION, RESUMEN, NOMBRE, ID} = solicitud

    const eliminarCliente = ID => {
        if(auth.token !== ''){
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
                  clienteAxios.delete(`/solicitudes/${ID}`, {
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
        }
    }
    if(!auth.auth){
        navigate('/iniciar-sesion', {replace:true});
    }
    return(
        <li className="cliente">
            <div className="info-cliente">
                <p className="nombre">{DESCRIPCION}</p>
                <p className="empresa">Resumen: {RESUMEN}</p>
                <p>Empleado: {NOMBRE}</p>
                <p>Codigo: {CODIGO}</p>
            </div>
            <div className="acciones">
                <Link to={`/solicitudes/editar/${ID}`} className="btn btn-azul">
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

export default Solicitud;