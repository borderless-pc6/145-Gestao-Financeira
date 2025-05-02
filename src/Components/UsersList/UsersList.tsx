import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './UsersList.css';

interface User {
    id: number;
    nome: string;
    email: string;
    funcao: string;
}

function UserList() {
    const [users, setUsers] = useState<User[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            const mockUsers: User[] = [
                { id: 1, nome: 'João Silva', email: 'joao.silva@empresa.com', funcao: 'Administrador' },
                { id: 2, nome: 'Maria Oliveira', email: 'maria.oliveira@empresa.com', funcao: 'Gerente' },
                { id: 3, nome: 'Carlos Santos', email: 'carlos.santos@empresa.com', funcao: 'Consultor-Externo' },
                { id: 4, nome: 'Ana Souza', email: 'ana.souza@empresa.com', funcao: 'Analista' },
                { id: 5, nome: 'Pedro Lima', email: 'pedro.lima@empresa.com', funcao: 'Consultor-Externo' },
                { id: 6, nome: 'Fernanda Costa', email: 'fernanda.costa@empresa.com', funcao: 'Analista' },
                { id: 7, nome: 'Roberto Alves', email: 'roberto.alves@empresa.com', funcao: 'Gerente' },
                { id: 8, nome: 'Juliana Martins', email: 'juliana.martins@empresa.com', funcao: 'Administrador' },
            ];
            setUsers(mockUsers);
            setLoading(false);
        }, 800);
    }, []);

    const filteredUsers = users.filter(user =>
        user.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.funcao.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const handleDeleteUser = (userId: number) => {
        if (window.confirm('Tem certeza que deseja excluir este usuário?')) {
            setUsers(users.filter(user => user.id !== userId));
        }
    };

    const handleEditUser = (userId: number) => {
        alert(`Editar usuário com ID: ${userId}`);
    };

    const handleAddUser = () => {
        navigate("/create-user");
    };

    return (
        <div className="user-list-container">
            <div className="user-list-header">
                <h1>Usuários Cadastrados</h1>
                <button className="add-user-btn" onClick={handleAddUser}>
                    Adicionar Usuário
                </button>
            </div>

            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Pesquisar por nome, email ou função..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
                {searchTerm && (
                    <button className="clear-search" onClick={() => setSearchTerm('')}>
                        ✕
                    </button>
                )}
            </div>

            {loading ? (
                <div className="loading-indicator">Carregando usuários...</div>
            ) : (
                <>
                    <div className="users-count">
                        {filteredUsers.length} {filteredUsers.length === 1 ? 'usuário encontrado' : 'usuários encontrados'}
                    </div>

                    {filteredUsers.length > 0 ? (
                        <div className="user-table-container">
                            <table className="user-table">
                                <thead>
                                    <tr>
                                        <th>Nome</th>
                                        <th>Email</th>
                                        <th>Função</th>
                                        <th>Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredUsers.map(user => (
                                        <tr key={user.id}>
                                            <td>{user.nome}</td>
                                            <td>{user.email}</td>
                                            <td>
                                                <span className={`user-role ${user.funcao.toLowerCase()}`}>
                                                    {user.funcao}
                                                </span>
                                            </td>
                                            <td className="actions-cell">
                                                <button
                                                    className="edit-btn"
                                                    onClick={() => handleEditUser(user.id)}
                                                    title="Editar"
                                                >
                                                    ✎
                                                </button>
                                                <button
                                                    className="delete-btn"
                                                    onClick={() => handleDeleteUser(user.id)}
                                                    title="Excluir"
                                                >
                                                    ✕
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="no-results">
                            Nenhum usuário encontrado com os critérios de pesquisa.
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

export default UserList;
