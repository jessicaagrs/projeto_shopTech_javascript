import { products } from "./produtos.js";

const divCards = document.querySelector('.main-cards-item')
const inputSearch = document.getElementById('searchProducts');
const buttonSearch = document.getElementById('btn-search')
const buttonSearchDelete = document.getElementById('btn-deleteSearch')
const buttonFilter = document.querySelectorAll('.main-filters button')
const buttonCart = document.querySelector('#buttonCart')
const buttonCloseModal = document.querySelectorAll('.modal button')
let modal = document.querySelector('.modal')
let totalText = document.querySelector('.closeModal p')
let listCheckbox = Array.from(document.querySelectorAll('input[type=checkbox]'))
let amountClick = 0

function formatPrice(price) {
    return price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function createCards() {
    for (let i = 0; i < products.length; i++) {
        let imgProduct = document.createElement('img')
        let imgLike = document.createElement('img')
        let pDescription = document.createElement('p')
        let pMarca = document.createElement('p')
        let buttonBuy = document.createElement('button')
        let newDiv = document.createElement('div')
        let buttonLike = document.createElement('button')

        var priceFormat = formatPrice(products[i].price)

        imgProduct.setAttribute('src', products[i].img)
        imgLike.setAttribute('src', 'src/images/like.svg')
        buttonLike.addEventListener('click', likeProducts)
        buttonLike.setAttribute('id', 'main-card-like')
        pDescription.innerText = `${products[i].name} \n ${priceFormat}`
        pDescription.setAttribute('id', 'descricaoProduto')
        pMarca.innerText = `${products[i].marca}, ${products[i].description}`
        buttonBuy.textContent = 'Comprar'
        buttonBuy.addEventListener('click', buyProducts)

        newDiv.classList.add('item' + [i])
        buttonLike.appendChild(imgLike)
        newDiv.appendChild(buttonLike)
        newDiv.appendChild(imgProduct)
        newDiv.appendChild(pDescription)
        newDiv.appendChild(pMarca)
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
            banner[0].classList.add('invisible')
            filters[0].classList.add('invisible')
            title[0].classList.add('invisible')
            footer[0].classList.add('invisible')
        }
    }

    const newArray = Array.from(itemsCards)
    const todosTemClasse = newArray.every(function (classe) {
        return classe.classList[1] == 'invisible';
    });

    if (todosTemClasse) {
        pMessage.innerHTML = "<p>Não foi encontrado resultado para sua pesquisa, por gentileza refaça sua busca.</p>"
    }

}

buttonSearch.addEventListener('click', searchProducts)

function deleteSearchProducts() {
    inputSearch.value = '';
    window.location.reload(true);
}

buttonSearchDelete.addEventListener('click', deleteSearchProducts)

function likeProducts(ev) {
    let image = ev.currentTarget.children[0]
    let imagePath = ev.currentTarget.children[0].attributes[0].value
    if (imagePath == 'src/images/like.svg') {
        image.setAttribute('src', 'src/images/likeafter.svg')
    } else {
        image.setAttribute('src', 'src/images/like.svg')
    }
}

const handleFilterClick = (ev) => {
    const displayList = ev.currentTarget.parentNode.children[1].style.display
    ev.currentTarget.parentNode.children[1].style.display = displayList === "" || displayList === "none" ? "block" : "none"
    const checkbox = Array.from(ev.currentTarget.parentNode.children[1].children)
    const allCheckeds = checkbox.filter(item => item.children[0].checked === true)

    checkbox.forEach(element => {
        element.addEventListener('click', () => {
            if (element.children[0].checked) {
                checkbox.forEach(otherElement => {
                    if (otherElement !== element) {
                        otherElement.children[0].checked = false
                    }
                });
                filterCardsDisplay(element.children[0])
            } else if (allCheckeds.length === 0) {
                setTimeout(() => window.location.reload(true), 500);
            }
        })
    });
};

buttonFilter.forEach((element) => element.addEventListener('click', handleFilterClick));

function filterCardsDisplay(options) {
    const nameCheckbox = options.attributes[1].value;
    const filterApply = options.attributes[2].value;
    const arrayCards = Array.from(divCards.children);
    let dataAtual = new Date()
    let filtro

    switch (nameCheckbox) {
        case "price":
            filtro = (filterApply == "preco200")
                ? products.filter(product => product.price < 200)
                : products.filter(product => product.price < 100);
            break;
        case "date":
            filtro = (filterApply == "mesAtual")
                ? products.filter(product => product.date.getMonth() === dataAtual.getMonth())
                : products.filter(product => product.date.getYear() === (dataAtual.getYear() - 1));
            break;
        default:
            filtro = products.filter(product => product[nameCheckbox] === filterApply);
            break;
    }

    arrayCards.forEach(card => {
        const item = card.innerText;
        const pos = item.indexOf('\nR$');
        const textoAntesDoValor = item.substring(0, pos);

        const foundMatch = filtro.some(product => product.name.includes(textoAntesDoValor));

        if (foundMatch) {
            divCards.style.display = 'flex';
            card.classList.remove('invisible');
        } else {
            card.classList.add('invisible');
        }
    });

    markOffInputChecked(options);
}

