const express = require('express');
const userApi = require('./api/user');
const database = require('./config/database');
const postApi = require('./api/post');

console.log('Starting server....')
const app = express()
app.use(express.json())

app.get('/', (req, res) => {
    res.send({ response: 'Hello World!' });
})

app.post('/login', userApi.login);
app.post('/users', userApi.criarUsuario);

// Aplica a validação do token para as rotas abaixo
app.use(userApi.validarToken);
app.get('/users',userApi.listarUsuario);
app.put('/users/:id', userApi.alterarUsuario);
app.delete('/users/:id', userApi.deletarUsuario);

app.post('/post', postApi.criarPost);
app.get('/post', postApi.listarPosts);
app.put('/post/:id', postApi.alterarPost);
app.delete('/post/:id', postApi.deletarPost);


database.db.sync({ force: true })
    .then(() => {
        app.listen(3000, () => {
            console.log('Server is running on port 3000')
        })
    })
    .catch((error) => {
        console.error('Error connecting to the database', error);
    });

