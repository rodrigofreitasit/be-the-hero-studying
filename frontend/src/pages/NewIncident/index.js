import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

import api from "../../services/api";

import "./styles.css";
import logoImg from "../../assets/logo.svg";

export default function NewIncident() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [value, setValue] = useState("");

  const ongId = localStorage.getItem("ongId");
  const history = useHistory();

  function handleCancelar(e) {
    e.preventDefault();
    history.push("/profile");
  }

  async function handleNewIncident(e) {
    e.preventDefault();
    const data = {
      title,
      description,
      value,
    };
    console.log(value);
    try {
      await api.post("incidents", data, {
        headers: {
          Authorization: ongId,
        },
      });
      alert("Caso criado com sucesso!");
      history.push("/profile");
    } catch (err) {
      alert("Erro ao cadastrar o caso, tente novamente :(");
    }
  }

  return (
    <div className="new-incident-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be the Hero" />
          <h1>Cadastrar novo caso</h1>
          <p>
            Descreva o caso detalhadamente para encontrar um herói para resolver
            isso.
          </p>
          <Link className="back-link" to="/profile">
            <FiArrowLeft size={16} color="#e02041" />
            Voltar para home
          </Link>
        </section>
        <form onSubmit={handleNewIncident}>
          <input
            required
            placeholder="Titulo do caso"
            value={title} //
            onChange={(e) => setTitle(e.target.value)} // e.target.value = representa o valor do input
          />
          <textarea
            required
            placeholder="Descrição"
            value={description} //
            onChange={(e) => setDescription(e.target.value)} // e.target.value = representa o valor do input
          />
          <input
            required
            type="number"
            placeholder="Valor em Reais"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <div className="button-group">
            <button
              onClick={handleCancelar}
              className="button-cancelar"
              type="submit"
            >
              Cancelar
            </button>
            <button className="button" type="submit">
              Cadastrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
