const { leerImput, inquirerMenu, pausa } = require('./helpers/inquirer');
const Busquedas = require('./models/busquedas');

require('colors')
console.log("Hola mundo");

const main = async()=>{
    
    
    do {
        opt = await inquirerMenu();
        console.clear();
        switch (opt) {
            
            case 1:
                const lugar = await leerImput('Ciudad: ');
                const busquedas = new Busquedas();
                await busquedas.ciudad(lugar);
            //Mostrar mensaje y mostrar ciudad, mostrar clima
               console.log('\nInformación de la ciudad\n'.green);
               console.log('Ciudad');
               console.log('Lat: ');
               console.log('Lng: ');
               console.log('Temperatura: ');
               console.log('Mínima: ');
               console.log('Máxima: ');
            break;
            case 2:
                
                break;

                case 0:
                
                    break;
    
        }


       if(opt !== 0) await pausa();
    } while (opt !== 0);


    const busquedas = new Busquedas();

}

main();