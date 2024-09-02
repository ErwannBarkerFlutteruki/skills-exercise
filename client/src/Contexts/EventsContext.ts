import { createContext } from "react";

export const WsContext = createContext(null as WebSocket | null | undefined)