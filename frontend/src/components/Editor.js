import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { socket } from "../socket";

const Editor = () => {
    const { roomId } = useParams();
    const [code, setCode] = useState("// Start coding...");
    const [language, setLanguage] = useState("Python");
    const [output, setOutput] = useState("");

    useEffect(() => {
        // Join the room
        socket.emit("join-room", roomId);

        // Get the latest code when joining
        socket.on("load-code", (latestCode) => {
            setCode(latestCode);
        });

        // Listen for real-time code updates
        const handleCodeUpdate = (newCode) => {
            setCode(newCode);
        };
        socket.on("code-update", handleCodeUpdate);

        return () => {
            socket.off("code-update", handleCodeUpdate);
            socket.off("load-code");
        };
    }, [roomId]);

    const handleCodeChange = (e) => {
        const newCode = e.target.value;
        setCode(newCode);
        socket.emit("code-change", { roomId, code: newCode });
    };

    const runCode = async () => {
        setOutput("Running code...");
        try {
            const response = await fetch("http://localhost:5000/run", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ language, code }),
            });

            const result = await response.json();
            setOutput(result.output || "No output returned.");
        } catch (error) {
            console.error("Error running code:", error);
            setOutput("Error executing code.");
        }
    };

    return (
        <div style={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "black", color: "white" }}>
            <div style={{ maxWidth: "900px", width: "100%", backgroundColor: "#181818", borderRadius: "10px", padding: "20px", boxShadow: "0 0 10px rgba(255, 255, 255, 0.1)" }}>
                <h2 className="text-center">Room ID: {roomId}</h2>

                <div className="mb-3">
                    <label className="form-label" style={{ fontWeight: "bold" }}>Choose Language:</label>
                    <select className="form-select" value={language} onChange={(e) => setLanguage(e.target.value)}
                        style={{ width: "100%", padding: "10px", borderRadius: "5px", backgroundColor: "#000", color: "white", border: "1px solid #444" }}>
                        <option value="python3">Python</option>
                        <option value="javascript">JavaScript</option>
                        <option value="java">Java</option>
                        <option value="c">C</option>
                        <option value="cpp">C++</option>
                    </select>
                </div>

                <div className="mb-3">
                    <textarea className="form-control" value={code} onChange={handleCodeChange} rows="15"
                        style={{ width: "100%", padding: "15px", borderRadius: "5px", fontFamily: "monospace", backgroundColor: "#000", color: "white", border: "1px solid #444" }} />
                </div>

                <button className="btn btn-primary mb-3" onClick={runCode}
                    style={{ width: "100%", padding: "10px", borderRadius: "5px", backgroundColor: "#222", color: "white", border: "1px solid #555", fontSize: "16px" }}>
                    Run
                </button>

                <h3>Output:</h3>
                <textarea className="form-control" value={output} readOnly rows="7"
                    style={{ width: "100%", padding: "15px", borderRadius: "5px", fontFamily: "monospace", backgroundColor: "#000", color: "white", border: "1px solid #444" }} />
            </div>
        </div>
    );
};

export default Editor;
