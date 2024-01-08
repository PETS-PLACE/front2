"use client"
import React, { useState, useEffect } from "react";
import styles from '@/components/Header/Header.module.css'
import Image from "next/image";
import logo from '@/assets/logo.png'
import { Icon } from "@iconify/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type menu = {
    name: string,
    href: string
}

export default function Header() {
    const [openMenu, setOpenMenu] = useState(false)
    const [windowWidth, setWindowWidth] = useState<number>()
    let menuItems: menu[] = []
    const userAuth = JSON.parse(localStorage.getItem('userAuth') as string)
    const router = useRouter()

    console.log(userAuth);
    

    //Todos os item que estarão no menu
    if(userAuth && userAuth.tipo == 'client'){
        menuItems = [
            {
                name: 'Início',
                href: '/'
            },
            {
                name: 'Agendamentos',
                href: ''
            }
        ]
    }

    else if(userAuth &&  userAuth == 'petshop'){
        menuItems = [
            {
                name: 'Serviços',
                href: '/'
            },
            {
                name: 'Agendamentos',
                href: ''
            }
        ]
    }

    else{

        menuItems = [
            {
                name: 'Início',
                href: '/'
            },
            {
                name: 'Sobre',
                href: ''
            }
        ]
    }

    const logout = async () => {
        localStorage.clear()
        router.push('/accountType')
    }


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


    return (

        <header className={styles.header}>
            <div className={styles.divLogo}>
                <Image
                src={logo}
                alt="logo"
                className={styles.logo}
                />
            </div>

            {
                //menu deckstop
                windowWidth! > 720
                ?
                <div 
                className={styles.divMenu}
                >
                    <ul className={styles.ul}>
                        {
                            menuItems.map(menuItem => 
                                <li className={styles.li}>
                                    <a className={styles.a} href={menuItem.href}>{menuItem.name}</a>
                                </li>    
                            )
                        }
                    </ul>
                </div>
                :
                //menu mobile
                <div 
                className={styles.divMenuMobile}
                style={openMenu ?  {transform: 'translateX(0%)'} : {transform: 'translateX(100%)'} }
                >
                    <ul className={styles.ul}>
                        {
                            menuItems.map(menuItem => 
                                <li className={styles.li}>
                                    <a className={styles.a} href={menuItem.href}>{menuItem.name}</a>
                                </li>    
                            )
                        }
                    </ul>
                </div>
            }


            <div className={styles.divButton}>
                {
                    userAuth
                    ?
                    <>
                        <Link href="/accountType" className={styles.aEntrar} onClick={logout}>Sair</Link>
                        <Icon
                            icon="lucide:menu"
                            className={styles.menuIcon}
                            onClick={() => setOpenMenu(!openMenu)}
                        />
                    </>
                    :
                    <>
                        <Link href="/accountType" className={styles.aEntrar}>Entrar</Link>
                        <Icon
                            icon="lucide:menu"
                            className={styles.menuIcon}
                            onClick={() => setOpenMenu(!openMenu)}
                        />
                    </>

                }
            </div>

        </header>

    )
}