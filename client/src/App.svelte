<script lang="ts">
    import Menu from "./routes/Menu.svelte";
    import Scoreboard from './routes/scoreboard/Scoreboard.svelte';
    import Nav from './routes/Nav.svelte';
    import Login from './routes/loginSignup/Login.svelte';
    import Game from './routes/game/Game.svelte';
    import Lobby from './routes/lobby/Lobby.svelte'
    import Room from './routes/room/Room.svelte'
    import NavGame2 from "./routes/NavGame2.svelte";
    import Account from "./routes/account/Account.svelte";
    import Create from "./routes/create/Create.svelte";
    import {onMount} from 'svelte';
    import ConditionGeneralUtilisation from "./lib/ConditionGeneralUtilisation.svelte";
    import Moderation from "./routes/ADMIN/Moderation.svelte";
    import Download from "./lib/Installation.svelte"
    import NavNotConnected from "./routes/NavNotConnected.svelte";
    import AccountInfo from "./routes/account/AccountInfo.svelte";
    import {clearAllCookies, CookieType, getCookie} from "./manager/cookie";
    import BouttonRetour from "./routes/BouttonRetour.svelte";
    import ForgetConfirmePWD from "./routes/loginSignup/ForgetConfirmePWD.svelte";
    import ForgetPWD from "./routes/loginSignup/ForgetPWD.svelte";
    import HistoriqueParties from "./routes/account/HistoriqueParties.svelte";

    import BouttonRetourScroll from "./routes/BouttonRetourScroll.svelte";

    let nodeVersion, chromeVersion, electronVersion;

    if (typeof api !== 'undefined') {
        nodeVersion = api.node();
        chromeVersion = api.chrome();
        electronVersion = api.electron();
    }

    function importAll(r) {
        return r.keys().map(r);
    }


    let currentPath = '/'

    // Fonction pour naviguer
    function navigateToPath(path) {
        if (!electronVersion) {
            window.history.pushState({}, '', path);
            updateCurrentPathFromBrowser();
        } else {
            currentPath = path;
        }
    }

    // Mettre à jour la route basée sur l'URL
    function updateCurrentPathFromBrowser() {
        if (!electronVersion) {
            currentPath = window.location.pathname;
        }
    }

    // Écouter les changements d'URL
    if (!electronVersion) {
        onMount(() => {
            window.addEventListener('popstate', updateCurrentPathFromBrowser);
            updateCurrentPathFromBrowser(); // Pour le chargement initial
        });
    }


    let login = true;
    let signup = false;

    const deleteCookie = () => {
        clearAllCookies();

        navigateToPath('/login')
    }

    const deleteCookie2 = () => {
        clearAllCookies();
        navigateToPath('/')
        navigateToPath('/account')
    }

    // Fonction pour naviguer
    function navigateToPath2(path) {
        if (!electronVersion) {
            window.history.pushState({}, '', '/login');
            updateCurrentPathFromBrowser();
        } else {
            currentPath = '/';
        }
    }


    function checkLocation(noNavigate) {
        if (!noNavigate)
            navigateToPath('/')
        currentPath = window.location.pathname
        if (getCookie(CookieType.Token) === "" /*&& currentPath !== '/' */
            && currentPath !== '/login' && currentPath !== '/signup' && currentPath !== '/download')
            navigateToPath('/login')

        return;
    }

    currentPath = window.location.pathname
    if (getCookie(CookieType.Token) === "" /*&& currentPath !== '/' */
        && currentPath !== '/login' && currentPath !== '/signup' && currentPath !== '/download' && currentPath !== '/forgetconfirmepwd' && currentPath !== '/forgetpwd')
        navigateToPath('/login')

    if (getCookie(CookieType.Token) !== ""
        && currentPath === '/login' || currentPath === '/signup')
        navigateToPath('/')

    let trueVal = true;
    let falseVal = false;

    function login_and_reload() {
        navigateToPath("/")
        //location.reload()
    }


    let afficheLeChat = false;

    function afficheChat() {
        console.log("changement valeur !!!!!!!!!!!!!!!!!!!")
        if(afficheLeChat)
            afficheLeChat = false;
        else
            afficheLeChat = true;
        console.log("nouvelllllllllllllllllllllllllle valeur : " + afficheLeChat)
    }

