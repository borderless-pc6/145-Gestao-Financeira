import type React from "react";
import "./HomePage.css";
import { useState } from "react";
import CreateUsers from "../CreateUsers/CreateUsers";

interface HomePageProps {
    username: string;
    onLogout: () => void;
    onNavigate: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ onLogout }) => {
    const [activeButton, setActiveButton] = useState<number | null>(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [showCreateUsers, setShowCreateUsers] = useState(false);

    const handleButtonClick = (index: number) => {
        setActiveButton(index);
        if (index === 5) {
            setShowCreateUsers(true);
        } else if (index === 8) {
            onLogout();
        }
    };

    if (showCreateUsers) {
        return <CreateUsers />;
    }

    return (
        <div className="home-container">
            <button className="menu-toggle" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                ☰
            </button>

            <aside className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
                <div className="header-content">
                    <div className="s-header-content column-buttons">
                        {[...Array(6)].map((_, index) => (
                            <button
                                key={index}
                                className={`section-button ${activeButton === index ? "active-button" : ""}`}
                                onClick={() => handleButtonClick(index)}
                            >
                                {/* Ícones SVG */}
                                {index === 0 && (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white" viewBox="0 0 24 24">
                                        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
                                    </svg>
                                )}
                                {index === 1 && (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white" viewBox="0 0 24 24">
                                        <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zm0 13a5.5 5.5 0 110-11 5.5 5.5 0 010 11z" />
                                    </svg>
                                )}
                                {index === 2 && (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white" viewBox="0 0 24 24">
                                        <path d="M3 3h18v2H3V3zm0 7h18v2H3v-2zm0 7h18v2H3v-2z" />
                                    </svg>
                                )}
                                {index === 3 && (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white" viewBox="0 0 24 24">
                                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c2.24 0 4.21 1.45 5 3.57C13.29 4.45 15.26 3 17.5 3 20.58 3 23 5.42 23 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                                    </svg>
                                )}
                                {index === 4 && (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white" viewBox="0 0 24 24">
                                        <path d="M3 13h2v-2H3v2zm2 2H3v6h2v-6zm4-2h14v2H9v-2zm0 4h10v2H9v-2z" />
                                    </svg>
                                )}
                                {index === 5 && (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white" viewBox="0 0 24 24">
                                        <path d="M12 12c2.21 0 4-1.79 4-4S14.21 4 12 4s-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                                    </svg>
                                )}
                            </button>
                        ))}

                        {/* BOTÃO DE SAIR */}
                        <button
                            className={`section-button logout-button ${activeButton === 8 ? "active-button" : ""}`}
                            onClick={() => handleButtonClick(8)}
                        >
                            Sair
                        </button>
                    </div>
                </div>
            </aside>

            <main className="home-content">
                <div className="welcome-card">
                    <h2>Bem-vindo à Página Inicial</h2>
                    <p>Você está logado no sistema.</p>
                    <p>Esta é a sua página inicial onde você pode acessar todas as funcionalidades do sistema.</p>
                </div>

                <div className="dashboard-grid">
                    <div className="dashboard-card">
                        <h3>Gestão</h3>
                        <p>Acesse as ferramentas de gestão</p>
                    </div>
                    <div className="dashboard-card">
                        <h3>Qualidade</h3>
                        <p>Verifique os indicadores de qualidade</p>
                    </div>
                    <div className="dashboard-card">
                        <h3>Relatórios</h3>
                        <p>Gere relatórios personalizados</p>
                    </div>
                    <div className="dashboard-card">
                        <h3>Configurações</h3>
                        <p>Configure seu ambiente</p>
                    </div>
                </div>
            </main>

            <footer className="home-footer">
                <p>Footer</p>
            </footer>
        </div>
    );
};

export default HomePage;