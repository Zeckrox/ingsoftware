'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from "../../../../components/styles/Profile/editForm.module.css";
import { useUser } from '@/context/userContext';
import { useMutation } from '@tanstack/react-query';

type ProfileData = {
  nombre: string;
  apellido: string;
  carrera: string;
  telefono: string;
  genero: string;
};


export default function EditProfilePage() {
  const router = useRouter();
  const { user, isLoadingUser } = useUser();

  
  if (!user || !user.role) {
    // router.push("/login"); // Podrías redirigir al login si no hay usuario
    return <div>Usuario no autenticado o rol no definido.</div>;
  }

  const isStudent = user.role === 'student';


  const updateUser = useMutation({
    mutationFn: async () => {

      const res = await fetch(`https://backendsoftware.vercel.app/users/${user?._id}`, {  
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: formData.nombre,
          lastName: formData.apellido,
          // telefono,
          career: formData.carrera,
          // genero,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Error al editar perfil");
      }

      return res.json();
    },
    onSuccess: (data) => {
      console.log("Cambio exitoso:", data);
      alert("Cambiado con exito");
      router.push("/profile"); 
    },
    onError: (error: any) => {
      console.error("Error en editar perfil:", error);
      alert(error.message || "Error al editar perfil");
    },
  });

  const patchMutation = useMutation({
    mutationFn: async () => {
      let url = `https://backendsoftware.vercel.app/users/${user?._id}`
      const res = await fetch(url, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: formData.nombre,
          lastName: formData.apellido,
          career: formData.carrera
          // TO DO: AUN NO GUARDAMOS EN BACK EL TELEFONO
          // TO DO: AUN NO GUARDAMOS EN BACK EL GENERO
          }),
      });

      if (!res.ok) {
        throw new Error("Error al editar la información");
      }
      return res.json(); //devuelve la respuesta en formato JSON
    },
    onSuccess: (data) => {
      // Aquí utilice la forma nativa de JavaScript en vez del router de Next.js porque necesito que se recargue... 
      // ...la pagina para mostrar la información cambiada. Si encuentro una forma de hacerlo con router lo arreglo!
      window.location.href = "/profile";
    },
    onError: (error) => {
      console.error("Fallo el editar perfil:", error);
    },
  });

  const carrerasDisponibles = ["Ingeniería de Sistemas",
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
            "Derecho"];

  useEffect(() => {
    const savedData = localStorage.getItem('profileData');
    if (savedData) setFormData(JSON.parse(savedData));
  }, []);

  const [formData, setFormData] = useState<ProfileData>({
    nombre: user?.firstName || '', 
    apellido: user?.lastName || '',
    carrera: user?.career || '',
    telefono: '',
    genero: 'Mujer'
  });

    useEffect(()=>{
      if (user) {
        setFormData({nombre: user?.firstName, 
    apellido: user?.lastName,
    telefono: '',
    carrera: user?.career,
  genero: 'Mujer'})
      }
    }, [user])
  
    if (isLoadingUser || !user) {
      return <div>Cargando...</div>;
    }

    console.log(user._id)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === 'nombre' || name === 'apellido') {
      if (value?.length <= 15) setFormData(prev => ({ ...prev, [name]: value }));
    } else if (name === 'telefono') {
      if (/^\d{0,11}$/.test(value.replace('+', ''))) setFormData(prev => ({ ...prev, [name]: value }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser.mutate();
    localStorage.setItem('profileData', JSON.stringify(formData));
    // patchMutation.mutate()
  };

  return (
    <div className={styles.editContainer}>
      <h1 className={styles.editTitle}>Editar Perfil</h1>
      
      <form onSubmit={handleSubmit} className={styles.editForm}>
        {/* Fila 1: Nombre + Apellido */}
        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label htmlFor="nombre">Nombre</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre}  
              onChange={handleChange}
              placeholder={"Ej: Luis"}
              maxLength={15}
              required
            />
            <span className={styles.charCount}>{formData.nombre?.length}/15</span>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="apellido">Apellido</label>
            <input
              type="text"
              id="apellido"
              name="apellido"
              value={formData.apellido} 
              onChange={handleChange}
              placeholder="Ej: Arrieta"
              maxLength={15}
              required
            />
            <span className={styles.charCount}>{formData.apellido?.length}/15</span>
          </div>
        </div>

        {/* Fila 2: Carrera + Teléfono */}
        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            {isStudent && (
            <>
            <label htmlFor="carrera">Carrera</label>
            <select
              id="carrera"
              name="carrera"
              value={formData.carrera}
              onChange={handleChange}
              required
            >
              {carrerasDisponibles.map((carrera) => (
                <option key={carrera} value={carrera}>{carrera}</option>
              ))}
            </select>
            </>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="telefono">Teléfono</label>
            <input
              type="tel"
              id="telefono"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              placeholder="Ej: 04142772983"
              pattern="[+]?\d{0,11}"
              required
            />
            <span className={styles.hint}>Máx. 11 dígitos</span>
          </div>
        </div>

        {/* Fila 3: Género (centrado) */}
        <div className={styles.formGroup}>
          <label>Género</label>
          <div className={styles.radioGroup}>
            <label>
              <input
                type="radio"
                name="genero"
                value="Hombre"
                checked={formData.genero === 'Hombre'}
                onChange={handleChange}
              />
              Hombre
            </label>
            <label>
              <input
                type="radio"
                name="genero"
                value="Mujer"
                checked={formData.genero === 'Mujer'}
                onChange={handleChange}
              />
              Mujer
            </label>
            <label>
              <input
                type="radio"
                name="genero"
                value="Otro"
                checked={formData.genero === 'Otro'}
                onChange={handleChange}
              />
              Otro
            </label>
          </div>
        </div>

        <div className={styles.buttonGroup}>
          <button type="submit" className={styles.saveButton}>Aplicar Cambios</button>
          <button 
            type="button" 
            className={styles.cancelButton}
            onClick={() => router.push('/profile')}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}