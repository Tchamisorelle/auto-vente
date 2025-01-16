import React from "react";
import { Link } from "react-router-dom";

const UnauthorizedPage = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>403 - Accès interdit</h1>
      <p>Vous n'avez pas les autorisations nécessaires pour accéder à cette page.</p>
      <Link to="/" style={{ color: "blue", textDecoration: "underline" }}>
        Retour à l'accueil
      </Link>
    </div>
  );
};

export default UnauthorizedPage;
