import { app, httpServer } from "./app";

const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => console.log(`Express runs on Port: ${PORT}`));
