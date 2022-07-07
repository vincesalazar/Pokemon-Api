import { Link } from "react-router-dom";

import "./styles/nav.scss";

export default function Nav(props) {
  return (
    <nav>
      <Link
        style={{ fontWeight: "200", fontFamily: "" }}
        className="navLink"
        to="/"
      >
        Home
      </Link>
    </nav>
  );
}
