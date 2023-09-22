'use client'

import { useEffect, useState } from "react"
import LoginModal from "../components/Modal/LoginModal"
import RegisterModal from "../components/Modal/RegisterModal"

const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false)
    useEffect(() => {
        setIsMounted(true)
    }, [])

    if (!isMounted) {
        return null
    }
    return (
        <>
            <RegisterModal />
            <LoginModal />
        </>
    )

}

export default ModalProvider