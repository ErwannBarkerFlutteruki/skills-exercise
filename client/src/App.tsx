import React, { FC } from "react";
import { Events } from "./components";
import { Route, Routes } from "react-router";
import { SingleEvent } from "./components/SingleEvent/SingleEvent";
import { BrowserRouter } from "react-router-dom";
import { WsContext } from "./Contexts/EventsContext";
import { useWebsocket } from "./hooks";

const App: FC = () => {
  const { websocket } = useWebsocket()

  return (
    <BrowserRouter>
      <WsContext.Provider value={websocket}>
        <Routes>
          <Route path='/' Component={Events} />
          <Route path='/:id' Component={SingleEvent} />
        </Routes>
      </WsContext.Provider>
    </BrowserRouter>
  );
};
export default App;
