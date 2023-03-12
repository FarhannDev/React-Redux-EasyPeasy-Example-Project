import React from "react";
import { Link } from "react-router-dom";

export default function Button({ name, icon = "", urlRedirect = "/" }) {
  return (
    <Link
      aria-label={name}
      title={name}
      to={urlRedirect}
      className="button-action btn btn-lg btn-danger"
    >
      <i className={icon}></i>
    </Link>
  );
}
