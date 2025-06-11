"use client"
import * as React from "react";
import { useRouter } from "next/navigation";
import styles from "./loginform.module.css";
import InputField from "../../components/ui/InputField/inputField";
import { useMutation } from "@tanstack/react-query"; 


export default function LoginForm() {
  const router = useRouter(); 

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [generalError, setGeneralError] = React.useState("");

  const loginMutation = useMutation({
    mutationFn: async () => {
      let url = "https://backendsoftware-production-c177.up.railway.app/auth/login"
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }), //envia el email y contrasena
      });

      if (!res.ok) {
        throw new Error("error al iniciar sesión");
      }
      return res.json(); //devuelve la respuesta en formato JSON

    },
    onSuccess: (data) => {
      console.log("Token recibido:", data.access_token); //token recibido
      localStorage.setItem("token", data.access_token);  //se guarda token en local storage
      router.push("/profile"); //ARREGLAR QUE SE REDIRIGA A MAINPAGE
    },
    onError: (error) => {
      console.error("Fallo el login:", error);
      setGeneralError("Correo o contraseña incorrectos. Por favor, inténtalo de nuevo.");
    },
  });
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // console.log("Form submitted!");
    loginMutation.mutate(); //ejecuto la mutation
  };

  const handleRegisterClick = () => {
    router.push('/register'); 
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h1 className={styles.title}>Inicia sesión en tu cuenta</h1>

      <InputField
        label="Email"
        type="email"
        placeholder="info@unimet.edu.ve"
        value={email} 
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} 
      />

      <InputField
        label="Contraseña"
        type="password"
        placeholder="Ingresa tu contraseña"
        showPasswordToggle
        value={password}                             
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
      />

      {generalError && <p className={styles.errorText}>{generalError}</p>}
      
      <button type="submit" className={styles.submitButton} disabled={loginMutation.isPending}>
        {loginMutation.isPending ? "Cargando..." : "Inicia sesión"} 
      </button>

      <footer className={styles.footer}>
        <p className={styles.registerText}>
          ¿Aún no tienes una cuenta?
          <button
            type="button" 
            className={styles.registerLink}
            onClick={handleRegisterClick} 
          >
          Registrate
          </button>
        </p>
      </footer>
    </form>
  );
}
