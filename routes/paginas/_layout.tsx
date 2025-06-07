import { PageProps } from "$fresh/server.ts";

export default function Layout({ Component }: PageProps) {
  return (
    <div class="layout-container">
      <nav class="navbar">
        <div class="nav-links">
          <a href="/paginas/homepage" class="nav-link">Buscar Juego</a>
          <a href="/paginas/addGame" class="nav-link">Crear Tablero</a>
          <a href="/paginas/myGames" class="nav-link">Mis Partidas</a>
          <a href="/login" class="logout-link">Cerrar sesión</a>
        </div>
      </nav>
      
      <main class="main-content">
        <Component />
      </main>
      
      <footer class="footer">
        © {new Date().getFullYear()} BoardFinder - Todos los derechos reservados
      </footer>
    </div>
  );
}