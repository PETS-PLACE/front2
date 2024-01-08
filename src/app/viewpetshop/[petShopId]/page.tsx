'use client'
import React, { useEffect, useState } from "react"
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

export default function viwePetShop({ params }: { params: { petShopId: string } }) {

    const [services, setServices] = useState([])
    let [petShop, setPetShop] = useState<any>({})
    const {register, handleSubmit, formState: {errors}} = useForm<CreateServiceFormData>({
        resolver: zodResolver(createServiceFormSchema)
    })

    const finOnePetShop = async () => {
        const response = await useApi('get', `petshop/${params.petShopId}`)

        if(response.status == 200){
            setPetShop(response.result[0])  
        }
    }

    const findAllServices = async () => {
        const response = await useApi('get', 'services')
    
        if(response.status == 200){
          setServices(response.result)
        }
      }

    const createService = async () => {

    }

    useEffect(() => {
        finOnePetShop()
        findAllServices()
    }, [])

    return (
        <main className={styles.main}>
            <div className={styles.container}>
                <h1 className={styles.h1}>{petShop.nome}</h1>

                <div className="row">
                    <div className="col-6 col-sm-6 col-md-3">
                        <h4>Cidade</h4>
                        <p>{petShop.cidade}</p>
                    </div>

                    <div className="col-6 col-sm-6 col-md-3">
                        <h4>Estado</h4>
                        <p>{petShop.estado}</p>
                    </div>

                    <div className="col-6 col-sm-6 col-md-3">
                        <h4>Bairro</h4>
                        <p>{petShop.bairro}</p>
                    </div>

                    <div className="col-6 col-sm-6 col-md-3">
                        <h4>Rua</h4>
                        <p>{petShop.rua} - Nº{petShop.numero} </p>
                    </div>
                </div>

                <h4 className={styles.h4}>Contatos</h4>
                <div className="row">
                    <div className="col-6 col-sm-6 col-md-3 d-flex">
                        <Icon icon={'ri:instagram-fill'} className={styles.icon}/>
                        <p>Instagram</p>
                    </div>

                    <div className="col-6 col-sm-6 col-md-3 d-flex">
                        <Icon icon={'mdi:facebook'} className={styles.icon}/>
                        <p>Facebook</p>
                    </div>

                    <div className="col-6 col-sm-6 col-md-3 d-flex">
                        <Icon icon={'ri:whatsapp-fill'} className={styles.icon}/>
                        <p>Whatsapp</p>
                    </div>

                    <div className="col-6 col-sm-6 col-md-3 d-flex">
                        <Icon icon={'mdi:email'} className={styles.icon}/>
                        <p>Email</p>
                    </div>
                </div>

                <div className={styles.formContainer}>
                    <h2 className={styles.titleForm}>Agendar Serviço</h2>
                    
                    <form className={styles.form}>
                        <label className={styles.label} htmlFor="nome">Nome</label>
                        <input className={styles.input} type="text" placeholder="Informe seu nome" {...register('nome')} />
                        {errors.nome && <span className={styles.span}>{errors.nome.message}</span>}

                        <label className={styles.label} htmlFor="cpf">CPF</label>
                        <input className={styles.input} type="text" placeholder="Informe seu cpf" {...register('cpf')} />
                        {errors.cpf && <span className={styles.span}>{errors.cpf.message}</span>}

                        <label className={styles.label} htmlFor="serviço">Selecionar Serviço</label>
                        {/* <input className={styles.input} type="text" placeholder="Informe seu nome" {...register('nome')} /> */}
                        <select className={styles.input}>
                            {
                                services.map((service:any) => 
                                <option value={service.id}>{service.name}</option>
                                )
                            }
                            <option value="0">Nenhum selecionado</option>
                        </select>
                        {errors.nome && <span className={styles.span}>{errors.nome.message}</span>}


                        <label className={styles.label} htmlFor="observation">observation</label>
                        <input className={styles.input} type="text" placeholder="Informe seu observation" {...register('observation')} />
                        {errors.observation && <span className={styles.span}>{errors.observation.message}</span>}

                        <label className={styles.label} htmlFor="horario">Horários Disponíves</label>
                        {/* <input className={styles.input} type="text" placeholder="Informe seu horario" {...register('horario')} /> */}
                        <select className={styles.input}>
                            <option value="1">Horário 1</option>
                            <option value="2">Horário 2</option>
                            <option value="3">Horário 3</option>
                        </select>
                        {errors.horario && <span className={styles.span}>{errors.horario.message}</span>}

                        <button type="button" className={styles.btn} onClick={handleSubmit(createService)}>Agendar</button>
                    </form>
                    
                </div>
            </div>

        </main>
    )
}