let factures = [];

// Ajouter une facture
document.getElementById('facture-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const factureId = document.getElementById('facture-id').value;
    const clientName = document.getElementById('client-name').value;
    const montant = document.getElementById('montant').value;

    // Créer une nouvelle facture
    const facture = {
        id: factureId,
        client: clientName,
        montant: montant
    };

    // Ajouter la facture dans le tableau des factures
    factures.push(facture);

    // Afficher les factures après l'ajout
    afficherFactures();

    // Réinitialiser le formulaire après ajout
    e.target.reset();
});

// Afficher toutes les factures
function afficherFactures() {
    const tbody = document.getElementById('facture-table-body');
    tbody.innerHTML = '';  // Effacer la liste actuelle de factures

    factures.forEach(facture => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${facture.id}</td>
            <td>${facture.client}</td>
            <td>${facture.montant} €</td>
            <td>
                <button class="delete-btn" onclick="supprimerFacture(${facture.id})">Supprimer</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// Supprimer une facture en fonction de son ID
function supprimerFacture(id) {
    // Filtrer la facture avec l'ID correspondant à supprimer
    factures = factures.filter(facture => facture.id != id);

    // Réafficher les factures après suppression
    afficherFactures();
}

// Récupérer le total des produits depuis l'URL
const urlParams = new URLSearchParams(window.location.search);
const total = urlParams.get('total');

if (total) {
    alert(`Total des produits: ${total}`);
}
// Si le total est présent dans l'URL, le définir comme valeur par défaut du champ "montant"
if (total) {
    document.getElementById('montant').value = total;
}