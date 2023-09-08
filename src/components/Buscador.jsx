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
    <div>
      <form onSubmit={onSubmitHandle}>
        Buscador
        <input
          type="text"
          name="buscador"
          id="buscador"
          placeholder="You can search by Name or Kingdom Badge"
          className=""

          // se necesita un evento para un cambio de estado, en este caso el Onchange, en este caso recibira TODA LA FUNCION
        />
        <button>Buscar</button>
        <button onClick={clearHandle}>Limpiar</button>
      </form>
    </div>
  );
};

export default Buscador;
