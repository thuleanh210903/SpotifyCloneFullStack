"use client";

import { twMerge } from "tailwind-merge";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { useRouter } from "next/navigation";
import { FaUserAlt } from "react-icons/fa";
import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
import Button from "./Button";
import { useEffect, useState } from "react";
import useRegisterModal from "../hooks/useRegisterModal";
import useLoginModal from "../hooks/useLoginModal";
import axios from "axios";
import Link from "react-router-dom";

interface HeaderProps {
  children: React.ReactNode;
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ children, className }) => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

  const [auth, setAuth] = useState(false);
  const [message, setMessage] = useState("");
  const [username, setUserName] = useState("");

  const handleClickRegisterButton = () => {
    registerModal.onOpen();
  };

  const handleClickLoginButton = () => {
    loginModal.onOpen();
  };

  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios
      .get("http://localhost:8081")
      .then((res) => {
        if (res.data.Status === "Success") {
          setAuth(true);
          setUserName(res.data.username);
        } else {
          console.log(res.data.Err);
          setAuth(false);
          // setMessage(res.data.Err);
          alert(res.data.Err + "hi");
        }
      })
      .then((err) => console.log(err));
  }, []);

  const handleLogOut = () => {
    axios
      .get("http://localhost:8081/logout")
      .then((res) => {
        location.reload();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div
      className={twMerge(
        `
        h-fit 
        p-6
        `,
        className
      )}
    >
      <div className="w-full mb-4 flex items-center justify-between">
        <div className="hidden md:flex gap-x-2 items-center">
          <button
            onClick={() => {}}
            className="
              rounded-full 
              bg-black 
              flex 
              items-center 
              justify-center 
              cursor-pointer 
              hover:opacity-75 
              transition
            "
          >
            <RxCaretLeft className="text-white" size={35} />
          </button>
          <button
            onClick={() => {}}
            className="
              rounded-full 
              bg-black 
              flex 
              items-center 
              justify-center 
              cursor-pointer 
              hover:opacity-75 
              transition
            "
          >
            <RxCaretRight className="text-white" size={35} />
          </button>
        </div>
        <div className="flex md:hidden gap-x-2 items-center">
          <button
            onClick={() => {}}
            className="
              rounded-full 
              p-2 
              bg-white 
              flex 
              items-center 
              justify-center 
              cursor-pointer 
              hover:opacity-75 
              transition
            "
          >
            <HiHome className="text-black" size={20} />
          </button>
          <button
            onClick={() => {}}
            className="
              rounded-full 
              p-2 
              bg-white 
              flex 
              items-center 
              justify-center 
              cursor-pointer 
              hover:opacity-75 
              transition
            "
          >
            <BiSearch className="text-black" size={20} />
          </button>
        </div>
        <div className="flex justify-between items-center gap-x-4">
          {auth ? (
            <div>
              <h1></h1>
              <Button onClick={handleLogOut} className="bg-white px-6 py-2">
                Log out
              </Button>
            </div>
          ) : (
            <>
              <div>
                <Button
                  onClick={handleClickRegisterButton}
                  className="bg-transparent text-neutral-300 font-medium"
                >
                  Sign up
                </Button>
              </div>
              <div>
                <h1>{message}</h1>
                <Button
                  onClick={handleClickLoginButton}
                  className="bg-white px-6 py-2"
                >
                  Log in
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
      {children}
    </div>
  );
};

export default Header;
