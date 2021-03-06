import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useHistory, Link } from "react-router-dom";
import Card from "../components/Card";
import Paging from "../components/Paging";
import Search from "../components/Search";
import "./Characters.css";

const Characters = ({ setFavorite, favorite }) => {
  // init history
  const history = useHistory();

  // déclaration des variables globales
  const pages = [];

  // déclaration des states
  const [data, setData] = useState();
  const [page, setPage] = useState({
    url: "https://mybackend-marvel.herokuapp.com/characters?",
    number: 1
  });
  const [isLoaded, setIsLoaded] = useState(false);
  const [searched, setSearched] = useState("");
  const [context, setContext] = useState("characters");

  const fetchData = async () => {
    try {
      // récupération des données sur le backend
      const response = await axios.get(page.url);
      console.log("retour du backend", response.data);
      // on stock la réponse dans un état
      setData(response.data);
      // on dit que la page est chargée
      setIsLoaded(true);
    } catch (error) {
      console.log(error.message);
    }
  };

  // lancement à la recharge de la page et à chaque changement de page
  useEffect(() => {
    fetchData();
  }, [page]);

  // constitution du nombre de page selon le retour de la recherche
  if (isLoaded) {
    // url de base
    const urlbase = "https://mybackend-marvel.herokuapp.com/characters?";

    // définition du nombre de pages à gérer
    const nbPages = Math.ceil(data.total / 100);

    if (searched) {
      // on pousse dans la tableau des pages le nombre de page à afficher
      for (let i = 0; i < nbPages; i++) {
        pages.push({
          url: urlbase + "search=" + searched + "&page=" + (i + 1),
          number: i + 1
        }); // i commence à 0 donc chaque chiffre est décalé de -1
      }
    } else {
      // on pousse dans la tableau des pages le nombre de page à afficher
      for (let i = 0; i < nbPages; i++) {
        pages.push({ url: urlbase + "page=" + (i + 1), number: i + 1 }); // i commence à 0 donc chaque chiffre est décalé de -1
      }
    }

    console.log("pages", pages);
  }

  return (
    <div className="characters">
      <div className="container">
        <Search
          context={context}
          setPage={setPage}
          setSearched={setSearched}
          setIsLoaded={setIsLoaded}
        />
        {isLoaded && (
          <Paging
            setIsLoaded={setIsLoaded}
            setPage={setPage}
            pages={pages}
            page={page}
          />
        )}
        <div className="result">
          {isLoaded ? (
            data.results.map((elem, index) => {
              return (
                <Link to={"/character/" + elem.id} key={elem.id}>
                  <Card
                    id={elem.id}
                    title={elem.name}
                    picture={
                      elem.thumbnail.path + "." + elem.thumbnail.extension
                    }
                    description={elem.description}
                    setFavorite={setFavorite}
                    favorite={favorite}
                  />
                </Link>
              );
            })
          ) : (
            <div className="charging">Chargement en cours</div>
          )}
        </div>
        {isLoaded && (
          <Paging
            setIsLoaded={setIsLoaded}
            isLoaded={isLoaded}
            setPage={setPage}
            pages={pages}
            page={page}
          />
        )}
      </div>
    </div>
  );
};

export default Characters;
