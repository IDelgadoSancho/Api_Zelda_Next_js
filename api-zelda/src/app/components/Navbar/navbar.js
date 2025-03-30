"use client";
import Link from "next/link";
import css from './navbar.module.css';

export default function Navbar() {
  return (

    <>
      <nav className={`sticky top-0 flex flex-col w-fit h-screen rounded-r-3xl overflow-hidden ${css.navbarMain} ${css.navbarBorder}`}>
        <div className={`flex items-center ${css.navbarHeader} p-3 justify-center h-60 shadow-l relative`}>
          <img src="/hylian-shield.png" className="absolute w-auto h-40 object-cover opacity-50" alt="Hylian Shield" />
          <h1 className="text-4xl relative z-10 tracking-wide">
            <span className={css.span}>Zelda Api</span>
          </h1>
        </div>
        <ul className="flex flex-col py-4">
          <li>
            <Link href="/"
              className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-white hover:text-[#FFD000]"
            >
              <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                <img src="/triforce.svg" className="h-auto w-7" />
              </span>
              <span className="text-xl font-medium">HOME</span>
            </Link>
          </li>

          <li>
            <Link href="/materials"
              className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-white hover:text-[#FFD000]"
            >
              <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                <img src="/meat.svg" className="h-auto w-7" />
              </span>
              <span className="text-xl font-medium">MATERIALS</span>
            </Link>
          </li>

          <li>
            <Link href="/monsters"
              className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-white hover:text-[#FFD000]"
            >
              <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                <img src="/masked-spider.svg" className="h-auto w-7" />

              </span>
              <span className="text-xl font-medium">MONSTERS</span>
            </Link>
          </li>

          <li>
            <Link href="/websocket"
              className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-white hover:text-[#FFD000]"
            >
              <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                <i className="bx bx-chat" />
              </span>
              <span className="text-xl font-medium">WEBSOCKET</span>
            </Link>
          </li>
        </ul>

        <div className={`${css.navbarFooter} mt-10`}>
          <img src="/sword-altar.svg" className={`h-auto w-50`} />
        </div>
      </nav>
    </>

  );
}