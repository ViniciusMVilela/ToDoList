import app from './app'

const PORT = 3000;

function main() {
    app.listen(PORT, 'localhost', () => {
        console.log(`Servidor running at port ${PORT}`)
    })
}

main()