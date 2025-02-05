import React, { Fragment, useState, useEffect, useContext } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";  
import clienteAxios from '../../config/axios';
import { CRMContext } from "../../context/CRMContext";

function NuevaSolicitud() {

    const [auth, guardarAuth] = useContext(CRMContext);

    let navigate = useNavigate();
    
    // Estado para los datos de la solicitud
    const [soicitud, guardarSolicitud] = useState({
        CODIGO: '',
        DESCRIPCION: '',
        RESUMEN: '',
        ID_EMPLEADO: ''
    });

    // Estado para almacenar los empleados
    const [empleados, setEmpleados] = useState([]);

    // Cargar los empleados desde la API al montar el componente
    useEffect(() => {
        async function obtenerEmpleados() {
            try {
                const respuesta = await clienteAxios.get('/empleados', {
                    headers: {
                    Authorization: `Bearer ${auth.token}`
                }
              });
                setEmpleados(respuesta.data);
            } catch (error) {
                console.error("Error al obtener los empleados:", error);
            }
        }

        obtenerEmpleados();
    }, []);

    // Monitorear cambios en el estado
    useEffect(() => {
        console.log("Estado actualizado:", soicitud);
    }, [soicitud]);

    // Leer los datos del formulario y actualizar el estado
    const actualizarState = (e) => {
        guardarSolicitud({
            ...soicitud,
            [e.target.name]: e.target.value
        });

        console.log("Nuevo estado antes de actualizar:", e.target.name, e.target.value);
    };

    // Enviar los datos al backend
    const agregarSolicitud = async e => {
        e.preventDefault();

        try {
            const response = await clienteAxios.post('/solicitudes', soicitud, {
                headers: {
                Authorization: `Bearer ${auth.token}`
            }
          });
            Swal.fire(
                'Se agregó la solicitud',
                response.data.mensaje,
                'success'
            );
            navigate('/', {replace:true});
        } catch (error) {
            Swal.fire(
                'Error',
                'No se pudo agregar la solicitud',
                'error'
            );
            console.log(error);
            navigate('/', {replace:true});
        }
    };

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
            <h1>Nueva Solicitud</h1>

            <form onSubmit={agregarSolicitud}>
                <legend>Llena todos los campos</legend>

                <div className="campo">
                    <label>Codigo:</label>
                    <input type="text" placeholder="Codigo" name="CODIGO" onChange={actualizarState} value={soicitud.CODIGO || ""}/>
                </div>

                <div className="campo">
                    <label>Descripcion:</label>
                    <input type="text" placeholder="Descripcion" name="DESCRIPCION" onChange={actualizarState} value={soicitud.DESCRIPCION || ""}/>
                </div>

                <div className="campo">
                    <label>Resumen:</label>
                    <input type="text" placeholder="Resumen" name="RESUMEN" onChange={actualizarState} value={soicitud.RESUMEN || ""}/>
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
                    <input type="submit" className="btn btn-azul" value="Agregar Solicitud" disabled={validarSolicitud()} />
                </div>
            </form>
        </Fragment>
    );
}

export default NuevaSolicitud;