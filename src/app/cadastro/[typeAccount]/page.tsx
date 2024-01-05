'use client'
import React, { useState } from "react"
import styles from '@/styles/cadastro.module.css'
import { Icon } from "@iconify/react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useApi } from "@/hooks/useApi";
import { useRouter } from 'next/navigation'

//Fanzendo validação do formulário
const createUserFormSchema = z.object({
    nome: z.string().nonempty('O nome deve ser informado'),
    email: z.string()
        .nonempty('O email deve ser informado')
        .email('Email inválido'),
    password: z.string()
        .nonempty('É necessário definir uma senha')
        .min(8, 'A senha deve ter 8 caracteres')
        .max(8, 'A senha deve ter 8 caracteres'),
    cpf: z.string()
        .nonempty('O cpf deve ser informado')
        .min(11, 'A senha deve ter 11 números')
        .max(11, 'A senha deve ter 11 números')
        .default('00000000000'),
    cnpj: z.string()
        .nonempty('O cnpj deve ser informado')
        .min(14, 'A senha deve ter 14 números')
        .max(14, 'A senha deve ter 14 números')
        .default('00000000000000'),
    rua: z.string().nonempty('O nome da rua deve ser informado'),
    numero: z.string().nonempty('O número de residencia deve ser informado'),
    bairro: z.string().nonempty('O bairro deve ser informado'),
    cidade: z.string().nonempty('A cidade deve ser informada'),
    estado: z.string().nonempty('O Estado deve ser informado'),
})

type CreateUserFormData = z.infer< typeof createUserFormSchema>

export default function Cadastro({params}: {params: {typeAccount: string}}){
    const [showPass, setShowPass] = useState(false)
    const {register, handleSubmit, formState: {errors}} = useForm<CreateUserFormData>({
        resolver: zodResolver(createUserFormSchema)
    })
    const router = useRouter()
    

    const createUser = async (dados:CreateUserFormData) => {
        console.log(dados);
        if(params.typeAccount == 'cliente'){

            const response = await useApi('post', 'clients', {
                nome: dados.nome,
                cpf: dados.cpf,
                rua: dados.rua,
                numero: Number(dados.numero),
                bairro: dados.bairro,
                cidade: dados.cidade,
                estado: dados.estado,
                email: dados.email,
                password: dados.password
            })

            if(response.status == 200){
                alert('Cadastro realizado com sucesso.')
                router.push(`/login/${params.typeAccount}`)
            }
        }

        else{
            const response = await useApi('post', 'petshop', {
                nome: dados.nome,
                cnpj: dados.cnpj,
                rua: dados.rua,
                numero: Number(dados.numero),
                bairro: dados.bairro,
                cidade: dados.cidade,
                estado: dados.estado,
                email: dados.email, 
                password: dados.password
            })

            if(response.status == 200){
                alert('Cadastro realizado com sucesso.')
                router.push(`/login/${params.typeAccount}`)
            }
        }
        
    } 
    
    return(
        <main className={styles.main}>
            <div className={styles.formContainer}>
                <div className={styles.headForm}>
                    <h1>Cadastro</h1>
                </div>

                <form className={styles.form}>

                    <label className={styles.label} htmlFor="nome">Nome</label>
                    <input className={styles.input} type="text" placeholder="Informe seu nome" {...register('nome')}/>
                    {errors.nome && <span className={styles.span}>{errors.nome.message}</span>}

                    <label className={styles.label} htmlFor="email">Email</label>
                    <input className={styles.input} type="email" placeholder="Informe seu email" {...register('email')}/>
                    {errors.email && <span className={styles.span}>{errors.email.message}</span>}

                    <label className={styles.label} htmlFor="password">Senha</label>
                    <div className={styles.divPassword}>
                        <input className={styles.inputPassword} type={showPass ? 'text' : 'password'} placeholder="Digite sua senha" {...register('password')}/>

                        <div className={styles.divIcon}>
                            <Icon 
                            className={styles.icon} 
                            icon={showPass ? 'mdi:eye-off' : 'mdi:eye'}
                            onClick={() => setShowPass(!showPass)}
                            />
                        </div>
                    </div>
                    {errors.password && <span className={styles.span}>{errors.password.message}</span>}

                    {
                        (params.typeAccount == 'cliente')
                        ?
                            <>
                                <label className={styles.label} htmlFor="cpf">CPF</label>
                                <input className={styles.input} type="text" placeholder="Digite apenas os números do cpf" {...register('cpf')}/>
                                {errors.cpf && <span className={styles.span}>{errors.cpf.message}</span>}
                            </>
                        :
                            <>
                                <label className={styles.label} htmlFor="cnpj">CNPJ</label>
                                <input className={styles.input} type="text"  placeholder="Digite apenas os números do cnpj" {...register('cnpj')}/>
                                {errors.cnpj && <span className={styles.span}>{errors.cnpj.message}</span>}
                            </>

                    }


                    <label className={styles.label} htmlFor="rua">Rua</label>
                    <input className={styles.input} type="text" placeholder="Informe o nome da rua" {...register('rua')}/>
                    {errors.rua && <span className={styles.span}>{errors.rua.message}</span>}

                    <label className={styles.label} htmlFor="numero">Número de Residencia</label>
                    <input className={styles.input} type="number" placeholder="Informe o número da residencia" {...register('numero')}/>
                    {errors.numero && <span className={styles.span}>{errors.numero.message}</span>}

                    <label className={styles.label} htmlFor="bairro">Bairro</label>
                    <input className={styles.input} type="text" placeholder="Informe o nome do bairro" {...register('bairro')}/>
                    {errors.bairro && <span className={styles.span}>{errors.bairro.message}</span>}

                    <label className={styles.label} htmlFor="cidade">Cidade</label>
                    <input className={styles.input} type="text" placeholder="Informe o nome da cidade" {...register('cidade')}/>
                    {errors.cidade && <span className={styles.span}>{errors.cidade.message}</span>}

                    <label className={styles.label} htmlFor="estado">Estado</label>
                    <input className={styles.input} type="text" placeholder="Informe o Estado" {...register('estado')}/>
                    {errors.estado && <span className={styles.span}>{errors.estado.message}</span>}

                    <button type="button" className={styles.btn} onClick={handleSubmit(createUser)}>Cadastrar</button>

                    <Link href={`/login/${params.typeAccount}`} className={styles.btnVoltar}>Cancelar</Link>
                </form>

            </div>
        </main>
    )
}