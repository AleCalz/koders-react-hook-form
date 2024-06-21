import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { getkoders, createKoder, deleteKoder } from "./api";
import { Toaster, toast } from "sonner";
export default function RHF() {
  //Recibe 2 cosas: funcion anonima, arreglo de dependencias
  //se utiliza para ejecutar codigo en el ciclo de vida de una coponente (renderiza(se monta), running(idl), cambio de estado o props y regresa al 1, se desmonta o se elimina)
  // se ejecuta en 2 momentos
  //1. cuando el componente se renderiza por primera vez
  //2. cuando alguna de sus dependencias cambia

  //un mismo compoonete puede tener varios useEfect
  useEffect(() => {
    getkoders()
      .then((koders) => {
        setKoders(koders);
      })
      .catch((error) => {
        console.error("Error al obtener koders: ", error);
        alert("Error al obtener koders");
      });
  }, []); // el arreglo se queda vacio para decir que solo queremos que se ejecute 1 vex al renderizar
  const {
    register,
    handleSubmit,
    reset,
    setFocus,
    formState: { errors, isValid, isSubmitted },
  } = useForm();
  const [koders, setKoders] = useState([]);

  async function OnSubmited(data) {
    try {
      await createKoder({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
      });

      const kodersList = await getkoders();
      setKoders(kodersList);
      setFocus("firstName");
      reset();
      toast.success("koder creado!");
    } catch (error) {
      console.error("Error al crear Koder: ", error);
      alert("Error al crear Koder");
    }
  }

  function onDelete(koderId) {
    deleteKoder(koderId)
      .then(() => {
        toast.success("koder Eliminado!");
        getkoders()
          .then((koders) => {
            setKoders(koders);
          })
          .catch((error) => {
            console.error("error al traer lista koders: ", error);
            alert("Error al obtener koders");
          });
      })
      .catch((error) => {
        console.error("Error al borrar un koder: ", error);
        alert("Error al eliminar un koder");
      });
  }

  return (
    <main className="w-full max-h-screen ">
      <Toaster position="top-right" richColors />
      <form
        onSubmit={handleSubmit(OnSubmited)}
        className="text-white flex flex-wrap gap-2 max-w-screen-md m-auto p-4 justify-between"
      >
        <input
          type="text"
          placeholder="Name"
          className="rounded p-2 flex-1 text-black"
          {...register("firstName", {
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
          placeholder="lastName"
          className="rounded p-2 flex-1 text-black"
          {...register("lastName", {
            required: { value: true, message: "Lastname requerido" },
            minLength: {
              value: 3,
              message: "Lastname, minimo 3 caracteres",
            },
            maxLength: { value: 20, message: "Lastname, maximo 20 caracteres" },
          })}
        />
        <input
          type="email"
          placeholder="email"
          className="rounded p-2 flex-1 text-black disabled:border-2 disabled:border-red-700 disabled:bg-red-400"
          {...register("email", {
            required: { value: true, message: "Email requerido" },
            minLength: {
              value: 3,
              message: "Email, minimo 3 caracteres",
            },
            maxLength: { value: 20, message: "Email, maximo 50 caracteres" },
            pattern: {
              value: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,
              message: "Ingresa un email valido",
            },
          })}
        />

        {/* Manejo de errores/cada input */}
        {errors.firstName && (
          <p className=" flex justify-center text-red-500 w-full font-bold text-md">
            {errors.firstName?.message}
          </p>
        )}
        {errors.lastName && (
          <p className=" flex justify-center text-red-500 w-full font-bold text-md">
            {errors.lastName?.message}
          </p>
        )}
        {errors.email && (
          <p className=" flex justify-center text-red-500 w-full font-bold text-md">
            {errors.email?.message}
          </p>
        )}

        <button
          className=" bg-[#5F5FBF] w-full mt-3 p-3 rounded-md disabled:bg-[#5f5fbf80] disabled:cursor-not-allowed disabled:text-gray-400"
          // isSubmited: true after the form is submitted.
          // isValid: true if the form doesn't have any errors.
          // si submit es true(ya se envio), evalua si es valido los inputs
          disabled={isSubmitted ? !isValid : false}
        >
          Agregar
        </button>
      </form>
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
            {/* Encabezado de la lista */}
            <div className="flex max-w-screen-sm m-auto p-2 mt-5  justify-between text-white font-bold">
              <span>Name</span>
              <span>Lastname</span>
              <span>Email</span>
              <span className=" bg-gray-800 rounded-md px-4">❌</span>
            </div>
            {/* lista de koders ** a Renderizar */}
            <div className=" flex flex-col max-w-screen-sm m-auto w-full rounded-b-2xl bg-[#C490D1]">
              {koders.map((koder, idx) => {
                return (
                  <div
                    key={`key-${idx}`}
                    className="flex text-black font-semibold gap-4 w-full  justify-between p-4  border-t-[#B8336A] border-t-4"
                  >
                    {/* <span>{koder.Name}</span>
                    <span>{koder.Lastname}</span>
                    <span>{koder.Email}</span> */}
                    <span>{koder.firstName}</span>
                    <span>{koder.lastName}</span>
                    <span>{koder.email}</span>
                    <span
                      className="p-1 bg-[#70263294] rounded hover:bg-[#702632f1] cursor-pointer"
                      onClick={() => {
                        onDelete(koder.id);
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
