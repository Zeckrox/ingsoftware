"use client";
import * as React from "react";
import { useRouter } from "next/navigation";
import styles from "./registerForm.module.css";
import InputField from "../components/inputfield/inputField";
import Divider from "../components/divider/divider";
import SocialLogin from "../components/boton_google/socialLogin";

export default function RegisterForm() {
  const router = useRouter();
  // Estados de campos
  const [nombre, setNombre] = React.useState("");
  const [apellido, setApellido] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [telefono, setTelefono] = React.useState("");
  const [contraseña, setContraseña] = React.useState("");
  const [confirmContraseña, setConfirmContraseña] = React.useState("");
  const [carrera, setCarrera] = React.useState("");
  const [genero, setGenero] = React.useState("");

  // Estados de errores
  const [passwordError, setPasswordError] = React.useState("");
  const [generalError, setGeneralError] = React.useState("");
  const [telefonoError, setTelefonoError] = React.useState("");
  const [carreraError, setCarreraError] = React.useState("");
  const [generoError, setGeneroError] = React.useState("");
  const [emailFormatError, setEmailFormatError] = React.useState(""); // ¡Asegúrate de tener este estado!

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. Limpiar todos los errores previos al inicio de la validación
    setPasswordError("");
    setGeneralError("");
    setTelefonoError("");
    setCarreraError("");
    setGeneroError("");
    setEmailFormatError(""); // ¡No olvides limpiar este también!

    let hasErrors = false; // Flag para saber si hay algún error

    // 2. Validación de campos vacíos
    if (
      !nombre ||
      !apellido ||
      !email ||
      !telefono ||
      !contraseña ||
      !confirmContraseña ||
      !carrera ||
      !genero
    ) {
      setGeneralError("Por favor, no pueden haber campos vacíos.");
      hasErrors = true; // Solo marcamos que hay un error, no retornamos
    }

    // 3. Validación de contraseñas
    if (contraseña !== confirmContraseña) {
      setPasswordError("Las contraseñas no coinciden.");
      hasErrors = true; // Solo marcamos que hay un error
    }

    // 4. Validación de email (permite probar @gmail.com y ver el error)
    const emailRegex = /^[a-zA-Z0-9._-]+@(correo\.)?unimet\.edu\.ve$/;
    if (!emailRegex.test(email)) {
      setEmailFormatError(
        "El correo debe ser de @unimet.edu.ve o @correo.unimet.edu.ve"
      );
      hasErrors = true; // Solo marcamos que hay un error
    }

    // 5. Validación de teléfono (11 números y solo dígitos)
    const telefonoRegex = /^\d{11}$/;
    if (!telefonoRegex.test(telefono)) {
      setTelefonoError("El número de teléfono debe tener 11 dígitos numéricos.");
      hasErrors = true; // Solo marcamos que hay un error
    }

    // 6. Validación de carrera
    if (!carrera) {
      setCarreraError("Por favor, selecciona tu carrera.");
      hasErrors = true; // Solo marcamos que hay un error
    }

    // 7. Validación de género
    if (!genero) {
      setGeneroError("Por favor, selecciona tu género.");
      hasErrors = true; // Solo marcamos que hay un error
    }

    // 8. Si hay algún error después de todas las validaciones, detener el proceso de envío
    if (hasErrors) {
      return; // Ahora sí, retornamos si se encontró CUALQUIER error
    }

    // Si todas las validaciones pasan (hasErrors es false), puedes proceder con el registro
    console.log("Formulario válido, procediendo con el registro...");
    // Aquí iría tu lógica para enviar los datos al servidor
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
          value={contraseña}
          onChange={(e) => setContraseña(e.target.value)}
        />
        <InputField
          label="Confirma tu contraseña"
          type="password"
          placeholder="xxxxxxxx"
          showPasswordToggle
          value={confirmContraseña}
          onChange={(e) => setConfirmContraseña(e.target.value)}
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

      {/* Mostrar errores justo antes del botón */}
      {generalError && <p className={styles.errorText}>{generalError}</p>}
      {passwordError && <p className={styles.errorText}>{passwordError}</p>}
      {telefonoError && <p className={styles.errorText}>{telefonoError}</p>}
      {carreraError && <p className={styles.errorText}>{carreraError}</p>}
      {generoError && <p className={styles.errorText}>{generoError}</p>}
      {emailFormatError && <p className={styles.errorText}>{emailFormatError}</p>} {/* Nuevo error para el formato de email */}

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