'use client'
import React, { useState } from "react"
import styles from '@/styles/login.module.css'
import { Icon } from "@iconify/react";
import Link from "next/link";

export default function Login({params}: {params: {typeAccount: string}}){
    const [showPass, setShowPass] = useState(false)
    
    return(
        <main className={styles.main}>
            <div className={styles.formContainer}>
                <div className={styles.headForm}>
                    <h1>Login</h1>
                </div>

                <form className={styles.form}>
                    <label className={styles.label} htmlFor="email">Email</label>
                    <input className={styles.input} type="text" name="email" placeholder="Informe seu email"/>

                    <label className={styles.label} htmlFor="password">Senha</label>
                    <div className={styles.divPassword}>
                        <input className={styles.inputPassword} type={showPass ? 'text' : 'password'} name="password" placeholder="Digite sua senha"/>

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
                    <Link href={''} className={styles.btn}>Entrar</Link>
                    <Link href={'/accountType'} className={styles.btn}>Voltar</Link>
                </div>

                <div className={styles.divA}>
                    <Link href={`/cadastro/${params.typeAccount}`} className={styles.a}>Não tem cadastro?</Link>
                </div>

            </div>
        </main>
    )
}