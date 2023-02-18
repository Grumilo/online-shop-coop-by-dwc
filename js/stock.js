const usuario = sessionStorage.getItem('usuario');
const idUser = sessionStorage.getItem('idusuario');
const container = document.querySelector('.gallery-container');
window.addEventListener('load', function () {
    document.querySelector('#navNombreUser').innerHTML = usuario;
});
window.addEventListener('load', function () {
    showStock();
});
function showStock () {
    const formData = new FormData();
    formData.append('opcion', 'AV');
    const url = 'php/coop.php';
    fetch(url, {
        method: 'POST',
        body: formData
    })
        .then((response) => response.json())
        .then((articles) => {
            for (let i = 0; i < articles.length; i++) {
                if (idUser !== articles[i].vendedor) {
                    const element = document.createElement('div');
                    element.id = 'div-article';
                    element.setAttribute('class', 'text-center');
                    container.appendChild(element);
                    // IMG
                    const imgArticle = document.createElement('img');
                    imgArticle.id = 'img-article';
                    imgArticle.src = 'img/' + articles[i].imagen;
                    element.appendChild(imgArticle);
                    // ARTICLE NAME
                    const articleName = document.createElement('h3');
                    articleName.textContent = articles[i].nombre;
                    element.appendChild(articleName);
                    // PRICE
                    const precio = document.createElement('h4');
                    precio.textContent = articles[i].precio + '€';
                    element.appendChild(precio);
                    // DIV BUTTON
                    const divButton = document.createElement('div');
                    divButton.setAttribute('class', 'div-button');
                    element.appendChild(divButton);
                    // BUTTON
                    const boton = document.createElement('button');
                    boton.textContent = 'comprar';
                    boton.setAttribute('id', articles[i].id);
                    boton.setAttribute('class', 'btn btn-primary mb-2');
                    boton.addEventListener('click', buyArticle);
                    divButton.appendChild(boton);
                }
            }
        });
}
// BUY FUCTION
function buyArticle (e) {
    const idArticle = e.target.id;

    // eslint-disable-next-line no-undef
    swal.fire({
        title: 'COOPbyDWC',
        text: 'Artículo vendido!',
        icon: 'success',
        button: 'Continuar'
    }).then(function () {
        window.location = 'stock.html';
    });
}
