// Fonction pour afficher les produits du panier
function afficherPanier() {
    const panierContainer = document.getElementById('panier-container');
    panierContainer.innerHTML = ''; // Effacer le contenu précédent

    let panier = JSON.parse(localStorage.getItem('panier')) || [];
    let total = 0;

    panier.forEach((produit, index) => {
        const produitElement = document.createElement('div');
        produitElement.classList.add('produit');

        const name = produit.name || "Produit inconnu";
        const image = produit.image || "default-image.jpg"; // Image par défaut
        const quantite = produit.quantite || 1;

        produitElement.innerHTML = `
            <div>
                <img src="${image}" alt="${name}" style="width: 100px; height: auto;" />
                <p>${name}</p>
                <p>Quantité: <input type="number" value="${quantite}" min="1" onchange="mettreAJourQuantite(${index}, this.value)" /></p>
                <button onclick="supprimerProduit(${index})">Supprimer</button>
            </div>
        `;
        panierContainer.appendChild(produitElement);

        total += quantite; // Ajuster le calcul du total si le prix est ajouté
    });

    document.getElementById('total-price').textContent = `Total produits: ${total}`;
}

// Fonction pour mettre à jour la quantité d'un produit
function mettreAJourQuantite(index, quantite) {
    let panier = JSON.parse(localStorage.getItem('panier')) || [];
    if (quantite <= 0) {
        supprimerProduit(index); // Supprimer le produit si la quantité est 0 ou moins
        return;
    }
    panier[index].quantite = parseInt(quantite);
    localStorage.setItem('panier', JSON.stringify(panier));
    afficherPanier();
}

// Fonction pour supprimer un produit du panier
function supprimerProduit(index) {
    let panier = JSON.parse(localStorage.getItem('panier')) || [];
    panier.splice(index, 1); // Supprimer le produit par sa position 
    localStorage.setItem('panier', JSON.stringify(panier));
    afficherPanier(); // Réafficher le panier mis à jour
}

// Fonction pour afficher le formulaire de validation de commande
function validerCommande() {
    // Afficher le formulaire
    const formulaire = document.getElementById('formulaire-commande');
    formulaire.style.display = 'block';

    // Cacher le bouton "Valider ma commande"
    const boutonValider = document.getElementById('valider-commande');
    boutonValider.style.display = 'none';
}

// Fonction pour envoyer la commande (soumission du formulaire)
function envoyerCommande(event) {
    event.preventDefault(); // Empêcher le rechargement de la page

    // Récupérer les données du formulaire
    const nom = document.getElementById('nom').value;
    const adresse = document.getElementById('adresse').value;
    const telephone = document.getElementById('telephone').value;

    // Calculer le total des produits
    let panier = JSON.parse(localStorage.getItem('panier')) || [];
    //permet de parcourir le tableau et calculer la somme des quantite 
    let total = panier.reduce((acc, produit) => acc + (produit.quantite || 1), 0);

    // Formater le total en dollars
    const totalInDollars = `$${total}`;

    // Rediriger vers la page factures.html avec le total en dollars comme paramètre
    window.location.href = `factures.html?total=${totalInDollars}`;

    // Réinitialiser le formulaire
    document.getElementById('formulaire-commande').reset();

    // Cacher le formulaire après l'envoi
    const formulaire = document.getElementById('formulaire-commande');
    formulaire.style.display = 'none';

    // Réafficher le bouton "Valider ma commande"
    const boutonValider = document.getElementById('valider-commande');
    boutonValider.style.display = 'block';

    // Vider le panier après confirmation
    localStorage.removeItem('panier');
    afficherPanier();
}

// Initialisation de la page Panier
if (document.getElementById('panier-container')) {
    afficherPanier();
}