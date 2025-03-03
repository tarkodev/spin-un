// navigation.js
import { writable } from 'svelte/store';

// Création d'un store Svelte pour le chemin actuel
export const currentPath = writable('/');

// Fonction pour détecter si l'application s'exécute sous Electron
const isElectron = typeof window !== 'undefined' && window.process

// Fonction pour naviguer vers un nouveau chemin
export function navigateToPath(path) {
    if (!isElectron) {
        // Pour les navigateurs web, utiliser l'API HistoryA
        window.history.pushState({}, '', path);
        updateCurrentPathFromBrowser();
    } else {
        // Pour Electron, simplement mettre à jour le store sans recharger
        currentPath.set(path);
    }
}

// Fonction pour mettre à jour le chemin à partir de l'URL dans le navigateur
function updateCurrentPathFromBrowser() {
    if (!isElectron) {
        currentPath.set(window.location.pathname);
    }
}

// Ajouter un écouteur pour les changements d'URL pour les navigateurs web
if (!isElectron) {
    window.addEventListener('popstate', () => {
        updateCurrentPathFromBrowser();
    });
}
