var conexao = require("./conexaoBanco");
var express = require ('express');
var app = express();

var bodyParser = require('body-parser');

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true}));

app.set('view engine', 'ejs');


//Conexão ao banco de dados uma vez no ínicio
conexao.connect(function(error){
if (error){
    console.error("Erro ao conectar ao banco de dados:", error);
    process.exit(); //encerrar o servidor caso a conexão falhe
}
});




app.get('/', function(req, res){
    res.sendFile(__dirname+'/cadastro.html');
});


app.post('/', function(req, res){
    var nomecompleto = req.body.nomecompleto;
    var email = req.body.email;
    var senha = req.body.senha;

        //exemplo: var sql = "INSERT INTO estudante(nomecompleto, email, senha) VALUES (' "+nomecompleto+" ', ' "+email+" ', ' "+senha+" '))";

    //prevenindo SQL Injection
    var sql = "INSERT INTO estudante (nomecompleto, email, senha) VALUES (?, ?, ?)";
        conexao.query(sql, [nomecompleto, email, senha], function(error, result){
            if(error) throw error;

            // res.send("Estudante cadastro com sucesso!"+ result.insertId);

            res.redirect('/estudantes');
        });

    });

//Leitura do banco de dados
app.get('/estudantes', function(req, res){

    var sql = "select * from estudante";
    conexao.query(sql, function(error, result){
        if(error) console.log(error);
        //console.log(result);
        res.render(__dirname+"/estudantes", {estudantes:result});
        });
    });

//Rota de Delete
app.get('/delete-estudantes', function (req, res){

    var sql = "delete from estudante where id=?";

    var id=  req.query.id;

    conexao.query(sql, [id], function(error, result){
        if(error) console.log(error);

        res.redirect('/estudantes');
    });
});

//Rota update
app.get('/update-estudante', function(req, res){
    
    var sql = "select * from estudante where id=?"

    var id= req.query.id

    conexao.query(sql, [id], function(error, result){
        if(error) console.log(error);

        res.render(__dirname+'/alterarestudantes', {estudante:result});
    });
});

app.post('update-estudante',function (req, res){
    var nomecompleto = req.body.nomecompleto;
    var email = req.body.email;
    var senha = req.body.senha;
    var id = req.body.id;

    var sql = "UPDATE estudante set nomecompleto=?, email=?, senha=? where id=?";

    var id = req.query.id;

    conexao.query(sql, [nomecompleto, email, senha, id ], function(error, result){
        if(error) console.log(error);
        res.render(__dirname+'/alterarestudantes', {estudante:result});
        res.redirect('/estudantes');
    });
});

app.listen(7000);








//console.log("O banco de dados foi conectado!");

//conexao.query("select * from estudante", function(error, result){
//if(error) throw error;
//console.log(result);
//console.log(result[0]);
//con,sole.log(result[0].nomecompleto);
//});