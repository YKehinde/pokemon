import React from 'react';
import List from '../../components/List/List';
import PokemonLogo from '../../assets/pokemon-logo-black-transparent.png';

const ListPage = () => {
  return (
    <div className="page-shell">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>

      <header className="hero">
        <p className="hero-eyebrow">Community Pokedex</p>
        <img
          className="pokemon-logo"
          src={PokemonLogo}
          alt="Pokemon logo"
          width="320"
          height="117"
          fetchPriority="high"
        />
        <h1 className="hero-title">Find stats, sprites, and favourites fast</h1>
        <p className="hero-copy">
          Browse the roster, save standout Pokemon, and open a detailed profile for each one.
        </p>
      </header>

      <main className="page-content" id="main-content">
        <List />
      </main>
    </div>
  );
};

export default ListPage;
