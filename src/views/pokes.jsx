import { useEffect, useState } from "react";

import gsap from "gsap";
import axios from "axios";
import { Link } from "react-router-dom";
import "./styles/pokes.scss";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

export default function Pokes(props) {
  const [response, setResponse] = useState();
  const [search, setSearch] = useState("");
  const [searchedPoke, setSearchedPoke] = useState();
  useEffect(() => {
    let tl = gsap.timeline();
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/?limit=905`)
      .then((r) => {
        console.log(r.data.results);
        setResponse(r.data.results);
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
      {/* <h2>{search}</h2> */}
      <input
        placeholder="SEARCH"
        type="text"
        onChange={onChange}
        className="searchBar"
      />
      <MapSearchedPoke />
      <Typography variant="h3">
        <h1>All Pokemon</h1>
      </Typography>
      <MapPokemon />
    </div>
  );
  function MapSearchedPoke() {
    function FindIndexPoke(url) {
      let slicedUrl = url.slice(url.length - 4, url.length - 1);
      let newUrl = slicedUrl.replace(/\D/g, "");
      return newUrl;
    }
    if (searchedPoke) {
      // console.log(searchedPoke + "HELLO???");
      return (
        <section className="pokeCont">
          {searchedPoke.map((e, i) => (
            <Link to={"/" + FindIndexPoke(e.url)} className="link poke" key={i}>
              {e.name}
            </Link>
          ))}
        </section>
      );
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
