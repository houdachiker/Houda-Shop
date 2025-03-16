// Variables de table
const productForm = document.getElementById('productForm');
const productTable = document.getElementById('productTable').getElementsByTagName('tbody')[0];
const userForm = document.getElementById('userForm');
const userTable = document.getElementById('userTable').getElementsByTagName('tbody')[0];
//getElementsTagName récupére toutes les elements avec le nom tbody mais ici nous sommes concernet du prement element
// il entend si l'evenement est produit ou non
productForm.addEventListener('submit', function (event) {
    event.preventDefault();//il empeche le rechargement de la page pour vérifier les conditions
    const productName = document.getElementById('productName').value;
    const productImage = document.getElementById('productImage').value;
    //verification que les variables ne sont pas vides
    if (productName && productImage) {
        //dataset.editingRow est  une façon pour le formulaire de se rappeler s’il doit 
        const editingRowIndex = productForm.dataset.editingRow;

        if (editingRowIndex !== undefined && editingRowIndex !== null && editingRowIndex !== '') {
            // Mise à jour d'une ligne existante
            const row = productTable.querySelector(`tr[data-id="${editingRowIndex}"]`);

            if (row) {
                row.cells[0].textContent = productName;
                row.cells[1].innerHTML = `<img src="${productImage}" alt="${productName}" style="max-width: 50px;">`;

                // Réinitialiser l'état d'édition
                delete productForm.dataset.editingRow;
            }
        } else {
            // Ajouter un nouveau produit
            const row = productTable.insertRow();
            const nameCell = row.insertCell(0);
            const imageCell = row.insertCell(1);
            const actionCell = row.insertCell(2);

            // Créer un identifiant unique pour la ligne
            const productId = Date.now(); // Utiliser le timestamp comme ID unique

            row.setAttribute('data-id', productId);

            nameCell.textContent = productName;
            imageCell.innerHTML = `<img src="${productImage}" alt="${productName}" style="max-width: 50px;">`;

            // Créer le bouton de modification
            const editButton = document.createElement('button');
            editButton.textContent = 'Modifier';
            editButton.classList.add('edit-btn');
            editButton.onclick = function () {
                document.getElementById('productName').value = nameCell.textContent;
                document.getElementById('productImage').value = productImage;

                // Stocker l'ID de la ligne en cours de modification
                productForm.dataset.editingRow = productId;
            };

            // Créer le bouton de suppression
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Supprimer';
            deleteButton.classList.add('delete-btn');
            deleteButton.onclick = function () {
                // Supprimer la ligne basée sur l'ID unique
                productTable.deleteRow(row.rowIndex - 1); // Supprimer la ligne par son index

                // Réinitialiser l'état d'édition si la ligne supprimée était celle en cours de modification
                if (productForm.dataset.editingRow === productId) {
                    delete productForm.dataset.editingRow;
                }
            };

            actionCell.appendChild(editButton);
            actionCell.appendChild(deleteButton);
        }

        // Réinitialiser le formulaire après ajout ou modification
        productForm.reset();
    } else {
        alert('Veuillez remplir tous les champs !');
    }
});

// Gérer la soumission du formulaire d'utilisateur
userForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const userName = document.getElementById('userName').value;

    if (userName) {
        // Créer un identifiant unique pour l'utilisateur
        const userId = Date.now(); // Utiliser le timestamp comme ID unique

        // Ajouter un nouvel utilisateur dans la table
        const row = userTable.insertRow();
        const nameCell = row.insertCell(0);
        const actionCell = row.insertCell(1);

        row.setAttribute('data-id', userId); // Définir un attribut data-id unique pour la ligne

        nameCell.textContent = userName;

        // Créer le bouton de suppression
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Supprimer';
        deleteButton.classList.add('delete-btn');
        deleteButton.onclick = function () {
            // Supprimer la ligne basée sur l'ID unique
            userTable.deleteRow(row.rowIndex - 1); // Supprimer la ligne par son index

            // Réinitialiser l'état d'édition si nécessaire
        };

        actionCell.appendChild(deleteButton);

        // Réinitialiser le formulaire après ajout
        userForm.reset();
    } else {
        alert('Veuillez remplir tous les champs !');
    }
});
