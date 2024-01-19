const nameInput = document.getElementById('name');
const descriptionInput = document.getElementById('description');
const brandInput = document.getElementById('brand');
const imageUrlInput = document.getElementById('imageUrl');
const priceInput = document.getElementById('price');

const form = document.getElementById("shopform")
const myUrl = "https://striveschool-api.herokuapp.com/api/product/"

fetch(myUrl, {
    headers: {
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWFhNGViYTE4N2U1YzAwMTgxNGM2ODIiLCJpYXQiOjE3MDU2NjAwOTAsImV4cCI6MTcwNjg2OTY5MH0.3rE2KbYorW79YEiaxn2ebYSZDqA2p7F3QLQgoVIBpvM"
    }
    })
.then((response) => {
    if (response.ok) {
      return response.json()
    } else {
      throw new Error(
        "Error"
      )
    }
  })
.catch((err) => console.error(err))



form.addEventListener('submit', function(e) {
    e.preventDefault();

    const newProduct = {
        name: nameInput.value,
        description: descriptionInput.value,
        brand: brandInput.value,
        imageUrl: imageUrlInput.value,
        price: parseInt(priceInput.value)
    }

    console.log(newProduct);

    fetch(myUrl, {
        method: "POST",
        body: JSON.stringify(newProduct),
        headers: {
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWFhNGViYTE4N2U1YzAwMTgxNGM2ODIiLCJpYXQiOjE3MDU2NjAwOTAsImV4cCI6MTcwNjg2OTY5MH0.3rE2KbYorW79YEiaxn2ebYSZDqA2p7F3QLQgoVIBpvM",
            "Content-Type": "application/json"
        }
    })
    .then((response) => {
        if (response.ok) {
            alert('Prodotto salvato!');
        } else {
            alert('Errore nella creazione del prodotto');
        }
    })
    .then((Product) => {
        alert('Prodotto salvato!');
        fetchProducts();
            const productElement = document.createElement('div');
            productElement.innerHTML = `
                <h2>${newProduct.name}</h2>
                <p>${newProduct.description}</p>
                <p>${newProduct.brand}</p>
                <img src="${newProduct.imageUrl}">
                <p>${newProduct.price}</p>
            `;
            productContainer.appendChild(productElement);
        })
    .catch((err) => {
        console.log(err);
     });

})

//Modifica prodotto
const editProductButton = document.getElementById('editProductButton');

editProductButton.addEventListener('click', function(e) {
    e.preventDefault();

    const updatedProduct = {
        name: nameInput.value,
        description: descriptionInput.value,
        brand: brandInput.value,
        imageUrl: imageUrlInput.value,
        price: parseInt(priceInput.value)
    }

    fetch(myUrl + '/product/' + productId, {
        method: "PUT",
        body: JSON.stringify(updatedProduct),
        headers: {
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWFhNGViYTE4N2U1YzAwMTgxNGM2ODIiLCJpYXQiOjE3MDU2NjAwOTAsImV4cCI6MTcwNjg2OTY5MH0.3rE2KbYorW79YEiaxn2ebYSZDqA2p7F3QLQgoVIBpvM",
            "Content-Type": "application/json"
        }
    })
    .then((response) => {
        if (response.ok) {
            alert('Prodotto modificato!');
            fetchProducts();  
        } else {
            alert('Errore nella modifica del prodotto');
        }
    })
    .catch((err) => {
        console.log(err);
    });
});


//cancella prodotto
const deleteProductButton = document.getElementById('deleteProductButton');

deleteProductButton.addEventListener('click', function(e) {
    e.preventDefault();

    fetch(myUrl + '/product/' + productId, {
        method: "DELETE",
        headers: {
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWFhNGViYTE4N2U1YzAwMTgxNGM2ODIiLCJpYXQiOjE3MDU2NjAwOTAsImV4cCI6MTcwNjg2OTY5MH0.3rE2KbYorW79YEiaxn2ebYSZDqA2p7F3QLQgoVIBpvM"
        }
    })
    .then((response) => {
        if (response.ok) {
            alert('Prodotto cancellato!');
            fetchProducts();
        } else {
            alert('Errore nella cancellazione del prodotto');
        }
    })
    .catch((err) => {
        console.log(err);
    });
});


//resetta form
const resetButton = document.getElementById('reset-button');

resetButton.addEventListener('click', () => {
    document.getElementById('product-form').reset();
});

