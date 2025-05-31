'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './editForm.module.css';

type ProfileData = {
  nombre: string;
  apellido: string;
  carrera: string;
  telefono: string;
  genero: string;
};

export default function EditProfilePage() {
  const router = useRouter();
  const [formData, setFormData] = useState<ProfileData>({
    nombre: '',
    apellido: '',
    carrera: 'Ing. Sistemas',
    telefono: '',
    genero: 'Mujer'
  });

  const carrerasDisponibles = ['Ing. Sistemas', 'Ing. Electrica', 'Ing. Quimica'];

  useEffect(() => {
    const savedData = localStorage.getItem('profileData');
    if (savedData) setFormData(JSON.parse(savedData));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === 'nombre' || name === 'apellido') {
      if (value.length <= 15) setFormData(prev => ({ ...prev, [name]: value }));
    } else if (name === 'telefono') {
      if (/^\d{0,11}$/.test(value.replace('+', ''))) setFormData(prev => ({ ...prev, [name]: value }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('profileData', JSON.stringify(formData));
    router.push('/profile');
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
              placeholder="Ej: Luis"
              maxLength={15}
              required
            />
            <span className={styles.charCount}>{formData.nombre.length}/15</span>
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
            <span className={styles.charCount}>{formData.apellido.length}/15</span>
          </div>
        </div>

        {/* Fila 2: Carrera + Teléfono */}
        <div className={styles.formRow}>
          <div className={styles.formGroup}>
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