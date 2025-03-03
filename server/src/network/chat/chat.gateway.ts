import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";

@WebSocketGateway({namespace: 'chat'})
export class ChatGateway {
    @WebSocketServer()
    server: Server

    @SubscribeMessage('message')
    handleMessage(client: Socket, payload: any): void {
        this.server.emit('message', payload); // Broadcost message to all connected  
    }
}