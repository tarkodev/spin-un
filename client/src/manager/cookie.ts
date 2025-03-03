import {updateNetwork} from "./room";

export enum CookieType {
    Login = "login",
    Token = "token",
    Score = "score",
    ProfilePicture = "profile_picture",
    ConfirmationMessage = "confirmation_msg"
}

const isElectron =  typeof api !== 'undefined';
let electronCookieMap = {};

function getCookieString(cname: string) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

export function setCookieString(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

export function clearAllCookies(): void {
    const cookies = document.cookie.split(";");

    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i];
        const eqPos = cookie.indexOf("=");
        const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
    }

    electronCookieMap = {};
}

export function getCookie(cookieType: CookieType) {
    if(isElectron) {
        return electronCookieMap[cookieType.valueOf()] === undefined ? "" : electronCookieMap[cookieType.valueOf()];
    } else {
        return getCookieString(cookieType.valueOf());
    }
}

export function setCookie(cookieType: CookieType, value: string) {
    if(isElectron) {
        electronCookieMap[cookieType.valueOf()] = value;
    } else {
        setCookieString(cookieType.valueOf(), value, 7);
    }
}

export function loadCookies() {
    for (let cookieTypeKey in CookieType) {
        if(getCookieString(cookieTypeKey.valueOf()) != "") {
            electronCookieMap[cookieTypeKey.valueOf()] = getCookieString(cookieTypeKey.valueOf());
        }
    }
}

export function saveCookies() {
    for (let electronCookieMapKey in electronCookieMap) {
        setCookieString(electronCookieMapKey, electronCookieMap[electronCookieMapKey], 7);
    }
}



// @ts-ignore
export const viteServerUrl = import.meta.env.VITE_SERVER_URL;