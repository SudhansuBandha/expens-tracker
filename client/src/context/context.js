import React, { useState, useContext } from "react";

const Context = React.createContext();

const Provider = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMessageOpen, setIsMessageOpen] = useState(false);
  const [accountTrigger, setAccountTrigger] = useState(false);
  const [transactionTrigger, setTransactionTrigger] = useState(false);
  const [isEditAccountModalOpen, setIsEditAccountTransactionModalOpen] =
    useState(false);
  const [isDeleteAccountModalOpen, setIsDeleteAccountModalOpen] =
    useState(false);

  const handleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const handleMessage = () => {
    console.log("clicked");
    setIsSidebarOpen(!isMessageOpen);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const refresh = () => {
    setAccountTrigger(false);
    setTransactionTrigger(false);
    setIsSidebarOpen(false);
    setIsModalOpen(false);
  };
  return (
    <Context.Provider
      value={{
        isSidebarOpen,
        isModalOpen,
        openModal,
        closeModal,
        handleSidebar,
        isMessageOpen,
        handleMessage,
        print,
        setTransactionTrigger,
        transactionTrigger,
        setAccountTrigger,
        accountTrigger,
        refresh,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(Context);
};

export { Context, Provider };
