import { useDispatch } from "react-redux";
import { closeModal, openModal } from "../redux/modalSlice";
import { RootState } from "../redux/store";
import { useAppSelector } from "./../redux/hooks";

const useGlobalModal = () => {
  const dispatch = useDispatch();
  const modalState = useAppSelector((state: RootState) => state.modal);

  const openGlobalModal = (text: string) => dispatch(openModal(text));

  const closeGlobalModal = () => dispatch(closeModal());

  return { modalState, openGlobalModal, closeGlobalModal };
};

export default useGlobalModal;
