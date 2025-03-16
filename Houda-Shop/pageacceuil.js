// Fonction de déconnexion
function logout() {
    alert('Deconnexion réussie');
    window.location.replace("login.html");
    localStorage.removeItem();
// Redirige vers la page de login après déconnexion
}

