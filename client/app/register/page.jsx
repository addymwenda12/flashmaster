"use client"
import React from 'react'
import { useState } from 'react'
import { useSignUp } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'

function RegisterPage() {
    const {isLoaded, signUp, setActiv } = useSignUp()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("");
    const [pendingVerification, setPendingVerification] = useState(false)
    const [code, setCode] = useState("")
    const router = useRouter()

  return (
    <>
      
    </>
  )
}

export default RegisterPage
