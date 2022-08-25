const {createPool} = require('mysql');

const pool = createPool({
    host : "localhost",
    user : "root",
    password : "password",
    database : "movies",
    connectionLimit : 10,
    port : 3306
});



let db  = {};

db.getMovieNames = () => {
    return new Promise((resolve, reject)=>{
        pool.query(`select * from movies_description`,(err,result)=>{
            if(err)
                return reject(err);
            else
                return resolve(result);
        });
    });
}


db.addMovie = (reqBody)=>{
    return new Promise((resolve, reject)=>{
        pool.query(`insert into movies_description (movie_description) value('${JSON.stringify(reqBody)}')`, (error, response)=>{
            if(error)
                return reject(error);
            else
                return resolve(response);
        })
    });
}



module.exports = db;