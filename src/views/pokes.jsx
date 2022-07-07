import { useEffect, useState } from "react";

import gsap from "gsap";
import axios from "axios";
import { Link } from "react-router-dom";
// npm install @mui/material @emotion/react @emotion/styled
import "./styles/pokes.scss";
import TextField from "@mui/material/TextField";

export default function Pokes(props) {
  const [response, setResponse] = useState();
  const [search, setSearch] = useState("");
  const [searchedPoke, setSearchedPoke] = useState();
  useEffect(() => {
    let tl = gsap.timeline();
    // gsap.set("h1", { opacity: 1 });
    // tl.from("h1", 1, { delay: 0.1, opacity: 0 });
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/?limit=905`)
      .then((r) => {
        setResponse(r.data.results);
        // console.log(r.data.results[0].url.subString());
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  if (response == null) {
    return <h1>LOADING</h1>;
  }

  return (
    <div className="App">
      <h2>{search}</h2>
      <input
        placeholder="SEARCH"
        type="text"
        onChange={onChange}
        className="searchBar"
      />
      {/* <TextField
        onChange={onChange}
        label="YES SIR"
        sx={{ outlineColor: "white" }}
      /> */}
      <MapSearchedPoke />
      <h1>All Poke</h1>
      <MapPokemon />
    </div>
  );
  function FindIndexPoke(url) {
    let slicedUrl = url.slice(url.length - 4, url.length - 1);
    let newUrl = slicedUrl.replace(/\D/g, "");
    return newUrl;
  }
  function MapSearchedPoke() {
    if (searchedPoke) {
      // console.log(searchedPoke + "HELLO???");
      return (
        <section className="pokeCont">
          <h1>Searched Poke</h1>
          {searchedPoke.map((e, i) => (
            <Link to={"/" + FindIndexPoke(e.url)} className="link poke" key={i}>
              {e.name}
            </Link>
          ))}
        </section>
      );
    } else {
      return <h3>Search for Pokemon!</h3>;
    }
  }
  function MapPokemon() {
    return (
      <section className="pokeCont">
        {response.map((e, i) => (
          <Link to={"/" + Number(i + 1)} className="link poke" key={i}>
            {e.name}
          </Link>
        ))}
      </section>
    );
  }
  function onChange(event) {
    let newArray = [];
    // console.log(Object.entries(response));
    // console.log(response);
    setSearch(event.target.value);
    if (event.target.value.length < 1) {
      setSearch(null);
      setSearchedPoke(null);
    } else {
      // setSearch(event.target.value);
      Object.entries(response).filter(([key, val]) => {
        // console.log(val.name + " " + key);
        if (val.name.includes(event.target.value)) {
          newArray.push(response[key]);
          // console.log(newArray);
        }
      });
    }
    // console.log(search);
    setSearchedPoke(newArray);
  }
}
