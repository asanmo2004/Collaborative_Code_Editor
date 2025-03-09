const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const axios = require("axios");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

app.use(cors());
app.use(express.json());

const rooms = {}; // Store room code

io.on("connection", (socket) => {
    console.log(`⚡ New client connected: ${socket.id}`);

    socket.on("join-room", (roomId) => {
        socket.join(roomId);
        console.log(`📌 ${socket.id} joined room: ${roomId}`);

        // If room has existing code, send it to the new user
        if (rooms[roomId]) {
            socket.emit("load-code", rooms[roomId]);
        }
    });

    socket.on("code-change", ({ roomId, code }) => {
        rooms[roomId] = code; // Save latest code
        socket.to(roomId).emit("code-update", code); // Broadcast to others
    });

    socket.on("disconnect", () => {
        console.log(`❌ ${socket.id} disconnected`);
    });
});

// 🔥 Run Code via JDoodle API
app.post("/run", async (req, res) => {
    const { language, code } = req.body;

    const JDoodleClientId = "f7981c7e20c1a096e5bc891e5197ea98";
    const JDoodleClientSecret = "5d1911b8e9d55af16a87be38f2fb5c34b405a3ed74baded1638998c644c718d6";

    const languageMap = {
        javascript: "nodejs",
        python3: "python3",
        java: "java",
        c: "c",
        cpp: "cpp17"
    };

    try {
        const response = await axios.post("https://api.jdoodle.com/v1/execute", {
            clientId: JDoodleClientId,
            clientSecret: JDoodleClientSecret,
            script: code,
            language: languageMap[language] || "nodejs",
            versionIndex: "3"
        });

        res.json({ output: response.data.output });
    } catch (error) {
        console.error("JDoodle API Error:", error);
        res.status(500).json({ output: "Error executing code." });
    }
});

const PORT = 5000;
server.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
