import { Routes, Route} from "react-router-dom";
import { HomePage } from "./main/client";
import { Room } from "./room/room";
import { Login } from "./login/login";
import { Register } from "./login/Register"
import {Account} from "./account/account";
import {UserBar} from "./components/UserBar";

export function App() {
    return (
        <>
            <section className="header">
                <h1>Memory</h1>
                <UserBar />
            </section>

            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/room" element={<Room />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/account" element={<Account />} />
            </Routes>
        </>
    );
}