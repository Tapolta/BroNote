import React, {createContext, useContext, useState, ReactNode } from "react";
import { NoteTagProps } from "../types/GlobalTypes";

interface GlobalState {
  popUp: PopUpProps,
  setPopUp: (popUp: PopUpProps) => void,
  noteTags: NoteTagProps[],
  setNoteTags: (noteTag: NoteTagProps[]) => void,
}

interface PopUpProps {
  enable : boolean;
  children? : ReactNode;
}

const GlobalStateContext = createContext<GlobalState | undefined>(undefined);

export const GlobalStateProvider = ({ children }: { children: ReactNode }) => {
    const [popUp, setPopUp] = useState<PopUpProps>({children : null, enable: false})
    const [noteTags, setNoteTags] = useState<NoteTagProps[]>([]);

  return (
    <GlobalStateContext.Provider value={{ popUp, setPopUp, noteTags, setNoteTags }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

export const useGlobalState = (): GlobalState => {
  const context = useContext(GlobalStateContext);
  if (!context) {
    throw new Error("useGlobalState must be used within a GlobalStateProvider");
  }
  return context;
};
