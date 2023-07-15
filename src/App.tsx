import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { HOME_URL } from "./constants/urlConstants";
import Home from "./pages/Home";
import useGlobalModal from "./hooks/useGlobalModal";
import Modal from "./components/Modal";

const App = () => {
  const { modalState } = useGlobalModal();

  return (
    <BrowserRouter>
      <Routes>
        <Route path={HOME_URL} element={<Home />} />
        <Route path="*" element={<Navigate replace to={HOME_URL} />} />
      </Routes>
      {modalState.isOpen && <Modal />}
    </BrowserRouter>
  );
};

export default App;
