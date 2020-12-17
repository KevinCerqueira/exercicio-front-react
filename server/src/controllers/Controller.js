const { json } = require("body-parser");
const { Request, Response } = require("express");
const knex = require('../database/connection');

class Controller{
    async getClinicas(request, response){
        const {table, type} = request.params;
        const query = "select C.*, E.*"
        +" from clinica C, endereco E"
        +" where C.idendereco = E.idendereco"
        +" order by " + table + " " + type;

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
    // async getServicosByClinica(request, response){
    //     const { id } = request.params;
    //     const query = "select S.* from servico S, servico_clinica SC"
    //         + " where S.idservico = SC.idservico"
    //         + " and SC.idclinica = "+ id
    //         + " order by S.idservico ASC";
    //     const servicos = await knex.raw(query);
    //     return response.json(servicos[0]);
    // }

    async getServicos(request, response){
        const servicos = await knex.raw('select * from servico order by idservico asc');
        return response.json(servicos[0]);
    }

    async createClinica(request, response){
        const {
            nome,
            logradouro,
            cep,
            email,
            whatsapp,
            servicos_input
        } = request.body;

        const trx = await knex.transaction();

        const endereco = {
            logradouro,
            cep
        };
        const res_edc = await trx('endereco').insert(endereco);
        const idendereco = res_edc[0];
        const clinica = {
            nome,
            email,
            whatsapp,
            idendereco
        };
        const res_clc = await trx('clinica').insert(clinica);
        const idclinica = res_clc[0];
        const servicos_clinica = servicos_input.map((idservico) => {
            return {
                idservico,
                idclinica,
            }
        });
        await trx('servico_clinica').insert(servicos_clinica);
        await trx.commit();

        return response.json({
            id: idclinica,
            ...clinica,
        });
    }
}

module.exports = Controller;