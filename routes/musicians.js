const express = require("express")
const router = express.Router()
const {Musician} = require("../Musician")
const {check, validationResult} = require('express-validator')

router.use(express.json())

//get all
router.get('/', async (req, res) => {
    const getMusicians = await Musician.findAll()
    res.json(getMusicians)
})

//get specific
router.get('/:id', async (req, res) => {
    const getSpecific = await Musician.findByPk(req.params.id)
    res.json(getSpecific)
})

//create
router.post('/', [
    check("name").not().isEmpty().trim().isLength({min: 2, max: 20}),
    check("instrument").not().isEmpty().trim()
], async (req, res) => {

    const errors = validationResult(req)

    if(!errors.isEmpty()) {
        res.send({error: errors.array()})
    } else {
        await Musician.create(req.body)
        res.send(await Musician.findAll())
    }
})

//update
router.put('/:id', async (req, res) => {
    await Musician.update(req.body, {where: {id: req.params.id}})
    res.send(await Musician.findAll())
})

//delete
router.delete('/:id', async (req, res) => {
    await Musician.destroy({where: {id: req.params.id}})
    res.send(await Musician.findAll())
})

module.exports = router