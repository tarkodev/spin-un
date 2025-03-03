<script>
    import {createEventDispatcher} from 'svelte';
    import BouttonRetour from '../routes/BouttonRetour.svelte';

    const dispatch = createEventDispatcher();

    
</script>

<section>
    <BouttonRetour on:GoBackClick/>

    <article>
        <div class="download">
            <div class="Installation-linux">
                <img src="assets/logo/linux.svg">
                <div class="download_button" ><a href="http://92.88.14.59:33/PI_2A/spin-un-linux-x64.zip" download><span>Linux</span></a></div>
            </div>
            <div class="Installation-apple">
                <img src="assets/logo/apple.png">
                <div class="download_button" ><a href="http://92.88.14.59:33/PI_2A/spin-un-darwin-arm64.zip" download><span>MacOS</span></a></div>
            </div>
            <div class="Installation-windows">
                <img src="assets/logo/windows-noir.png">
                <div class="download_button" ><a href="http://92.88.14.59:33/PI_2A/spin-un-win32-x64.zip" download><span>Windows</span></a></div>
            </div>
        </div>
    </article>
</section>

<style>
    article {
        width: 80%;
        height: 80%;

        display: flex;
        justify-content: center;
    }

    .download_button {
        width: 100%;
        height: 50px;
        background-color: gray;


        display: inline-block;
        /*border-radius: 4px;*/

        background: #9BBEC8;
    box-shadow: 0px 4px 4px #000000;
    border-radius: 5px;

        /*background-color: #405d27;
        /*background-color: #77a8a8;
        background-color: #f4511e;*/
        border: none;
        color: #164863;
        text-align: center;
        font-size: 36px; /** 28*/
        padding: 20px;
        /*default with : 200px*/
        width: 400px;
        transition: all 0.5s;
        cursor: pointer;
        margin: 7px;

        height: 60px;

        font-family: "Hanken Grotesk";

        font-weight: bolder;
        margin-top: 50px;
    }

    .download_button span {
        cursor: pointer;
        display: inline-block;
        position: relative;
        transition: 0.5s;
    }
  
    .download_button span:after {
        content: '\00bb';
        position: absolute;
        opacity: 0;
        top: 0;
        right: -20px;
        transition: 0.5s;
    }
  
    .download_button:hover span {
        padding-right: 25px;
    }
  
    .download_button:hover span:after {
        opacity: 1;
        right: 0;
    }

    .download div {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 50%;
    }

    .download {
        display: flex;
        justify-content: space-around;
        align-content: center;
        align-items: center;
        height: 60%;
        width: 60%;

        background-color: #164863;
        border-radius: 10px;
    }

    .Installation-apple, .Installation-linux, .Installation-windows {
        /*margin-left: 10%;
        margin-right: 10%;*/
    }

    img {
        background-color: #9BBEC8;
        padding: 5px;
        border-radius: 5px;
        height: 100px;
        width: 100px;
        box-shadow: 0px 4px 4px #000000;

    }

    nav {
        width: 95%;
        height: 10vh;
        display: flex;

        justify-content: flex-start;
    }

    nav a {
        height: 50%;
        margin-top: auto;
        margin-bottom: auto;
        width: 120px;

        border-radius: 30px;

        font-size: 1em;

        background-color: #f4511e;
        color: #FFFFFF;
        /*border: 2px solid #f4511e;*/
        border: none;

        cursor: pointer;
    }

    /**/


    /***/

    section {

        width: 100%;
        height: 80vh;
        margin: auto;

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    article {
        width: 100%;
        height: 100%;

        display: flex;
        flex-direction: column;

        align-items: center;

        /*border: 5px solid black;*/
        /*
        border-width: 7px;
        border-style: solid;
        border-image: linear-gradient(#ff6666, #ff4d4d) 30;


        border-radius: 40px;
        */
        /*
        background:
        linear-gradient(white 0 0) padding-box, /*this is your grey background
        linear-gradient(to right, #ff6666, #ff4d4d) border-box;
        color: #313149;
        padding: 10px;
        /*border: 5px solid transparent;
        border-radius: 15px;
        display: inline-block;
        margin: 75px 0;*/
    }

    #login_button {

        border-radius: 50px;
        font-family: "Hanken Grotesk";
        font-size: 1em;
        background-color: #82b74b;
        border: none;
        box-shadow: 0 4px 4px #405d27;
        color: white;

        height: 70%;

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

    a {
        text-decoration: none;
        text-align: center;

        font-weight: bolder;
    }
</style>