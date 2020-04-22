import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

import api from "../../services/api";
import "./styles.css";

import logoImg from "../../assets/logo.svg";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [city, setCity] = useState("");
  const [uf, setUf] = useState("");

  const history = useHistory();

  //função disparada no momento que o form é enviado
  async function handleRegister(e) {
    e.preventDefault();
    const data = {
      name,
      email,
      whatsapp,
      city,
      uf,
    };

    //Faz a chamada para cadastro da nova ONG e retorna o ID para o cliente
    try {
      const response = await api.post("ongs", data);
      alert(`Seu id de acesso é: ${response.data.id}`);
      history.push("/");
    } catch (err) {
      alert("Erro no cadastro, teste novamente");
    }
  }
  return (
    <div className="register-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be the Hero" />
          <h1>Cadastro</h1>
          <p>
            Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem
            os casos da usa ONG
          </p>
          <Link className="back-link" to="/">
            <FiArrowLeft size={16} color="#e02041" />
            Não tenho cadastro
          </Link>
        </section>
        <form onSubmit={handleRegister} /* Chama a função de cadastro da ONG */>
          <input
            placeholder="Nome da Ong"
            value={name} //
            onChange={(e) => setName(e.target.value)} // e.target.value = representa o valor do input
          />
          <input
            type="email"
            placeholder="E-mail"
            value={email} //
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            placeholder="Whatsapp"
            value={whatsapp} //
            onChange={(e) => setWhatsapp(e.target.value)}
          />
          <div className="input-group">
            <input
              type="text"
              placeholder="Cidade"
              value={city} //
              onChange={(e) => setCity(e.target.value)}
            />
            <input
              type="text"
              placeholder="UF"
              value={uf} //
              onChange={(e) => setUf(e.target.value)}
              style={{ width: 80 }}
            />
          </div>
          <button className="button" type="submit">
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}
