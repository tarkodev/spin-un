import { socketioNetwork } from "./socketio";
import { writable } from "svelte/store";

interface NetState {
    data?: any;
    error?: string;
}

export const room = writable<NetState>({});

export function refreshRoom() {
    socketioNetwork.on('currentRoomData', (foundRoom) => {
        /*console.log("Room updated:", foundRoom);*/
        room.set({ data: foundRoom.data, error: undefined });
    });

    socketioNetwork.on('currentRoomDataNotFound', (message) => {
        /*console.log("Room not found:", message);*/
        room.set({ data: undefined, error: message });
    });
}

export function updateNetwork() {
    socketioNetwork.emit('getCurrentRoomData');
}


