import React, { useEffect, useState } from "react"; //useEffect é utilizado para disparar funçao e determinado do componente
import { Link, useHistory } from "react-router-dom";
import { FiPower, FiTrash2 } from "react-icons/fi";

import api from "../../services/api";

import "./styles.css";
import logoImg from "../../assets/logo.svg";

export default function Profiler() {
  const [incidents, setIncidents] = useState([]);

  //armazena no localstorage do navegador o name e id da ong que fez o login

  const ongName = localStorage.getItem("ongName");
  const ongId = localStorage.getItem("ongId");

  const history = useHistory();

  useEffect(() => {
    api
      .get("profile", {
        headers: {
          Authorization: ongId,
        },
      })
      .then((response) => {
        setIncidents(response.data);
      });
  }, [ongId]); // Primeira etapa é qual da função, que fica definida em ()=>{} || segundo Array de dependencia, toda vez que algo de dentro do array mudar, ira chamar a função

  //chamada para deletar o caso do banco de dados, passando o ID da ong no header
  async function handleDeleteIncident(id) {
    try {
      await api.delete(`incidents/${id}`, {
        headers: {
          Authorization: ongId,
        },
      });

      // função que faz a verredura dos incidentes e apaga em tempo real do interface do usuário
      setIncidents(incidents.filter((incidents) => incidents.id !== id));
    } catch (err) {
      alert("Erro ao deletar incident");
    }
  }

  function handleLogout() {
    localStorage.clear();
    history.push("/");
  }

  return (
    <div className="profile-container">
      <header>
        <img src={logoImg} alt="Be the Hero" />
        <span>Bem Vinda, {ongName}</span>
        <Link className="button" to="/incidents/new">
          Cadastrar novo caso
        </Link>
        <button onClick={handleLogout} type="button">
          <FiPower size={18} color="#e02041" />
        </button>
      </header>
      <h1>Casos Cadastrados</h1>
      <ul>
        {incidents.map((incident) => (
          <li key={incident.id}>
            <strong>CASO:</strong>
            <p>{incident.title}</p>

            <strong>DESCRIÇÃO:</strong>
            <p>{incident.description}</p>

            <strong>VALOR:</strong>
            <p>
              {Intl.NumberFormat("pt-BR", {
                // faz a conversão do valor para o monetario,é uma funçao JS
                style: "currency",
                currency: "BRL",
              }).format(incident.value)}
            </p>

            <button
              onClick={() => handleDeleteIncident(incident.id)} // no click do botão o mesmo chama uma função "()" que contem a função de deletar o incidente
              type="button"
            >
              <FiTrash2 size={20} color="#a8a8b3" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
