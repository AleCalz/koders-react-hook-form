export default function RHF() {
  return (
    <main className="w-full max-h-screen ">
      <div className="text-white flex flex-wrap gap-2 max-w-screen-md m-auto p-4 justify-between">
        <input
          type="text"
          placeholder="Nombre"
          className="rounded p-2 flex-1"
        />
        <input
          type="text"
          placeholder="Nombre"
          className="rounded p-2 flex-1"
        />
        <input
          type="text"
          placeholder="Nombre"
          className="rounded p-2 flex-1"
        />
        <button className=" bg-blue-900 w-full mt-3 p-3 rounded-md">
          Agregar
        </button>
      </div>
      <div>
        {/* lista de koders ** Componente a Renderizar**  esto podria ser el encabezado */}
        <div className="flex gap-2 max-w-screen-sm m-auto p-4 justify-between bg-blue-300">
          <span>Name</span>
          <span>Lastname</span>
          <span>Email</span>
          <span>❌</span>
        </div>
      </div>
    </main>
  );
}
