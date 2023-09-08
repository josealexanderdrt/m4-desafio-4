import "bootstrap/dist/css/bootstrap.min.css";

const Buscador = ({ setGotSearch }) => {
  const onSubmitHandle = (e) => {
    e.preventDefault();
    const buscarPalabra = e.target['buscador'].value.toLowerCase();
    setGotSearch(buscarPalabra);
  };

  const clearHandle = (e) => {
    e.preventDefault();
    setGotSearch('');
  };

  return (
    <div className=" d-flex text-center  align-items-star">
      <form onSubmit={onSubmitHandle} >
      
        <input
          type="text"
          name="buscador"
          id="buscador"
          placeholder="Buscar"
          className="w-100  text-center mt-4"
        />

        <div>
        <button className="m-2 boton">Buscar</button>
        <button className="m-2 boton" onClick={clearHandle}>Limpiar</button>
        </div>
      </form>
    </div>
  );
};

export default Buscador;
