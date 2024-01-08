'use client'
import React, { useState } from "react"
import styles from '@/styles/login.module.css'
import { Icon } from "@iconify/react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Login({params}: {params: {typeAccount: string}}){
    const [showPass, setShowPass] = useState(false)
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const router = useRouter()

    const login = async () => {
        
        const response = await axios.create({
            baseURL: "http://localhost:8080/",
        }).request({
            method: 'post',
            url: 'autenticacao',
            data: {
                email,
                senha,
                tipo: params.typeAccount == 'cliente' ? 'client' : 'petshop'
            }
        })

        if(response){

            if(response.data.result.token){
                
                localStorage.setItem('userAuth', JSON.stringify(response.data.result))
                router.push(`/`)
            }
            
        }
    }
    
    return(
        <main className={styles.main}>
            <div className={styles.formContainer}>
                <div className={styles.headForm}>
                    <h1>Login</h1>
                </div>

                <form className={styles.form}>
                    <label className={styles.label} htmlFor="email">Email</label>
                    <input 
                        className={styles.input} 
                        type="text" name="email" 
                        placeholder="Informe seu email"
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <label className={styles.label} htmlFor="password">Senha</label>
                    <div className={styles.divPassword}>
                        <input 
                            className={styles.inputPassword} type={showPass ? 'text' : 'password'} 
                            name="password" 
                            placeholder="Digite sua senha"
                            onChange={(e) => setSenha(e.target.value)}
                        />

                        <div className={styles.divIcon}>
                            <Icon 
                            className={styles.icon} 
                            icon={showPass ? 'mdi:eye-off' : 'mdi:eye'}
                            onClick={() => setShowPass(!showPass)}
                            />
                        </div>
                    </div>
                </form>

                <div className={styles.divBtn}>
                    <button 
                        type="button" 
                        className={styles.btn}
                        onClick={login}
                    >Entrar</button>

                    <Link href={'/accountType'} className={styles.btn}>Voltar</Link>
                </div>

                <div className={styles.divA}>
                    <Link href={`/cadastro/${params.typeAccount}`} className={styles.a}>Não tem cadastro?</Link>
                </div>

            </div>
        </main>
    )
}