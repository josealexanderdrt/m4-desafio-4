import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; //hoja de estilo 
import Card from "react-bootstrap/Card";
import Buscador from "./Buscador";


const MiApi = () => {
  
  const [gotSearch, setGotSearch] = useState(""); // se inicializa con una cadena vacia
  const [gotList, setGotList] = useState([]); // con un array vacio
  const getGot = async () => {
    const url = "https://thronesapi.com/api/v2/Characters";
    const response = await fetch(url); //obtener recursos de forma asíncrona por la red.
    const data = await response.json();
    const gotApi = data
      .map((e) => {
        return {
          id: e.id,
          fullName: e.fullName,
          title: e.title,
          family: e.family,
          imagen: e.imageUrl,
        };
      })
      .sort((a, b) => a.fullName.localeCompare(b.fullName)); //ordenar arrays 
    if (gotSearch) {
      setGotList(// es para actulizar el valor de setGotLits
        gotApi.filter(
          (got) =>
            got.fullName.toLowerCase().includes(gotSearch) ||
            got.title.toLowerCase().includes(gotSearch)
        )
      );
    } else {
      setGotList(gotApi); // si no se esta buscando nada, muestra la lista completa 
    }
  };

  useEffect(() => {
    getGot();
  }, [gotSearch]);  

  return (
    <>
      <div className="container-fluid m-3">
      
        <Buscador setGotSearch={setGotSearch} />
     
      
      <div className="row ">
        {gotList.length > 0 ? ( //exprecion condicional se ejecutara el codigo ()
          gotList.map((got, e) => (
            <div key={e} className="col m-4 d-flex justify-content-center align-items-center">
              <Card style={{ width: "18rem" }} className="text-center justify-content-center align-items-center">
                <Card.Img
                  variant="top"
                  src={got.imagen}
                  height="300"
                  width="250"
                  className="p-4 "
                />
                <Card.Body>
                  <Card.Title>{got.fullName}</Card.Title>
                  <Card.Text>
                    <span>Kingdom Badge :</span> <br />
                    {got.title} <br />
                    <span>Family: </span> <br />
                    {got.family}
                    <br />
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
          ))
        ) : (
          <p>Personaje no encontrado.</p>
        )}
        </div>
      </div>
    </>
  );
};

export default MiApi;
