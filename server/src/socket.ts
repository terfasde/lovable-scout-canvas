import { Server } from 'socket.io'
import type { Server as HttpServer } from 'node:http'

export function createSocket(httpServer: HttpServer) {
  const io = new Server(httpServer, {
    cors: { origin: process.env.ORIGIN || '*', methods: ['GET','POST'] }
  })

  io.on('connection', (socket: any) => {
    // Client may join group rooms
    socket.on('group:join', (groupId: string) => {
      socket.join(`group:${groupId}`)
    })
    socket.on('group:leave', (groupId: string) => {
      socket.leave(`group:${groupId}`)
    })

    // Direct messages rooms
    socket.on('dm:join', (convoId: string) => {
      socket.join(`dm:${convoId}`)
    })
    socket.on('dm:leave', (convoId: string) => {
      socket.leave(`dm:${convoId}`)
    })
  })

  return io
}
