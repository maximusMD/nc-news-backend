app.use(express.json())

app.all('/*', (req, res, next) => {
    res.status(404).send({message: 'Not Found'})
})

app.use((err, req, res, next) => {
    if (err.code = '22P02'){
        response.status(400).send({message: 'Bad Request'})
    }
    else if (err.status){
        res.status(err.status).send({message: err.message})
    }
})












