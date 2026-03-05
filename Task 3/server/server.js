const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const http = require("http")
const { Server } = require("socket.io")
const Document = require("./Document")

const app = express()
app.use(cors())

mongoose.connect("mongodb://127.0.0.1:27017/docs")

const server = http.createServer(app)
const io = new Server(server,{
    cors:{origin:"*"}
})

io.on("connection", socket => {

  socket.on("get-document", async documentId => {

    const document = await findOrCreateDocument(documentId)

    socket.join(documentId)
    socket.emit("load-document", document.data)

    socket.on("send-changes", delta => {
      socket.broadcast.to(documentId).emit("receive-changes", delta)
    })

    socket.on("save-document", async data => {
      await Document.findByIdAndUpdate(documentId,{ data })
    })

  })

})

async function findOrCreateDocument(id){

  if(id == null) return

  const document = await Document.findById(id)

  if(document) return document

  return await Document.create({_id:id,data:""})
}

server.listen(3001,()=>{
  console.log("Server running on port 3001")
})