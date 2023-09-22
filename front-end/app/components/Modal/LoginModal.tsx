"use client"
import * as Dialog from "@radix-ui/react-dialog";
import Modal from "./Modal";
import useLoginModal from "@/app/hooks/useLoginModal";
import {
  FieldValues,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { signIn } from "next-auth/react";
import Input from "../Input";
import Button from "../Button";
import { useState } from "react";
import axios from "axios";
import { error } from "console";



const LoginModal = () => {
  const loginModal = useLoginModal()
  const { isOpen, onClose } = useLoginModal();
  const [isLoading, setIsLoading] = useState(false);
  
  
  const [value, setValue] = useState({
    email: '',
    password: '',
  })


  axios.defaults.withCredentials = true
  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
   axios.post("http://localhost:8081/login",value)
   .then(res => {
    if(res.data.Status === "Success") {
      alert("Success")
      onClose()
    }else {
      alert("Not")
    }
   })
  };

  const handleModalIsOpenChanged = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  return (
    <Modal
      title="LOGIN"
      description="Welcome to spotify"
      isOpen={isOpen}
      onChange={handleModalIsOpenChanged}
    >
      <div className="">
        <form onSubmit={handleSubmit}>
          <div className="relative mb-6" data-te-input-wrapper-init>
            <Input placeholder="Your email" onChange={(e) => setValue({ ...value, email: e.target.value })} />
          </div>

          <div className="relative mb-6" data-te-input-wrapper-init>
            <Input placeholder="Your password" onChange={(e) => setValue({ ...value, password: e.target.value })} />
          </div>
          <div className="mb-6 flex items-center justify-between">
            <div className="block min-h-[1.5rem] pl-[1.5rem]">
              <input
                className="relative float-left -ml-[1.5rem] mr-[6px] mt-[0.15rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-neutral-300 outline-none behtmlFore:pointer-events-none behtmlFore:absolute behtmlFore:h-[0.875rem] behtmlFore:w-[0.875rem] behtmlFore:scale-0 behtmlFore:rounded-full behtmlFore:bg-transparent behtmlFore:opacity-0 behtmlFore:shadow-[0px_0px_0px_13px_transparent] behtmlFore:content-[''] checked:border-primary checked:bg-primary checked:behtmlFore:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ml-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:behtmlFore:opacity-[0.04] hover:behtmlFore:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:behtmlFore:scale-100 focus:behtmlFore:opacity-[0.12] focus:behtmlFore:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:behtmlFore:transition-[box-shadow_0.2s,transhtmlForm_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:behtmlFore:scale-100 checked:focus:behtmlFore:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:behtmlFore:transition-[box-shadow_0.2s,transhtmlForm_0.2s] checked:focus:after:-mt-px checked:focus:after:ml-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent dark:border-neutral-600 dark:checked:border-primary dark:checked:bg-primary dark:focus:behtmlFore:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:behtmlFore:shadow-[0px_0px_0px_13px_#3b71ca]"
                type="checkbox"
                value=""
                id="exampleCheck2"
              />
              <label
                className="inline-block pl-[0.15rem] hover:cursor-pointer"
                htmlFor="exampleCheck2"
              >
                Remember me
              </label>
            </div>
          </div>

          <Button disabled={isLoading} type="submit">
            Log In
          </Button>
        </form>
      </div>
    </Modal>
  );
};

export default LoginModal;
