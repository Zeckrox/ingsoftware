"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import styles from "./registerForm.module.css";
import InputField from "../../components/ui/InputField/inputField";
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

  // SE COMENTÓ PARA PODER HACER DEPLOY

  // Estados de errores
  const [passwordError, setPasswordError] = React.useState("");
  const [generalError, setGeneralError] = React.useState("");
  const [telefonoError, setTelefonoError] = React.useState("");
  const [carreraError, setCarreraError] = React.useState("");
  const [generoError, setGeneroError] = React.useState("");
  const [emailFormatError, setEmailFormatError] = React.useState("");

  const registerMutation = useMutation({
    mutationFn: async () => {
       if (password !== confirmPassword) {
        throw new Error("Las contraseñas no coinciden");
      }
      // let url = "https://backendsoftware.vercel.app/users/create"
      let url = `${process.env.NEXT_PUBLIC_API_ROOT_URL}users/create`
      const res = await fetch(url, {  
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: nombre,
          lastName: apellido,
          email,
          phoneNumber: telefono,
          password,
          career: "Administrador",
          gender: genero,
          role: "admin",
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
      // router.push("/login");  // redirige al login despues de registrarse
    },
    onError: (error: Error) => {
      console.error("Error en registro:", error);
      setGeneralError("Error al registrarse desde el servidor.");
    },
  });


  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    
    setPasswordError("");
    setGeneralError("");
    setTelefonoError("");
    setCarreraError("");
    setGeneroError("");
    setEmailFormatError("");

    let hasErrors = false;

    // Validación de campos vacíos
    if (
      !nombre ||
      !apellido ||
      !email ||
      !telefono ||
      !password ||
      !confirmPassword ||
      !genero
    ) {
      setGeneralError("Por favor, no pueden haber campos vacíos.");
      hasErrors = true;
    } else { 

      // Validación de contraseñas
      if (password !== confirmPassword) {
        setPasswordError("Las contraseñas no coinciden.");
        hasErrors = true;
      }

      // Validación de email
      const emailRegex = /^[a-zA-Z0-9._-]+@(correo\.)?unimet\.edu\.ve$/;
      if (!emailRegex.test(email)) {
        setEmailFormatError("El correo debe ser de @unimet.edu.ve o @correo.unimet.edu.ve");
        hasErrors = true;
      }

      // Validación de teléfono
      const telefonoRegex = /^\d{11}$/;
      if (!telefonoRegex.test(telefono)) {
        setTelefonoError("El número de teléfono debe tener 11 dígitos numéricos.");
        hasErrors = true;
      }


      // Validación de género
      if (!genero) {
        setGeneroError("Por favor, selecciona tu género.");
        hasErrors = true;
      }
    }

    // Si hay errores, detener el envío
    if (hasErrors) {
      console.log("Errores de validación en el formulario.");
      return;
    }

    // Si todo está bien, proceder con la mutación
    console.log("Formulario válido, procediendo con el registro...");
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
          label="Género"
          type="select"
          placeholder="Selecciona tu género"
          options={["Mujer", "Hombre", "Otro"]}
          value={genero}
          onChange={(e) => setGenero(e.target.value)}
        />
      </div>

      {/* Mostrar errores justo antes del botón */}
      {generalError && <p className={styles.errorText}>{generalError}</p>}
      {passwordError && <p className={styles.errorText}>{passwordError}</p>}
      {telefonoError && <p className={styles.errorText}>{telefonoError}</p>}
      {carreraError && <p className={styles.errorText}>{carreraError}</p>}
      {generoError && <p className={styles.errorText}>{generoError}</p>}
      {emailFormatError && <p className={styles.errorText}>{emailFormatError}</p>} 


      <button type="submit" className={styles.submitButton} disabled={registerMutation.isPending}>
        {registerMutation.isPending ? "Registrando..." : "Registrarme"}
      </button>

    </form>
  );
}