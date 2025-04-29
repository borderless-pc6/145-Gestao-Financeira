import { useState } from "react";
import "./CreateUsers.css";


function CreateUsers({ onBack }: { onBack?: () => void }) {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: "user"
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Dados do formulário:", formData);
    };

    return (
        <div className="create-user-container">
            <h2>Criar Novo Usuário</h2>

            <form onSubmit={handleSubmit} className="create-user-form">
                <div className="form-group">
                    <label className="form-group-label" htmlFor="username">Nome de Usuário</label>
                    <input className="form-group-input"
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Senha</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirmar Senha</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="role">Função</label>
                    <select
                        id="role"
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                    >
                        <option value="user">Usuário</option>
                        <option value="admin">Administrador</option>
                        <option value="manager">Gerente</option>
                    </select>
                </div>

                <div className="form-buttons">
                    <button type="submit" className="btn-create">Criar Usuário</button>
                    {onBack && (
                        <button type="button" className="btn-back" onClick={onBack}>
                            Voltar
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
}

export default CreateUsers;