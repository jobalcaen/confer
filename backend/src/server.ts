import { createServer, Server as HTTPServer } from "http";
import socketIO, { Server as SocketIOServer } from "socket.io";
import express, { Application } from "express";
import * as path from 'path';


export class Server {
    private httpServer: HTTPServer
    private app: Application
    private io: SocketIOServer
    private readonly DEFAULT_PORT = 5000
    private activeSockets: string[] = [];


    constructor() {
        this.initialize()
        this.handleRoutes()
        this.handleSocketConnection()
    }

    private initialize(): void {
        this.app = express()
        this.httpServer = createServer(this.app)
        this.io = socketIO(this.httpServer)
        this.configureApp()
        this.handleSocketConnection()
    }

    private handleRoutes(): void {
        this.app.get("/", (req, res) => {
            res.send(`<h1>Hello World</h1>`)
        })
    }

    private handleSocketConnection(): void {
        this.io.on("connection", socket => {
            console.log("Socket connected.", socket.id)

            const existingSocket = this.activeSockets.find(existingSocket => existingSocket === socket.id)

            if (!existingSocket) {
                this.activeSockets.push(socket.id)

                // emit to the just connected user
                socket.emit("update-user-list", {
                    users: this.activeSockets.filter(
                      existingSocket => existingSocket !== socket.id
                    )
                })
                
                // emit to all other connected users
                socket.broadcast.emit("update-user-list", {
                    users: [socket.id]
                })

                socket.on("disconnect", () => {
                    console.log('disconnect')
                    this.activeSockets = this.activeSockets.filter(
                      existingSocket => existingSocket !== socket.id
                    )

                    socket.broadcast.emit("remove-user", {
                      socketId: socket.id
                    })
                })
            }
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
}
