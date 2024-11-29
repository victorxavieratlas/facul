"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Cookies from "js-cookie";
import Image from 'next/image'
import { Fredoka } from "next/font/google";
import { usePathname } from 'next/navigation';

const fredoka = Fredoka({
  subsets: ['latin'],
  preload: true,
  display: 'swap'
})

export default function CookieConsent() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const excludedPaths = ['/politica-de-privacidade', '/termos-e-condicoes'];

  useEffect(() => {
    const consent = Cookies.get("cookie_consent");

    if (excludedPaths.includes(pathname)) {
      setIsOpen(false);
      document.body.style.overflow = "auto";
    } else if (!consent) {
      setIsOpen(true);
      document.body.style.overflow = "hidden";
    } else {
      setIsOpen(false);
      document.body.style.overflow = "auto";
    }
  }, [pathname]);

  const handleAccept = () => {
    Cookies.set("cookie_consent", "true", { expires: 365 });
    setIsOpen(false);
    document.body.style.overflow = "auto";
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        handleAccept();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 mx-4 max-w-md md:max-w-sm w-full">
        <div className="w-full border-b-2 border-gray-300 pb-4 flex items-center space-x-3 rtl:space-x-reverse">
          <Image src="/logo2.svg" width={30} height={30} alt="Logotipo da Lavar Auto em azul claro" />
          <span className={`ml-6 text-2xl font-bold tracking-wide text-balance whitespace-nowrap text-blue-500 align-top ${fredoka.className}`}>lavar auto</span>
        </div>
        <p className="text-gray-600 text-md sm:text-lg md:text-md pt-4 pb-5 border-b-2 border-gray-300">
          <span className="w-full inline-block">Entendo que a plataforma <span className="font-semibold">Lavar Auto</span></span> conta com <span className="font-semibold">termos e políticas.</span>
          <a href="/termos-e-condicoes" className="w-full text-sm lg:text-sm text-gray-500 underline inline-block py-0.5">
            Termos e Condições de Uso
          </a>
          <a href="/politica-de-privacidade" className="text-sm lg:text-sm text-gray-500 underline inline-block">
            Política de Privacidade
          </a>{" "}
        </p>
        <h2 className="text-md font-semibold text-gray-500 pt-4 pb-1">AVISO DE COOKIES</h2>
        <p className="text-gray-600 text-md mb-6">
          Utilizamos cookies e outras tecnologias<span className="w-full sm:inline-block"> semelhantes para melhorar sua experiência</span> em nossa plataforma.
        </p>
        <button
          onClick={handleAccept}
          className="w-full bg-blue-500 text-white font-semibold py-2 px-6 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Concordo
        </button>
      </div>
    </div>,
    document.body
  );
}
