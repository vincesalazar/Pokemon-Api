import gsap from "gsap";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../styles.scss";

export default function Poke() {
  const { id } = useParams();
  const [res, setResponse] = useState(null);
  useEffect(() => {
    let tl = gsap.timeline();
    tl.from("h1", 1, { delay: 0.1, opacity: 0 });
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${id}/`)
      .then((r) => {
        setResponse(r.data);
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get(
        `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1/`
      )
      .then((r) => {
        console.log(r);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  if (res == null) {
    return <h1>LOADING</h1>;
  } else {
    console.log(res);
  }

  return (
    <section
      className="App"
      style={{
        backgroundImage:
          "url(https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/8/"
      }}
    >
      <h1>{res.name}</h1>
      <img
        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/8/"
        alt=""
      />
      <MapAbilities />
      <MapForms />
    </section>
  );
  function MapAbilities() {
    return (
      <div>
        {res.abilities.map((e, i) => (
          <div key={i}>{e.ability.name}</div>
        ))}
      </div>
    );
  }
  function MapForms() {
    return (
      <div>
        {res.forms.map((e, i) => (
          <div key={i}>{e.name}</div>
        ))}
      </div>
    );
  }
}
