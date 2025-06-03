"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import styles from "./registerForm.module.css";
import InputField from "../components/inputfield/inputField";
import Divider from "../components/divider/divider";
import SocialLogin from "../components/boton_google/socialLogin";
import { useMutation } from "@tanstack/react-query"; 

export default function RegisterForm() {
  const router = useRouter(); 
  
   const [nombre, setNombre] = React.useState("");           
  const [apellido, setApellido] = React.useState("");       
  const [email, setEmail] = React.useState("");             
  const [telefono, setTelefono] = React.useState("");       
  const [password, setPassword] = React.useState("");       
  const [confirmPassword, setConfirmPassword] = React.useState(""); 
  const [carrera, setCarrera] = React.useState("");         
  const [genero, setGenero] = React.useState("");

  const registerMutation = useMutation({
    mutationFn: async () => {
       if (password !== confirmPassword) {
        throw new Error("Las contraseñas no coinciden");
      }

      const res = await fetch("http://localhost:3000/users/create", {  
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: nombre,
          lastName: apellido,
          email,
          // telefono,
          password,
          career: carrera,
          // genero,
          role: "student",
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Error al registrarse");
      }

      return res.json();
    },
    onSuccess: (data) => {
      console.log("Registro exitoso:", data);
      alert("Registro exitoso, ahora inicia sesión");
      router.push("/login");  // redirige al login despues de registrarse
    },
    onError: (error: Error) => {
      console.error("Error en registro:", error);
      alert(error.message || "Error al registrarse");
    },
  });


  // SE COMENTÓ PARA PODER HACER DEPLOY

  // Estados de errores
  // const [passwordError, setPasswordError] = React.useState("");
  // const [generalError, setGeneralError] = React.useState("");
  // const [telefonoError, setTelefonoError] = React.useState("");
  // const [carreraError, setCarreraError] = React.useState("");
  // const [generoError, setGeneroError] = React.useState("");
  // const [emailFormatError, setEmailFormatError] = React.useState(""); // ¡Asegúrate de tener este estado!

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    console.log("Form submitted!");
    registerMutation.mutate(); 
  };

  const handleRegisterClick = () => {
    router.push("/login");
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h1 className={styles.title}>Registra tu cuenta</h1>

      <div className={styles.row}>
        <InputField
          label="Nombre"
          type="text"
          placeholder="Ingrese tu nombre"
           value={nombre}                          
          onChange={(e) => setNombre(e.target.value)}  
        />
        <InputField
          label="Apellido"
          type="text"
          placeholder="Ingrese tu apellido"
          value={apellido}                        
          onChange={(e) => setApellido(e.target.value)}
        />
      </div>

      <div className={styles.row}>
        <InputField
          label="Email (Institucional)"
          type="email"
          placeholder="info@unimet.edu.ve"
          value={email}                         
          onChange={(e) => setEmail(e.target.value)}
        />
        <InputField
          label="Número de teléfono"
          type="text"
          placeholder="0412 1234567"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
        />
      </div>

      <div className={styles.row}>
        <InputField
          label="Contraseña"
          type="password"
          placeholder="xxxxxxxx"
          showPasswordToggle
          value={password}                     
          onChange={(e) => setPassword(e.target.value)}  
        />
        <InputField
          label="Confirma tu contraseña"
          type="password"
          placeholder="xxxxxxxx"
          showPasswordToggle
          value={confirmPassword}             
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>

      <div className={styles.row}>
        <InputField
          label="Carrera"
          type="select"
          placeholder="Selecciona tu carrera"
          options={[
            "Ingeniería de Sistemas",
            "Ingeniería Producción",
            "Ingeniería Civil",
            "Ingeniería Mecánica",
            "Ingeniería Eléctrica",
            "Ingeniería Química",
            "Ciencias Administrativas",
            "Economía Empresarial",
            "Contaduria Pública",
            "Psicología",    
            "Matemáticas Industriales",  
            "Educación",    
            "Idiomas Modernos", 
            "Estudios Liberales",
            "Derecho",
        ]}
        value={carrera}                     
        onChange={(e) => setCarrera(e.target.value)}
        />

        <InputField
          label="Género"
          type="select"
          placeholder="Selecciona tu género"
          options={["Mujer", "Hombre", "Otro"]}
          value={genero}
          onChange={(e) => setGenero(e.target.value)}
        />
      </div>

      <button type="submit" className={styles.submitButton} disabled={registerMutation.isPending}>
        {registerMutation.isPending ? "Registrando..." : "Registrarme"}
      </button>

      <Divider />
      <SocialLogin />

      <footer className={styles.footer}>
        <p className={styles.registerText}>
          ¿Ya tienes una cuenta?
          <button
            type="button"
            className={styles.registerLink}
            onClick={handleRegisterClick}
          >
            Inicia sesión
          </button>
        </p>
      </footer>
    </form>
  );
}