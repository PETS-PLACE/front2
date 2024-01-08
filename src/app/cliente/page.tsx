'use client'
import  isAuthenticated  from "@/auth"
import { useEffect } from "react";

export default function Cliente() {

  useEffect(() => {
    isAuthenticated('/cliente')
  },[])

  return (
    <main>
      <h1> Rota de cliente </h1>
    </main>
  )
}