/*
*   Quelques fetchs à utiliser rapidement
*   
*/
import { CookieType, setCookie } from './cookie'

// LOGIN
// param: vite server url, login, passwd
// retour code d'erreur: utile pour definir le message a afficher
export async function loginFetch(serverUrl, login_val, password_val) {
    let status = -1
    try {
        const response = await fetch(`${serverUrl}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                login: login_val,
                password: password_val
            }),
        });
        status = response.status;
        console.log(response);

        const data = await response.json();
        console.log(data.token);
        console.log(data);

        if (status == 404 || status == 401 || status == 400) {
                console.log("errreur 404 couzin");
                //error = true;
                throw new Error('Failed to fetch scores');
        }
        if(data.status == 200) {
            setCookie(CookieType.Token, data.token)
            setCookie(CookieType.Login, login_val)
            //location.href = '/'
        } 
       
    } catch (error) {
        console.error('Error fetching scores:', error);
        console.log(error);
    }

    return status;
}

