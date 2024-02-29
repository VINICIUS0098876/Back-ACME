/****************************************************************
 * Objetivo: Arquivo responsavel pela manipulação de dados MySQL,
 * aqui realizamos o CRUD utilizando a linguagem sql
 * Data: 01/02/2024
 * Autor: Vinicius
 * Versão: 1.0
 ****************************************************************/

// Importa de biblioteca do @prisma/client
const { PrismaClient } = require('@prisma/client')

// Instacia da classe PrismaClient
const prisma = new PrismaClient()

// Função para inserir um novo filme no banco de dados;
const insertFilme = async function(){}

// Função para atualizar um filme no banco de dados;
const updateFilme = async function() {}

// Função para excluir um filme no banco de dados;
const deleteFilme = async function(){}

// Função para listar todos os filmes do banco de dados;
const selectAllFilmes = async function(){
    try {
        let sql = 'select * from tbl_filme'
    
        // $queryRawUnsafe(sql)
        // $queryRawUnsafe('select * from tbl_filme')
        let rsFilmes = await prisma.$queryRawUnsafe(sql) 
        return rsFilmes
    } catch (error) {
        return false
    }



}

// Função para buscar um filme do banco de dados pelo ID;
const selectByIdFilme = async function(id){

    try {
        // Script sql para buscar o filme pelo id
        const sql = `select * from tbl_filme where id = ${id}`
    
        // Caminha o script sql para o banco de dados
        let rsFilme = await prisma.$queryRawUnsafe(sql)
    
        return rsFilme
    } catch (error) {
        return false
    }

}

const selectNameFilmes = async function(nome){
    try {
        let sql = `select * from tbl_filme where nome like"%${nome}%"`
        let rsFilmes = await prisma.$queryRawUnsafe(sql)
        return rsFilmes
    } catch (error) {
        return false
    }



}


module.exports = {
    insertFilme,
    updateFilme,
    deleteFilme,
    selectAllFilmes,
    selectByIdFilme,
    selectNameFilmes
}