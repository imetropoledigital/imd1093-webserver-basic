const express = require('express');
const router = express.Router();
const DeviceRepository = require('../repository/device.repo')

const Ajv = require("ajv")
const ajv = new Ajv()

const repository = new DeviceRepository();

const schema = {
    type: "object",
    properties: {
      name: {type: "string", minLength: 3},
      description: {type: "string", maxLength: 255},
      engUnit: {type: "string", minLength: 1, maxLength: 10}
    },
    required: ["name", "engUnit"],
    additionalProperties: false
  }

router.get("/", async (req, res) => {
    const devices = await repository.findAll()
    res.json(devices)
});
  
router.get("/:id", async (req, res) => {
    const id = req.params.id
    if (id != undefined){
        const response = await findById(id);
        res.status(response.status).json(response.object)
    }else{
        res.status(400).json({ "msg": "É necessário indicar um id que deseja buscar"})
    }
});

async function findById(id) {
    try {
        const device = await repository.findById(id);
        if (device) {
            return {status: 200, object: device}
        } else {
            return {status: 404, object: { "msg": `Dispositivo de id ${id} não pode ser encontrado` }}
        }
    } catch (error) {
        return {status: 500, object: { "msg": "Falha ao tentar realizar a operação!"}}
    }
}
  
router.delete('/:id', async (req, res) => {
    const id = req.params.id
    if (id != undefined){
        const response = await deleteById(id)
        res.status(response.status).json(response.object)
    }else{
        res.status(400).json({ "msg": "É necessário indicar um id que deseja buscar"})
    }
})

async function deleteById(id) {
    try {
        const device = await repository.deleteById(id);
        if (device) {
            return {status: 200, object: device}
        } else {
            return {status: 404, object: { "msg": `Dispositivo de id ${id} não pode ser encontrado` }}
        }
    } catch (error) {
        console.error(error)
        return {status: 500, object: { "msg": "Falha ao tentar realizar a operação!"}}
    }
}
  
function isValid(device){
    const isValid = ajv.validate(schema, device)
    if (!isValid) console.log(ajv.errors)
    return isValid
}

router.post("/", async (req, res) => {
    const device = req.body
    const response = await save(device)
    res.status(response.status).json(response.object)
})

async function save(device) {
    try {
        if (!isValid(device)) {
            return {status: 400, object: { "msg": "Dispositivo inválido!!"}}
        }else{
            const data = await repository.save(device)
            return {status: 200, object: { "msg": "Dispositivo salvo com sucesso!!", data: data}}
        }
    } catch (error) {
        console.error(error)
        return {status: 500, object: { "msg": "Falha ao tentar realizar a operação!"}}
    }
}
  
router.put('/:id', async (req, res) => {
    const id = req.params.id
    const device = req.body
    if (id != undefined){
        const response = await updateById(id, device)
        res.status(response.status).json(response.object)
    }else{
        res.status(400).json({ "msg": "É necessário indicar um id que deseja alterar"})
    }
})

async function updateById(id, device) {
    try {
        if (!isValid(device)) {
            return {status: 400, object: { "msg": "Dispositivo inválido!!"}}
        }else{
            const data = await repository.updateById(id, device)
            return {status: 200, object: { "msg": "Dispositivo salvo com sucesso!!", data: data}}
        }
    } catch (error) {
        console.error(error)
        return {status: 500, object: { "msg": "Falha ao tentar realizar a operação!"}}
    }
}

module.exports = router;