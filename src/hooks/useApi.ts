import axios from "axios";

export const endPoint = axios.create({
  baseURL: "http://localhost:8080/",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

const userAuth = JSON.parse(localStorage.getItem('userAuth') as string)
let headerToken = {}

//se o userAuth existir envia o token de autenticação pelo header
if(userAuth){
  headerToken = {
    authorization: `Bearer ${userAuth.token}`
  }
}

/**
 * Realiza requisições para o backend
 * @param method método da requisição
 * @param url URL de destino
 * @param data dados que devem ser enviados
 */
export async function useApi<T = unknown>(method:'get'|'post'|'put'|'patch'|'delete'|'options', url:string, data?:any, headers?:any) {
  try {
    const response = await endPoint.request({
      method,
      //possibilita o uso de query string no método get, como por exemplo .../?name='Maria'
      url: url,
      data,
      headers: headerToken,
    })

    if(response.status === 200){
      return response.data
    }

    if(response.status === 201){
        return response.data
      }

    else{
      throw new Error(response.statusText)
    }
    
  } catch (error:any) {
    console.log(error)
    const messageErros = error?.response?.data?.message

    if(Array.isArray(messageErros)){
      alert(messageErros[0])
    }

    else{
      alert(messageErros)
    }
  }
}