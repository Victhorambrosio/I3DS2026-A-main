import React from "react";
import "./Rodape.modules.css";

const Rodape = ({ children, link }) => {
  return (
    <footer>
      <p>
        Feito por <a href={link}>{children} 🥸</a>{" "}
      </p>
    </footer>
  );
};

export default Rodape;
