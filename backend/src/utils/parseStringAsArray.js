module.exports = function parseStringArray(arrayString){
    console.log(arrayString);
    return  arrayString.split(',').map(tech => tech.trim());            
}