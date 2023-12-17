"use client";
import styles from "./login.module.css";
import "bootstrap/dist/css/bootstrap.css";
import Link from "next/link";
import { FaFacebook, FaApple, FaGoogle } from "react-icons/fa6";
import React from 'react';
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { useState } from "react";

const loginPage = () => {

  const { register, handleSubmit } = useForm()
  const [usuarioNome, setUsuarioNome] = useState('');
  const [usuarioId, setUsuarioId] = useState('');

  const router = useRouter()

  async function verificaLogin(data) {
    
    
        const response = await fetch("https://api-conta-certa-production.up.railway.app/login",
          {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({email: data.email, senha: data.senha})
          },
        )
        
        if (response.status == 400) {
          alert("Não está cadastrado")
          
        } else {
           
          const usuarioData = await response.json()
          setUsuarioId(usuarioData.id)
          setUsuarioNome(usuarioData.nome)
          
          


          router.push({
            pathname: '/Home',
            query: { usuarioId: usuarioData.id},
          })
        }
      }



  return (
    <section className={styles.section}>
      <div className={styles.image}>
        <Link href="/">
          <img src="./logoBranco.png" alt="logo" width={200} height={200} />
        </Link>
      </div>
      <form  onSubmit={handleSubmit(verificaLogin)}>
      <div className={styles.box}>
        <div className={styles.form}>
          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control"
              id="email" //floatingInputDisabled
              placeholder="name@example.com"
             
              required {...register("email")} 
              
            />
            <label htmlFor="floatingInputDisabled">E-mail</label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="password"
              name="password"
              className="form-control"
              id="password"
              placeholder="name@example.com"
              required {...register("senha")} 
              
            />
            <label htmlFor="floatingInputDisabled">Senha</label>
          </div>

          <div className={styles.buttonBox}>
          
            <button className={styles.button}  type="submit" >Entrar</button>

            <button className={styles.buttonCancelar}>
              {" "}
              <Link href="/" className={styles.link}>
                Cancelar
              </Link>
            </button>
          </div>

          <div className={styles.boxA}>
            <div className={styles.access}>
              
              <div className={styles.cadas}>
                <h1>
                  Não possui uma conta ainda?{" "}
                  <Link className={styles.cadastro} href="/Cadastro">
                    Cadastre-se
                  </Link>
                </h1>
              </div>
            </div>
          </div>
          
        </div>
        
      </div>
      </form>
    </section>
  );
}



export  default loginPage