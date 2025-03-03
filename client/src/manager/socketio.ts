// src/network/socket.js
import {io} from 'socket.io-client';
import {CookieType, getCookie, viteServerUrl} from './cookie';
import {init, onMount} from "svelte/internal";
import {refreshRoom, updateNetwork} from "./room";

function initSocketio(namespace) {
    let socketioUrlNamespace = `${viteServerUrl}/${namespace}`

    console.log("xdd:" + namespace);

    let socketioNamespace = io(socketioUrlNamespace, {
        transports: ['websocket'],
        auth: {
            token: `Bearer ${getCookie(CookieType.Token)}`
        }
    });

    socketioNamespace.on('connect', () => {
        console.log("Socket.io: Connecté à " + socketioUrlNamespace);
    });

    return socketioNamespace;
}

export function refreshSocketio() {
    if(socketioNetwork) socketioNetwork.close();
    socketioNetwork = initSocketio("network");
    refreshRoom();
}


export let socketioNetwork = undefined;
