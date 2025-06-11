import styles from '../../components/styles/ContactUs/contactus.module.css';
import { Mail } from 'lucide-react';
import emailjs from 'emailjs-com';

export default function ContactUs() {
  
  
  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();

    emailjs.sendForm(
      'service_x30vq3a',     // ← Reemplaza con tu Service ID
      'template_5532wfd',    // ← Reemplaza con tu Template ID
      e.target as HTMLFormElement,
      'ahLWaLMZV8-bKF6i9'      // ← Reemplaza con tu Public Key
    ).then(
      () => {
        alert('Mensaje enviado correctamente');
      },
      (error) => {
        alert('Error al enviar el mensaje');
        console.error(error);
      }
    );
  };


  return (
    <div className={styles.container}>
      <h2 className={styles.tituloContact}>Contáctanos</h2>
      <h3 className={styles.tituloEnviaMensaje}>Envíanos un mensaje</h3>
      <p className={styles.textoDescripcion}>
        Si tienes alguna duda, solicitud o deseas contactarnos lo puedes hacer mediante el correo electrónico
        biblioteca.unimet@correo.com, al número de teléfono 0212-BUNIMET o dejando un mensaje
      </p>

        <form onSubmit={sendEmail} className={styles.fondoCuest}>
          <div className={styles.separacionEntreInputs}>
            <label htmlFor="email">Email</label>
            <div className={styles.inputWithIcon}>
              <input
                type="email"
                name="email" // ← necesario para EmailJS
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
            name="message" // ← necesario para EmailJS
            placeholder="Ingrese el mensaje"
            rows={6}
            className={styles.inputMensaje}
          />
        </div>

        <button type="submit" className={styles.botonEnviar}>Enviar</button>
      </form>

    </div>
  );
}

// SE COMENTÓ PARA PODER HACER DEPLOY

// const poppins = Poppins({
//   subsets: ['latin'],
//   weight: ['300', '400', '500', '600', '700'],
// });
