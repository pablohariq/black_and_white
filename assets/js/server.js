const http = require('http')
const fs = require('fs')
const querystring = require('querystring')
const jimp = require('jimp')
const Jimp = require('jimp')
const { url } = require('inspector')

//el servidor debe tener dos rutas, una para mostrar el html y otra para realizar el procesamiento de la imagen
http
.createServer((req, res) => {
    if (req.url == ("/")){
        res.writeHead(200, {'Content-type': 'text/html; charset=utf-8' })
        fs.readFile('index.html', (err, data) => { //importante: la ruta no se abre desde este archivo js sino desde la base de donde este el package??
            res.end(data)
        })
    }
    if (req.url == ("/styles")){ //esta consulta la realizará el head del documento html cuando intente buscar como link un archivo css
        res.writeHead(200, {'Content-type': 'text/css'})
        fs.readFile('assets/css/styles.css', (err, css) => {
            res.end(css)
        })
    }

    if (req.url.includes("/procesarImagen")){
        const qs = req.url.split('?')[1]
        const urlImagen = querystring.parse(qs).url //este metodo no está deprecado a diferencia de url.parse
        Jimp.read(urlImagen)
        .then( img => {
            img.resize(350, Jimp.AUTO);
            img.greyscale();
            img.quality(60)
            img.write('imagenProcesada.jpg', () => {
                fs.readFile('imagenProcesada.jpg', (err, imagen) => {
                    res.write(imagen)
                    res.end()
                })
            })
        })
        .catch( err => console.log(err))
    }


})
.listen(3000, () => console.log("Servidor iniciado en el puerto 3000"))