import { Route, Routes } from "react-router";
import "./App.css";

import Sobre from "./pages/Sobre";
import Home from "./pages/Home";
import Header from "./components/header/Header";
import Contato from "./pages/Contato";
import NaoEncontrado from "./pages/NaoEncontrado";
import Rodape from "./components/rodape/Rodape";

function App() {
  return (
    <>
      <Header />
      <div>
      <Routes>
        {/* Identifica todas as rotas do sistema*/}
        <Route path="/" element={<Home />} />
        <Route path="/sobre" element={<Sobre />} /> {/* Uma rota do sistema */}
        <Route path="/Contato" element={<Contato />} />
        <Route path="/NaoEncontrado" element={<NaoEncontrado />} />
      </Routes>
      </div>
      <Rodape link={"https://github.com/Victhorambrosio"}>Victhor Ambrósio</Rodape>

    </>
  );
}

export default App;
