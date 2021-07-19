const http = require('http')
const fs = require('fs')

//el servidor debe tener dos rutas, una para mostrar el html y otra para realizar el procesamiento de la imagen
http
.createServer((req, res) => {
    res.writeHead(200, {'Content-type': 'text/html; charset=utf-8' })
    if (req.url.includes("/")){
        fs.readFile('index.html', (err, data) => { //importante: la ruta no se abre desde este archivo js sino desde la base de donde este el package??
            res.end(data)
        })
    }
    if (req.url == ("/styles")){ //esta consulta la realizará el head del documento html cuando intente buscar como link un archivo css
        fs.readFile('assets/css/styles.css','utf-8', (err, css) => {
            res.writeHead(200, {'Content-type': 'text/css'})
            res.end(css)
        })
    }

    if (req.url.includes("/procesar")){
        console.log('procesando imagen...')
    }

})
.listen(3000, () => console.log("Servidor iniciado en el puerto 3000"))