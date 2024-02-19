"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import  axios from "axios";

function LoginPage(){
    const router = useRouter();
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
         e.preventDefault();
         try {
             const user = await User.findOne({ email: formData.email });
             if (!user) {
              throw new Error("Usuario no encontrado");
            }
             const isMatch = await user.comparePassword(formData.password, user.password);
             if (!isMatch) {
                 throw new Error("Contraseña incorrecta");
             }
             const token = user.generateToken();
            router.push("/dashboard");
        } catch (error) {
             console.error("Error al iniciar sesión:", error);
         }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="email" name="email" placeholder="Correo electrónico" value={formData.email} onChange={handleChange} />
                <input type="password" name="password" placeholder="Contraseña" value={formData.password} onChange={handleChange} />
                <button type="submit">Iniciar sesión</button>
            </form>
        </div>
    );
}

export default LoginPage;
