"use client"
import React, { useState, useEffect } from "react";
import styles from '@/components/Header/Header.module.css'
import Image from "next/image";
import logo from '@/assets/logo.png'
import { Icon } from "@iconify/react";
import Link from "next/link";

export default function Header(){
    const [openMenu, setOpenMenu] = useState(false)
    const [windowWidth, setWindowWidth] = useState<number>()
    
    useEffect(() => {
        // Verifica se o código está sendo executado no lado do cliente (navegador)
        if (typeof window !== 'undefined') {
          // Define o tamanho inicial da tela
          setWindowWidth(window.innerWidth);
          setWindowWidth(window.innerHeight);
    
          // Adiciona um event listener para redimensionamento da janela
          window.addEventListener('resize', () => setWindowWidth(window.innerWidth));
    
          // Remove o event listener ao desmontar o componente para evitar vazamentos de memória
          return () => window.removeEventListener('resize', () => setWindowWidth(window.innerWidth));
        }
      }, []); // O array vazio [] garante que o useEffect será executado apenas uma vez
    

    return( 
    
        <header className={styles.header}>
            <div className={styles.divLogo}>
                <Image
                src={logo}
                alt="logo"
                className={styles.logo}
                />
            </div>

            {
                windowWidth! > 720
                ?
                <div 
                className={styles.divMenu}
                >
                    <ul className={styles.ul}>
                        <li className={styles.li}>
                            <a className={styles.a} href="/">Início</a>
                        </li>
                       
                        <li  className={styles.li}>
                            <a className={styles.a} href="">Sobre</a>
                        </li>
                    </ul>
                </div>
                :
                <div 
                className={styles.divMenuMobile}
                style={openMenu ?  {transform: 'translateX(0%)'} : {transform: 'translateX(100%)'} }
                >
                    <ul className={styles.ul}>
                        <li className={styles.li}>
                            <a className={styles.a} href="/">Início</a>
                        </li>
                        
                        <li  className={styles.li}>
                            <a className={styles.a} href="">Sobre</a>
                        </li>
                    </ul>
                </div>
            }


            <div className={styles.divButton}>
                <Link href="/accountType" className={styles.aEntrar}>Entrar</Link>
                <Icon
                icon="lucide:menu"
                className={styles.menuIcon}
                onClick={() => setOpenMenu(!openMenu)}
                />
            </div>
        </header>
        
    )
}