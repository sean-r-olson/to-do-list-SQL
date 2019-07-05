const express = require( 'express' );
const app = express();
const bodyParser = require( 'body-parser' );
const pool = require( './modules/pool' );

// uses
app.use( express.static( 'server/public' ) );
app.use( bodyParser.urlencoded( { extended: true } ) );

// globals
const port = process.env.PORT || 5000;

// spin up server
app.listen( port, ()=>{
    console.log( 'server up on:', port );
})

//routes: 

//setup GET:
app.get ('/tasks', (req,res) => {
    console.log( 'in /tasks GET:');
    const query = `SELECT * FROM "tasks";`;
    pool.query(query)
    .then((results) => {
        res.send(results.rows);
    }).catch((err) => {
        console.log('error with GET', err);
        res.sendStatus(500);
    })
})




//setup POST:

//setup PUT:

