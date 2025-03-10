"use client";
import { useEffect, useContext, useRef } from "react";
import Cookies from "js-cookie";
import { useRouter, useParams } from "next/navigation";
import { ClienteContext } from "../../../context/ClienteContext";

export default function Panel() {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const router = useRouter();
  const params = useParams();
  const { userId, email } = params;

  const { mudaLogin } = useContext(ClienteContext);
  const emailValidateCalled = useRef(false);

  async function tokenVerify() {
    try {
      const response = await fetch(`${apiBaseUrl}/token/verify`, {
        cache: 'no-store',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${Cookies.get("x-access-token")}`
        }
      });

      if (response.ok) {
        router.replace(`/painel/${Cookies.get("user_login_id")}`);
        mudaLogin({ userId: String(Cookies.get("user_login_id")) || null, userName: Cookies.get("x-user-name") || "" });
      } else {
        Cookies.remove("user_login_id");
        Cookies.remove("x-access-token");
        Cookies.remove("x-user-name");
        Cookies.remove("x-profile-id");
        mudaLogin({ userId: null, userName: "" });
        router.replace("/");

        console.warn('Error verifying token:', response.statusText);
      }
    } catch (error) {
      console.error('Error verifying token:', error);
    }
  }

  useEffect(() => {
    if (!userId || !email) return;

    if (!Cookies.get("x-access-token") || !Cookies.get("user_login_id") || !Cookies.get("x-profile-id")) {
      router.replace("/entrar");
      return;
    } else if (Cookies.get("x-access-token")) {
      tokenVerify();
    }

    if (Cookies.get("x-profile-id") && !emailValidateCalled.current) {
      emailValidateCalled.current = true;
      emailValidate(String(userId), String(email));
    }
  }, [userId, email]);

  async function emailValidate(userId: string, email: string) {
    const response = await fetch(`${apiBaseUrl}/users/account/email-validate`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `${Cookies.get("x-access-token")}`
      },
      body: JSON.stringify({
        userId,
        email: decodeURIComponent(email)
      })
    });
    console.log(response);

    if (response.status === 200) {
      console.log("E-mail verificado.");
      router.replace(`/painel/${Cookies.get("user_login_id")}`);
    } else {
      console.log("Erro ao verificar E-mail.");
      if(Cookies.get("user_login_id")) {
        router.replace(`/painel/${Cookies.get("user_login_id")}`);
      } else {
        router.replace(`/`);
      }

    }
  }

  return (
    <div className="mt-4 w-full lg:flex lg:justify-center">
      <h1 className="m-20 sm:m-96">Verificando E-mail...</h1>
    </div>
  );
}
