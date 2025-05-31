"use client";
import * as React from "react";
import { useRouter } from "next/navigation";
import styles from "./registerForm.module.css";
import InputField from "../components/inputfield/inputField";
import Divider from "../components/divider/divider";
import SocialLogin from "../components/boton_google/socialLogin";


export default function RegisterForm() {
  const router = useRouter(); 

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted!");
  };

  const handleRegisterClick = () => {
    router.push('/login'); 
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h1 className={styles.title}>Registra tu cuenta</h1>

      <div className={styles.row}>
        <InputField
          label="Nombre"
          type="text"
          placeholder="Ingrese tu nombre"
        />
        <InputField
          label="Apellido"
          type="text"
          placeholder="Ingrese tu apellido"
        />
      </div>

      <div className={styles.row}>
        <InputField
          label="Email (Institucional)"
          type="email"
          placeholder="info@unimet.edu.ve"
        />
        <InputField
          label="Número de teléfono"
          type="text"
          placeholder="0412 1234567"
        />
      </div>

      <div className={styles.row}>
        <InputField
          label="Contraseña"
          type="password"
          placeholder="xxxxxxxx"
          showPasswordToggle
        />
        <InputField
          label="Confirma tu contraseña"
          type="password"
          placeholder="xxxxxxxx"
          showPasswordToggle
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
            "Comunicación Social",  
            "Estudios Liberales",
            "Derecho",
            "Estudios Internacionales",
        ]}
        />

        <InputField
        label="Género"
        type="select"
        placeholder="Selecciona tu género"
        options={["Mujer", "Hombre", "Otro"]}
        />
      </div>

      <button type="submit" className={styles.submitButton}>
        Registrarme
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