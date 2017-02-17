const express = require('express');
const app = express();
const {fetchMovieDb,dispresult,addActors,addMovieActors,movieSelector,actorSelector} = require('./movieData');
app.get('/movieFetch', function (req, res) { 
    const readTasks = fetchMovieDb();
    res.send('success');
});
app.get('/movie/:movie',function(req,res)
{
    const moviename = req.params.movie;
    let actors = [];
    Promise.all([movieSelector(moviename), actorSelector(moviename)])
    .then(function (result) {
        releasedate = result[0][0][0].releasedate;
        studio = result[0][0][0].studio;
        for(i=0; i < result[1][0].length; i++)
      {
          actors.push(result[1][0][i].actor_name);
      } 
        let finalResult={movie:moviename,releasedate:releasedate,studio:studio,actors:actors};
        res.send(finalResult); 
    })
    .catch (function (error) {
        console.log(error.toString());
    });

    
});

app.listen(3426);