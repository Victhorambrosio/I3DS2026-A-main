import { useContext, useEffect, useState } from "react";
import styles from "./MovieDescription.module.css";
import { LanguageContext } from "../../context/LanguageContext";

const MovieDescription = (props) => {
  const [movieDesc, setMovieDesc] = useState({});
  const [translatedPlot, setTranslatedPlot] = useState("");
  const [translatedGenre, setTranslatedGenre] = useState("");
  const [isTranslating, setIsTranslating] = useState(false);
  const { language } = useContext(LanguageContext);

  const translateText = async (text) => {
    try {
      if (!text || text === "N/A") return text;

      const response = await fetch(
        `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=pt&dt=t&q=${encodeURIComponent(text)}`,
      );

      const data = await response.json();

      if (Array.isArray(data?.[0])) {
        return data[0].map((item) => item?.[0]).join("");
      }

      return text;
    } catch (error) {
      console.error("Erro ao traduzir sinopse:", error);
      return text;
    }
  };

  useEffect(() => {
    const loadMovie = async () => {
      try {
        const response = await fetch(`${props.apiUrl}&i=${props.movieID}`);
        const data = await response.json();

        setMovieDesc(data);
      } catch (error) {
        console.error(error);
        setTranslatedPlot("Não foi possível carregar a sinopse.");
        setTranslatedGenre("");
      }
    };

    loadMovie();
  }, [props.apiUrl, props.movieID]);

  useEffect(() => {
    const translateFields = async () => {
      if (language !== "pt-br") {
        setTranslatedPlot("");
        setTranslatedGenre("");
        return;
      }

      setIsTranslating(true);

      const [plotPt, genrePt] = await Promise.all([
        translateText(movieDesc?.Plot),
        translateText(movieDesc?.Genre),
      ]);

      setTranslatedPlot(plotPt || "Sinopse indisponível.");
      setTranslatedGenre(genrePt || "Não informado");
      setIsTranslating(false);
    };

    if (movieDesc?.Title) {
      translateFields();
    }
  }, [language, movieDesc]);

  return (
    <div className={styles.modalBackdrop} onClick={props.click}>
      <div className={styles.movieModal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.movieInfo}>
          <img src={movieDesc.Poster} alt="" />

          <button className={styles.btnClose} onClick={props.click}>
            X
          </button>

          <div className={styles.movieType}>
            <div>
              <img src="/favicon.png" alt="" />
              {movieDesc.Type}
              <h1>{movieDesc.Title}</h1>

              <a
                href={`https://google.com/search?q=${encodeURIComponent(movieDesc.Title)}`}
                target="_blank"
                rel="noreferrer"
              >
                ▶️ {language === "pt-br" ? "Assistir" : "Watch"}
              </a>
            </div>
          </div>
        </div>

        <div className={styles.containerMisc}>
          <div className={styles.containerFlex}>
            Avaliação: {movieDesc.imdbRating} | Duração: {movieDesc.Runtime} |{" "}
            {movieDesc.Released}
          </div>

          <div className={styles.containerFlex}>
            <p>
              {language === "pt-br" ? "Elenco" : "Cast"}: {movieDesc.Actors}
            </p>
            <p>
              {language === "pt-br" ? "Gênero" : "Genre"}:{" "}
              {language === "pt-br"
                ? translatedGenre || movieDesc.Genre
                : movieDesc.Genre}
            </p>
          </div>
        </div>

        <div className={styles.desc}>
          <p>
            {language === "pt-br" ? "Sinopse" : "Synopsis"}:{" "}
            {language === "pt-br"
              ? isTranslating
                ? "Traduzindo..."
                : translatedPlot || movieDesc.Plot
              : movieDesc.Plot}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MovieDescription;
