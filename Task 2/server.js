const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("public"));

let users = {};

io.on("connection", (socket) => {

    socket.on("new-user", (username) => {
        users[socket.id] = username;

        socket.broadcast.emit("user-joined", username);
    });

    socket.on("chat-message", (message) => {

        const msgData = {
            username: users[socket.id],
            message: message,
            time: new Date().toLocaleTimeString()
        };

        io.emit("chat-message", msgData);
    });

    socket.on("disconnect", () => {

        const username = users[socket.id];

        if(username){
            socket.broadcast.emit("user-left", username);
            delete users[socket.id];
        }

    });

});

server.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});