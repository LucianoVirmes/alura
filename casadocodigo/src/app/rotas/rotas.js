const db = require('../../config/database');
const LivroDao = require('../infra/livroDao');

module.exports = (app) => {

    app.get('/', function(req, res) {
       
            const livroDao = new LivroDao(db);
            livroDao.lista().then(livros =>
            res.marko(require('../views/livros/lista/lista.marko'), 
                {livros: livros}
            )).catch(erro => console.log(erro));
    });
    app.post('/', function(req, res){
        const livroDao = new LivroDao(db);
        livroDao.busca(req.body).then(livros=>
            res.marko(require('../views/livros/lista/lista.marko'),
            {
                livros:livros
            })
            ).catch(erro => console.log(erro));
    });

    app.get('/livros/form', function(req, res){
        res.marko(require('../views/livros/form/form.marko'));
    });

    app.post('/livros', function(req, res){
        
        const livroDao = new LivroDao(db);
        livroDao.adiciona(req.body).then(res.redirect('/')).catch(erro => console.log(erro));
    });
    app.delete('/:id', function(req, res){
        const id = req.params.id;
        const livroDao = new LivroDao(db);
        livroDao.remove(id).then(() => res.status(200).end()).catch(erro => console.log(erro));

    });
    app.get('/form/form.marko/:id', function(req, res){
        const id = req.params.id;
        const livroDao = new LivroDao(db);
        livroDao.busca(id).then(livro => 
                res.marko(require('../views/livros/form/form.marko'), 
                { livro: livro })
             )
        .catch(erro => console.log(erro));
    });
    app.put('/livros', function(req, res){
        
        const livroDao = new LivroDao(db);
        livroDao.atualiza(req.body).then(res.redirect('/')).catch(erro => console.log(erro));
    });
};