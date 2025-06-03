import React from 'react';
import styles from './aboutus.module.css';
import Image from 'next/image';

export default function AboutUs() {
  return (
    <section className={styles.aboutSection}>
      <div className={styles.container}>
        <h2 className={styles.titulo}><strong>Acerca de nosotros</strong></h2>
        <div className={styles.linea}></div>
        <h3 className={styles.subtitulo}>
          Cómo nace la Biblioteca Pedro Grases
        </h3>
        <p className={styles.infoBiblio1}>
          Las actividades de la <strong>Biblioteca Central de la Universidad Metropolitana</strong> se inician en la sede de San Bernardino a partir de <strong>1972</strong>.
        </p>
        <p className={styles.infoBiblio1}>
          El humanista español Pedro Grases, donó a la Universidad Metropolitana en 1976, su biblioteca personal constituida por <em className={styles.letrasNaranjaTexto}>setenta y cinco mil libros</em>. En agradecimiento, cuando se muda la Unimet a su nueva sede de Terrazas del Ávila, en 1983, su Biblioteca Central adopta el nombre de <strong>Biblioteca Pedro Grases</strong>.
        </p>
        <p className={styles.infoBiblio1}>
          Desde el año 2000, la biblioteca ha impulsado nuevos proyectos incorporando tecnologías de la información y comunicación.
        </p>
      </div>

        <br></br>

        <div>
        <Image
            src="/imagenSaman.png"
            alt="Biblioteca Pedro Grases"
            className={styles.imagenSaman}
            />
        </div>



        <div className={styles.parteEstudiantes}>
            <div className={styles.imageContainer}>
                <div className={styles.fondoEstudiantes}></div>
                <Image src="/estudiantes.png" alt="Estudiantes" className={styles.imagenEstudiantes} />
            </div>
            <div className={styles.textoInfoBiblio2}>
                <p>
                La biblioteca cuenta con <strong>4 plantas</strong>, enfocadas cada una a distintas ramas.
                Además de eso cuenta con espacios como cubículos y mesas de estudio. Estas se pueden reservar
                para que los estudiantes en sus tiempos libres puedan aprovechar y estudiar.
                </p>
            </div>
        </div>

        <h3 className={styles.mensajeContactanos}>¡Contáctanos!</h3>


    </section>
  );
}

// SE COMENTÓ PARA PODER HACER DEPLOY

// const poppins = Poppins({
//   subsets: ['latin'],
//   weight: ['300', '400', '500', '600', '700'],
// });