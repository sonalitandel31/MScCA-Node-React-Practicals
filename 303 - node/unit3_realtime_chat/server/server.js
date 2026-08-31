const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const { redisClient, connectRedis, } = require("./config/redis");

const Message = require("./models/Message");
dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
    },
});
const PORT = process.env.PORT || 5000;

// Q5: ACTIVE USERS
const activeUsers = new Map();

// Q7: REDIS REST API
app.get("/api/messages", async (req, res) => {
    try {
        const room = req.query.room || "General";
        const cacheKey = `messages:${room}`;

        // Check Redis first
        const cachedMessages =
            await redisClient.get(cacheKey);
        if (cachedMessages) {
            return res.json({
                source: "Redis",
                messages: JSON.parse(cachedMessages),
            });
        }

        // If Redis has no data, get from MongoDB
        const messages = await Message.find({
            room: room,
        })
            .sort({ createdAt: 1 })
            .limit(50);

        // Save result in Redis
        await redisClient.set(
            cacheKey,
            JSON.stringify(messages),
            {
                EX: 60,
            }
        );

        res.json({
            source: "MongoDB",
            messages: messages,
        });

    } catch (error) {

        res.status(500).json({
            message: error.message,
        });
    }
});

// Q5: ACTIVE USERS REST API
app.get("/api/users", (req, res) => {
    const users = Array.from(
        activeUsers.values()
    );
    res.json({
        count: users.length,
        users: users,
    });
});

// DATABASE + REDIS CONNECTION
async function startServer() {
    await connectDB();
    await connectRedis();

    // SOCKET.IO CONNECTION
    io.on("connection", (socket) => {
        console.log(
            "User connected:",
            socket.id
        );

        // Q2: JOIN CHAT ROOM
        socket.on(
            "joinRoom",
            async ({ username, room }) => {
                socket.username = username;
                socket.room = room;

                // Join Socket.IO room
                socket.join(room);
                console.log(
                    `${username} joined ${room}`
                );

                // Q5: ADD USER TO ACTIVE USERS                
                activeUsers.set(
                    socket.id,
                    {
                        username: username,
                        room: room,
                    }
                );

                // Q5: GET ACTIVE USERS OF CURRENT ROOM
                const usersInRoom =
                    Array.from(
                        activeUsers.values()
                    )
                        .filter(
                            (user) =>
                                user.room === room
                        )
                        .map(
                            (user) =>
                                user.username
                        );
                io.to(room).emit(
                    "activeUsers",
                    usersInRoom
                );

                // Q1 + Q2 + Q6: LOAD PREVIOUS MESSAGES
                const messages =
                    await Message.find({
                        room: room,
                    })
                        .sort({
                            createdAt: 1,
                        });

                socket.emit(
                    "previousMessages",
                    messages
                );

                // Q5: USER JOINED MESSAGE
                socket.to(room).emit(
                    "userJoined",
                    {
                        username: username,
                    }
                );

            }
        );

        // Q1: BASIC REAL-TIME MESSAGE
        // Q2: MESSAGE SENT ONLY TO CURRENT ROOM
        // Q4: MESSAGE ACKNOWLEDGMENT
        // Q6: TIMESTAMP STORED BY MONGOOSE
        // Q7: REDIS CACHE
        socket.on(
            "sendMessage",
            async (
                { username, text, room },
                callback
            ) => {
                try {
                    // Q1: SAVE MESSAGE TO MONGODB
                    const message =
                        await Message.create({
                            username: username,
                            text: text,
                            room: room,
                            type: "text",
                        });

                    // Q7: STORE RECENT MESSAGE IN REDIS
                    const recentKey =
                        `recent:${room}`;
                    await redisClient.lPush(
                        recentKey,
                        JSON.stringify(message)
                    );
                    await redisClient.lTrim(
                        recentKey,
                        0,
                        49
                    );

                    // Q7: CLEAR OLD API CACHE
                    await redisClient.del(
                        `messages:${room}`
                    );

                    // Q2: SEND MESSAGE ONLY TO ROOM
                    io.to(room).emit(
                        "receiveMessage",
                        message
                    );

                    // Q4: ACKNOWLEDGMENT
                    callback({
                        success: true,
                        messageId: message._id,
                        status: "Delivered",
                    });
                } catch (error) {
                    callback({
                        success: false,
                        error: error.message,
                    });
                }
            }
        );

        // Q3: LOCATION SHARING
        socket.on(
            "sendLocation",
            async (
                {
                    username,
                    room,
                    lat,
                    lng,
                },
                callback
            ) => {

                try {
                    const locationMessage =
                        await Message.create({
                            username: username,
                            text: "Shared location",
                            room: room,
                            type: "location",
                            lat: lat,
                            lng: lng,
                        });
                    // Q7: Store location in Redis
                    const recentKey =
                        `recent:${room}`;
                    await redisClient.lPush(
                        recentKey,
                        JSON.stringify(
                            locationMessage
                        )
                    );
                    await redisClient.lTrim(
                        recentKey,
                        0,
                        49
                    );
                    await redisClient.del(
                        `messages:${room}`
                    );
                    // Send location to room
                    io.to(room).emit(
                        "receiveLocation",
                        locationMessage
                    );
                    // Q4: Acknowledgment
                    callback({
                        success: true,
                        messageId:
                            locationMessage._id,
                    });
                } catch (error) {
                    callback({
                        success: false,
                        error: error.message,
                    });
                }
            }
        );

        // Q5: USER DISCONNECT
        socket.on(
            "disconnect",
            () => {
                const user =
                    activeUsers.get(
                        socket.id
                    );
                if (!user) {
                    return;
                }
                activeUsers.delete(
                    socket.id
                );
                const usersInRoom =
                    Array.from(
                        activeUsers.values()
                    )
                        .filter(
                            (item) =>
                                item.room ===
                                user.room
                        )
                        .map(
                            (item) =>
                                item.username
                        );
                io.to(
                    user.room
                ).emit(
                    "activeUsers",
                    usersInRoom
                );
                io.to(
                    user.room
                ).emit(
                    "userLeft",
                    {
                        username:
                            user.username,
                    }
                );
                console.log(
                    `${user.username} left ${user.room}`
                );
            }
        );
    });

    // SERVER START
    server.listen(
        PORT,
        () => {
            console.log(
                `Server running on http://localhost:${PORT}`
            );
            console.log(
                "Socket.IO is ready"
            );
            console.log(
                "Redis is ready"
            );
        }
    );
}

// Start server
startServer();