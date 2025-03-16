
const products = [
    { id: 1, name: "Produit 1", image: "image1.jpeg" },
    { id: 2, name: "Produit 2", image: "image2.jpeg" },
    { id: 3, name: "Produit 3", image: "image3.jpeg" },
    { id: 4, name: "Produit 4", image: "image4.jpg" },
    { id: 5, name: "Produit 5", image: "image5.jpeg" },
    { id: 6, name: "Produit 6", image: "image6.jpeg" },
    { id: 7, name: "Produit 7", image: "image7.jpeg" },
    { id: 8, name: "Produit 8", image: "image8.jpeg" },
];

// Affichage des produits sur la page web
function displayProducts() {
    const productGrid = document.getElementById("productGrid");

    products.forEach(product => {
        //pon parcourt chaque produit et on créee un div pour chaque produit
        const productCard = document.createElement("div");
     //avec cette ligne on ajoute une classe qui s'aooelle product-card quand on peut la donner du style dans css
        productCard.classList.add("product-card");
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h2>${product.name}</h2>
            <button onclick="addToCart(${product.id})">Ajouter au panier</button>
        `;
// d'ajouter dynamiquement un élément HTML (enfant) à l'intérieur d'un autre élément HTML (parent) dans le DOM.
        productGrid.appendChild(productCard);
    });
}

// Ajouter un produit au panier
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
//si le produit n'est pas trouve il va retourner null
    if (!product) {
        alert("Produit non trouvé !");
        return;
    }
// permet de récuperer le panier s'il existe ou créer un tableau vide
    let panier = JSON.parse(localStorage.getItem('panier')) || [];
    //elle permet de chercher le produit dans le tableau par sa position
    const index = panier.findIndex(p => p.id === productId);
//cette condition verifie si le produit existe deja dans le panier
    if (index !== -1) {
        panier[index].quantite += 1; // on peut ajouter la quantite du produit
    } else {
        panier.push({ ...product, quantite: 1 }); // si le produit n'existe pas dans le panier on peut ajouter au panier
    }

    localStorage.setItem('panier', JSON.stringify(panier));
    //permet de convertir le panier en  une chaine de caractéres pour pouvoir sauvegarder dans localstorage
    alert(`Produit ${product.name} ajouté au panier !`);
}



// lorsque j'atoute des produits au panier l'affichage des produits dans  la page web ne change pas
displayProducts();