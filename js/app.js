const debugging = false
const jsonFileDefault = "./data/summary.json";

document.addEventListener("DOMContentLoaded", async() => {
    let dataJson = await readData(jsonFileDefault);
    drawCards(dataJson);

    //Hide Detail Document
    const doc = document.getElementById("page");
    doc.style.display = "none";
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
    } else {
        drawCard(data);
    }
}

function filterIfEnter(event){
    console.log(event.key);
    if (event.key === "Enter") {
        // Do work
    };
}

function filterCards() {
    const filterText = document.getElementById("search").value;

    const grid = document.getElementById("grid");
    for (let i = 0; i < grid.children.length; i++) {
        const child = grid.children[i];
        if (child.querySelector(".title").textContent.includes(filterText) || child.querySelector(".descr").textContent.includes(filterText)){
            child.style.display = "block";
        } else {
            child.style.display = "none";
        }
      }
}

function drawCard(element) {
    if (element !== undefined && element.title !== ""){
        console.log('Card control ' + element.title, element)
        const template = document.getElementById("card").content;
        const clone = template.cloneNode(true);
    
        clone.querySelector(".image").setAttribute("src", element.image);
        clone.querySelector(".title").textContent = element.title;
        clone.querySelector(".descr").textContent = element.descr;

        var button = clone.querySelector("button");
        button.addEventListener ("click", function() {
            // Open an URL in a New Tab
            //window.open(element.url, "_newtab" );
            //window.open (element.url, "_blank" );
            
            // Remove previous Detail Documents (if exist)
            erasePage()
            
            // Add Detail Document
            drawPage(element.title, element.text, element.url)
            
            // Hide Summary Grid
            // const grid = document.getElementById("grid");
            // grid.style.display = "none";
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
        if (debugging) 
            clone.querySelector(".text").textContent = text;
        else {
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

        if (url != "") {
            clone.querySelector(".link").textContent = `(${url})`;
            clone.querySelector(".link").setAttribute("href", url);

            if (url.startsWith("https://www.youtube.com/"))
                url =  url.replace("watch?v=", "embed/");
            clone.querySelector(".video").setAttribute("src", url);
        } else {
            clone.querySelector(".link").style.display = "none";
            clone.querySelector(".video").style.display = "none";
        }

        var close = clone.querySelector(".close");
        close.addEventListener ("click", function() {
            // Remove Detail Document
            erasePage()
            
            // Show Summary Grid
            // const grid = document.getElementById("grid");
            // grid.style.display = "block";
        });

        const fragment = document.createDocumentFragment();
        fragment.appendChild(clone);
        const doc = document.getElementById("page");
        doc.appendChild(fragment);

        doc.style.display = "block";
        doc.focus();
    }
}

function erasePage() {
    // Remove Detail Document
    const doc = document.getElementById("page");
    while (doc.firstChild) {
        doc.removeChild(doc.firstChild);
    };
    doc.style.display = "none";
}
