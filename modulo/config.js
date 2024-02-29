/*************************************************************************************************
 * Objetivo: Arquivo responsavel pela padronização de variaveis e constantes globais do projeto
 * Data: 22/02/2024
 * Autor: Vinicius
 * Versão: 1.0
 * ***********************************************************************************************/
 
/************************* MENSAGEM DE ERRO DO PROJETO **********************************/
const ERROR_INVALID_ID = {status: false, status_code: 400, message: 'O dado encaminhado na requisição não é valido!!'}

const ERROR_NOT_FOUND = {status: false, status_code: 404, message: 'Não foi encontrado nenhum item!!'}

const ERROR_INTERNAL_SERVER_DB = {status: false, status_code: 500, message: 'Não foi possivel processar a requisição, devido ao um erro no acesso ao banco de dados. Contate o administrador da API!!'}



module.exports = {
ERROR_INVALID_ID,
ERROR_NOT_FOUND,
ERROR_INTERNAL_SERVER_DB,
}