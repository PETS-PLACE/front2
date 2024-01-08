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
  const [loading, setLoading] = useState(false)
  const [ufs, setUfs] = useState([])
  const [services, setServices] = useState([])
  const [nameFilter, setNameFilter] = useState()

  //Buscando todos os petshops
  const findPetShops = async (queryString?:any) => {
    setLoading(true) 
    const response = await useApi('get', `petshop/${queryString ? '?' + queryString : ''}`)

    if(response.status == 200){
      setPetShops(response.result) 
      setLoading(false)
    }
  }

  //Buscado todos os estados de uma api externa do ibge
  const findAllUfs = async () => {
    const response = await useApi('get', 'https://servicodados.ibge.gov.br/api/v1/localidades/estados')

    if(response.length > 0){
      setUfs(response)
    }
  }

  const findAllServices = async () => {
    const response = await useApi('get', 'services')

    if(response.status == 200){
      setServices(response.result)
    }
  }

  useEffect(() => {
      findPetShops()
      findAllUfs()
      findAllServices()
  }, [])

  return (
    <>
      <Header/>
      <main className={styles.main}>
        <div className={styles.divFilters}>

          <div className={styles.divInput}>
            <input type="text" className={`${styles.search}`} placeholder="Buscar por petShop" onChange={(e:any) => setNameFilter(e.target.value)}/>
            <Icon
              icon="material-symbols:search"
              className={styles.searchIcon}
              onClick={() => findPetShops(`nameFilter=${nameFilter}`)}
            />
          </div>

          <div className={styles.divSelects}>

            <select defaultValue={0} className={`form-select ${styles.selects}`} onClick={(e:any) => findPetShops(`serviceIdFilter=${e.target.value}`)}>
              <option value="0">Serviço</option>
              {
                services.map((service:any) => 
                  <option value={service.id}>{service.name}</option>
                )
              }
            </select>

            <select defaultValue={0}  className={`form-select ${styles.selects}`} >
              <option value="0">Cidade</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>

            <select defaultValue={0}  className={`form-select ${styles.selects}`} onClick={(e:any) => findPetShops(`estadoFilter=${e.target.value}`)}>
              <option value="0">Estado</option>
              {
                ufs.map((uf:any) => 
                  <option value={uf.nome}>{uf.nome}</option>
                )
              }
            </select>

          </div>

        </div>

        {/* Cards list */}
        <div className={styles.cardContainer}>
          {
            loading
            ?
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            :
              <>
                {
                  (petShops && petShops.length > 0)
                  ?
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
        
                        <p>{petShop.cidade} - {petShop.estado}</p>
                      </div>
                    )
                  :
                    <div className={styles.cardEmpty}>
                      <p className={styles.cardP}>Nenhum Pet Shop encontrado.</p>
                    </div>         
                  
                }
              </>
          }
        </div>
      </main>
    </>
  )
}
