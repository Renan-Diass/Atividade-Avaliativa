const controller = require('../controller/post');

class PostApi {

    async criarPost(req, res) {
        const { titulo, conteudo, autorId } = req.body;
        try {
            const post = await controller.criarPost(titulo, conteudo, autorId);
            return res.status(201).send(post);
        } catch (error) {
            return res.status(400).send({ error: error.message })
        }
    }

    async alterarPost(req, res) {
        const { id } = req.params;
        const { titulo, conteudo, autorId } = req.body;

        try {
            const post = await controller.alterarPost(Number(id), titulo, conteudo, autorId);
            return res.status(200).send(post);
        } catch (error) {
            return res.status(400).send({ error: error.message })
        }
    }

    async deletarPost(req, res) {
        const { id } = req.params;

        try {
            await controller.deletarPost(Number(id));
            return res.status(204).send();
        } catch (error) {
            return res.status(400).send({ error: error.message })
        }
    }

    async listarPosts(req, res) {

        try {
            const posts = await controller.listarPosts();
            return res.status(200).send(posts);
        } catch (error) {
            return res.status(400).send({ error: error.message })
        }
    }

    async validarToken(req, res, next) {
        const token = req.headers.authorization;

        try {
            await controller.validarToken(token);
            next();
        } catch (error) {
            return res.status(400).send({ error: error.message })
        }
    }
}

module.exports = new PostApi();