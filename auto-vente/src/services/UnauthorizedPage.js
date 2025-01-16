import React from "react";

const UnauthorizedPage = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>403 - Accès interdit</h1>
      <p>Vous n'avez pas les autorisations nécessaires pour accéder à cette page.</p>
      <a href="/" style={{ color: "blue", textDecoration: "underline" }}>
        Retour à l'accueil
      </a>
    </div>
  );
};

export default UnauthorizedPage;
