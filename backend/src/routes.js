const { Router } = require ('express');
const axios = require ('axios');
const Dev = require('./models/Dev');


const routes = Router();



//Métodos HTTP: get, post, put, delete;

//tipos de parâmetros:
//query params: request.query(filtros, ordenação, paginação, ...)    - ficam visiveis na URL (90% no metodo GET)
//route params: request.params (identificar um recurso na alteração ou remoção);
//body:  request.body (Dados para criação ou alteração de um registro);

routes.post('/devs', async (request, response) => {
    const { github_username , techs } = request.body;
    const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`)
    let { name , avatar_url, bio } = apiResponse.data;

    if(!name){
        let {login} = apiResponse.data;
        name = login;
    }

    const techsarray = techs.split(',').map(tech => tech.trim());
    console.log(name, avatar_url, bio, github_username, techsarray);

    const dev = await Dev.create({
        github_username,
        name,
        avatar_url,
        bio,
        techs: techsarray,
    });
    return response.json(dev);
});

module.exports = routes;