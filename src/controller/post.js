const Post = require('../model/post');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'batata';
class PostController {
    async criarPost(titulo, conteudo, autorId) {
        if (
            titulo === undefined
            || conteudo === undefined
            || autorId === undefined
        ) {
            throw new Error('titulo, conteudo e Id do Autor são obrigatórios');
        }

        // INSERT INTO users (nome, email, senha) VALUES (nome, email, senha);
        const post = await Post
            .create({ titulo, conteudo, autorId });
        return post;
    }

    async buscarPorId(id) {
        if (id === undefined) {

            throw new Error('Id é obrigatório');
        }

        const post = await Post.findByPk(id);

        if (!post) {

            throw new Error('Usuário não encontrado');
        }

        return post;
    }

    async alterarPost(id, titulo, conteudo, autorId) {
        if (
            id === undefined
            || titulo === undefined
            || conteudo === undefined
            || autorId === undefined
        ) {
            throw new Error('Id, titulo, conteudo e autorId são obrigatórios');
        }

        const post = await this.buscarPorId(id);
        post.titulo = titulo;
        post.conteudo = conteudo;
        // UPDATE users SET nome = nome, email = email, senha = senha WHERE id = id;
        post.save();
        return post;
    }

    async deletarPost(id) {
        if (id === undefined) {
            throw new Error('Id é obrigatório');
        }

        const post = await this.buscarPorId(id);

        post.destroy();

    }

    async listarPosts() {
        return Post.findAll();
    }

    async validarToken(token) {
        try {
            // Verifica se o token é válido e retorna o payload
            const payload = jwt.verify(token, JWT_SECRET_KEY);
            return payload;
        } catch (error) {

            throw new Error('Token inválido');
        }
    }
}

module.exports = new PostController();