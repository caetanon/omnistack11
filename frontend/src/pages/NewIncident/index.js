import React, { useState } from 'react';
import api from '../../Services/api';
import { Link, useHistory } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import logoImg from "../../assets/logo.svg";
import './style.scss';

export default function NewIncident() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [value, setValue] = useState("");
  const history = useHistory();

  async function handleNewIncident(e) {
    e.preventDefault();
    const ongId = localStorage.getItem('ongId');
    const data = {
      title,
      description,
      value,
    };

    try {
      await api.post("incidents", data, {
        headers: {
          Authorization: ongId,
        }
      });

      alert(`Um novo caso foi cadastrado`);
      history.push('/profiles');
    } catch (err) {
      alert("Erro no cadastro, tente novamente");
    }
  }
  return (
    <div className="new-incident-container block-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be The Hero" />
          <h1>Cadastrar novo caso</h1>
          <p>
            Descreva o caso detalhadamente para encontrar um herói para resolver
            isso.
          </p>
          <Link to="/profiles" className="icon-link">
            <FiArrowLeft size={16} color="#E02041" />
            Voltar para home
          </Link>
        </section>
        <form onSubmit={handleNewIncident}>
          <input
            value={title}
            onChange={e => setTitle(e.target.value)}
            type="text"
            placeholder="Título do caso"
          />
          <textarea
            onChange={e => setDescription(e.target.value)}
            name=""
            placeholder="descrição"
            cols="30"
            rows="10"
          >
            {description}
          </textarea>
          <input
            onChange={e => setValue(e.target.value)}
            type="text"
            placeholder="Valor em reais"
          />

          <button className="button" type="submit">
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}