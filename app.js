const express = require('express')
const cors = require('cors')

const getTopics = require('./controllers/getTopics.controller')
const getAPI = require('./controllers/getAPI.controller')
const getArticleByID = require('./controllers/getArticleByID.controller')
const getArticles = require('./controllers/getArticles.controller')
const getComments = require('./controllers/getComments.controller')
const getUsers = require('./controllers/getUsers.controller')

const postComments = require('./controllers/postComments.controller')
const patchArticles = require('./controllers/patchArticles.controller')

const deleteComments = require('./controllers/deleteComments.controller')

const app = express()

app.use(cors())

app.use(express.json())

app.get('/api/topics', getTopics)
app.get('/api', getAPI)
app.get('/api/articles/:article_id', getArticleByID)
app.get('/api/articles', getArticles)
app.get('/api/articles/:article_id/comments', getComments)
app.get('/api/users', getUsers)

app.post('/api/articles/:article_id/comments', postComments)
app.patch('/api/articles/:article_id', patchArticles)

app.delete('/api/comments/:comment_id', deleteComments)

app.use((err, req, res, next) => {
    if (err.status){
        res.status(err.status).send({message: err.message})
    }
    else if (err.code === '23503' && err.detail === 'Key (author)=(1) is not present in table "users".'){
        res.status(400).send({ message: 'Bad Request' })
    }
    else if (err.code === '23503' && err.detail === 'Key (author)=(a) is not present in table "users".'){
        res.status(404).send({ message: 'Not Found' })
    }
    else if (err.code === '22P02' || '23502'){
        res.status(400).send({message: 'Bad Request'})
    }
    else {
        next(err)
    }
})

app.all('/*', (req, res, next) => {
    res.status(404).send({message: 'Not Found'})
})

module.exports = app