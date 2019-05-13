class LivroDao {
    constructor(db){
        this._db = db;
    }
    lista(){
        return new Promise((resolve, reject) => {   
            this._db.all("SELECT * FROM livros", (erro, resultados) => {
                if(erro) return reject("Não foi possível listar os livros!");

                return resolve(resultados);
            });

        });
    }

    adiciona(livro){
        return new Promise((resolve, reject) => {
            this._db.run("INSERT INTO livros(titulo, preco, descricao) values (?,?,?)",
             [livro.titulo,livro.preco, livro.descricao], function(erro){
                if(erro) {
                    console.log(erro);
                    return reject("Não foi possível inserir o livro!");
                }
                resolve();
             });
        })
    }
    busca(codigo){
        return new Promise((resolve, reject) =>{
            this._db.get('SELECT * FROM livros WHERE id = ?', [codigo], function(erro, resultado){
                if(erro){
                    console.log(erro);
                    return reject('Não foi possível encontrar nenhum livro com esse código!');
                }
                return resolve(resultado);
            });
        });
    }
    remove(id) {

        return new Promise((resolve, reject) => {
            this._db.get(
                ` DELETE 
                    FROM livros
                    WHERE id = ?
                `,
                [id],
                (erro) => {
                    if (erro) {
                        return reject('Não foi possível remover o livro!');
                    }
                    return resolve();
                }
            );
        });
    }
    atualiza(livro){
        return new Promise((resolve, reject) => {
            this._db.run("update livros set titulo = ?, preco = ?, descricao = ? where id = ?",
             [livro.titulo,livro.preco, livro.descricao, livro.id], function(erro){
                if(erro) {
                    console.log(erro);
                    return reject("Não foi possível atualizar o livro!");
                }
                resolve();
             });
        })
    }
}

module.exports = LivroDao;