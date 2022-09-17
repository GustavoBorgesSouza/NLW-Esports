// const express = require('express'); normal importação
import express from 'express' //importacao por modulo
import cors from 'cors' 
import { PrismaClient } from '@prisma/client'
import { convertHourStringToMinutes } from './utils/convert-hour-string-to-minutes';
import { convertMinutesToHourString } from './utils/convert-minutes-to-hour-string';

const app = express()

app.use(express.json())
app.use(cors())

const prisma = new PrismaClient({
    log: ['query']
});

/**
 * Query: Usados para persistir estado, sempre nomeados. Usa-se com filtros, paginação, NUNCA com informações sensíveis.  
 * ex: localhost:3333/ads?page=2&sort=title
 * Route: Não nomeados, identificadores. Usa-se com identificação de recursos
 * ex: localhost:3333/ads/5
 * Body: Envio de várias informações em uma única requisição, não fica na Url. Mais usado para dados sensíveis e geralmente usado em envio de formulário
 * ex: {} JSON
 */


//HTTP methods / API RESTful / HTTP Codes

//async / await

//- Listagem de games com contagem de anúncios GET
app.get('/games', async (request, response) => {
    const games = await prisma.game.findMany({
        include: {
            _count: {
                select: {
                    ads: true,
                }
            }
        }
    })

    return response.json(games);
});

//- Criação de um anúncio POST
app.post('/games/:id/ads', async (request, response) => {

    const gameId: any = request.params.id;

    const body: any = request.body;

    //seria legal ter validação dps

    const ad = await prisma.ad.create({
        data: {
            gameId: gameId,
            name: body.name,
            yearsPlaying: body.yearsPlaying,
            discord: body.discord,
            weekDays: body.weekDays.join(','),
            hourStart: convertHourStringToMinutes(body.hourStart),
            hourEnd: convertHourStringToMinutes(body.hourEnd),
            useVoiceChannel: body.useVoiceChannel,
        }
    })

    return response.status(201).json(ad);
});


//- Listagem de anuncios por game GET
//parametro rota, funcao com  requisicao e resposta
// :**  faz ser dinâmico
app.get('/games/:id/ads', async (request, response) => {
    const gameId = request.params.id;

    const ads = await prisma.ad.findMany({
        select: {
            id: true,
            name: true,
            weekDays: true,
            useVoiceChannel: true,
            yearsPlaying: true,
            hourStart: true,
            hourEnd: true
        },
        where: {
            gameId: gameId
        },
        orderBy: {
            createdAt: "desc"
        }
    })

    return response.json(ads.map(ad => {
        return {
            ...ad,
            weekDays: ad.weekDays.split(','),
            hourStart: convertMinutesToHourString(ad.hourStart),
            hourEnd: convertMinutesToHourString(ad.hourEnd)
        }
    }))
})

//- Buscar discord pelo Id do anuncio GET
app.get('/ads/:id/discord', async (request, response) => {
    const adId = request.params.id;

    const ad = await prisma.ad.findUniqueOrThrow({
        select: {
            discord: true,
        }, where: {
            id: adId
        }
    })
    return response.json({
        discord: ad.discord,
    })
})


//localhost:3333/ads app ouve na porta tal, tipo localhost
app.listen(3333)
