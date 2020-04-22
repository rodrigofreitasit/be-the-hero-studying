import React from "react";

//Propriedade é passada dentro da função (props)
// ou fazerndo a desestruturação por exemplo { title }
function Header({ children }) {
  return (
    <header>
      <h1>{children}</h1>
    </header>
  );
}

export default Header;
