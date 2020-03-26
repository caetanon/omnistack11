import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import api from '../../Services/api';

import './style.scss';
import logoImg from '../../assets/logo.svg'
import heroesImg from '../../assets/heroes.png'
import { FiLogIn } from 'react-icons/fi';

export default function Logon() {
  const [ id, setId ] = useState('');
  const history = useHistory();

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const response = await api.post('sessions', { id });
      localStorage.setItem('ongId', id);
      localStorage.setItem('ongName', response.data.name);
      history.push('/profiles');
    } catch (err) {
      alert('Falha no login, tente novamente');
    }
  }

  return (
    <div className="logon-container block-container">
      <section className="form">
        <img src={logoImg} alt="" />

        <form onSubmit={handleLogin}>
          <h1>Faça seu logon</h1>
          <input 
            value={id}
            onChange={e => setId(e.target.value)}
            type="text" placeholder="Sua ID" />
          <button className="button" type="submit">Entrar</button>
          <Link to="/register" className="icon-link">
            <FiLogIn size={16} color="#E02041" />
            Não tenho cadastro
          </Link>
        </form>
      </section>
      <img src={heroesImg} alt="" />
    </div>
  );
}