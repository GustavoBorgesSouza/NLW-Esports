// const express = require('express'); normal importação
import express from 'express' //importacao por modulo

const app = express()

//localhost:3333/ads

//parametro rota, funcao com  requisicao e resposta
app.get('/ads', (request, response) =>{
    return response.json([
        {id:1, name: 'anuncio 1'},
        {id:2, name: 'anuncio 2'},
        {id:3, name: 'anuncio 3'},
        {id:4, name: 'anuncio 4'}
    ])
})

//app ouve na porta tal, tipo localhost
app.listen(3333)