</script>


{#if currentPath === '/'}

    {#if getCookie(CookieType.Token) === ""}
        <!--
            <NavNotConnected />
           <Redirect on:Login={() => checkLocation(false)}/>
           -->
        <Login on:ConnectClick={() => navigateToPath2('/')} bind:login={login}
               on:DownloadClick={() => navigateToPath('/download')}
               on:SignupClick={() => navigateToPath('/signup')}/>
    {:else}
        <Nav on:LoginClick={() => navigateToPath('/login')}
             on:SignupClick={() => navigateToPath('/signup')}
             on:DecoClick={() => deleteCookie()}
             on:MonProfilClick={() => navigateToPath('/account')}/>
        <Menu on:GameClick={() => navigateToPath('/create')}
              on:ScoreboardClick={() => navigateToPath('/scoreboard')}
              on:LobbyClick={() => navigateToPath('/lobby')}
              on:DownloadClick={() => navigateToPath('/download')}/>
    {/if}

{:else if currentPath === '/login'}

    {#if getCookie(CookieType.Token) !== ""}
        <Nav on:LoginClick={() => navigateToPath('/login')}
             on:SignupClick={() => navigateToPath('/signup')}
             on:DecoClick={() => deleteCookie2()}
             on:MonProfilClick={() => navigateToPath('/account')}/>
        <Menu on:GameClick={() => navigateToPath('/create')}
              on:ScoreboardClick={() => navigateToPath('/scoreboard')}
              on:LobbyClick={() => navigateToPath('/network')}
              on:DownloadClick={() => navigateToPath('/download')}/>
    {:else}
        <Login on:ConnectClick={() => navigateToPath('/')} bind:login={login}
               on:DownloadClick={() => navigateToPath('/download')}
               on:SignupClick={() => navigateToPath('/signup')}
               on:ForgetPWDClick={()=>navigateToPath('/forgetpwd')}/>
    {/if}

{:else if currentPath === `/forgetconfirmepwd`}
    {#if getCookie(CookieType.Token) === ""}
        <ForgetConfirmePWD/>
    {:else}
        <Nav on:LoginClick={() => navigateToPath('/login')}
             on:SignupClick={() => navigateToPath('/signup')}
             on:DecoClick={() => deleteCookie()}
             on:MonProfilClick={() => navigateToPath('/account')}/>
        <Menu on:GameClick={() => navigateToPath('/create')}
              on:ScoreboardClick={() => navigateToPath('/scoreboard')}
              on:LobbyClick={() => navigateToPath('/lobby')}
              on:DownloadClick={() => navigateToPath('/download')}/>
    {/if}

{:else if currentPath === '/forgetpwd'}
    {#if getCookie(CookieType.Token) === ""}
        <ForgetPWD
                on:DownloadClick={() => navigateToPath('/download')}
                on:GoBackClick={() => navigateToPath('/login')}
        />

    {:else}
        <Nav on:LoginClick={() => navigateToPath('/login')}
             on:SignupClick={() => navigateToPath('/signup')}
             on:DecoClick={() => deleteCookie()}
             on:MonProfilClick={() => navigateToPath('/account')}/>
        <Menu on:GameClick={() => navigateToPath('/create')}
              on:ScoreboardClick={() => navigateToPath('/scoreboard')}
              on:LobbyClick={() => navigateToPath('/lobby')}
              on:DownloadClick={() => navigateToPath('/download')}/>
    {/if}


{:else if currentPath === '/signup'}

    {#if getCookie(CookieType.Token) !== ""}
        <Nav on:LoginClick={() => navigateToPath('/login')}
             on:SignupClick={() => navigateToPath('/signup')}
             on:DecoClick={() => deleteCookie()}
             on:MonProfilClick={() => navigateToPath('/account')}/>
        <Menu on:GameClick={() => navigateToPath('/create')}
              on:ScoreboardClick={() => navigateToPath('/scoreboard')}
              on:LobbyClick={() => navigateToPath('/network')}
              on:DownloadClick={() => navigateToPath('/download')}/>
    {:else}
        <Login on:ConditionGeneralClick={() => navigateToPath('/ConditionGeneralUtilisation')}
               bind:login={signup}
               on:LoginClick={() => navigateToPath('/login')}
               on:DownloadClick={() => navigateToPath('/download')}
               on:SignupTestClick={() => navigateToPath('/login')}
               on:SignupYessir={() => navigateToPath('/')}/>
    {/if}

{:else if currentPath === '/scoreboard'}

    {#if getCookie(CookieType.Token) === ""}
        <!--
        <NavNotConnected />
        <Redirect on:Login={() => checkLocation(false)}/>
        -->
        <Login on:ConnectClick={() => navigateToPath('/')} bind:login={login}
               on:DownloadClick={() => navigateToPath('/download')}
               on:SignupClick={() => navigateToPath('/signup')}/>
    {:else}
        <Nav on:LoginClick={() => navigateToPath('/login')}
             on:SignupClick={() => navigateToPath('/signup')}
             on:DecoClick={() => deleteCookie()}
             on:MonProfilClick={() => navigateToPath('/account')}/>
        <BouttonRetourScroll on:GoBackClick={() => navigateToPath('/')}/>
        <Scoreboard></Scoreboard>
    {/if}

{:else if currentPath === '/historique-partie'}
    {#if getCookie(CookieType.Token) === ""}
        <Login on:ConnectClick={() => navigateToPath('/')} bind:login={login}
               on:DownloadClick={() => navigateToPath('/download')}
               on:SignupClick={() => navigateToPath('/signup')}/>
    {:else}
        <Nav on:LoginClick={() => navigateToPath('/login')}
             on:SignupClick={() => navigateToPath('/signup')}
             on:DecoClick={() => deleteCookie()}
             on:MonProfilClick={() => navigateToPath('/account')}/>
        <HistoriqueParties on:GoBackClick={() => navigateToPath('/account')}

        />

    {/if}


{:else if currentPath === '/lobby'}

    {#if getCookie(CookieType.Token) === ""}
        <Login on:ConnectClick={() => navigateToPath('/')} bind:login={login}
               on:DownloadClick={() => navigateToPath('/download')}
               on:SignupClick={() => navigateToPath('/signup')}/>
    {:else}
        <Nav on:LoginClick={() => navigateToPath('/login')}
             on:SignupClick={() => navigateToPath('/signup')}
             on:DecoClick={() => deleteCookie()}
             on:MonProfilClick={() => navigateToPath('/account')}/>
        <BouttonRetour on:GoBackClick={()=>navigateToPath('/')}></BouttonRetour>
        <Lobby on:GoBackClick={() => navigateToPath('/')}
               on:RoomClick={() => navigateToPath('/network')}
               on:createClick={() => navigateToPath('/create')}/>
    {/if}

{:else if currentPath === '/ConditionGeneralUtilisation'}

    <ConditionGeneralUtilisation on:GoBackClick={() => navigateToPath('/signup')}/>

{:else if currentPath === '/network'}

    {#if getCookie(CookieType.Token) === ""}
        <Login on:ConnectClick={() => navigateToPath('/')} bind:login={login}
               on:DownloadClick={() => navigateToPath('/download')}
               on:SignupClick={() => navigateToPath('/signup')}/>
    {:else}
        <Nav on:LoginClick={() => navigateToPath('/login')}
             on:SignupClick={() => navigateToPath('/signup')}
             on:DecoClick={() => deleteCookie()}
             on:MonProfilClick={() => navigateToPath('/account')}
             bind:is_in_room={login}/>
        <Room on:GoBackClick={() => navigateToPath('/lobby')}
              on:StartGameClick={() => navigateToPath('/game')}/>

    {/if}

{:else if currentPath === '/game'}

    {#if getCookie(CookieType.Token) === ""}
        <Login on:ConnectClick={() => navigateToPath('/')} bind:login={login}
               on:DownloadClick={() => navigateToPath('/download')}
               on:SignupClick={() => navigateToPath('/signup')}/>
    {:else}
        <NavGame2 on:SignupClick={() => navigateToPath('/signup')}
                  on:GoBackClick={() => navigateToPath('/')}
                  on:AfficheChat={() => afficheChat()}/>
        <Game on:GoBackClick={() => navigateToPath('/')}
              on:RoomClick={() => navigateToPath('/network')}
              bind:afficheLeChat/>
    {/if}


{:else if currentPath === '/account'}

    {#if getCookie(CookieType.Token) === ""}
        <Login on:ConnectClick={() => navigateToPath('/')} bind:login={login}
               on:DownloadClick={() => navigateToPath('/download')}
               on:SignupClick={() => navigateToPath('/signup')}/>
    {:else}
        <Nav on:LoginClick={() => navigateToPath('/login')}
             on:SignupClick={() => navigateToPath('/signup')}
             on:DecoClick={() => deleteCookie()}
             on:MonProfilClick={() => navigateToPath('/account')}/>
        <Account on:GoBackClick={() => navigateToPath('/')}
                 on:AccountInfoClick={() => navigateToPath('/account-info')}
                 on:HistoryClick={()=> navigateToPath('/historique-partie')}
                 on:DecoClick={() => {
                     deleteCookie();
                     navigateToPath('/login')
                 }}/>

    {/if}

{:else if currentPath === '/account-info'}

    {#if getCookie(CookieType.Token) === ""}
        <Login on:ConnectClick={() => navigateToPath('/')} bind:login={login}
               on:DownloadClick={() => navigateToPath('/download')}
               on:SignupClick={() => navigateToPath('/signup')}/>
    {:else}
        <Nav on:LoginClick={() => navigateToPath('/login')}
             on:SignupClick={() => navigateToPath('/signup')}
             on:DecoClick={() => deleteCookie()}
             on:MonProfilClick={() => navigateToPath('/account')}/>
        <AccountInfo on:GoBackClick={() => navigateToPath('/account')}
                     on:DecoClick={() => {
                     deleteCookie();
                     navigateToPath('/login')
                 }}/>
    {/if}

{:else if currentPath === '/create'}

    {#if getCookie(CookieType.Token) === ""}
        <Login on:ConnectClick={() => navigateToPath('/')} bind:login={login}
               on:DownloadClick={() => navigateToPath('/download')}
               on:SignupClick={() => navigateToPath('/signup')}/>
    {:else}
        <Nav on:LoginClick={() => navigateToPath('/login')}
             on:SignupClick={() => navigateToPath('/signup')}
             on:DecoClick={() => deleteCookie()}
             on:MonProfilClick={() => navigateToPath('/account')}/>
        <BouttonRetour on:GoBackClick={() => navigateToPath('/')}/>
        <Create on:GoBackClick={() => navigateToPath('/')}
                on:CreateClick={() => navigateToPath('/network')}/>
    {/if}


{:else if currentPath === '/moderation'}
    {#if getCookie(CookieType.Token) === ""}
        <Login on:ConnectClick={() => navigateToPath('/')} bind:login={login}
               on:DownloadClick={() => navigateToPath('/download')}
               on:SignupClick={() => navigateToPath('/signup')}/>
    {:else}
        <Nav on:LoginClick={() => navigateToPath('/login')}
             on:SignupClick={() => navigateToPath('/signup')}
             on:DecoClick={() => deleteCookie()}
             on:MonProfilClick={() => navigateToPath('/account')}/>
        <Moderation on:GoBackClick={() => navigateToPath('/')}/>
    {/if}


{:else if currentPath === '/download'}

    {#if getCookie(CookieType.Token) === ""}
        <NavNotConnected/>
    {:else}
        <Nav on:LoginClick={() => navigateToPath('/login')}
             on:SignupClick={() => navigateToPath('/signup')}
             on:DecoClick={() => deleteCookie()}
             on:MonProfilClick={() => navigateToPath('/account')}/>
    {/if}

    <Download on:GoBackClick={() => checkLocation(false)}/>

{:else}

    <Nav on:LoginClick={() => navigateToPath('/login')}
         on:SignupClick={() => navigateToPath('/signup')}
         on:DecoClick={() => deleteCookie()}
         on:MonProfilClick={() => navigateToPath('/account')}/>
    <p>Erreur 404</p>

{/if}

<style>
    @import url("https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@500;700;800&display=swap");

    :global(body) {
        margin: 0;
        background-image: url("assets/spinun4.png");
        /*
        background-image: linear-gradient(to right, #ffd89b, #19547b);
        /*background-color: #80ced6;
        /*background-color: #cfe0e8;
        background-color: #c94c4c;
        background-image: linear-gradient(#006600, #206040);*/

        /**test*/
        height: 100vh;
    }
</style>


