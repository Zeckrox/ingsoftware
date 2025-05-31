import styles from './SeccionDos.module.css';
import Image from 'next/image';
import { FiSearch } from 'react-icons/fi';

export default function SeccionDos() {
  return (
    <section className={styles.seccionDos}>
  <div className={styles.container}>
    <div className={styles.imagenWrapper}>
      <Image
        src="/edificioImage.png"
        alt="Entrada de la Biblioteca UNIMET"
        className={styles.imagenEntradaBiblio}
        width={500}
        height={300}
      />
    </div>
    <div className={styles.textoWrapper}>
    <p className={styles.subtitulo}>
    <span className={styles.estrella}>✦</span> Espacios diseñados para <em> fortalecer </em> el aprendizaje
    </p>

    <div className={styles.titulo}>
    <span className={styles.numero16}>16</span> cubículos <br /> de estudio
    </div>

    <br>
    </br>

    <div className={styles.iconosInfo}>
    <span className={styles.iconosPropiedades}>📅</span>
    <div>
    
    <p className={styles.iconosSubtitulos}>Reserva en segundos</p>
    <p className={styles.iconosTexto}>
      Selecciona tu cubículo o mesa por el <strong>tiempo deseado</strong>
    </p>
  </div>
</div>


<div className={styles.iconosInfo}>
    <span className={styles.iconosPropiedades}>🔍</span>
    <div>
    
    <p className={styles.iconosSubtitulos}>Explora Disponibilidad</p>
    <p className={styles.iconosTexto}>
      Consulta <strong>horarios y espacios disponibles</strong>
    </p>
  </div>
</div>


<div className={styles.iconosInfo}>
    <span className={styles.iconosPropiedades}>📩</span>
    <div>
    
    <p className={styles.iconosSubtitulos}>Recibe la confirmación</p>
    <p className={styles.iconosTexto}>
      <strong>Verifica tu reserva</strong> mediante el correo o desde tu perfil
    </p>
  </div>
</div>

    </div>
  </div>
</section>

  );
}
