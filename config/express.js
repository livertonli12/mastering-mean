var config         = require('./config'),
    express        = require('express'),
    morgan         = require('morgan'),
    compress       = require('compression'),
    bodyParser     = require('body-parser'),
    methodOverride = require('method-override'),
    session        = require('express-session'),
    flash          = require('connect-flash'),
    passport       = require('passport');

module.exports = function(){

  //---------------------------------------------------------
  // Inicialização do Express
  //---------------------------------------------------------
  var app = express();

  //---------------------------------------------------------
  // Decisões de Ambiente | Dev x Prox
  //---------------------------------------------------------
  if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
  } else if (process.env.NODE_ENV === 'production'){
    app.use(compress());
  }

  //---------------------------------------------------------
  // Middlewares de Configuração do Express
  //---------------------------------------------------------
  app.use(bodyParser.urlencoded({ extended:true }));
  app.use(bodyParser.json());
  app.use(methodOverride());
  app.use(session({
    saveUninitialized: true,
    resave: true,
    secret: config.sessionSecret
  }));

  app.set('views','./app/views');
  app.set('view engine','ejs');

  //Módulo responsável por nos possibilitar utilizar mensagens combinadas
  //com redirects
  app.use(flash());
  //---------------------------------------------------------
  // Configurações de Autenticação
  //---------------------------------------------------------
  app.use(passport.initialize());
  app.use(passport.session());
  //---------------------------------------------------------
  // Configurações de Roteamento
  //---------------------------------------------------------
  require('../app/routes/index.server.routes.js')(app);
  require('../app/routes/users.server.routes.js')(app);
  require('../app/routes/articles.server.routes.js')(app);
  //---------------------------------------------------------
  // Configuração de Conteúdo Estático
  // É importante respeitar a ordem na qual foi inserido
  // para que não haja lentidão no carregamento.
  //---------------------------------------------------------
  app.use(express.static('./public'));

  return app;
};
