import SeccionUno from '../components/styles/PaginaPrincipal/SeccionUno/SeccionUno';
import SeccionDos from '../components/styles/PaginaPrincipal/SeccionDos/SeccionDos';
import SeccionTres from '../components/styles/PaginaPrincipal/SeccionTres/SeccionTres';

export default function HomePage() {
  return (
    <main style={{ margin: 0, padding: 0}}>
        <SeccionUno/>
        <SeccionDos/>
        <SeccionTres />
    </main>
  );
}


