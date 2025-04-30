import { createContext, useEffect, useState, useContext, ReactNode } from "react";
import { onAuthStateChanged, User, signOut } from "firebase/auth";
import { auth } from "../../../firebaseconfig";

// Definindo o tipo de AuthContext com função de logout
interface AuthContextType {
    user: User | null;
    loading: boolean;
    logout: () => Promise<void>; // Adicionada função de logout
}

// Criando o contexto com o tipo correto
const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            setUser(firebaseUser);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    // Função de logout usando Firebase Auth
    const logout = async (): Promise<void> => {
        try {
            await signOut(auth);
            // O estado do usuário será atualizado automaticamente pelo onAuthStateChanged
            console.log("Logout realizado com sucesso");
        } catch (error) {
            console.error("Erro ao fazer logout:", error);
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook para acessar o contexto
export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};