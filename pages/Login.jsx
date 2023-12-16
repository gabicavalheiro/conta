"use client";
import styles from "./login.module.css";
import "bootstrap/dist/css/bootstrap.css";
import Link from "next/link";
import { FaFacebook, FaApple, FaGoogle } from "react-icons/fa6";
import React, { useState,useContext } from 'react';

import { AuthContext } from "@/components/contexts/auth";

const loginPage = () => {

  // const {authenticated,login} = useContext(AuthContext)
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")

  const handleSubmit = (e) =>{
    e.preventDefault()


    console.log("submit",{email,password})

    login(email,password)
  }


  return (
    <section className={styles.section}>
      <div className={styles.image}>
        <Link href="/">
          <img src="./logoBranco.png" alt="logo" width={200} height={200} />
        </Link>
      </div>
      <div className={styles.box}>
        <div className={styles.form}>
          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control"
              id="email" //floatingInputDisabled
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              
            />
            <label htmlFor="floatingInputDisabled">Senha</label>
          </div>

          <div className={styles.buttonBox}>
            <Link href="/Home#">
            <button className={styles.button}>Entrar</button>
            </Link>
            <button className={styles.buttonCancelar}>
              {" "}
              <Link href="/" className={styles.link}>
                Cancelar
              </Link>
            </button>
          </div>

          <div className={styles.boxA}>
            <div className={styles.access}>
              <h1>Acessar com:</h1>
              <div className={styles.icons}>
                <FaFacebook />
                <FaGoogle />
                <FaApple />
              </div>
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
    </section>
  );
}



export  default loginPage