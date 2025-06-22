import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./components/home/Homepage";
import NoteViewPage from "./components/note_view/NoteViewPage";
import CreateNote from "./components/create_note/CreateNote";
import { useGlobalState } from "./store/GlobalStateContext";
import PopUp from "./components/pop_up/PopUp";

function App() {
    const { popUp } = useGlobalState();
  
  return (
    // <Router basename="/client">
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/view-note/:id" element={
          <NoteViewPage />
          } />
          <Route path="/create-note" element={<CreateNote />} />
      </Routes>
      {popUp.enable && 
        <PopUp />
      }
    </Router>
  );
}

export default App;
