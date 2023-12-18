"use client";
import styles from "./login.module.css";
import "bootstrap/dist/css/bootstrap.css";
import Link from "next/link";
import { FaFacebook, FaApple, FaGoogle } from "react-icons/fa6";
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";

const LoginPage = () => {
  const { register, handleSubmit } = useForm();
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  async function verificaLogin(data) {
    const response = await fetch("https://api-conta-certa-production.up.railway.app/login", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ email: data.email, senha: data.senha }),
    });

    if (response.status === 400) {
      toast.error("Não está cadastrado", { position: toast.POSITION.TOP_CENTER });
    } else {
      const usuarioData = await response.json();

      // Check if login is successful before redirecting
      if (usuarioData.id && usuarioData.nome) {
        router.push({
          pathname: '/Home',
          query: { usuarioId: usuarioData.id},
        });
      } else {
        toast.error("Verifique se digitou os dados corretamente", { position: toast.POSITION.TOP_CENTER });
      }
    }
  }

  return (
    <section className={styles.section}>
      <div className={styles.image}>
        <Link href="/">
          <img src="./logoBranco.png" alt="logo" width={200} height={200} />
        </Link>
      </div>
      <form onSubmit={handleSubmit(verificaLogin)}>
        <div className={styles.box}>
          <div className={styles.form}>
            <div className="form-floating mb-3 position-relative">
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="name@example.com"
                required {...register("email")}
              />
              <label htmlFor="floatingInputDisabled">E-mail</label>
            </div>
            <div className="form-floating mb-3 position-relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                className="form-control"
                id="password"
                placeholder="Digite sua senha"
                required {...register("senha")}
              />
              <label htmlFor="floatingInputDisabled">Senha</label>
              <div
                className="position-absolute top-50 translate-middle-y"
                style={{ right: "0.5rem" }}
              >
                <button
                  type="button"
                  className={`btn ${styles.showHideButton}`}
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    cursor: "pointer",
                    background: "rgba(0, 0, 0, 0)",
                    border: "none",
                  }}
                >
                  {showPassword ? (
                    <MdVisibilityOff style={{ color: "grey" }} />
                  ) : (
                    <MdVisibility style={{ color: "grey" }} />
                  )}
                </button>
              </div>
            </div>

            <div className={styles.buttonBox}>
              <button className={styles.button} type="submit">Entrar</button>
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
      <ToastContainer />
    </section>
  );
}

export default LoginPage;
