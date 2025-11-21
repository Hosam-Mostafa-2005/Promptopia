"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const NavBar = () => {
  const isUserLogged = true;
  const [providers, setProviders] = useState(null);
  const [toggleDown, setToggleDown] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    };
    fetchProviders();
  }, []);

  return (
    <nav className="flex justify-between items-center w-full mb-16 pt-3 px-6 bg-white shadow-sm fixed top-0 left-0 z-50">
      {/* ====== Logo Section ====== */}
      <Link href="/" className="flex items-center gap-2">
        <div className="bg-gray-100 p-2 rounded-full shadow-sm">
          <Image
            src="/assets/images/logo.svg"
            width={50}
            height={50}
            alt="logo"
            className="object-contain"
          />
        </div>
        <p className="logo_text font-semibold text-gray-800">Promptopia</p>
      </Link>

      {/* ====== Desktop Navigation ====== */}
      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5 items-center">
            <Link href="/create-prompt" className="black_btn">
              Create Post
            </Link>
            <button type="button" onClick={signOut} className="outline_btn">
              Sign Out
            </button>
            <Link href="/profile">
              {session?.user?.image && (
                <Image
                  src={session.user.image}
                  width={50}
                  height={50}
                  alt="logo"
                  className="object-contain rounded-full"
                />
              )}
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>

      {/* ====== Mobile Navigation ====== */}
      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div className="flex items-center relative">
            {session?.user?.image && (
              <Image
                src={session.user.image}
                width={50}
                height={50}
                alt="logo"
                className="object-contain"
              />
            )}

            {toggleDown && (
              <div className="absolute right-0 top-12 bg-white border border-gray-200 shadow-md rounded-lg flex flex-col items-start p-3 min-w-[150px] z-50">
                <Link
                  href="/profile"
                  className="dropdown_link"
                  onClick={() => setToggleDown(false)}
                >
                  My Profile
                </Link>
                <Link
                  href="/create-prompt"
                  className="dropdown_link"
                  onClick={() => setToggleDown(false)}
                >
                  Create Prompt
                </Link>
                <button
                  onClick={() => {
                    setToggleDown(false);
                    signOut();
                  }}
                  className="mt-2 w-full text-left text-red-500 hover:text-red-600 black_btn"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
