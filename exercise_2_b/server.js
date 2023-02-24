const app = require('./src/app.js')
const obj = require('./package.json')
const PORT = 4000

app.listen(PORT, () => {
    console.log(`${obj.name} is now listening at port ${PORT}`)
})