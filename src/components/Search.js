import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./Search.css";

const Search = ({ setPage, setSearched, setIsLoaded, context }) => {
  // déclaration de state
  const [search, setSearch] = useState("");

  // init history
  const history = useHistory();

  return (
    <div className="search">
      <input
        type="text"
        placeholder="Recherche"
        onChange={event => {
          setSearch(event.target.value);
        }}
      ></input>
      <button
        onClick={event => {
          event.preventDefault();
          // on met à jour l'élément à chercher s'il y a une recherche
          if (context === "characters") {
            if (search) {
              setPage({
                url:
                  "https://mybackend-marvel.herokuapp.com/characters?search=" +
                  search,
                number: 1
              });
              setIsLoaded(false);
              setSearched(search);
            } else {
              setPage({
                url:
                  "https://mybackend-marvel.herokuapp.com/characters?search=",
                number: 1
              });
            }
          }
          if (context === "comics") {
            if (search) {
              setPage({
                url:
                  "https://mybackend-marvel.herokuapp.com/comics?search=" +
                  search,
                number: 1
              });
              setIsLoaded(false);
              setSearched(search);
            } else {
              setPage({
                url: "https://mybackend-marvel.herokuapp.com/comics?search=",
                number: 1
              });
            }
          }
        }}
      >
        Valider
      </button>
    </div>
  );
};

export default Search;
