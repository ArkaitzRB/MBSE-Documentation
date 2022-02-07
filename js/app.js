const jsonFile = "./data/summary.json";
let dataJson = [];
let dataError = false;

document.addEventListener("DOMContentLoaded", () => {
    readData(jsonFile)
    //dataJson = JSON.parse('[{"title": "Rhapsody","descr": "Descripción de conceptos básicos en Rhapsody","url": "","image": "./img/rhapsody.png"},{"title": "Getting Started with Rhapsody","descr": "Rhapsody Solution: SysML project, Use Case, Requirements, ...","url": "","image": "./img/sysML.png"},{"title": "","descr": "","url": "https://www.google.es","image": ""}]')
    console.log('DataError prevDrawing:', dataError);
    if (dataError === false)
        console.log('DataError inside IF:', dataError);
        drawCards();
})

function readData(jsonFile) {
    try {
        fetch(jsonFile).then(response => {
                            return response.json();
                        }).then(data => {
                            console.log(data);
                            dataJson = data
                        }).catch(error => {
                            console.error('Error:', error);
                            dataError = true;
                        });

    } catch (error) {
        console.log(error)
        dataError = true;
    }
} 

function drawCards() {
    console.log('Drawing Cards', dataJson);
    if (Array.isArray(dataJson)){
        console.log('Array of Objects', dataJson);
        dataJson.forEach(element => drawCard(element));
    }
    else
    {
        console.log('Single Object', dataJson);
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
