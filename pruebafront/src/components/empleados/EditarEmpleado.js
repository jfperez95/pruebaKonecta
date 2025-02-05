import React, { Fragment, useState, useEffect, useCallback, useContext } from "react";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";  
import clienteAxios from '../../config/axios';
import { CRMContext } from "../../context/CRMContext";

function EditarEmpleado() {

    const [auth, guardarAuth] = useContext(CRMContext);

    let navigate = useNavigate();

    //Obtener el ID
    const {ID} = useParams();

    // Estado para los datos del empleado
    const [empleado, datosEmpleado] = useState({
        FECHA_INGRESO: '',
        NOMBRE: '',
        SALARIO: '',
        ROL_ID: ''
    });

    // Estado para almacenar los roles de la API
    const [roles, setRoles] = useState([]);

    const obtenerRoles = useCallback(async ()=> {
        try {
            const response = await clienteAxios.get('/empleados/roles', {
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
              });
            setRoles(response.data);
        } catch (error) {
            console.error("Error al obtener los roles:", error);
        }
    }, []);

    //Query a la API
    const consultarAPI = useCallback(async () => {
        const empleadoConsulta = await clienteAxios.get(`/empleados/${ID}`, {
            headers: {
                Authorization: `Bearer ${auth.token}`
            }
          });

        datosEmpleado(empleadoConsulta.data);
    }, [ID])

    useEffect(() => {
        try {
            if(auth.token !== ''){
                consultarAPI();
                obtenerRoles();
            }
        } catch (error) {
            if(error.response.status === 500){
                navigate('/iniciar-sesion', {replace:true});
            }
        }
    }, [consultarAPI, obtenerRoles])

    

    // Leer los datos del formulario y actualizar el estado
    const actualizarState = e => {
        datosEmpleado({
            ...empleado,
            [e.target.name]: e.target.value
        });
    };

    const actualizarEmpleado = async e => {
        e.preventDefault();

        if(auth.token !== ''){
            try {
                const response = await clienteAxios.put(`/empleados/${empleado.ID}`, empleado, {
                    headers: {
                        Authorization: `Bearer ${auth.token}`
                    }
                  })
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
            }
            navigate('/', {replace:true});
        }
        
    }

    // Validar formulario
    const validarEmpleado = () => {
        const { FECHA_INGRESO, NOMBRE, SALARIO, ROL_ID } = empleado;
        return !NOMBRE || !FECHA_INGRESO || !SALARIO || !ROL_ID;
    };

    if(!auth.auth){
        navigate('/iniciar-sesion', {replace:true});
    }

    return (
        <Fragment>
            <h1>Editar Empleado</h1>

            <form onSubmit={actualizarEmpleado}>
                <legend>Llena todos los campos</legend>

                <div className="campo">
                    <label>Nombre:</label>
                    <input type="text" placeholder="Nombre Empleado" name="NOMBRE" onChange={actualizarState} value={empleado.NOMBRE} />
                </div>

                <div className="campo">
                    <label>Fecha de Ingreso:</label>
                    <input type="date" name="FECHA_INGRESO" onChange={actualizarState} value={empleado.FECHA_INGRESO} />
                </div>

                <div className="campo">
                    <label>Salario:</label>
                    <input type="number" placeholder="Salario del Empleado" name="SALARIO" onChange={actualizarState} value={empleado.SALARIO}/>
                </div>

                <div className="campo">
                    <label>Rol:</label>
                    <select 
                        name="ROL_ID"
                        onChange={actualizarState}
                        value={empleado.ROL_ID || ""}
                        disabled={roles.length === 0}  
                    >
                        <option value="" disabled>-- Seleccione un Rol --</option>
                        {roles.map((rol) => (
                            <option key={rol.ID} value={rol.ID}>{rol.NOMBRE}</option>
                        ))}
                    </select>
                </div>

                <div className="enviar">
                    <input type="submit" className="btn btn-azul" value="Guardar Empleado" disabled={validarEmpleado()} />
                </div>
            </form>
        </Fragment>
    );
}

export default EditarEmpleado;