import gsap from "gsap";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../styles.scss";
import "./styles/poke.scss";

import Typography from "@mui/material/Typography";

export default function Poke() {
  const { id } = useParams();
  const [res, setResponse] = useState(null);
  useEffect(() => {
    // gsap.set("h1", {opacity:1})
    let tl = gsap.timeline();
    tl.from("h1", 1, { delay: 0.1, opacity: 0 });
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${id}/`)
      .then((r) => {
        console.log(r.data);

        setResponse(r.data);
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  if (res == null) {
    return <h1>LOADING</h1>;
  }
  function getMoveData(e) {
    //https://pokeapi.co/api/v2/move/803/
    // console.log(e);
    axios
      .get("https://pokeapi.co/api/v2/move/803/")
      .then((r) => {
        console.log(r);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <section
      className="App"
      style={{
        backgroundImage: `url(https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png)`,
        backgroundAttachment: "fixed"
      }}
    >
      <Typography variant="h5" font="">
        <h1 className="title">{res.name}</h1>
      </Typography>
      <div className="statCnt">
        <div className="statCard">
          <h5>Base XP</h5>
          <p>{res.base_experience}</p>
        </div>
        <div className="statCard">
          <h5>Height</h5>
          <p>{res.height}m</p>
        </div>
      </div>
      <div className="listCntr">
        <MapAbilities />
        <MapForms />
      </div>
      <div>
        <h4>Moves</h4>
        <MapMoves />
      </div>
    </section>
  );
  function MapAbilities() {
    return (
      <div className="list abilities">
        <h4>Abilites</h4>
        {res.abilities.map((e, i) => (
          <p key={i}>{e.ability.name}</p>
        ))}
      </div>
    );
  }
  function MapForms() {
    return (
      <div className=" list forms">
        <h4>Forms</h4>
        {res.forms.map((e, i) => (
          <p key={i}>{e.name}</p>
        ))}
      </div>
    );
  }
  function MapMoves() {
    return (
      <div className="moveList">
        {res.moves.map((e, i) => (
          <p id={i} key={i} onClick={getMoveData}>
            {e.move.name}
          </p>
          // <p key={i}>{JSON.stringify(e)}</p>
        ))}
      </div>
    );
  }
}
