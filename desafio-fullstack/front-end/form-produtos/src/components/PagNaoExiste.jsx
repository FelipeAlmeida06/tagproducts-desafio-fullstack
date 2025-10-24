// PagNaoExiste.jsx

import React from "react";

import Image1 from "../assets/imagem/pagina-nao-encontrada.jpg";

import { useNavigate } from "react-router-dom";

const PaginaNaoEncontrada = () => {
    const navigate = useNavigate();

    const voltarInicio = () => {
        navigate("/produtos/cadastro");
    };

    return (
        <div style={styles.container}>
            <div style={styles.content}>
                <img src={Image1} alt="Página Não Encontrada" style={styles.image} />
                <h1 style={styles.titulo}>404 Not Found</h1>
                <p style={styles.subtitulo}>Oooops. Essa página não existe.</p>
                <p style={styles.mensagem}>
                    A página que você está procurando não existe ou foi removida.
                </p>


                <button 
                    onClick={voltarInicio} 
                    style={styles.botao}
                    onMouseEnter={(e) => {
                        e.target.style.backgroundColor = '#0056b3';
                        e.target.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                        e.target.style.backgroundColor = '#007bff';
                        e.target.style.transform = 'translateY(0)';
                    }}
                >
                    Voltar para a Página de Cadastro
                </button>
            </div>
        </div>
    );
}

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: '#f8f9fa',
        fontFamily: 'Roboto, sans-serif',
        color: '#343a40',
        textAlign: 'center',
        padding: '20px',
        boxSizing: 'border-box',
    },
    content: {
        maxWidth: '600px',
        padding: '40px',
        //backgroundColor: '#ffffff',
        //borderRadius: '15px',
        //boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
    },
    image: {
        width: '100%',
        maxWidth: '300px',
        height: 'auto',
        marginBottom: '30px',
        borderRadius: '10px',
    },
    titulo: {
        fontSize: '5em',
        margin: '0',
        color: '#e74c3c',
        fontWeight: '700',
        letterSpacing: '5px',
    },
    subtitulo: {
        fontSize: '2em',
        margin: '10px 0 20px 0',
        color: '#555',
        fontWeight: '500',
    },
    mensagem: {
        fontSize: '1.1em',
        lineHeight: '1.6',
        marginBottom: '30px',
        color: '#6c757d',
    },
    link: {
        display: 'inline-block',
        marginTop: '20px',
        padding: '12px 25px',
        fontSize: '1.0em',
        color: '#ffffff',
        backgroundColor: '#007bff',
        textDecoration: 'none',
        borderRadius: '8px',
        transition: 'background-color 0.3s ease, transform 0.2s ease',
        fontWeight: '600',
    },
    // Efeito hover para o link
    linkHover: {
        backgroundColor: '#0056b3',
        transform: 'translateY(-2px)',
    },
    botao: {
        display: 'inline-block',
        marginTop: '20px',
        padding: '15px 30px',
        fontSize: '1.1em',
        color: '#ffffff',
        backgroundColor: '#007bff',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        fontWeight: '600',
        fontFamily: 'Roboto, sans-serif',
        boxShadow: '0 4px 6px rgba(0, 123, 255, 0.3)',
    }
};

export default PaginaNaoEncontrada