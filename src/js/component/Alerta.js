import React, { useState, useEffect } from "react";
import Home from "./home";




const App = () => {
  const [nombre, setNombre] = useState("");
  const [confirmacion, setConfirmacion] = useState(false);
    const URLFINISH = 'https://playground.4geeks.com/todo/users/'+ nombre;
  useEffect(() => {
    const mostrarAlerta = (event) => {
      const mensaje = "Por favor, ingresa tu nombre antes de continuar.";
      event.returnValue = mensaje;
      return mensaje;
    };

    window.addEventListener("beforeunload", mostrarAlerta);

    return () => {
      window.removeEventListener("beforeunload", mostrarAlerta);
    };
  }, []);

  const handleNombreChange = (event) => {
    setNombre(event.target.value);
  };

  const handleConfirmacion = () => {
    setConfirmacion(true);
    window.removeEventListener("beforeunload", () => {});
    // Aquí puedes enviar el nombre a tu API
    fetch(URLFINISH, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nombre: nombre }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  };

  return (
    <div className="container">
      {!confirmacion && (
        <div>
          <h1>Bienvenido. ingresa Ronalse y vuelve a cargar la pagina porque no se como reparar este error y noe no me ayuda. si ya esta creado te mandara a la list </h1>
          <input className=" mt-5"
            type="text"
            placeholder="Ingresa ronalse"
            value={nombre}
            onChange={handleNombreChange}
          />
          <button className=" mt-5 btn btn-info " onClick={handleConfirmacion}>Continuar</button>
        </div>
      )}
      {confirmacion && <Home nombre={nombre}/>}
    </div>
  );
};

export default App;