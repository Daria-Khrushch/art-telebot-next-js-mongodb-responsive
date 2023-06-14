"use client";

// import Link from "next/link";
// import Image from "next/image";
// import { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";

const Navbar = () => {
  const session = useSession();

  return (
    <nav>
      <div className="logo">
        <h1 className="text-3xl font-bold underline">TeleBot.tg</h1>
      </div>

      {session?.data && (
        <>
          <div className="other">
            <div>{session?.data?.user.name}</div>
            <div className="button" onClick={() => signOut({ callbackUrl: "/" })}>
              Sign Out
            </div>
          </div>
        </>
      )}
      {/* <div className="other">
        <div className="serv">Сервисы</div>
        <div className="nav_btn">
          <button>Пополнить</button>
        </div>
        <Image
          src="/assets/images/notification.png"
          alt="notification"
          width={30}
          height={30}
        />
        <Image
          src="/assets/images/user.png"
          alt="user"
          width={30}
          height={30}
        />
      </div> */}
    </nav>
  );
};

export default Navbar;
