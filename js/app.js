const jsonFile = "./data/summary.json";

document.addEventListener("DOMContentLoaded", () => {
    let dataJson = readData(jsonFile);
    //console.log('PrevDrawing:', dataJson);
    drawCards(dataJson);
})

function readData(jsonFile) {
    //return JSON.parse('[{"title": "Rhapsody","descr": "Descripción de conceptos básicos en Rhapsody","url": "","image": "./img/rhapsody.png"},{"title": "Getting Started with Rhapsody","descr": "Rhapsody Solution: SysML project, Use Case, Requirements, ...","url": "","image": "./img/sysML.png"},{"title": "","descr": "","url": "https://www.google.es","image": ""}]')

    let dataJson;
    try {        
        fetch(jsonFile).then(response => {
                            return response.json();
                        }).then(data => {
                            //console.log(data);
                            dataJson = data
                        }).catch(error => {
                            console.error('Error:', error);
                            dataJson = [];
                        });

    } catch (error) {
        console.log(error)
        dataJson = [];
    }

    return dataJson
} 

function drawCards(data) {
    //console.log('Drawing Cards', data);
    if (Array.isArray(data)){
        //console.log('Array of Objects', data);
        data.forEach(element => drawCard(element));
    }
    else
    {
        //console.log('Single Object', data);
        drawCard(data);
    }
}

function drawCard(element) {
    //console.log(element)
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
