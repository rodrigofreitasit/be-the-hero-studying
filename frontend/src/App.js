import React from "react";
import "./global.css";

import Routes from "./routes";

//Componente é uma função que retorna HTML.
//Componentes devem iniciar com a letra Maiuscula
//Quando o HTMl esta dentro de um arquivo JavaScript vai se chamar JSX
//Propriedades: é o exemplo de um atributo no HTML exemplo o title="texto"
//Estado: é uma propriedade do componente onde colocamos dados que, quando mudados, devem causar uma nova renderização.
//Imutabilidade:
export default function App() {
  return <Routes />;
}
