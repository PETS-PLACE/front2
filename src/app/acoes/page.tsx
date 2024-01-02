"use client"
import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import styles from '@/styles/acoes.module.css'
import stylesfrominicio from '@/styles/início.module.css'
import Header from '@/components/Header/Header'
import { useRouter } from 'next/navigation'
import { useApi } from "@/hooks/useApi";

export default function Home() {
  const router = useRouter()
  const [petShops, setPetShops] = useState<object[]>([])

  return (
    <>
      <Header />
      <main className={stylesfrominicio.main}>
        <div className={stylesfrominicio.divFilters}>

          <div className={stylesfrominicio.divInput}>
            <input type="text" className={`${stylesfrominicio.search}`} placeholder="Buscar Serviços" />
            <Icon
              icon="material-symbols:search"
              className={stylesfrominicio.searchIcon}
            />
          </div>

        </div>

        <div className={stylesfrominicio.cardContainer}>
          <div className={stylesfrominicio.card}>
            <h2 className={styles.cardTitle}>Banho e Tosa</h2>
            <div>
              <p className={styles.cardP}>Inclui banho e tosa higiênica para animais de estimação.</p>
              <h3 className={styles.valueT}>Valor</h3>
              <div className={styles.main}>
                <p className={styles.value}>R$ 50,55</p>
                <p className={styles.edit} onClick={() => router.push('/editservice/1')}>Editar</p>
                <p className={styles.delete}>Excluir</p>
              </div>
            </div>
          </div>

          <div className={stylesfrominicio.card}>
            <h2 className={styles.cardTitle}>Cuidados com a Pele e Pelagem</h2>
            <div>
              <p className={styles.cardP}>Tratamentos para a pele, hidratação e escovação para animais de estimação.</p>
              <h3 className={styles.valueT}>Valor</h3>
              <div className={styles.main}>
                <p className={styles.value}>R$ 40,80</p>
                <p className={styles.edit} onClick={() => router.push('/editservice/1')}>Editar</p>
                <p className={styles.delete}>Excluir</p>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.ddServiceDiv}>
          <p className={styles.addService} onClick={() => router.push('/registerservice/1')}>Adicionar Serviço</p>
        </div>
      </main>
    </>
  )
}
