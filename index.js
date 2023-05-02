const express = require("express");
var device = require('./routes/devices');
var data = require('./routes/data');

const app = express();
app.use(express.json());

app.use('/device', device);
app.use('/data', data);

app.get("/", (req, res) => {
  res.send(`Bem vindo a API de Devices!`);
}); 

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});