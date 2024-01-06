"use client"
import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import styles from '@/styles/início.module.css'
import Header from '@/components/Header/Header'
import { useRouter } from 'next/navigation' 
import { useApi } from "@/hooks/useApi";

export default function Home() {
  const router = useRouter()
  const [petShops, setPetShops] = useState<object[]>([])

  // const findPetShops = async () => {
  //   const response = await useApi('get', 'petshop')

  //   if(response.status == 200){
  //     setPetShops(response.result) 
  //   }
  // }

  // useEffect(() => {
  //   findPetShops()
  // }, [])

  return (
    <>
      <Header/>
      <main className={styles.main}>
        <div className={styles.divFilters}>

          <div className={styles.divInput}>
            <input type="text" className={`${styles.search}`} placeholder="Buscar por petShop" />
            <Icon
              icon="material-symbols:search"
              className={styles.searchIcon}
            />
          </div>

          <div className={styles.divSelects}>

            <select defaultValue={0} className={`form-select ${styles.selects}`}>
              <option value="0">Serviço</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>

            <select defaultValue={0}  className={`form-select ${styles.selects}`} >
              <option value="0">Cidade</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>

            <select defaultValue={0}  className={`form-select ${styles.selects}`}>
              <option value="0">Estado</option>
              <option value="1">One fesfsefesfesfesfsfsfesff</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>

          </div>

        </div>

        {/* Cards list */}
        <div className={styles.cardContainer}>

          {/* {
            petShops.map((petShop:any) => 
              <div key={petShop.id} className={styles.card} onClick={() => router.push(`/viewpetshop/${petShop.id}`)}>
                <h2 className={styles.cardTitle}>{petShop.nome}</h2>
                <div>
                  <p className={styles.cardP}>Serviços Oferecidos</p>

                  <div className={styles.cardServices}>
                    {
                      petShop.services.map((service:any) => 
                        <p className={styles.service}>{service.name}</p>
                      )
                    }
                  </div>

                </div>

                <p>{petShop.cidade}</p>
              </div>
            )
          } */}



          <div className={styles.card} onClick={() => router.push('/viewpetshop/1')}>
            <h2 className={styles.cardTitle}>Pet Shop 1</h2>
            <div>
              <p className={styles.cardP}>Serviços Oferecidos</p>
              <div className={styles.cardServices}>
                <p className={styles.service}>Consulta</p>
                <p className={styles.service}>Passeio</p>
                <p className={styles.service}>Banho</p>
              </div>
            </div>

            <p>Currais Novos - RN</p>
          </div>

          <div className={styles.card} onClick={() => router.push('/viewpetshop/1')}>
            <h2 className={styles.cardTitle}>Pet Shop 1</h2>
            <div>
              <p className={styles.cardP}>Serviços Oferecidos</p>
              <div className={styles.cardServices}>
                <p className={styles.service}>Consulta</p>
                <p className={styles.service}>Passeio</p>
                <p className={styles.service}>Banho</p>
              </div>
            </div>

            <p>Currais Novos - RN</p>
          </div>

          <div className={styles.card} onClick={() => router.push('/viewpetshop/1')}>
            <h2 className={styles.cardTitle}>Pet Shop 1</h2>
            <div>
              <p className={styles.cardP}>Serviços Oferecidos</p>
              <div className={styles.cardServices}>
                <p className={styles.service}>Consulta</p>
                <p className={styles.service}>Passeio</p>
                <p className={styles.service}>Banho</p>
              </div>
            </div>

            <p>Currais Novos - RN</p>
          </div>
        </div>
      </main>
    </>
  )
}
