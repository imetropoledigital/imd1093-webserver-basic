## Apresentação

Servidor http REST desenvolvido com Express para exercício do protocolo http e suas possibilidades

## Iniciando

Para iniciar, execute:

```shell
$ npm install
$ npm start
```

## Exercício

Crie uma validação para aceitar apenas dispositivos válidos nas operações de criação (POST) e edição (PUT).

Um dispositivo válido deve possuir as seguintes características:

1. Possuir um campo id numérico
1. Possuir um name com pelo menos 3 caracteres
1. Possuir uma unidade de engenharia com pelo menos 1 caracter e no máximo 10
1. Não deve ser permitido nenhuma propriedade extra

Exemplo de device válido:

```json
{
  "id": 1,
  "name": "Mede temperatura sala 203",
  "unidade": "ºF"
}
```

> Utilize a biblioteca ajv https://ajv.js.org/