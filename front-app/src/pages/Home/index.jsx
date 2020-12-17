import React, { useEffect, useState, FormEvent, ChangeEvent } from 'react';
import axios from 'axios';
import './styles.css';

const Home = () => {
    const [clinicas, setClinicas] = useState([]);
    const [servicos, setServicos] = useState([]);
    const [ordenamento, setOrdenamento] = useState({
        nome: 'nome',
        tipo: 'asc'
    });
    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        whatsapp: '',
        logradouro: '',
        cep: '',
    });
    const [selectedServicos, setSelectedServicos] = useState([]);
    useEffect(() => {
        async function getClinicas() {
            try {
                const { data } = await axios.get(localStorage.getItem('@server/link') + "/clinicas/"+ordenamento.nome+"/"+ordenamento.tipo);
                setClinicas(data);
            } catch (error) {
                console.log(error);
            }
        }
        getClinicas();
    });
    useEffect(() => {
        async function getServicos() {
            try {
                const { data } = await axios.get(localStorage.getItem('@server/link') + "/servicos");
                setServicos(data);
            } catch (error) {
                console.log(error);
            }
        }
        getServicos();
    });
    function handleSelectServico(id) {
        const alreadySelected = selectedServicos.findIndex(servico => servico == id);

        if (alreadySelected >= 0) {
            const filteredServicos = selectedServicos.filter(servico => servico !== id);
            setSelectedServicos(filteredServicos);
        } else {
            setSelectedServicos([...selectedServicos, id]);
        }
    }
    function handleInputChange(event) {
        const { name, value } = event.target;

        setFormData({ ...formData, [name]: value });
    }
    async function handleSubmit(event) {
        event.preventDefault();
        const { nome, logradouro, cep, email, whatsapp } = formData;
        const servicos_input = selectedServicos;
        const data = {
            nome,
            logradouro,
            cep,
            email,
            whatsapp,
            servicos_input
        };
        const res = await axios.post(localStorage.getItem('@server/link') + "/createClinica", data);
        console.log(res);
        return window.location.reload();
    }
    function handleOrdernamentoSet(event) {
        const { name, value } = event.target;

        setOrdenamento({ nome: name, tipo: value });
        return;
    }
    return (
        <div id="navbar">
            <nav className="p-2 text-center shadow">
                <span className="mb-0 h2 text-white text-center">
                    Visualizador de Clínicas
                </span>
            </nav>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-2 p-0 m-0 float-right">
                        <button id="btn-novaclinica" type="button" className="btn" data-toggle="modal" data-target="#novaClinicaModal">
                            <strong>Nova Clínica <i className="fas fa-plus-circle"></i></strong>
                        </button>
                    </div>
                    <div className="col-md-2 p-0 m-0">
                        <select name="nome" class="form-control " onChange={handleOrdernamentoSet}>
                            <option value="asc">NOME CRE</option>
                            <option value="desc">NOME DEC</option>
                        </select>
                    </div>
                </div>
                <div id="novaclinica">
                    <div className="modal fade" id="novaClinicaModal" tabIndex="-1" aria-labelledby="novaClinicaModalLabel" aria-hidden="true">
                        <div className="modal-dialog modal-lg modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <legend>
                                        <h2>Nova Clínica</h2>
                                    </legend>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <form id="form-novaclinica" onSubmit={handleSubmit}>
                                    <div className="modal-body">
                                        <fieldset>
                                            <div className="field">
                                                <label htmlFor="form-nome">Nome</label>
                                                <input required type="text" id="form-nome" name="nome" onChange={handleInputChange} />
                                            </div>
                                            <div className="field-group">
                                                <div className="field">
                                                    <label htmlFor="form-endereco">Endereço</label>
                                                    <input required type="text" name="logradouro" id="form-endereco" onChange={handleInputChange} />
                                                </div>
                                                <div className="field">
                                                    <label htmlFor="cep">CEP</label>
                                                    <input required maxLength={9} type="text" name="cep" id="form-cep" onChange={handleInputChange} />
                                                </div>
                                            </div>
                                            <div className="field-group">
                                                <div className="field">
                                                    <label htmlFor="form-email">E-mail</label>
                                                    <input required type="email" name="email" id="form-email" onChange={handleInputChange} />
                                                </div>
                                                <div className="field">
                                                    <label htmlFor="form-whatsapp">Whatsapp</label>
                                                    <input required type="text" name="whatsapp" id="form-whatsapp" onChange={handleInputChange} />
                                                </div>
                                            </div>
                                        </fieldset>
                                        <fieldset>
                                            <legend>
                                                <h2>Serviços</h2>
                                                <span>Selecione um ou mais serviços abaixo</span>
                                            </legend>

                                            <ul className="items-grid">
                                                {servicos.map((servico) => (
                                                    <li className={selectedServicos.includes(servico.idservico) ? 'selected' : ''} key={servico.idservico} onClick={() => handleSelectServico(servico.idservico)} >
                                                        {/* <img src={item.image_url} alt={item.title} /> */}
                                                        <span>{servico.nome}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </fieldset>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="submit">Adicionar</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                {clinicas.map((clinica) => (
                    <div key={clinica.idclinica} className="bg-white card-content row mt-3 sup-center">
                        <div className="etiqueta"><strong>CLÍNICA</strong></div>
                        <div className="col-md-7 pb-0 pt-0 pl-1 pr-1">
                            <p className="h4 mb-1 nome-clinica"><strong>{clinica.nome}</strong></p>
                            <span className="mr-3 p-1 cep">{clinica.cep}</span>
                            <span className="ml-3 p-1 email">{clinica.email}</span>
                            {/* <p className="h5 mb-1"><strong>{clinica.logradouro}</strong></p> */}
                        </div>
                        <div className="col-md-2 p-1">
                            {
                                servicos.map((servico) => (
                                    <div key={servico.idservico}>
                                        {
                                            clinica.servicos.includes(servico.idservico) ?
                                                <div className="servicos text-center p-1 color-selected mb-1 mt-1">
                                                    <p className="mb-0 text-uppercase font-weight-light">
                                                        <strong>{servico.nome}</strong>
                                                    </p>
                                                </div> :
                                                <div className="servicos text-center p-1 bg-white border mb-1 mt-1">
                                                    <p className="mb-0 text-uppercase font-weight-light">
                                                        <strong>{servico.nome}</strong>
                                                    </p>
                                                </div>
                                        }
                                    </div>
                                ))
                            }
                        </div>
                        <div className="col-md-2 text-center p-2 sup-center">
                            <div className="card-whatsapp p-3">
                                <i className="fab fa-whatsapp mr-2"></i>
                            WhatsApp
                            <p className="h5 mb-0">{clinica.whatsapp}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;