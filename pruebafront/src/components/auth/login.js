import React, {useContext, useState} from "react";
import Swal from "sweetalert2/dist/sweetalert2.all.js";
import { useNavigate } from "react-router-dom";
import clienteAxios from "../../config/axios";
import { CRMContext } from "../../context/CRMContext";

function Login(){

    let navigate = useNavigate();

    const [auth, guardarAuth] = useContext(CRMContext);

    const [credenciales, guardarCredenciales] = useState({});

    //Iniciar sesion en el servidor
    const iniciarSesion = async e =>{
        e.preventDefault();
        console.log(credenciales);

        try {
            const respuesta = await clienteAxios.post('/empleados/login', credenciales);
            const {token} = respuesta.data;
            localStorage.setItem('token', token);

            guardarAuth({
                token,
                auth:true
            })

            Swal.fire(
                'Login Correcto',
                'Has iniciado Sesión',
                'success'
            )
            navigate('/', {replace:true});


        } catch (error) {
            console.log(error)
            Swal.fire({
                icon: 'error',
                title: 'Hubo un error',
                text: "Verifique la información ingresada"
            });
            navigate('/', {replace:true});
        }
    }

    const leerDatos = e=>{
        guardarCredenciales({
            ...credenciales,
            [e.target.name] : e.target.value
        })
    }

    return(
        <div>
            <h2>Iniciar Sesión</h2>

            <div className="contenedor-formulario">
                <form onSubmit={iniciarSesion}>

                    <div className="campo">
                        <label>Email</label>
                        <input type="text" name="EMAIL" placeholder="Email para iniciar sesión" required onChange={leerDatos} />
                    </div>

                    <div className="campo">
                        <label>Password</label>
                        <input type="password" name="PASSWORD" placeholder="Password para iniciar sesión" required onChange={leerDatos} />
                    </div>

                    <input type="submit" value="Iniciar Sesión" className="btn btn-verde btn-block" />
                </form>
            </div>
        </div>
    )
}

export default Login;