"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

function RegisterPage(){
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: "",
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
            const newUser = new User(formData);
            await newUser.encryptPassword(); 
            await newUser.save();
            const token = newUser.generateToken(); 

            router.push("/dashboard"); 
        } catch (error) {
            console.error("Error al registrar usuario:", error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder="Nombre" value={formData.name} onChange={handleChange} />
                <input type="email" name="email" placeholder="Correo electrónico" value={formData.email} onChange={handleChange} />
                <input type="password" name="password" placeholder="Contraseña" value={formData.password} onChange={handleChange} />
                <button type="submit">Registrarse</button>
            </form>
        </div>
    );
}

export default RegisterPage;
