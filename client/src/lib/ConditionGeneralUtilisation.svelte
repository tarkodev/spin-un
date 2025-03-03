<script >
import { createEventDispatcher } from "svelte";

const dispatch = createEventDispatcher();
</script>

<head>
    <meta charset="UTF-8" />
</head>

<body>
<h1>Conditions Générales d'Utilisation</h1>

<h2>1 - Acceptation des Conditions d'Utilisation</h2>
En utilisant ce site web et en vous inscrivant pour créer un compte, vous acceptez d'être lié par les présentes Conditions Générales d'Utilisation. Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser ce site.

<h2>2 - Inscription et Compte Utilisateur</h2>
2.1. Pour utiliser certaines fonctionnalités du site, vous devrez créer un compte utilisateur en fournissant des informations exactes et complètes lors du processus d'inscription.

2.2. Vous êtes responsable de maintenir la confidentialité de votre compte et de votre mot de passe, et vous acceptez de ne pas partager vos informations d'identification avec des tiers.

2.3. Vous acceptez de nous informer immédiatement de toute utilisation non autorisée de votre compte ou de toute autre violation de la sécurité.

<h2>3 - Utilisation du Site</h2>
3.1. Vous acceptez d'utiliser le site uniquement à des fins légales et conformément aux présentes Conditions Générales d'Utilisation.

3.2. Vous ne devez pas utiliser le site de manière à causer un préjudice à d'autres utilisateurs ou à perturber le fonctionnement normal du site.

3.3. Vous acceptez de ne pas utiliser le site pour diffuser des contenus illégaux, diffamatoires, obscènes, offensants, ou violant les droits de propriété intellectuelle d'autrui.

<h2>4 - Contenu Utilisateur</h2>
4.1. En soumettant du contenu sur le site, vous accordez à la société une licence non exclusive, libre de redevances, transférable, mondiale, pour utiliser, reproduire, modifier, distribuer et afficher ce contenu dans le cadre de la fourniture de nos services.

4.2. Vous êtes seul responsable du contenu que vous publiez sur le site, et vous garantissez que vous avez le droit de le publier et qu'il ne viole aucun droit de tiers.

<h2>5 - Limitation de Responsabilité</h2>
5.1. Dans toute la mesure permise par la loi applicable, nous déclinons toute responsabilité pour tout dommage direct, indirect, spécial, consécutif ou punitif découlant de votre utilisation ou de votre incapacité à utiliser le site.

5.2. En aucun cas notre responsabilité totale envers vous pour tous les dommages ne dépassera le montant que vous avez payé, le cas échéant, pour utiliser le site.

<h2>6 - Modification des Conditions</h2>
Nous nous réservons le droit de modifier ces Conditions Générales d'Utilisation à tout moment et sans préavis. Il est de votre responsabilité de consulter régulièrement les conditions pour rester informé des éventuelles modifications. L'utilisation continue du site après de telles modifications constitue votre acceptation des conditions révisées.

En acceptant ces conditions, vous reconnaissez avoir lu, compris et accepté toutes les modalités énoncées ci-dessus. Si vous avez des questions concernant ces conditions, veuillez nous contacter.

<div>
    <button on:click={() => dispatch('GoBackClick')}> Lu et approuver</button>
</div>

</body>
