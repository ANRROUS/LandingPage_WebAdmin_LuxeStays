import { z } from 'zod';
export const registerSchema = z.object({
    username:z.string({
        required_error:"Usuario es requerido"
    }),
    email:z.string({
        required_error:"Email es requerido"
    }).email({
        message:"Email invalido"
    }),
    password:z.string({
        required_error:"Contraseña es requerida"
    }).min(6,{
        message:"La contraseña debe tener más de 6 caracteres"
    })
})

export const loginSchema = z.object({
    email:z.string({
        required_error:"Se necesita ingresar email"
    }).email({
        message:"Email invalido"
    }),
    password:z.string({
        required_error:"Se necesita ingresar contraseña"
    }).min(6,{
        message:"La contraseña debe tener más de 6 caracteres"
    })
})