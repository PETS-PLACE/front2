'use client'
import  isAuthenticated  from "@/auth"
import { useEffect } from "react";

export default function Painel() {

  useEffect(() => {
    isAuthenticated('/painel')
  },[])

  return (
    <main>
      <h1> Painel </h1>
    </main>
  )
}
