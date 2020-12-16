import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './styles.css';

const Home = () => {
    const [clinicas, setClinicas] = useState([]);
    const [servicos, setServicos] = useState([]);
    useEffect(() => {
        async function getClinicas() {
            try {
                const { data } = await axios.get(localStorage.getItem('@server/link') + "/clinicas");
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
    return (
        <div id="navbar">
            <nav class="p-2 text-center shadow">
                <span class="mb-0 h2 text-white text-center">
                    Visualizador de Clínicas
                </span>
            </nav>
            <div className="container-fluid">
            {clinicas.map((clinica) => (
                <div className="bg-white card-content row mt-3">
                    <div className="col-md-1 m-0 p-0">CLINICA</div>
                    <div className="col-md-7 p-4">
                        <p className="h4 mb-1"><strong>{clinica.nome}</strong></p>
                        <span className="mr-3">{clinica.cep}</span>
                        <span className="ml-3">{clinica.email}</span>
                    </div>
                    <div className="col-md-2">
                        {
                            servicos.map((servico) => (
                                <>
                                {
                                    clinica.servicos.indexOf(servico.idservico) ? 
                                    <div className="servicos text-center p-1 color-selected">
                                        <p className="mb-0 text-uppercase font-weight-light">
                                            <strong>{servico.nome}</strong>
                                        </p>
                                    </div> : 
                                    <div className="servicos text-center p-1 bg-white border">
                                        <p className="mb-0 text-uppercase font-weight-light">
                                            <strong>{servico.nome}</strong>
                                        </p>
                                    </div>
                                }
                                </>
                            ))
                        }
                    </div>
                </div>
            ))}
            </div>
        </div>
    );
};

export default Home;