"use client";
import Link from "next/link";
import css from './navbar.module.css';

export default function Navbar() {
  return (

    <>
      <nav className="sticky top-0 flex flex-col w-56 h-screen bg-stone-600 rounded-r-3xl overflow-hidden">
        <div className={`flex items-center ${css.navbar} justify-center h-60 shadow-lg shadow-blue-500/50 relative`}>
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
                <i className="bx bx-home" />
              </span>
              <span className="text-xl font-medium">HOME</span>
            </Link>
          </li>

          <li>
            <Link href="/materials"
              className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-white hover:text-[#FFD000]"
            >
              <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                <i className="bx bx-music" />
              </span>
              <span className="text-xl font-medium">MATERIALS</span>
            </Link>
          </li>

          <li>
            <Link href="/monsters"
              className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-white hover:text-[#FFD000]"
            >
              <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                <i className="bx bx-drink" />
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

          <li>
            <Link href="/test"
              className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-white hover:text-[#FFD000]"
            >
              <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400">
                <i className="bx bx-bell" />
              </span>
              <span className="text-xl font-medium">TEST</span>
              <span className="ml-auto mr-6 text-sm bg-red-100 rounded-full px-3 py-px text-red-500">
                5
              </span>
            </Link>
          </li>
        </ul>
      </nav>
    </>

  );
}