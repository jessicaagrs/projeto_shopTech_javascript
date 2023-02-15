import { products } from "./produtos.js";

console.log(products);

const divCards = document.querySelector('.main-cards-item')
const inputSearch = document.getElementById('searchProducts');
const buttonSearch = document.getElementById('btn-search')
const buttonSearchDelete = document.getElementById('btn-deleteSearch')

function formatPrice(price) {
    return price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function createCards() {
    for (let i = 0; i < products.length; i++) {
        let imgProduct = document.createElement('img')
        let imgLike = document.createElement('img')
        let pDescription = document.createElement('p')
        let pMarca = document.createElement('p')
        let pStar = document.createElement('p')
        let buttonBuy = document.createElement('button')
        let newDiv = document.createElement('div')

        var priceFormat = formatPrice(products[i].price)

        imgProduct.setAttribute('src', products[i].img)
        imgLike.setAttribute('src', 'src/images/like.svg')
        pDescription.innerText = `${products[i].name} \n ${priceFormat}`
        pDescription.setAttribute('id', 'descricaoProduto')
        pMarca.innerText = `${products[i].marca}, ${products[i].description}`
        pStar.innerHTML = '<img src="src/images/star.png"/>'
        buttonBuy.textContent = 'Comprar'

        newDiv.classList.add('item' + [i])
        newDiv.appendChild(imgLike)
        newDiv.appendChild(imgProduct)
        newDiv.appendChild(pDescription)
        newDiv.appendChild(pMarca)
        newDiv.appendChild(pStar)
        newDiv.appendChild(buttonBuy)
        divCards.append(newDiv)
    }
}

window.addEventListener('load', createCards);

function searchProducts() {
    let inpValue = inputSearch.value
    inpValue.toLowerCase()
    let banner = document.getElementsByClassName('main-banner')
    let filters = document.getElementsByClassName('main-filters')
    let title = document.getElementsByClassName('main-title')
    let footer = document.getElementsByClassName('footer')
    let itemsCards = document.querySelectorAll('.main-cards-item div')
    let pMessage = document.createElement('p')
    pMessage.style.marginTop = "140px"
    pMessage.style.marginLeft = "380px"
    divCards.append(pMessage)

    if (inpValue == "") {
        window.location.reload(true);
    }

    for (let i = 0; i < itemsCards.length; i++) {
        const card = itemsCards[i].textContent.toLowerCase().includes(inpValue)
        if (!card) {
            itemsCards[i].classList.add('invisible')
            banner[0].classList.add('invisible')
            filters[0].classList.add('invisible')
            title[0].classList.add('invisible')
            footer[0].classList.add('invisible')
        }
        else {
            divCards.style.display = "flex";
        }
    }

    const newArray = Array.from(itemsCards)
    const todosTemClasse = newArray.every(function(classe) {
        debugger
        return classe.classList[1] == 'invisible';
      });

    if(todosTemClasse){
        pMessage.innerHTML = "<p>Não foi encontrado resultado para sua pesquisa, por gentileza refaça sua busca.</p>"
    }

}

buttonSearch.addEventListener('click', searchProducts)

function deleteSearchProducts() {
    inputSearch.value = '';
    window.location.reload(true);
}

buttonSearchDelete.addEventListener('click', deleteSearchProducts)



