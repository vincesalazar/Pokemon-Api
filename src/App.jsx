import "./styles.scss";
import { gsap } from "gsap";
import { useEffect } from "react";
import ScrollTrigger from "gsap-trial/ScrollTrigger";

//COMPONENTS
import LoadLine from "./components/loadLine";

//VIEWS
import Pokes from "./views/pokes";

export default function App() {
  gsap.registerPlugin(ScrollTrigger);
  useEffect(() => {}, []);
  return (
    <div className="App">
      <Pokes />
    </div>
  );
}
