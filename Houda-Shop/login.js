// le but de cette if est de vérifie si l'utilisateur est déja connecté avant
if(localStorage.getItem('username')) {
    alert('Bienvenue, ' + localStorage.getItem('username'));
}
// Fonction de connexion
function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    if (username === "" || password === "") {
        alert('Veuillez remplir tous les champs.');
        return; // Arrête l'exécution si les champs sont vides
    }
    // Vérifie si le nom d'utilisateur existe et si le mot de passe est correct
    if (localStorage.getItem(username) === password) {
        alert('Les infos sont bien valides.');
        window.location.href = 'pageacceuil.html'; 
    } else {
        alert('Nom d\'utilisateur ou mot de passe incorrect.');
    }
}


// Fonction de création de compte
function signup() {
    const newUsername = document.getElementById('new-username').value;
    const newPassword = document.getElementById('new-password').value;
// Vérifie si les champs sont vides
if (newUsername === "" || newPassword === "") {
    alert("Veuillez remplir tous les champs !");
}
    else if(localStorage.getItem(newUsername)) {
        alert('Ce nom d\'utilisateur existe déjà.');
    } else {
        localStorage.setItem(newUsername, newPassword);
        alert('Compte créé avec succès !');
        showLogin();
    }
}

// Afficher la page de login
function showLogin() {
    document.getElementById('login-container').style.display = 'block';
    document.getElementById('signup-container').style.display = 'none';
}

// Afficher la page de création de compte
function showSignup() {
    document.getElementById('login-container').style.display = 'none';
    document.getElementById('signup-container').style.display = 'block';
}