'use client'
import isAuthenticated from "@/auth"
import { useEffect, useState } from "react";
import styles from '@/styles/userPets.module.css'
import { Icon } from "@iconify/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useApi } from "@/hooks/useApi";

const createPetFormSchema = z.object({
  nome: z.string().nonempty('O nome deve ser informado'),
  especie: z.string().nonempty('A espécie deve ser informada'),
  idade: z.string().nonempty('A idade deve ser informada'),
  peso: z.string().nonempty('O peso deve ser informado'),
})

type CreatePetFormData = z.infer<typeof createPetFormSchema>

export default function UserPets() {
  const { register, handleSubmit, formState: { errors } } = useForm<CreatePetFormData>({
    resolver: zodResolver(createPetFormSchema)
  })

  const userAuth = JSON.parse(localStorage.getItem('userAuth') as string)
  const [pets, setPets] = useState([])
  const [petSelected, setPetSelected] = useState({
    id: null,
    nome: '',
    especie: '',
    idade: '',
    peso: ''
  })
  const [updateNome, setUpdateNome] = useState('')
  const [updateEspecie, setUpdateEspecie] = useState('')
  const [updateIdade, setUpdateIdade] = useState('')
  const [updatePeso, setUpdatePeso] = useState('')

  const createPet = async (dados: CreatePetFormData) => {
    const response = await useApi('post', `animais`, {
      nome: dados.nome,
      especie: dados.especie,
      idade: Number(dados.idade),
      peso: Number(dados.peso),
      cliente: userAuth.nome
    }
    )

    if (response.id) {
      alert('Animal cadstrado com sucesso.')
      findAllPets()
    }
  }

  const findAllPets = async () => {
    const response = await useApi('get', 'animais')

    if (response.length > 0) {
      setPets(response)
    }
  }

  const updatePet = async () => {
    const response = await useApi('patch', `animais/${petSelected.id}`, {
      nome: updateNome ? updateNome : petSelected.nome,
      especie: updateEspecie ? updateEspecie : petSelected.especie,
      idade: Number(updateIdade ? updateIdade : petSelected.idade),
      peso: Number(updatePeso ? updatePeso : petSelected.peso),
      cliente: userAuth.nome
    })


    if(response){ 
      alert('Atualização realizada com sucesso.')
      findAllPets()
    }
  }


  const removePet = async (petId:any) => {
    if(confirm('Deseja realmente remover esse pet?')){
        
      const response = await useApi('delete', `animais/${petId}`)
  
      if(response){
        alert('Pet removido com sucesso')
        findAllPets()
      }
    }
  }

  useEffect(() => {
    isAuthenticated('/userPets')
    findAllPets()
  }, [])

  return (
    <main>

      <div className={styles.divFilters}>
        <div className={styles.divInput}>
          <input type="text" className={`${styles.search}`} placeholder="Buscar por pet" onChange={(e: any) => ''} />
          <Icon
            icon="material-symbols:search"
            className={styles.searchIcon}
            onClick={() => ''}
          />
        </div>
      </div>


      <div className={styles.cardContainer}>
        {
          pets.map((pet: any) =>
            <div className={styles.card}>
              <h2 className={styles.cardTitle}>{pet.nome}</h2>

              <div className={styles.cardBodyContainer}>
                <div className={styles.cardBody}>
                  <div className={styles.cardItem}>
                    <h5 className={styles.cardH3}>Espécie</h5>
                    <p className={styles.cardP}>{pet.especie}</p>
                  </div>

                  <div className={styles.cardItem}>
                    <h5 className={styles.cardH3}>Idade</h5>
                    <p className={styles.cardP}>{pet.idade} anos</p>
                  </div>

                  <div className={styles.cardItem}>
                    <h5 className={styles.cardH3}>Peso</h5>
                    <p className={styles.cardP}>{pet.peso} kg</p>
                  </div>
                </div>

                <div className={styles.cardActions}>
                  <button
                    className={styles.btn1}
                    data-bs-toggle="modal"
                    data-bs-target="#Modal1"
                    onClick={() => setPetSelected({
                      id: pet.id,
                      nome: pet.nome,
                      especie: pet.especie,
                      idade: pet.idade,
                      peso: pet.peso
                    })}
                  >Editar Informações</button>

                  <button className={styles.btn2} onClick={() => removePet(pet.id)}>Remover Pet</button>
                </div>
              </div>
            </div>
          )
        }
      </div>

      <button
        className={styles.btn3}
        data-bs-toggle="modal"
        data-bs-target="#Modal2"
      >Adicionar Novo Pet</button>

      <div className="modal fade" id="Modal1" aria-labelledby="exampleModalLabel" aria-hidden="true">

      <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">

              <h1 className="modal-title fs-1 w-100 text-center" id="exampleModalLabel">Editar Meu Pet</h1>

            </div>

            <div className="modal-body">

              <div>
                <label className={styles.label} htmlFor="nome">Nome</label>
                <input
                  className={styles.input}
                  type="text"
                  placeholder={petSelected.nome}
                  onChange={((e) => setUpdateNome(e.target.value))}
                />
                {errors.nome && <span className={styles.span}>{errors.nome.message}</span>}
              </div>

              <div>
                <label className={styles.label} htmlFor="especie">Espécie</label>
                <input
                  className={styles.input}
                  type="text"
                  placeholder={petSelected.especie}
                  onChange={((e) => setUpdateEspecie(e.target.value))}
                />
                {errors.especie && <span className={styles.span}>{errors.especie.message}</span>}
              </div>

              <div>
                <label className={styles.label} htmlFor="idade">Idade</label>
                <input
                  className={styles.input}
                  type="number"
                  placeholder={petSelected.idade}
                  onChange={((e) => setUpdateIdade(e.target.value))}
                />
                {errors.idade && <span className={styles.span}>{errors.idade.message}</span>}
              </div>

              <div>
                <label className={styles.label} htmlFor="peso">Peso</label>
                <input
                  className={styles.input}
                  type="number"
                  placeholder={petSelected.peso}
                  onChange={((e) => setUpdatePeso(e.target.value))}
                />
                {errors.peso && <span className={styles.span}>{errors.peso.message}</span>}
              </div>

            </div>

            <div className="modal-footer">

              <button type="button" className={styles.btn1} onClick={updatePet}>Salvar</button>

              <button type="button" className={styles.btn2} data-bs-dismiss="modal">Cancelar</button>

            </div>

          </div>

        </div>

      </div>


      <div className="modal fade" id="Modal2" aria-labelledby="exampleModalLabel" aria-hidden="true">

        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">

              <h1 className="modal-title fs-1 w-100 text-center" id="exampleModalLabel">Cadastrar Novo Pet</h1>

            </div>

            <div className="modal-body">

              <div>
                <label className={styles.label} htmlFor="nome">Nome</label>
                <input
                  className={styles.input}
                  type="text"
                  placeholder="Informe o nome do pet"
                  {...register('nome')}
                />
                {errors.nome && <span className={styles.span}>{errors.nome.message}</span>}
              </div>

              <div>
                <label className={styles.label} htmlFor="especie">Espécie</label>
                <input
                  className={styles.input}
                  type="text"
                  placeholder="Informe a espécie do pet"
                  {...register('especie')}
                />
                {errors.especie && <span className={styles.span}>{errors.especie.message}</span>}
              </div>

              <div>
                <label className={styles.label} htmlFor="idade">Idade</label>
                <input
                  className={styles.input}
                  type="number"
                  placeholder="Informe a idade do pet"
                  {...register('idade')}
                />
                {errors.idade && <span className={styles.span}>{errors.idade.message}</span>}
              </div>

              <div>
                <label className={styles.label} htmlFor="peso">Peso</label>
                <input
                  className={styles.input}
                  type="number"
                  placeholder="Informe o peso do pet"
                  {...register('peso')}
                />
                {errors.peso && <span className={styles.span}>{errors.peso.message}</span>}
              </div>

            </div>

            <div className="modal-footer">

              <button type="button" className={styles.btn1} onClick={handleSubmit(createPet)}>Cadastrar</button>

              <button type="button" className={styles.btn2} data-bs-dismiss="modal">Cancelar</button>

            </div>

          </div>
        </div>

      </div>

    </main>
  )
}