'use client'
import React, { useState } from "react"
import styles from '@/styles/viewpetshop.module.css'
import { Icon } from "@iconify/react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useApi } from "@/hooks/useApi";
import { useRouter } from 'next/navigation'

//Fanzendo validação do formulário
const createServiceFormSchema = z.object({
    nome: z.string().nonempty('O nome deve ser informado'),
    cpf: z.string()
        .nonempty('O cpf deve ser informado')
        .min(11, 'A senha deve ter 11 números')
        .max(11, 'A senha deve ter 11 números')
        .default('00000000000'),
    observation: z.string(),
    horario: z.string()
})

type CreateServiceFormData = z.infer<typeof createServiceFormSchema>

export default function viwePetShop({ params }: { params: { typeAccount: string } }) {

    const { register, handleSubmit, formState: { errors } } = useForm<CreateServiceFormData>({
        resolver: zodResolver(createServiceFormSchema)
    })

    const createService = async () => {

    }

    const router = useRouter();

    const handleCancel = () => {
        router.push('/acoes');
    };


    return (
        <main className={styles.main}>
            <div className={styles.container}>

                <div className={styles.formContainer}>
                    <h2 className={styles.titleForm}>Cadastrar serviço</h2>

                    <form className={styles.form}>
                        <label className={styles.label} htmlFor="nome">Nome</label>
                        <input className={styles.input} type="text" placeholder="Informe o nome do serviço" {...register('nome')} />
                        {errors.nome && <span className={styles.span}>{errors.nome.message}</span>}

                        <label className={styles.label} htmlFor="Descrição">Descrição</label>
                        <input className={styles.input} type="text" placeholder="Informe o uma descrição" {...register('nome')} />
                        {errors.nome && <span className={styles.span}>{errors.nome.message}</span>}

                        <label className={styles.label} htmlFor="Valor">Valor</label>
                        <input className={styles.input} type="text" placeholder="Informe o valor do serviço" {...register('nome')} />
                        {errors.nome && <span className={styles.span}>{errors.nome.message}</span>}


                        <button type="button" className={styles.btn} onClick={handleSubmit(createService)}>Cadastrar</button>
                        <button type="button" className={styles.btn} onClick={handleCancel}>Cancelar</button>
                    </form>

                </div>
            </div>

        </main>
    )
}