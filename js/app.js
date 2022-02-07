const jsonFile = "./data/summary.json";
const dataJson = [];
const dataError = false;

document.addEventListener("DOMContentLoaded", () => {
    readData(jsonFile)
    //data = JSON.parse('[{"title": "Rhapsody","descr": "Descripción de conceptos básicos en Rhapsody","url": "","image": "./img/rhapsody.png"},{"title": "Getting Started with Rhapsody","descr": "Rhapsody Solution: SysML project, Use Case, Requirements, ...","url": "","image": "./img/sysML.png"},{"title": "","descr": "","url": "https://www.google.es","image": ""}]')
    if (dataError === false)
        drawCards();
})

function readData(jsonFile) {
    try {
        fetch(jsonFile).then(response => {
                            return response.json();
                        }).then(data => {
                            console.log(data);
                            this.dataJson = data
                        }).catch(error => {
                            console.error('Error:', error);
                            this.dataError = true;
                        });

    } catch (error) {
        console.log(error)
        this.dataError = true;
    }
} 

function drawCards() {
    if (Array.isArray(dataJson)){
        dataJson.forEach(element => drawCard(element));
    }
    else
    {
        drawCard(dataJson);
    }
}

function drawCard(element) {
    console.log(element)
    if (element !== undefined && element.title !== ""){
        const template = document.getElementById("card").content;
        const clone = template.cloneNode(true);
    
        clone.querySelector(".image").setAttribute("src", element.image);
        //clone.querySelector(".title").innerHTML = `${element.title} <span>${pokemon.descr}hp</span>`;
        clone.querySelector(".title").textContent = element.title;
        clone.querySelector(".descr").textContent = element.descr;
        var button = clone.querySelector("button");
        //Add event handler
        button.addEventListener ("click", function() {
            window.open(element.url, "_newtab" );
            //window.open (element.url, "_blank" );
        });
    
        const fragment = document.createDocumentFragment();
        fragment.appendChild(clone);
        const grid = document.getElementById("grid");
        grid.appendChild(fragment);
    }
}
