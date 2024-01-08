'use client'
import  isAuthenticated  from "@/auth"
import { useEffect } from "react";

export default function Petshop() {

  useEffect(() => {
    isAuthenticated('/petshop')
  },[])

  return (
    <main>
      <h1> Rota de petshop </h1>
    </main>
  )
}