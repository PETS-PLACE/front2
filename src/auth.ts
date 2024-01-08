import { redirect } from 'next/navigation'

export default function isAuthenticated(requiredRoute:string){

  //Rotas que o usuário do tipo client vai ter acesso
  const clientRoutes = ['/cliente', '/userPets']
  //Rota que o usuário do tipo petshop vai ter acesso
  const petshopRoutes = ['']

  // Obtenha o useAuth do localStorage
  const useAuth = JSON.parse(localStorage.getItem('userAuth') as string);
  
  // Verifique se o useAuth está presente e válido
  if (useAuth) {
    // Verifique a validade do token, por exemplo, verificando a expiração
    // Se o token estiver válido, retorne true
    // Caso contrário, retorne false

    if(useAuth.tipo == 'client'){
      //verificando se a rota requisitada esta entre as rotas que o client tem acesso
      const findRoute = clientRoutes.find((e) => e == requiredRoute)

      if(findRoute){
        return true
      }

      redirect('/')
    }

    else if(useAuth.tipo == 'petshop'){
      const findRoute = petshopRoutes.find((e) => e == requiredRoute)

      if(findRoute){
        return true
      }

      redirect('/')
    }

  }

  redirect('/accountType')
};
