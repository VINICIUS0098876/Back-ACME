/****************************************************************
 * Objetivo: Arquivo responsavel pelas validações e consistências de dados de filme
 * Data: 01/02/2024
 * Autor: Vinicius
 * Versão: 1.0
 ****************************************************************/

// Import do arquivo responsavel pela interação com DB(model)
const filmesDAO = require('../model/DAO/filme.js')
// Import do arquivo de configuração do projeto
const message = require('../modulo/config.js')

// Função para inserir um novo filme
const setInserirNovoFilme = async function(dadosFilme){

// Cria o objeto JSON para devolver os dados criados na requisição
    let novoFilmeJSON = {}

    //Validação de campos obrigatórios ou com digitação inválida
    if(dadosFilme.nome == ''                  || dadosFilme.nome == undefined            || dadosFilme.nome == null            || dadosFilme.nome.length > 80             || 
    dadosFilme.sinopse == ''                  || dadosFilme.sinopse == undefined         || dadosFilme.sinopse == null         || dadosFilme.sinopse.length > 65000       ||
    dadosFilme.duracao == ''                  || dadosFilme.duracao == undefined         || dadosFilme.duracao == null         || dadosFilme.duracao.length > 8           ||
    dadosFilme.data_lancamento == ''          || dadosFilme.data_lancamento == undefined || dadosFilme.data_lancamento == null || dadosFilme.data_lancamento.length != 10 ||
    dadosFilme.foto_capa == ''                || dadosFilme.foto_capa == undefined       || dadosFilme.foto_capa == null       || dadosFilme.foto_capa.length > 200       ||
    dadosFilme.valor_unitario.length > 6
    ){
        return message.ERROR_REQUIRED_FIELDS

    }

    else{

        let validateStatus = false

        // Outra validação com campos obrigatorios ou com digitação inválida
        if(dadosFilme.data_relancamento != null &&
             dadosFilme.data_relancamento != '' &&
              dadosFilme.data_relancamento != undefined){

            if(dadosFilme.data_relancamento.length != 10){
                return message.ERROR_REQUIRED_FIELDS//400
            }else{
                validateStatus = true
            }
        }else{
            validateStatus = true
        }

        // Validação para verificar se a variavel booleana é verdadeira
        if(validateStatus){

            // Encaminha os dados do filme para o DAO inserir no DB
            let novoFilme = await filmesDAO.insertFilme(dadosFilme)
            
            if(novoFilme){
                let idFilmes = await filmesDAO.IDFilme()
                dadosFilme.id = Number(idFilmes[0].id)
            }
    
            // Validação para verificar se o DAO inseriu os dados do DB
            if(novoFilme){
    
                //Cria o JSON de retorno dos dados (201)
                novoFilmeJSON.filme       = dadosFilme
                novoFilmeJSON.status      = message.SUCCESS_CREATED_ITEM.status
                novoFilmeJSON.status_code = message.SUCCESS_CREATED_ITEM.status_code
                novoFilmeJSON.message     = message.SUCCESS_CREATED_ITEM.message
    
                return novoFilmeJSON //201
                
            }else{
                return message.ERROR_INTERNAL_SERVER_DB //500
            }
        }else{
            validateStatus = false
        }

    }
}

// Função para atualizar um filme
const setAtualizarFilme = async function(){}

// Função para excluir um filme
const setExcluirFilme = async function(){}

// Função para listar filmes
const getListarFilmes = async function(){

    // Cria um objeto JSON chama a função DAO que retorna os filmes do banco 
    let filmesJSON = {}

    let dadosFilmes = await filmesDAO.selectAllFilmes()

    if(dadosFilmes == '' || dadosFilmes == undefined){
        return message.ERROR_INVALID_ID // 400
    }else{

         // Validação para verificar se o DAO retornou dados
    if(dadosFilmes){

        if(dadosFilmes.length > 0){
            // Cria o JSON para retornar para o APP
            filmesJSON.filmes = dadosFilmes
            filmesJSON.quantidade = dadosFilmes.length
            filmesJSON.status_code = 200
    
            return filmesJSON
        }else{
            return message.ERROR_NOT_FOUND // 404
        }

    }else {
        return message.ERROR_INTERNAL_SERVER_DB // 500
    }
    }

   
}

// Função para buscar filme
const getBuscarFilme = async function(id){

    // Recebe o id do filme
    let idFilme = id

    //Cria o objeto JSON
    let filmesJSON = {}


    //Validação para verificar se o id é válido(Vazio, indefinido e não numérico)
    if(idFilme == '' || idFilme == undefined || isNaN(idFilme)){
        return message.ERROR_INVALID_ID // 400
    }else{

        //Encaminha para o DAO localizar o id do filme 
        let dadosFilme = await filmesDAO.selectByIdFilme(idFilme)


        // Validação para verificar se existem dados de retorno
        if(dadosFilme){

            // Validação para verificar a quantidade de itens encontrados.
            if(dadosFilme.length > 0){
                //Criar o JSON de retorno
                filmesJSON.filmes = dadosFilme
                filmesJSON.status_code = 200
    
                return filmesJSON
            }else{
                return message.ERROR_NOT_FOUND // 404
            }

        }else{
            return message.ERROR_INTERNAL_SERVER_DB // 500
        }
    }
}

// Função para buscar nome do filme
const getNomeFilme = async function(nome){

    let nomeFilme = nome

    let filmesJSON = {}

    if(nomeFilme == '' || nomeFilme == undefined){
        return message.ERROR_INVALID_ID // 400
    }else{
        let dadosFilmes = await filmesDAO.selectNameFilmes(nome)
    
        if(dadosFilmes){
    
            if(dadosFilmes.length > 0){
                filmesJSON.nome = dadosFilmes
                filmesJSON.quantidade = dadosFilmes.length
                filmesJSON.status_code = 200
                
                return filmesJSON
            }else{
                return message.ERROR_NOT_FOUND // 404
            }
        }else{
            return message.ERROR_INTERNAL_SERVER_DB // 500
        }
    }


}


module.exports = {
    setInserirNovoFilme,
    setAtualizarFilme,
    setExcluirFilme,
    getListarFilmes,
    getBuscarFilme,
    getNomeFilme
}
