const express = require('express');
const app = express();

app.use(express.json());

var bancoDeDados= [
   { 
        id:1,
        nome: 'açucar',
        preço: 3,
        deletedAt: null,
    },
    { 
        id:2,
        nome: 'arroz',
        preço: 4,
        deletedAt: '22/082024',
    },
    { 
        id:3,
        nome: 'feijão',
        preço: 6,
        deletedAt: null,
    },
    { 
        id:4,
        nome: 'macarrão',
        preço: 2,
        deletedAt: null,
    }
];

app.get("/productos", (req, res) => {
    res.status(200).send({
        lista: bancoDeDados.filter(item => item.deletedAt == null)
    })
})



app.get("/productos/:id", (req, res) => {
    var idRequest = req.params.id;
    var producto = bancoDeDados.find(i => i.id == idRequest);

    res.status(200).send({
        producto: producto
    })
})

app.post("/criar/producto", (req, res) => {
console.log(req.body);

if(!req.body.nome ){
res.status(400).send({
    menssagem: "nome são obrigatorios"
})
}else{
    var novoId = bancoDeDados[bancoDeDados.length - 1].id + 1;
    console.log('NovoId' ,  novoId);
    var novoElement = {
        id: novoId,
        nome: req.body.nome,
        preço: req.body.preço
    }
    bancoDeDados.push(novoElement);
    
    res.status(200).send({
        novoElement: novoElement
    })
}
})

app.put("/atualizar/producto/:id", (req, res) => {
    var idRequest = req.params.id;
    var productoArray = bancoDeDados.findIndex(i => i.id == idRequest);

    if(productoArray >= 0){
        
        var novoNome = req.body.nome || bancoDeDados[productoArray].nome; //indicamos que vamos usar el nuevo nombre sino el nombre que ya existe
        var novoPreço = req.body.preço || bancoDeDados[productoArray].preço;
        console.log(novoNome)
        console.log(novoPreço)

        bancoDeDados[productoArray] = {
                    id: bancoDeDados[productoArray].id,
                    nome: novoNome, 
                    preço: novoPreço
                }
    
            res.status(200).send({
            lista:bancoDeDados
        });
    }else{
        res.status(400).send({
            menssagem: "Não encontrado"
        })
    } 
})


app.delete("/deletar/producto/:id", (req, res) => {
    
        // banco de dados
        // tabela chamada cliente
        // Id | Nome | Nascimento | Cidade | Email | CreatedAt | UpdatedAt | DeletedAt
        //  1 | Posto ABC ************************************************ | 22/08/2024 19:00 
        //  2 | Posto ABCDEF 
        
        var idRequest = req.params.id;
        var usuarioIndex = bancoDeDados.findIndex(i => i.id == idRequest);
      
        if (usuarioIndex >= 0) {
          bancoDeDados[productoArray].deletedAt = '22/08/2024 20:00';
      
          res.status(200).send({
            listaSemOsDeletados: bancoDeDados.filter(item => item.deletedAt == null),
            listaComOsDeletados: bancoDeDados,
            listaSomenteOsDeletados: bancoDeDados.filter(item => item.deletedAt != null),
          });
        } else {
          res.status(400).send({
            messagem: 'Produto não existente'
          });
        }
})

app.listen(9090, () => {
    console.log('iniciando')
})