const { json } = require("body-parser");
const { Request, Response } = require("express");
const knex = require('../database/connection');

class Controller{
    async getClinicas(request, response){

        const query = "select C.*, E.*"
        +" from clinica C, endereco E"
        +" where C.idendereco = E.idendereco"
        +" order by idclinica ASC";

        const clinicas = await knex.raw(query);
        const transactions = await Promise.all(
            clinicas[0].map(async (clinica) => {
                const query = "select S.idservico from servico S, servico_clinica SC"
                + " where S.idservico = SC.idservico"
                + " and SC.idclinica = "+ clinica.idclinica
                + " order by S.idservico ASC";
                const servicos = await knex.raw(query);
                return {
                    id: clinica.idclinica,
                    nome: clinica.nome,
                    email: clinica.email,
                    whatsapp: clinica.whatsapp,
                    logradouro: clinica.logradouro,
                    cep: clinica.cep,
                    servicos: servicos[0].map((servico) => {return servico.idservico}),
                }
            })
        );
        return response.json(transactions);
    }
    async getServicosByClinica(request, response){
        const { id } = request.params;
        const query = "select S.* from servico S, servico_clinica SC"
            + " where S.idservico = SC.idservico"
            + " and SC.idclinica = "+ id
            + " order by S.idservico ASC";
        const servicos = await knex.raw(query);
        return response.json(servicos[0]);
    }

    async getServicos(request, response){
        const servicos = await knex.raw('select * from servico order by idservico asc');
        return response.json(servicos[0]);
    }
}

module.exports = Controller;