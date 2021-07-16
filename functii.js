const body = document.querySelector('body');
const nav = document.querySelector('nav');
const search = document.getElementsByClassName('search')[0];
const inputNavContainer = document.getElementsByClassName('input-nav')[0];
const containerLogo = document.getElementsByClassName('container-logo')[0];
const input = inputNavContainer.querySelector('input');
const butoane3 = document.getElementsByClassName('3butoane')[0];
const navUl = nav.querySelector('ul');
const exit = document.getElementsByClassName('exit')[0];
const containerFirme = document.getElementsByClassName('container')[0];
const ulButoane = document.getElementsByClassName('nextButton')[0];
let carduri = containerFirme.children;
const main = document.querySelector('main');
const containerPersoaneSelecatate = document.querySelector('.container-persoaneSelectate');
const vector = [];
search.addEventListener('click', (e) => {
    inputNavContainer.style.position = "absolute";
    inputNavContainer.style.border = "2px solid #3f5efb";
    inputNavContainer.style.background = "white";
    containerLogo.style.display = "none";
    inputNavContainer.style.left = "5%";
    input.style.display = "unset";
    inputNavContainer.style.justifyContent = "space-between";
    const exit = inputNavContainer.querySelector('p');
    exit.style.display = "unset";
    exit.addEventListener('click', (a) => {
        inputNavContainer.style.position = "unset";
        inputNavContainer.style.border = "none";
        inputNavContainer.style.background = "white";
        containerLogo.style.display = "flex";
        inputNavContainer.style.left = "0";
        input.style.display = "none";
        inputNavContainer.style.justifyContent = "flex-end";
        exit.style.display = "none";
    })

})
butoane3.addEventListener('click', (e) => {
    navUl.style.transform = "translateX(-7px)";
    exit.style.display = "unset";
    butoane3.style.display = "none";
})
exit.addEventListener('click', (e) => {
    navUl.style.transform = "translateX(-100%)";
    exit.style.display = "none";
    butoane3.style.display = "unset";
})

function addButoane() {
    let maxButoane = Math.ceil(data.length / 9);
    let nr = 0;
    nr += nr;
    for (let i = 0; i < maxButoane; i++) {
        nr++;
        let li = document.createElement('li');
        li.textContent = nr;
        ulButoane.appendChild(li);
    }
}
addButoane();

function createCard(vect) {
    var undefined;
    if (vect !== undefined) {
        let div = document.createElement('div');
        div.className = "firma";
        let img = document.createElement('img');
        img.setAttribute('src', vect.picture.large);
        div.appendChild(img);

        let descriere = document.createElement('p');
        descriere.className = "descriere";
        descriere.textContent = vect.descriere;
        div.appendChild(descriere);

        let h3 = document.createElement('h3');
        h3.textContent = vect.denumireSalon;
        div.appendChild(h3);
        let adresa = document.createElement('div');
        adresa.className = "adresa";
        let ad = document.createElement('p');
        ad.textContent = vect.adresa.locatie;
        adresa.appendChild(ad);
        let km = document.createElement('p');
        km.textContent = vect.adresa.distanta;
        adresa.appendChild(km);
        div.appendChild(adresa);
        let butoane = document.createElement('div');
        butoane.className = "buttoane";
        let editeaza = document.createElement('a');
        editeaza.className = "editeaza";
        editeaza.textContent = "editeaza";
        editeaza.href = "editeaza.html";
        let programeaza = document.createElement('a');
        programeaza.href = "tabel.html";
        programeaza.className = "programeaza";
        programeaza.textContent = "programeaza";


        butoane.appendChild(programeaza);
        butoane.appendChild(editeaza);

        div.appendChild(butoane);
        containerFirme.appendChild(div);


    }
}
for (let i = 0; i < data.length; i++) {
    createCard(data[i]);
}

function createCarduri(numar) {
    for (let i = 0; i < carduri.length; i++) {
        carduri[i].style.display = "none";
    }
    let nr = 0;
    nr += nr;
    if (numar !== 1) {
        numar = (numar - 1) * 9;
        for (let i = numar; i < (numar + 9); i++) {
            vector[nr++] = data[i];

        }
    } else if (numar === 1) {
        for (let i = 0; i < 9; i++) {
            vector[nr++] = data[i];
        }
    }
    return vector;
}
createCarduri(1);
displayCarduri();

function displayCarduri() {
    for (let i = 0; i < vector.length; i++) {
        createCard(vector[i]);
    }
}
ulButoane.addEventListener('click', (e) => {
    if (e.target.tagName = "li") {
        createCarduri(e.target.textContent);
        displayCarduri();
    }
})
let vectorOverlay = [];
for (let i = 0; i < containerFirme.children.length; i++) {
    let d = generareOverlay(returnObiect(carduri[i]));
    vectorOverlay[i] = d;
    containerPersoaneSelecatate.appendChild(d);
    d.style.zIndex = "-200";
}



