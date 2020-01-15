const axios = require ('axios');
const Dev = require('../models/Dev');

module.exports = {
    async store(request, response) {
        const { github_username , techs, latitude, longitude } = request.body;
        
        let dev = await Dev.findOne({
            github_username
        });
        if(!dev){
            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`)
        
        
            let { name , avatar_url, bio } = apiResponse.data;
    
            if(!name){
                let {login} = apiResponse.data;
                name = login;
            }
    
            const techsarray = techs.split(',').map(tech => tech.trim());
            console.log(name, avatar_url, bio, github_username, techsarray);
    
            const location = {
                type: 'Point',
                coordinates: [longitude, latitude] 
            };
    
            const dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsarray,
                location
            });
        }
        
        return response.json(dev);
        }
};