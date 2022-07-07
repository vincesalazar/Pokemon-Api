import { gsap } from "gsap";
import { useEffect } from "react";
import ScrollTrigger from "gsap-trial/ScrollTrigger";
import "./styles/loadLine.scss";

export default function LoadLine() {
  gsap.registerPlugin(ScrollTrigger);
  useEffect(() => {
    let tl = gsap.timeline();
    tl.to(".line", {
      width: "100%",
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: 0.5
      }
    });
  }, []);
  return (
    <div
      style={{ backgroundColor: "red", height: "3px" }}
      className="line"
    ></div>
  );
}
