import { Routes, Route, Link } from "react-router-dom";
import { HomePage } from "./main/client";
import { Room } from "./room/room";
import { Login } from "./login/login";
import { Register } from "./login/Register"

export function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/room/:roomId" element={<Room />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </>
    );
}