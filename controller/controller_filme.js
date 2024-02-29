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
const setInserirNovoFilme = async function(){}

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
