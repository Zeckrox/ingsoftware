import SeccionUno from '../components/SeccionUno/SeccionUno';
import SeccionDos from '../components/SeccionDos/SeccionDos';
import SeccionTres from '../components/SeccionTres/SeccionTres';

export default function HomePage() {
  return (
    <main style={{ margin: 0, padding: 0}}>
        <SeccionUno/>
        <SeccionDos/>
        <SeccionTres />
    </main>
  );
}


