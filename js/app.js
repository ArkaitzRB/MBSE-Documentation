const debugging = false
const jsonFileDefault = "./data/summary.json";

document.addEventListener("DOMContentLoaded", async() => {
    let dataJson = await readData(jsonFileDefault);
    drawCards(dataJson);
})

async function readData (jsonFile) {
    if (debugging) 
        return JSON.parse('[{"title": "Rhapsody","descr": "Descripción de conceptos básicos en Rhapsody","url": "","image": "./img/rhapsody.png","text": "./data/Rhapsody.txt"},{"title": "Getting Started with Rhapsody","descr": "Rhapsody Solution: SysML project, Use Case, Requirements, ...","url": "https://www.youtube.com/watch?v=9gpbq0UooOM","image": "./img/sysML.png","text": "./data/Getting Started SysML Rhapsody.txt"},{"title": "","descr": "","url": "https://www.google.es","image": "","text": "./data/.txt"}]')
    
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
            // Open an URL in a New Tab
            //window.open(element.url, "_newtab" );
            //window.open (element.url, "_blank" );
            
            // Remove Detail Document (if exist)
            erasePage()
            
            // Add Detail Document
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

async function drawPage(title, text, url) {
    if (text !== undefined && text !== ""){
        console.log('Document control ' + title, text)
        const template = document.getElementById("document").content;
        const clone = template.cloneNode(true);
    
        clone.querySelector(".title").textContent = title;
        clone.querySelector(".link").textContent = url;
        if (debugging) 
            clone.querySelector(".text").textContent = text;
        else
        {
            var dataText;
            try {        
                dataText = await fetch(text).then(response => {
                                        return response.text();
                                    }).then(data => {
                                        return data;
                                    }).catch(error => {
                                        console.error('Error:', error);
                                        return "";
                                    });

            } catch (error) {
                console.error('Error:', error)
                dataText = "";
            }
            clone.querySelector(".text").textContent = dataText;
        }

        if (url.startsWith("https://www.youtube.com/"))
            url =  url.replace("watch?v=", "embed/");
        clone.querySelector(".video").setAttribute("src", url);

        var close = clone.querySelector(".close");
        //Add event handler
        close.addEventListener ("click", function() {
            // Remove Detail Document
            erasePage()
            
            // Show Summary Grid
            const grid = document.getElementById("grid");
            grid.hidden = false;
        });

        const fragment = document.createDocumentFragment();
        fragment.appendChild(clone);
        const doc = document.getElementById("page");
        doc.appendChild(fragment);
    }
}

function erasePage() {
    // Remove Detail Document
    const doc = document.getElementById("page");
    doc.childNodes.forEach(c => doc.removeChild(c));
}
