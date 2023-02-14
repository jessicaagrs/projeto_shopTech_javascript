import { products } from "./produtos.js";

console.log(products);

const divCards = document.querySelector('.main-cards-item')

function cards() {
    for (let i = 0; i < products.length; i++) {
        let imageCard = document.createElement('img')
        let imageLikeCard = document.createElement('img')
        let descriptionPrice = document.createElement('p')
        let marca = document.createElement('p')
        let stars = document.createElement('p')
        let buttonBuy = document.createElement('button')
        let div = document.createElement('div')

        imageCard.setAttribute('src', products[i].img)
        imageLikeCard.setAttribute('src', 'src/images/like.svg')
        descriptionPrice.innerText = `${products[i].name}  ${products[i].price}`
        descriptionPrice.setAttribute('id', 'descricaoProduto')
        marca.innerText = `${products[i].marca}, ${products[i].description}`
        stars.innerHTML = '<img src="src/images/star.png"/>'
        buttonBuy.textContent = 'Comprar'

        div.classList.add('item'+[i])
        div.appendChild(imageLikeCard)
        div.appendChild(imageCard)
        div.appendChild(descriptionPrice)
        div.appendChild(marca)
        div.appendChild(stars)
        div.appendChild(buttonBuy)
        divCards.append(div)
    }
}

window.addEventListener('load', cards);


