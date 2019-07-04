const restify = require('restify');

const errs = require('restify-errors')

const server = restify.createServer({
  name: 'detroit',
  version: '1.0.0'
});


const knex = require('knex')({
    client: 'mysql',
    connection: {
      host : 'localhost',
      user : 'root',
      password : 'root',
      database : 'certificacao'
    }
  });


server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

// server.get('/echo/:name', function (req, res, next) {
//   res.send(req.params);
//   return next();
// });

server.listen(8080, function () {
  console.log('%s listening at %s', server.name, server.url);
});

server.get('/listclient',  (req, res, next) => {

    knex('cliente').then((dados) =>{

        res.send(dados);
    }, next)
});

server.post('/createclient', (req, res, next) => {

    knex('cliente').insert(req.body).then((dados) => {
        res.send(dados);
        console.log(" Transação inserida  ", req.body);
    }, next)
    
});

server.put('/updateclient/:id', (req, res, next) => {
    
  const { id } = req.params;

  knex('cliente')
      .where('id', id)
      .update(req.body)
      .then((dados) => {
          if(!dados) return res.send(new errs.BadRequestError('nada foi encontrado'))
          res.send('dados atualizados');
      }, next)
      
});