import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Buscador from "./Buscador";

const MiApi = () => {
 // const [got, setGot] = useState([]); // se setea como un arreglo porque la informacion viene como un objeto GOT seria el original, SET GOT seria la copia, USE STATE para acceder
 const [gotSearch, setGotSearch] = useState(''); 
 const [gotList, setGotList] = useState([]); 
  const getGot = async () => {
    // el valor asyns  es una declaracion que defina una funcion asincrona, la cual devuelve un objeto
    const url = "https://thronesapi.com/api/v2/Characters";
    const response = await fetch(url); // el operador await es usado para esperar una promise, solo puede ser usado dentro de una funcion async, el fecht devolvera una promise que sera aceptada cuando reciba una respuesta y solo será rechazada si hay un fallo de la red o si por alguna razon no se pudo completar la peticion
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
      .sort((a, b) => a.fullName.localeCompare(b.fullName)); // el metodo sort toma como parametro dos variables a y b, a corresponde al item actual y b el siguiente item de la lista, con localcomparate este metodo nos devuelve 1 o -1 ya sea que a es exactamente igual a b o no
    

    if(gotSearch){
       setGotList(gotApi.filter((got)=>  got.fullName.toLowerCase().includes(gotSearch) ||
                                        got.title.toLowerCase().includes(gotSearch)))   
    }
    else{
      setGotList(gotApi)
    }
  };

  useEffect(() => {
    getGot();
  }, [gotSearch]);

  return (
    <>
    <Buscador setGotSearch={setGotSearch}/>
      {gotList.length>0 ? gotList.map((got, e) => (
        <div key={e} className="">
          <Card style={{ width: "18rem" }}>
            <Card.Img variant="top" src={got.imagen} height="300" width="250" />
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
      )): <p>NOT FOUND</p> }
    </>
  );
};

export default MiApi;
