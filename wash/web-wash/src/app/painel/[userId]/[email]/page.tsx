"use client";
import { useEffect, useState, useContext } from "react";
import Link from "next/link"
import Cookies from "js-cookie";
import { useRouter, useParams } from "next/navigation";
import ProfileForm from "../../../components/ProfileForm";
import { ClienteContext } from "../../../context/ClienteContext";
import ServicesAccordion from "../../../components/ServicesAccordion";


export default function Panel() {
    const router = useRouter();
    const params = useParams();

    const { userId, email } = params

    const { mudaLogin } = useContext(ClienteContext);

    async function tokenVerify() {
        try {
            const response = await fetch(`http://localhost:3007/token/verify`, {
                cache: 'no-store',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${Cookies.get("x-access-token")}`
                }
            });

            console.log(response.ok)

            if (response.ok) {
                console.log('Verified token!');
                router.replace(`/painel/${Cookies.get("user_login_id")}`);
                mudaLogin({ userId: String(Cookies.get("user_login_id")) || null, userName: Cookies.get("x-user-name") || "" });
            } else {
                Cookies.remove("user_login_id");
                Cookies.remove("x-access-token");
                Cookies.remove("x-user-name");
                Cookies.remove("x-profile-id");
                mudaLogin({ userId: null, userName: "" });
                router.replace("/")

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
            tokenVerify()
        }

        if (Cookies.get("x-profile-id")) {
            emailValidate(String(userId), String(email));
        }
    }, [router, userId, email]);

    async function emailValidate(userId: string, email: string) {
        const response = await fetch(`http://localhost:3007/users/account/email-validate`, {
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
        console.log(response)

        if (response.status === 200) {
            console.log("E-mail verificado.")
            router.replace(`/painel/${Cookies.get("user_login_id")}`)
        } else {
            console.log("Erro ao verificar E-mail.")
        }
    }

    return (
        <div className="mt-4 w-full lg:flex lg:justify-center">
            <h1 className="m-96">Verificando E-mail...</h1>
        </div>
    );
}
