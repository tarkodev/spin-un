<nav>
    <img src="{logo1}" alt="SpinUn Logo" id="logo">

    <div id="information_personnel">
    <p>Mon Compte</p>
    </div>

</nav>

<script>
    import { createEventDispatcher } from 'svelte';

    import logo1 from 'assets/logoAlternatif2.png'
    import logo2 from 'assets/logo2.png'

    const dispatch = createEventDispatcher();
</script>

<style>


    a{
        text-decoration: none;
        text-align: center;

        font-weight: bolder;
    }

    #retour_en_arriere{
        background-color: #454140;
        text-decoration-color: #D9D9D9;
        border-radius: 10px;
    }

    #information_personnel{
        width: 122px;
        height: 122px;
        left: 1360px;
        top: 57px;

        background: #D9D9D9;
        box-shadow: 0px 4px 4px #000000;
        border-radius: 5px;
    }

    nav {
        width: 95%;
        height: 20vh;

        /*box-shadow: 0px 5px 0px #454140;*/
        margin: auto;

        display: flex;

        flex-direction: row;
        justify-content: space-between;
    }

    img {
        height: 50%;
        margin-top: auto;
        margin-bottom: auto;
        margin-left: 10px;
    }
    #logo{
        animation: rotate 4s infinite ;
    }
    @keyframes rotate {
        0% {transform: rotate(0deg);}
        100% {transform: rotate(360deg);}
    }

    #logoSpinun{
        filter: drop-shadow(10px 7px 10px dimgray);
    }

    div {
        align-self: center;
        justify-self: flex-end;
        margin-right: 10px;

        display: flex;
        flex-direction: column;

        justify-content: space-around;

        /*border: 1px solid black;*/
        height: 70%;
        width: 10%;
    }

    #login_button {

        border-radius: 50px;
        font-family: "Hanken Grotesk";
        font-size: 1.5em;
        background-color: #82b74b;
        border: none;
        box-shadow: 0 4px 4px #405d27;
        color: white;

        height: 40%;

        cursor: pointer;


background: #3C8224;
box-shadow: 0px 4px 4px #000000;
border-radius: 30px;

    }

    #login_button:hover {
        /*box-shadow: 0 2px 0 #405d27;*/
        box-shadow: 0 2px 0 #000000;
        transform: translateY(3px);
    }

    #signup_button {
        border-radius: 50px;
        font-family: "Hanken Grotesk";
        font-size: 1.5em;
        background-color: #eea29a;
        border: none;
        box-shadow: 0 5px 0 #c94c4c;
        color: white;

        height: 40%;

        cursor: pointer;


background: #822424;
box-shadow: 0px 4px 4px #000000;
border-radius: 30px;

    }

    #signup_button:hover {
        /*box-shadow: 0 2px 0 #c94c4c;*/
        box-shadow: 0 2px 0 #000000;
        transform: translateY(3px);
    }
</style>

