const jsonFileDefault = "./data/summary.json";

document.addEventListener("DOMContentLoaded", async() => {
    let dataJson = await readData(jsonFileDefault);
    drawCards(dataJson);
})

async function readData (jsonFile) {
    //return JSON.parse('[{"title": "Rhapsody","descr": "Descripción de conceptos básicos en Rhapsody","url": "","image": "./img/rhapsody.png"},{"title": "Getting Started with Rhapsody","descr": "Rhapsody Solution: SysML project, Use Case, Requirements, ...","url": "","image": "./img/sysML.png"},{"title": "","descr": "","url": "https://www.google.es","image": ""}]')

    var dataJson;
    try {        
        dataJson = await fetch(jsonFile).then(response => {
                                return response.json();
                            }).then(data => {
                                return data;
                            }).catch(error => {
                                console.error('Error:', error);
                                return [];
                            });

    } catch (error) {
        console.error('Error:', error)
        dataJson = [];
    }

    return dataJson
} 

function drawCards(data) {
    if (Array.isArray(data)){
        data.forEach(element => drawCard(element));
    }
    else
    {
        drawCard(data);
    }
}

function drawCard(element) {
    if (element !== undefined && element.title !== ""){
        console.log('Card control ' + element.title, element)
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
            
            // Remove Detail Document
            drawPage(element.title, element.text, element.url)
            
            // Hide Summary Grid
            const grid = document.getElementById("grid");
            grid.hidden = true;
        });
    
        const fragment = document.createDocumentFragment();
        fragment.appendChild(clone);
        const grid = document.getElementById("grid");
        grid.appendChild(fragment);
    }
}

function drawPage(title, text, url) {
    if (text !== undefined && text !== ""){
        console.log('Document control ' + title, text)
        const template = document.getElementById("document").content;
        const clone = template.cloneNode(true);
    
        clone.querySelector(".title").textContent = title;
        clone.querySelector(".text").textContent = text;
        var close = clone.querySelector("close");
        
        //Add event handler
        close.addEventListener ("click", function() {
            // Remove Detail Document
            const doc = document.getElementById("doc");
            doc.childNodes.forEach(c => doc.removeChild());
            
            // Show Summary Grid
            const grid = document.getElementById("grid");
            grid.hidden = false;
        });

        const fragment = document.createDocumentFragment();
        fragment.appendChild(clone);
        const doc = document.getElementById("doc");
        doc.appendChild(fragment);
    }
}
