"use client"
import React from "react"
import Image from "next/image"
import logo from '@/assets/logo.png'
import styles from '@/styles/accountType.module.css'
import Link from "next/link"

export default function AccountType(){
    return(
        <>
           <main className={styles.main}>
                <div className={styles.divLogo}>
                    <Image src={logo} className={styles.logo} alt="logo"/>
                    <h1 className={styles.h1}>Pets Place</h1>
                </div>

                <div className={styles.div2}>
                    <h2 className={styles.h2}>Escolha o tipo de conta para entrar</h2>

                    <div className={styles.divButton}>
                        <Link href={'/login/cliente'} className={styles.btn}>Conta de Cliente</Link >

                        <Link href={'/login/empresa'} className={styles.btn}>Conta de Empresa</Link>

                        <Link href={'/'} className={styles.btnVoltar}>Voltar</Link>
                    </div>
                </div>
           </main>
        </>
    )
}