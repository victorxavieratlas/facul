'use client'
import { useEffect, useState, useContext } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import ProfileEditDetailsForm from "@/app/components/ProfileEditDetailsForm"
import { ClienteContext } from "../../context/ClienteContext";
import { ProfileData } from "../page";

interface ProfileId {
    profileId: number;
}

export default function editDetails({
    params,
}: {
    params: { profileId: ProfileId }
}) {
    const router = useRouter();

    const { mudaLogin } = useContext(ClienteContext);

    useEffect(() => {
        if (!Cookies.get("x-access-token") || !Cookies.get("user_login_id") || !Cookies.get("x-profile-id")) {
            router.replace("/entrar");
            return;
        } else {

            if (String(params.profileId) != String(Cookies.get("x-profile-id"))) {
                router.replace(`/painel/${Cookies.get("user_login_id")}`);
            } else {
                router.replace(`/${Cookies.get("x-profile-id")}/editar`);
                mudaLogin({ userId: String(Cookies.get("user_login_id")) || null, userName: Cookies.get("x-user-name") || "" });
            }
        }
    }, [router]);

    return (
        <div className="mt-4 w-full lg:flex lg:justify-center">
            <div className="mt-4 w-full max-w-2xl">
                <ProfileEditDetailsForm profileId={params.profileId} />
            </div>
        </div>
    )
}

// fazer depois página de estados