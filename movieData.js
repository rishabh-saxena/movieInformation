const axios = require('axios');
const Sequelize = require('sequelize');
const sequelize = new Sequelize('postgres://rishabsaxena:@localhost:5432/moviedatabase');
const getParamount = () => axios.get('  https://movie-api-lyalzcwvbg.now.sh/paramount');
const getDreamworks = () => axios.get( 'https://movie-api-lyalzcwvbg.now.sh/dreamworks');
const getActors = () => axios.get('https://movie-api-lyalzcwvbg.now.sh/actors');
function fetchMovieDb()
{
    getParamount()
.then(function (res)
{
    const result = dispresult(res.data,'paramount');
})
.catch(function(error)
{
    console.log(error);
});
    getDreamworks()
.then(function (res)
{
    const result = dispresult(res.data,'dreamworks');
})
.catch(function(error)
{
    console.log(error);
});
    getActors()
  .then(function (response) {
      addActors(response.data);
      addMovieActors(response.data);
  })
  .catch(function (error) {
      console.log(error);
  });
}
function dispresult(movieData,studio)
{
    movieData.forEach(function (element)
    {
        const movieName = element.movieName;
        const studioName = studio;
        const releaseDate = element.releaseDate;
        const query = `insert into movies (moviename,releasedate,studio) values ('${movieName}','${releaseDate}','${studioName}')`;
        const readTasks = sequelize.query(query);
        return readTasks;
    });
}
function addActors(actorData)
  {
    actorData.forEach(function (element)
    {   const actor = element.actorName;
        const query = `insert into actors (actorname) values ('${actor}')`;
        const populateActors = sequelize.query(query);
        return populateActors;
    });
}
function addMovieActors(movieActorData)
{
    movieActorData.forEach(function(element)
  {
        const actor = element.actorName;
        const movieNames = element.movies;
        movieNames.forEach(function(elementMovie)
      {
            const query = `insert into actors_check (actor_name,movie_name) values ('${actor}','${elementMovie}')`;
            const populatemovieActors = sequelize.query(query);
            return populatemovieActors;
        });
    });
}
function movieSelector(movie)
{ 
    const query = `select moviename,releasedate,studio from movies where moviename='${movie}'`;
    return  sequelize.query(query);
    //console.log(answer);
    //return answer;
}    
function actorSelector(movie)
{
    const query = `select actor_name from actors_check where movie_name='${movie}'`;
    return sequelize.query(query);
}
module.exports={fetchMovieDb,dispresult,addActors,addMovieActors,movieSelector,actorSelector};