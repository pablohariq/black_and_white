//inicia el levantamiento del servidor a traves de la linea de comandos
const yargs = require('yargs')
const child_process = require('child_process')

const descripcionIniciarServidor = 'Si la clave de acceso es correcta, ejecuta un script que levanta un servidor en el puerto 3000 que sirve el documento html de la aplicación, su estilo css y disponibiliza una ruta para procesar imagenes.'
const constructorIniciarServidor = {
    key: {
        describe: 'Clave de administrador para ejecutar el inicio del servidor.' ,
        demand: true,
        alias: 'k'
    }
}

const claveAdmin = 123
const iniciarServidor = (argv) => {
    console.log(argv.key)
    if (argv.key === claveAdmin){ //clave de admin
        child_process.exec(`node assets/js/server.js`)
    }
    else{
        console.error('Acceso denegado')
    }
}

yargs.command('iniciar', descripcionIniciarServidor, constructorIniciarServidor, iniciarServidor).help().argv