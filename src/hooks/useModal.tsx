import { useState } from "react";

const useModal = () => {
    const [ content, setContent ] = useState<{title: string, message: string}>({ title: "", message: "" });
    const [ openModal, setOpenModal ] = useState<boolean>(false);

    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);

    return { content, openModal, setContent, handleOpenModal, handleCloseModal }
}

export default useModal