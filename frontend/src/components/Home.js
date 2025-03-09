import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const Home = () => {
    const [roomId, setRoomId] = useState("");
    const navigate = useNavigate();

    const joinRoom = () => {
        if (roomId.trim()) {
            navigate(`/editor/${roomId}`);
        } else {
            alert("Please enter a valid Room ID");
        }
    };

    const createRoom = () => {
        const newRoomId = uuidv4();
        setRoomId(newRoomId);
    };

    return (
        <div style={{ 
            minHeight: "100vh", 
            display: "flex", 
            justifyContent: "center", 
            alignItems: "center", 
            backgroundColor: "black"
        }}>
            <div style={{ 
                maxWidth: "450px", 
                width: "100%", 
                backgroundColor: "#181818", 
                borderRadius: "12px", 
                padding: "30px", 
                boxShadow: "0 0 15px rgba(57, 255, 20, 0.6)", 
                textAlign: "center", 
                color: "white"
            }}>
                <h1 style={{ color: "#39ff14", fontWeight: "bold", fontSize: "24px" }}>Create Collab-Space</h1>
                <p style={{ fontSize: "14px", opacity: "0.8" }}>Create a new CollabSpace with an Editor in one click.</p>
                <input 
                    type="text" 
                    value={roomId} 
                    onChange={(e) => setRoomId(e.target.value)} 
                    className="form-control mb-3" 
                    style={{ 
                        padding: "12px", 
                        borderRadius: "5px", 
                        fontSize: "16px", 
                        backgroundColor: "black", 
                        color: "white", 
                        border: "1px solid white" 
                    }}
                    placeholder="Enter Room ID"
                />
                <div className="d-flex justify-content-between">
                    <button 
                        onClick={joinRoom} 
                        className="btn" 
                        style={{ 
                            padding: "10px", 
                            borderRadius: "5px", 
                            color: "#39ff14", 
                            border: "1px solid #39ff14", 
                            fontSize: "16px", 
                            width: "48%", 
                            backgroundColor: "black" 
                        }}
                    >
                        Join Room
                    </button>
                    <button 
                        onClick={createRoom} 
                        className="btn" 
                        style={{ 
                            padding: "10px", 
                            borderRadius: "5px", 
                            color: "black", 
                            backgroundColor: "#39ff14", 
                            fontSize: "16px", 
                            width: "48%", 
                            border: "none" 
                        }}
                    >
                        Generate Room ID
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Home;
