import { Routes, Route, Link } from "react-router-dom";
import { HomePage } from "./client";
import { Room } from "./room/room";
import { Login } from "./login/login";

export function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/room/:roomId" element={<Room />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </>
    );
}