function markOffInputChecked(input) {
    for (let i = 0; i < listCheckbox.length; i++) {
        if (listCheckbox[i].attributes[1].value != input.attributes[1].value) {
            listCheckbox[i].checked = false
        }
    }
}

function buyProducts(ev) {
    let data = Array.from(ev.currentTarget.parentNode.children)
    let titleItemSelected = data[2].textContent
    let modalInfo = modal.children[1].children
    debugger

    for (let i = 0; i < modalInfo.length; i++) {
        if (modalInfo[i].id == "titleProduct") {
            if (titleItemSelected.includes(modalInfo[i].textContent)) {
                alert("Item já incluso no carrinho.")
                return
            }
        }
    }
    amountClick++

    buyProductCart(data)
    buyAmountCart(amountClick)
}

function buyAmountCart(amount) {
    let cartButton = document.querySelector('.header-login-car button')
    cartButton.style.display = "block"
    cartButton.innerText = amount
}

function buyProductCart(data) {
    let div = document.querySelector('.itensCart')
    let divButtons = document.createElement('div')
    let image = document.createElement('img')
    let title = document.createElement('p')
    let price = document.createElement('p')
    let input = document.createElement('input')
    let buttonSoma = document.createElement('button')
    let buttonDiminui = document.createElement('button')

    let posicaoSrc = data[1].src.indexOf('src/');
    let conteudoSrc = data[1].src.substring(posicaoSrc);
    image.setAttribute('src', conteudoSrc)

    let textTitle = data[2].innerText
    let [nomeProduto, precoProduto] = textTitle.split('\n');
    title.innerText = nomeProduto
    title.setAttribute('id', 'titleProduct')
    price.innerText = precoProduto
    price.setAttribute('id', 'priceProduct')

    input.setAttribute('type', 'text')
    input.setAttribute('id', 'inputQtd')
    input.value = 1

    buttonSoma.innerText = '+'
    buttonDiminui.innerText = '-'
    buttonSoma.addEventListener('click', calculationQtd)
    buttonDiminui.addEventListener('click', calculationQtd)

    divButtons.setAttribute('id', 'divInputQtd')

    divButtons.appendChild(buttonDiminui)
    divButtons.appendChild(input)
    divButtons.appendChild(buttonSoma)

    div.append(image, title, price, divButtons)
}

function openCart(ev) {
    calculationTotalOpenCart()
    let contemItensCarrinho = ev.currentTarget.parentNode.children[4].style.display

    contemItensCarrinho == 'block' ? modal.style.display = 'block' : modal.style.display = 'none'
}

buttonCart.addEventListener('click', openCart)

function closeModal() {
    modal.style.display = 'none'
}

buttonCloseModal.forEach(element => {
    element.addEventListener('click', closeModal)
})

function calculationQtd(ev) {
    const buttonSelected = ev.target.textContent;
    const inputElement = ev.currentTarget.parentNode.children[1];
    let arr = Array.from(ev.currentTarget.parentNode.parentNode.children)
    let valueInput = Number(inputElement.value);

    if (buttonSelected === "-") {
        if (valueInput > 0) {
            valueInput--;
        }
    } else {
        valueInput++;
    }

    inputElement.value = valueInput.toString();
    calculationTotalRefresh(arr)

}

buttonCloseModal.forEach(element => {
    element.addEventListener('click', calculationQtd)
})

function calculationTotalOpenCart() {
    let itensModal = Array.from(document.querySelector('.itensCart div').parentNode.children)
    let somaPrice = 0

    for (let i = 0; i < itensModal.length; i++) {
        if (itensModal[i].id === "priceProduct") {
            let stringComVirgula = itensModal[i].textContent.slice(3);
            console.log('Valor original:', stringComVirgula);
            stringComVirgula = stringComVirgula.replace(',', '.');
            console.log('Valor com ponto:', stringComVirgula);
            somaPrice += (parseFloat(stringComVirgula))
        }
    }
    totalText.innerText = "Total: " + formatPrice(somaPrice)
}

function calculationTotalRefresh(arr) {
    let arrPrice = arr
        .filter(element => element.id === "priceProduct")
        .map(element => parseFloat(element.textContent.slice(3).replace(",", ".")).toFixed(2));

    let arrQtd = arr
        .filter(element => element.id === "divInputQtd")
        .map(element => parseInt(element.children[1].value));

    let somaPrice = arrPrice.reduce((acc, price, index) => acc + price * arrQtd[index], 0);

    totalText.innerText = "Total: " + formatPrice(somaPrice);
    console.log(somaPrice);
}


