const { name } = require("ejs");

const io = require("socket.io")();
const socketapi = {
  io: io,
};
const user = [];
// Add your socket.io logic here!
io.on("connection", function (socket) {
  console.log("A user connected");
  socket.on("newUser", function (name) {
    user.push(name);
    console.log(user)
    socket.broadcast.emit("user-joined", name);
    io.emit("alluser", user);
    socket.on("disconnect", function () {
      socket.broadcast.emit("gaya-user", name);
      console.log("A user disconnected", name);
      let index = user.indexOf(user);
      user.splice(index, 1);
      io.emit("alluser", user);
    });

    // socket.broadcast.emit("milgya-londa", name);

    socket.on("message", function (mess) {
      socket.broadcast.emit("chat", { name: name, message: mess });
    });
  });
});

module.exports = socketapi;
