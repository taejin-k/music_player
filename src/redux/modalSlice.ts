import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ModalType } from "../types/modalType";

const initialState: ModalType = {
  isOpen: false,
  text: "",
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (_, action: PayloadAction<string>) => {
      return { isOpen: true, text: action.payload };
    },
    closeModal: () => {
      return initialState;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
