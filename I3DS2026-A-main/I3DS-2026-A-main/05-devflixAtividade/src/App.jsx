import { useContext, useEffect, useState } from "react"; // useState - Ele controla o estado do item |
import "./App.css";

import logo from "./assets/JORGINFLIX.png";
import lupa from "./assets/search.png";

import Rodape from "./components/Rodape/Rodape";
import MovieCard from "./components/MovieCard/MovieCard";
import { LanguageProvider } from "./context/LanguageContext";
import { LanguageContext } from "./context/LanguageContext";

const AppContent = () => {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [theme, setTheme] = useState("dark");
  const { language, toggleLanguage } = useContext(LanguageContext);

  //Utilizando uma CHAVE de API do arquivo .env
  const apiKey = import.meta.env.VITE_OMDB_API_KEY;
  const apiUrl = `https://omdbapi.com/?apikey=${apiKey}`;

  //Criando a conexão com a API e trazendo informações
  const searchMovies = async (title) => {
    const response = await fetch(`${apiUrl}&s=${title}`);
    const data = await response.json();

    //Alimentando a variavel movies
    setMovies(data.Search);
  };

  useEffect(() => {
    (async () => {
      await searchMovies("spider-man"); // termo para pesquina ao carregar o site
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div id="App" className={theme}>
      <button
        onClick={toggleLanguage}
        style={{
          position: "fixed",
          top: "20px",
          right: "90px",
          padding: "10px 12px",
          backgroundColor: "#3662f3",
          color: "#fff",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          fontSize: "14px",
          fontWeight: "700",
          zIndex: 1000,
        }}
      >
        {language === "pt-br" ? "EN" : "PT"}
      </button>
      <button
        onClick={toggleTheme}
        style={{
          position: "fixed",
          top: "20px",
          right: "20px",
          padding: "10px 12px",

          backgroundColor: theme === "dark" ? "#3662f3" : " #072e52",
          color: "#fff",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          fontSize: "14px",
          fontWeight: "700",
          zIndex: 1000,
        }}
      >
        {theme === "dark" ? "☀️" : "🌙"}
      </button>
      <img
        id="Logo"
        src={logo}
        alt="Logotipo do serviço de streaming Devflix, com letras vermelhas e fundo preto, promovendo conteúdo de séries, filmes e entretenimento online."
      />

      <div className="search">
        <input
          onKeyDown={(e) => e.key === "Enter" && searchMovies(search)}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          placeholder={
            language === "pt-br" ? "Pesquise por filmes" : "Search for movies"
          }
        />
        <img
          onClick={() => searchMovies(search)}
          src={lupa}
          alt="Botão de ação para pesquisa!"
        />
      </div>

      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie, index) => (
            <MovieCard key={index} {...movie} apiUrl={apiUrl} />
          ))}
        </div>
      ) : (
        <h2 className="empty">😢 Filme não encontrado 😢</h2>
      )}

      <Rodape link={"hhttps://github.com/Victhorambrosio"}>
        Victhor Ambrósio
      </Rodape>
    </div>
  );
};

const App = () => {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
};

export default App;
