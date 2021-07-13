require("dotenv").config();

const {
  leerImput,
  inquirerMenu,
  pausa,
  listadoLugares,
} = require("./helpers/inquirer");
const Busquedas = require("./models/busquedas");
require("process");
require("colors");
const main = async () => {
    const busquedas = new Busquedas();
    
  do {
    opt = await inquirerMenu();
    console.clear();
    switch (opt) {
      case 1:
        //Mostrar mensaje
        const termino = await leerImput("Ciudad: ");
        //Buscar los lugares
        const lugares = await busquedas.ciudad(termino);
        //Seleccionar lugares
        const id = await listadoLugares(lugares);
        if (id === "0") continue;
        const lugarSeleccionado = lugares.find((l) => l.id === id);
         //Guardar en DB
         busquedas.agregarHistorial(lugarSeleccionado.nombre);
        //Clima
        const clima = await busquedas.climaLugar(
          lugarSeleccionado.lat,
          lugarSeleccionado.lng
        );
        //Mostrar mensaje y mostrar ciudad, mostrar clima
        console.clear();
        console.log("\nInformación de la ciudad\n".green);
        console.log("Ciudad: ", lugarSeleccionado.nombre);
        console.log("Lat: ", lugarSeleccionado.lat);
        console.log("Lng: ", lugarSeleccionado.lng);
        console.log("Nubosidad: ", clima.desc.green);
        console.log("Temperatura actual: ", ` ${parseInt(clima.temp)}°`.green);
        console.log("Maxima: ", ` ${parseInt(clima.temp_max)}°`.yellow);
        console.log("Minima: ", ` ${parseInt(clima.temp_min)}°`.yellow);
        break;
      case 2:
        busquedas.historialCapitalizado.forEach((lugar, i) => {
          const idx = `${i + 1}.`.green;
          console.log(`${idx} ${lugar}`.green);
        })
        break;
    }

    if (opt !== 0) await pausa();
  } while (opt !== 0);
};

main();
