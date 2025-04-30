import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CreateUsers.css";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebaseconfig";

function CreateUsers() {
    const navigate = useNavigate(); // Hook para navegação
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            alert("As senhas não coincidem.");
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                formData.email,
                formData.password
            );

            const user = userCredential.user;
            console.log("Usuário criado com sucesso:", user);

            // Aqui você pode salvar mais dados no Firestore, se desejar
            alert("Usuário criado com sucesso!");

            // Após criar o usuário com sucesso, você pode redirecionar para a tela inicial
            navigate("/dashboard"); // Ajuste para a rota da sua tela inicial
        } catch (error: any) {
            console.error("Erro ao criar usuário:", error);
            alert(`Erro ao criar usuário: ${error.message}`);
        }
    };

    const handleBack = () => {
        // Navegar para o dashboard ou página inicial após o login
        navigate("/dashboard"); // Ajuste conforme necessário para a página correta
    };


    return (
        <div className="create-user-container">
            <h2>Criar Novo Usuário</h2>

            <form onSubmit={handleSubmit} className="create-user-form">
                <div className="form-group">
                    <label className="form-group-label" htmlFor="username">Nome de Usuário</label>
                    <input
                        className="form-group-input"
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
                    <button type="button" className="btn-back" onClick={handleBack}>
                        Voltar
                    </button>
                </div>
            </form>
        </div>
    );
}

export default CreateUsers;
