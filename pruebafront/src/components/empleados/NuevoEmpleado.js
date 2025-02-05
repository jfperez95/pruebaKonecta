import React, { Fragment, useState, useEffect, useContext } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";  
import clienteAxios from '../../config/axios';
import { CRMContext } from "../../context/CRMContext";

function NuevoCliente() {

    const [auth, guardarAuth] = useContext(CRMContext);

    let navigate = useNavigate();
    // Estado para los datos del empleado
    const [empleado, guardarEmpleado] = useState({
        FECHA_INGRESO: '',
        NOMBRE: '',
        SALARIO: '',
        PASSWORD: '',
        ROL_ID: ''
    });

    // Estado para almacenar los roles de la API
    const [roles, setRoles] = useState([]);

    // Cargar los roles desde la API al montar el componente
    useEffect(() => {
        async function obtenerRoles() {
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
        }

        obtenerRoles();
    }, []);

    // Leer los datos del formulario y actualizar el estado
    const actualizarState = e => {
        guardarEmpleado({
            ...empleado,
            [e.target.name]: e.target.value
        });
    };

    // Enviar los datos al backend
    const agregarEmpleado = async e => {
        e.preventDefault();

        try {
            const response = await clienteAxios.post('/empleados', empleado, {
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
              });
            Swal.fire(
                'Se agregó el Empleado',
                response.data.mensaje,
                'success'
            );
            navigate('/', {replace:true});
        } catch (error) {
            Swal.fire(
                'Error',
                'No se pudo agregar el empleado',
                'error'
            );
            navigate('/', {replace:true});
        }
    };

    // Validar formulario
    const validarEmpleado = () => {
        const { FECHA_INGRESO, NOMBRE, SALARIO, ROL_ID, PASSWORD } = empleado;
        return !NOMBRE || !FECHA_INGRESO || !SALARIO || !ROL_ID || !PASSWORD;
    };

    if(!auth.auth){
        navigate('/iniciar-sesion', {replace:true});
    }

    return (
        <Fragment>
            <h1>Nuevo Empleado</h1>

            <form onSubmit={agregarEmpleado}>
                <legend>Llena todos los campos</legend>

                <div className="campo">
                    <label>Nombre:</label>
                    <input type="text" placeholder="Nombre Empleado" name="NOMBRE" onChange={actualizarState} />
                </div>

                <div className="campo">
                    <label>Fecha de Ingreso:</label>
                    <input type="date" name="FECHA_INGRESO" onChange={actualizarState} />
                </div>

                <div className="campo">
                    <label>Salario:</label>
                    <input type="number" placeholder="Salario del Empleado" name="SALARIO" onChange={actualizarState} />
                </div>

                <div className="campo">
                    <label>Contraseña:</label>
                    <input type="password" placeholder="Ingrese una Contraseña" name="PASSWORD" onChange={actualizarState} />
                </div>

                <div className="campo">
                    <label>Rol:</label>
                    <select 
                        name="ROL_ID" 
                        onChange={actualizarState}
                        disabled={roles.length === 0}  // Se desactiva si no hay roles cargados
                    >
                        <option value="" disabled={empleado.ROL_ID !== ""}>-- Seleccione un Rol --</option>
                        {roles.map((rol) => (
                            <option key={rol.ID} value={rol.ID}>{rol.NOMBRE}</option>
                        ))}
                    </select>
                </div>

                <div className="enviar">
                    <input type="submit" className="btn btn-azul" value="Agregar Empleado" disabled={validarEmpleado()} />
                </div>
            </form>
        </Fragment>
    );
}

export default NuevoCliente;