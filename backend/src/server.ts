import { createServer, Server as HTTPServer } from "http";
import socketIO, { Server as SocketIOServer } from "socket.io";
import express, { Application } from "express";
import * as path from 'path';


interface Room {
    name: string,
    members: string[]
}

export class Server {
    private httpServer: HTTPServer
    private app: Application
    private io: SocketIOServer
    private readonly DEFAULT_PORT = 5000
    private rooms: Room[] = []


    constructor() {
        this.initialize()

        // this.handleRoutes()
        // this.handleSocketConnection()
    }

    private initialize(): void {
        this.app = express()
        this.httpServer = createServer(this.app)
        this.io = socketIO(this.httpServer)
        this.configureApp()
        this.handleSocketConnection()
    }

    private handleSocketConnection(): void {
        this.io.on("connection", socket => {
            console.log("Socket connected.", socket.id)
            const roomName = socket.handshake.query.room

            socket.join(roomName)
            // this.handleRoomJoin(roomName, socket.id)

            // const roomMates = this.io.sockets.adapter.rooms[roomName].sockets
            // const room = this.rooms.find(room => room.name === roomName)

            // give user list to sender
            socket.emit('join-room', this.io.sockets.adapter.rooms[roomName].sockets)

            // notifiy room mates that someone has joined the room (does not emit to sender)
            socket.broadcast.to(roomName).emit('participant-joined', socket.id);


            socket.on("disconnect", () => {
                console.log(`${socket.id} leaving`)
                socket.broadcast.to(roomName).emit('participant-left', socket.id);

            })
            
        })


    }

    public listen( callback: (port: number) => void): void {
        this.httpServer.listen( this.DEFAULT_PORT, () =>
            callback(this.DEFAULT_PORT)

        )
    }

    private configureApp(): void {
        this.app.use(express.static(path.join(__dirname, "../public")));
      }

    
    handleRoomJoin(roomName: string, socketId: string) {
        const isNewRoom = this.rooms.find(room => room.name === roomName)
        if(!isNewRoom) {
            this.rooms.push({
                name: roomName,
                members: [socketId]
            })
        } else {
            this.rooms.map((room) => {
                if (room.name === roomName) {
                    room.members.push(socketId)
                }
            })
        }
    }
    
}
