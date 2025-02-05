import React, { Fragment, useState, useEffect, useCallback, useContext } from "react";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";  
import clienteAxios from '../../config/axios';
import { CRMContext } from "../../context/CRMContext";

function EditarSolicitud() {

    const [auth, guardarAuth] = useContext(CRMContext);

    let navigate = useNavigate();

    //Obtener el ID
    const {ID} = useParams();

    // Estado para los datos de la solicitud
    const [soicitud, guardarSolicitud] = useState({
            CODIGO: '',
            DESCRIPCION: '',
            RESUMEN: '',
            ID_EMPLEADO: ''
        });

    // Estado para almacenar los empleados
        const [empleados, setEmpleados] = useState([]);

    const obtenerEmpleados = useCallback(async ()=> {
        try {
            const response = await clienteAxios.get('/empleados', {
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
              });
            setEmpleados(response.data);
        } catch (error) {
            console.error("Error al obtener los empleados:", error);
        }
    }, []);

    //Query a la API
    const consultarAPI = useCallback(async () => {
        const solicitudConsulta = await clienteAxios.get(`/solicitudes/${ID}`, {
            headers: {
                Authorization: `Bearer ${auth.token}`
            }
          });

        guardarSolicitud(solicitudConsulta.data);
    }, [ID])

    useEffect(() => {
        try {
            if(auth.token !== ''){
                consultarAPI();
                obtenerEmpleados();
            }
        } catch (error) {
            if(error.response.status === 500){
                navigate('/iniciar-sesion', {replace:true});
            }
        }
    }, [consultarAPI, obtenerEmpleados])

    

    // Leer los datos del formulario y actualizar el estado
    const actualizarState = e => {
        guardarSolicitud({
            ...soicitud,
            [e.target.name]: e.target.value
        });
    };

    const actualizarSolicitud = async e => {
        e.preventDefault();

        if(auth.token !== ''){
            try {
                const response = await clienteAxios.put(`/solicitudes/${soicitud.ID}`, soicitud, {
                    headers: {
                        Authorization: `Bearer ${auth.token}`
                    }
                  })
                console.log(response)
                Swal.fire(
                    'Se actualizó el Empleado',
                    response.data.mensaje,
                    'success'
                );
                navigate('/', {replace:true});
            } catch (error) {
                Swal.fire(
                    'Error',
                    'No se pudo actualizar el empleado',
                    'error'
                );
                navigate('/', {replace:true});
            }
        }
        
    }

    // Validar formulario
    const validarSolicitud = () => {
        const { CODIGO, DESCRIPCION, RESUMEN, ID_EMPLEADO } = soicitud;
        return !CODIGO || !DESCRIPCION || !RESUMEN || !ID_EMPLEADO;
    };

    if(!auth.auth){
        navigate('/iniciar-sesion', {replace:true});
    }

    return (
        <Fragment>
            <h1>Editar Empleado</h1>

            <form onSubmit={actualizarSolicitud}>
                <legend>Llena todos los campos</legend>

                <div className="campo">
                    <label>Codigo:</label>
                    <input type="text" placeholder="Codigo" name="CODIGO" onChange={actualizarState} value={soicitud.CODIGO}/>
                </div>

                <div className="campo">
                    <label>Descripcion:</label>
                    <input type="text" placeholder="Descripcion" name="DESCRIPCION" onChange={actualizarState} value={soicitud.DESCRIPCION}/>
                </div>

                <div className="campo">
                    <label>Resumen:</label>
                    <input type="text" placeholder="Resumen" name="RESUMEN" onChange={actualizarState} value={soicitud.RESUMEN}/>
                </div>

                <div className="campo">
                    <label>Empleado:</label>
                    <select 
                        name="ID_EMPLEADO" 
                        onChange={actualizarState}
                        value={soicitud.ID_EMPLEADO || ""}
                    >
                        <option value="" disabled>-- Seleccione un Empleado --</option>
                        {empleados.map((empleado) => (
                            <option key={empleado.ID} value={empleado.ID}>{empleado.NOMBRE}</option>
                        ))}
                    </select>
                </div>

                <div className="enviar">
                    <input type="submit" className="btn btn-azul" value="Actualizar solicitud" disabled={validarSolicitud()} />
                </div>
            </form>
        </Fragment>
    );
}

export default EditarSolicitud;