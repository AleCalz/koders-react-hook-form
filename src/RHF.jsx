import { useState } from "react";
import { useForm } from "react-hook-form";

// import Input from "./Components/Input";
export default function RHF() {
  // const valuesInput = [
  //   { value: "Name" },
  //   { value: "Lastname" },
  //   { value: "Email" },
  // ];
  const { register, handleSubmit, reset } = useForm();
  const [koders, setKoders] = useState([]);

  function OnSubmited(data) {
    // Creamos copia de koders y agregamos la nueva data(objeto)
    const newKoders = [...koders, data];
    // Actualizamos koders con nuestro nuevo array
    setKoders(newKoders);
    console.log("newKoders: ", newKoders);
    reset();
  }

  function removekoder(index) {
    console.log("index: ", index);
    //remover con filter
    const arrKoderRemoved = koders.filter((koder, idx) => idx !== index);
    setKoders(arrKoderRemoved);
  }

  return (
    <main className="w-full max-h-screen ">
      <form
        onSubmit={handleSubmit(OnSubmited)}
        className="text-white flex flex-wrap gap-2 max-w-screen-md m-auto p-4 justify-between"
      >
        <input
          type="text"
          placeholder="Name"
          className="rounded p-2 flex-1 text-black"
          {...register("Name", {
            required: { value: true, message: "Name requerido" },
            minLength: {
              value: 3,
              message: "Name, minimo 3 caracteres",
            },
            maxLength: { value: 20, message: "Name, maximo 20 caracteres" },
          })}
        />
        <input
          type="text"
          placeholder="Lastname"
          className="rounded p-2 flex-1 text-black"
          {...register("Lastname", {
            required: { value: true, message: "Lastname requerido" },
            minLength: {
              value: 3,
              message: "Lastname, minimo 3 caracteres",
            },
            maxLength: { value: 20, message: "Lastname, maximo 20 caracteres" },
          })}
        />
        <input
          type="text"
          placeholder="Email"
          className="rounded p-2 flex-1 text-black"
          {...register("Email", {
            required: { value: true, message: "Email requerido" },
            minLength: {
              value: 3,
              message: "Email, requiere minimo 3 caracteres",
            },
            maxLength: { value: 20, message: "Email, maximo 50 caracteres" },
          })}
        />

        <button className=" bg-blue-900 w-full mt-3 p-3 rounded-md">
          Agregar
        </button>
      </form>
      {/*  Encabezado de la lista */}
      {/* lista de koders ** Componente a Renderizar** */}

      <section>
        {/* si no hay datos */}
        {koders.length === 0 && (
          <p className="w-full flex bg-gray-900 text-white/30 max-w-screen-sm m-auto text-xl justify-center mt-5 font-bold py-10 rounded-lg">
            No hay koders registrados aun 🤷‍♀️
          </p>
        )}
        {/* si hay datos */}
        {koders.length > 0 && (
          <div>
            <div className="flex max-w-screen-sm m-auto p-2 mt-5  justify-between text-white font-bold">
              <span>Name</span>
              <span>Lastname</span>
              <span>Email</span>
              <span className=" bg-red-300 rounded-md">❌</span>
            </div>
            <div className=" flex flex-col max-w-screen-sm m-auto w-full rounded-b-2xl bg-orange-300">
              {koders.map((koder, idx) => {
                return (
                  <div
                    key={`key-${idx}`}
                    className="flex text-black font-semibold gap-4 w-full  justify-between p-4  border-t-yellow-600 border-t-4"
                  >
                    <span>{idx}</span>
                    <span>{koder.Name}</span>
                    <span>{koder.Lastname}</span>
                    <span>{koder.Email}</span>
                    <span
                      className="p-1 bg-red-400 rounded hover:border-2 border-red-800 cursor-pointer"
                      onClick={() => {
                        removekoder(idx);
                      }}
                    >
                      ❌
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