function getElementOverlay(element) {
    for (let i = 0; i < vectorOverlay.length; i++) {
        if (vectorOverlay[i].querySelector('h3').innerHTML === element) {
            return vectorOverlay[i];
        }
    }
}


function returnObiect(informatii) {
    let img = informatii.querySelector('img').src;
    let desc = informatii.querySelector('.descriere').textContent;
    let name = informatii.querySelector('h3').textContent
    let adresa = informatii.getElementsByClassName('adresa')[0];
    let km = adresa.querySelectorAll('p')[1].textContent;
    let locatie = adresa.querySelectorAll('p')[0].textContent;

    let obiect = {
        picture: img,
        descriere: desc,
        denumireSalon: name,
        locatie: locatie,
        km: km,
    }
    return obiect;
}

containerPersoaneSelecatate.addEventListener('click', (a) => {
    if (a.target.className == "iesire") {
        let aux = getElementOverlay(a.target.parentNode.querySelector('h3').innerHTML);
        aux.style.opacity = "0";
        aux.style.zIndex = "-2";
        main.style.opacity = "1";
        for (let i = 0; i < vectorOverlay.length; i++) {
            vectorOverlay[i].style.zIndex = "-100";
        }
    } else if (a.target.className == "inapoi") {
        let aux = a.target.parentNode.previousElementSibling;
        let d = getElementOverlay(aux.querySelector('h3').innerHTML);
        d.style.opacity = "1";
        d.style.zIndex = "100";
        displayOffOverlay(a.target.parentNode.previousElementSibling);
    } else if (a.target.className == "inainte") {
        let aux = a.target.parentNode.nextElementSibling;
        let d = getElementOverlay(aux.querySelector('h3').innerHTML);
        d.style.opacity = "1";
        d.style.zIndex = "100";
        displayOffOverlay(a.target.parentNode.nextElementSibling);
    }
})

function generareOverlay(obiect) {
    let div = document.createElement('div');
    div.className = "persoanaSelectat";
    let iesire = document.createElement('p');
    iesire.className = "iesire";
    iesire.textContent = "X";
    div.appendChild(iesire);
    let img = document.createElement('img');
    img.setAttribute('src', obiect.picture);
    div.appendChild(img);

    let descriere = document.createElement('p');
    descriere.className = "descriere";
    descriere.textContent = obiect.descriere;
    div.appendChild(descriere);
    let h3 = document.createElement('h3');
    h3.textContent = obiect.denumireSalon;
    div.appendChild(h3);
    let adresa = document.createElement('div');
    adresa.className = "adresa";
    let ad = document.createElement('p');
    ad.textContent = obiect.locatie;
    adresa.appendChild(ad);
    let km = document.createElement('p');
    km.textContent = obiect.distanta;
    adresa.appendChild(km);
    div.appendChild(adresa);
    let butoane = document.createElement('div');
    butoane.className = "buttoane";
    let editeaza = document.createElement('button');
    editeaza.className = "editeaza";
    editeaza.textContent = "editeaza";
    let programeaza = document.createElement('button');
    programeaza.className = "programeaza";
    programeaza.textContent = "programeaza";
    butoane.appendChild(programeaza);
    butoane.appendChild(editeaza);
    div.appendChild(butoane);
    let inainte = document.createElement('p');
    inainte.className = 'inainte';
    inainte.textContent = '>';
    div.appendChild(inainte);
    let inapoi = document.createElement('p');
    inapoi.className = 'inapoi';
    inapoi.textContent = '<';
    div.appendChild(inapoi);
    div.style.position = "absolute";
    div.style.top = "40%";
    return div;
}

function displayOffOverlay(element) {
    for (let i = 0; i < vectorOverlay.length; i++) {
        if (vectorOverlay[i].querySelector('h3').innerHTML !== element.querySelector('h3').innerHTML) {
            let a = getElementOverlay(vectorOverlay[i].querySelector('h3').innerHTML);
            a.style.opacity = "0";
            a.style.zIndex = "0";
            main.style.opacity = "0.5";
        }
    }
}

main.addEventListener('click', (e) => {

    let informatii;
    if (e.target.tagName = "img") {
        informatii = e.target.parentNode;
    } else if (e.target.tagName = "p") {
        informatii = e.target.parentNode;
    } else if (e.target.tagName = "h3") {
        informatii = e.target.parentNode;
    }
    let d = informatii.querySelector('h3').innerHTML;
    let aux = getElementOverlay(d);
    aux.style.opacity = "1";
    aux.style.zIndex = "100";
    containerFirme.style.opacity = "0.5";
    displayOffOverlay(informatii);
})


function iesireOverlay() {
    for (let i = 0; i < vector.length; i++) {
        let a = getElementOverlay(vectorOverlay[i].querySelector('h3').innerHTML);
        a.style.opacity = "0";
        a.style.zIndex = "0";
        body.style.background = "rgb(218, 216, 216)";
        container.style.opacity = "1";
    }
}