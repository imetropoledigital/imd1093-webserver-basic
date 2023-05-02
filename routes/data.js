var express = require('express')
var router = express.Router()
const DataRepository = require('../repository/data.repo')

const Ajv = require("ajv")
const ajv = new Ajv()
const addFormats = require("ajv-formats")
addFormats(ajv)

const repository = new DataRepository()

const schema = {
    type: "object",
    properties: {
      deviceId: {type: "string"},
      ts: {type: "string"},
      value: {type: "string"}
    },
    required: ["deviceId", "ts", "value"],
    additionalProperties: false
}

router.post("/", async (req, res) => {
    const value = req.body
    const response = await save(value)
    res.status(response.status).json(response.object)
})

async function save(value) {
    try {
        if (!isValid(value)) {
            return {status: 400, object: { "msg": "Dados inválidos!"}}
        }else{
            const data = await repository.save(value)
            return {status: 200, object: { "msg": "Dados salvo com sucesso!!", data: data}}
        }
    } catch (error) {
        console.error(error)
        return {status: 500, object: { "msg": "Falha ao tentar realizar a operação!"}}
    }
}

function isValid(value){
    const isValid = ajv.validate(schema, value)
    if (!isValid) console.log(ajv.errors)
    return isValid
}

module.exports = router;