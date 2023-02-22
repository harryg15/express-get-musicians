const express = require("express");
const app = express();
const {Musician} = require("./Musician")
const {sequelize} = require("./db")

const port = 3000;

//TODO

app.listen(port, () => {
    sequelize.sync();
    console.log(`Listening on port ${port}`)
})

app.get('/musicians', async (req, res) => {
    const getMusicians = await Musician.findAll()
    res.json(getMusicians)
})

app.get('/musicians/:id', async (req, res) => {
    const getSpecific = await Musician.findByPk(req.params.id)
    res.json(getSpecific)
})

app.use(express.json())

//create
app.post('/musicians', async (req, res) => {
    await Musician.create(req.body)
    res.send(await Musician.findAll())
})

//update
app.put('/musicians/:id', async (req, res) => {
    await Musician.update(req.body, {where: {id: req.params.id}})
    res.send(await Musician.findAll())
})

//delete
app.delete('/musicians/:id', async (req, res) => {
    await Musician.destroy({where: {id: req.params.id}})
    res.send(await Musician.findAll())
})