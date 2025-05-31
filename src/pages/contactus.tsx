import styles from './contactus.module.css';
import { Mail } from 'lucide-react';
import { Poppins } from 'next/font/google';




export default function ContactUs() {
  return (
    <div className={styles.container}>
      <h2 className={styles.tituloContact}>Contáctanos</h2>
      <h3 className={styles.tituloEnviaMensaje}>Envíanos un mensaje</h3>
      <p className={styles.textoDescripcion}>
        Si tienes alguna duda, solicitud o deseas contactarnos lo puedes hacer mediante el correo electrónico
        biblioteca.unimet@correo.com, al número de teléfono 0212-BUNIMET o dejando un mensaje
      </p>

        <form className={styles.fondoCuest}>
        <div className={styles.separacionEntreInputs}>
          <label htmlFor="email">Email</label>
          <div className={styles.inputWithIcon}>
            <input
              type="email"
              id="email"
              placeholder="info@unimet.edu.ve"
              className={styles.inputCorreo}
            />
            <Mail size={30} className={styles.iconoCorreo} />
          </div>
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="message">Mensaje</label>
          <textarea
            id="message"
            placeholder="Ingrese el mensaje"
            rows={6}
            className={styles.inputMensaje}
          ></textarea>
        </div>

        <button type="submit" className={styles.botonEnviar}>Enviar</button>
      </form>

    </div>
  );
}



const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
});