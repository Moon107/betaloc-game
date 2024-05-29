// import { Modal } from "bootstrap";
import "./App.css";
import { GameComponent } from "./Components/GameComponent/GameComponent";
import { Home } from "./Components/Home/Home";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Page } from "./Components/Page/Page";
import { ChoosePage } from "./Components/ChoosePage/ChoosePage";
import { UserNameProvider, UserNameContext } from "./Context/UserNameContext.js";
import MyModal from "./Components/MyModal/MyModal.jsx";
import { WinModal } from "./Components/WinModal/WinModal.jsx";
import { DoneModal } from "./Components/DoneModal/DoneModal.jsx";
import { WrongModal } from "./Components/WrongModal/WrongModal.jsx";
import { ScoreProvider } from "./Context/ScoreContext.js";
import { LoseModal } from "./Components/LoseModal/LoseModal.jsx";
import { LevelProvider } from "./Context/LevelContext.js";
import { Level2Component } from "./Components/Level2Component/Level2Component.jsx";
import { Level3Component } from "./Components/Level3Component/Level3Component.jsx";
import MyModal2 from "./Components/MyModal2/MyModal2.jsx";
// import { Level4Component } from "./Components/Level4Component/Level4Component.jsx";
import { Helmet } from 'react-helmet';




function App() {
  return (
    <>
    
      <LevelProvider>
        <ScoreProvider>
          <UserNameProvider>
            <BrowserRouter>

              <Routes>
                <Route index element={<Home />} />
                <Route path="/Home" element={<Home />} />
                <Route path="/Page" element={<Page />} />
                <Route path="/ChoosePage" element={<ChoosePage />} />

                <Route path="/GameComponent" element={<GameComponent currentLevel={1} />} />
                <Route path="/Level2Component" element={<Level2Component currentLevel={2} />} />
                <Route path="/Level3Component" element={<Level3Component currentLevel={3} />} />
                {/* <Route path="/Level4Component" element={ <Level4Component currentLevel={4}/>} /> */}

                <Route path="/MyModal" element={<MyModal />} />
                <Route path="/MyModal2" element={<MyModal2 />} />
                <Route path="/WinModal" element={<WinModal />} />
                <Route path="/DoneModal" element={<DoneModal />} />
                <Route path="/WrongModal" element={<WrongModal />} />
                <Route path="/LoseModal" element={<LoseModal />} />
              </Routes>
            </BrowserRouter>
          </UserNameProvider>
        </ScoreProvider>
      </LevelProvider>
 
    </>
  );
}

export default App;
