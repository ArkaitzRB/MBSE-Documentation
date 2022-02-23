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
        return JSON.parse('[{ "title": "Apuntes", "descr": "Conceptos generales", "url": "./data/Videos y Documentación (ejemplos prácticos con múltiples Softwares).pdf", "image": "./img/sysML.png","text": "./data/Apuntes.txt" },{ "title": "Coursera", "descr": "Curso Introductorio a la Metodología de Modelos", "url": "#", "image": "./img/coursera.png","text": "","html": "./data/coursera-course.html" }, { "title": "Rhapsody", "descr": "Descripción de conceptos básicos en Rhapsody", "url": "#", "image": "./img/rhapsody.png","text": "./data/Rhapsody.txt" }, { "title": "Introduction to Rhapsody (1)", "descr": "Why Model", "url": "https://www.youtube.com/watch?v=9gpbq0UooOM", "image": "./img/321gang.png","text": "./data/Introduction to Rhapsody (1) Why Model.txt" }, { "title": "Introduction to Rhapsody (3)", "descr": "SysML Diagrams Overview", "url": "https://www.youtube.com/watch?v=3z71Dpkl7MQ", "image": "./img/321gang.png","text": "./data/Introduction to Rhapsody (3) SysML Diagram Overview.txt" }, { "title": "Introduction to Rhapsody (4)", "descr": "Modeling Requirements", "url": "https://www.youtube.com/watch?v=JUB18itNMG0", "image": "./img/321gang.png","text": "./data/Introduction to Rhapsody (4) Modeling Requirements.txt" }, { "title": "Introduction to Rhapsody (5)", "descr": "Modeling Use Cases", "url": "https://www.youtube.com/watch?v=vQjFJ6Gmgb4", "image": "./img/321gang.png","text": "./data/Introduction to Rhapsody (5) Modeling Use Cases.txt" }, { "title": "Introduction to Rhapsody (6)", "descr": "Refining Use Cases with Activity Diagrams", "url": "https://www.youtube.com/watch?v=TnJHu7IqKI4", "image": "./img/321gang.png","text": "./data/Introduction to Rhapsody (6) Refining Use Cases with Activity Diagrams.txt" }, { "title": "Introduction to Rhapsody (7)", "descr": "Modeling Structure", "url": "https://www.youtube.com/watch?v=SkepGfBJbiM", "image": "./img/321gang.png","text": "./data/Introduction to Rhapsody (7) Modeling Structure.txt" }, { "title": "Introduction to Rhapsody (8)", "descr": "Modeling Behavior", "url": "https://www.youtube.com/watch?v=knYpFew9FKo", "image": "./img/321gang.png","text": "./data/Introduction to Rhapsody (8) Modeling Behavior.txt" }, { "title": "Example: Thesis", "descr": "Modelling Hybrid Solar wind", "url": "(Tesis) MBSE aplicado a planta hibrida solar eolica2.pdf", "image": "./img/pdf.png","text": "./data/(Tesis) MBSE aplicado a planta hibrida solar eolica2.txt" }, { "title": "Introduction to SE Harmony Toolkit", "descr": "Rhapsody Solution: SE Harmony Toolkit presentation", "url": "https://www.youtube.com/watch?v=axX6wwY3puQ", "image": "./img/rhapsody.png","text": "./data/Introduction to SE Harmony Toolkit.txt" }, { "title": "Getting Started SysML Rhapsody", "descr": "Rhapsody Solution: SysML project flow, Use Case, Requirements, Validation (functional Analysis) - Activities, ...", "url": "https://www.youtube.com/watch?v=j2pglKC5f7U", "image": "./img/rhapsody.png","text": "./data/Getting Started SysML Rhapsody.txt" }, { "title": "To Explore...", "descr": "Following steps (Rhapsody, SysML, ...", "url": "#", "image": "./img/undraw.png","text": "./data/To Explore.txt" }, { "title": "", "descr": "", "url": "#", "image": "./img/.png","text": "./data/.txt","html": "./data/coursera-course.html" }]')
    
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

    if (element !== undefined) {
        const title = element.hasOwnProperty('title')? element.title: "";
        const descr = element.hasOwnProperty('descr')? element.descr: "";
        const image = element.hasOwnProperty('image')? element.image: "";
        const url = element.hasOwnProperty('url')? element.url: "";
        const text = element.hasOwnProperty('text')? element.text: "";
        const html = element.hasOwnProperty('html')? element.html: "";

        if (title !== ""){
            console.log('Card control ' + title, element)
            const template = document.getElementById("card").content;
            const clone = template.cloneNode(true);
        
            clone.querySelector(".image").setAttribute("src", image);
            clone.querySelector(".title").textContent = title;
            clone.querySelector(".descr").textContent = descr;
    
            var button = clone.querySelector("button");
            button.addEventListener ("click", function() {            
                // Remove previous Detail Documents (if exist)
                erasePage()
    
                // Open an URL in a New Tab
                if (html != "") {
                    window.open(html, "_newtab" );
                    //window.open (url, "_blank" );
                } else {
                    // Add Detail Document
                    drawPage(title, text, url)
                    
                    // Hide Summary Grid
                    // const grid = document.getElementById("grid");
                    // grid.style.display = "none";
                }
            });
        
            const fragment = document.createDocumentFragment();
            fragment.appendChild(clone);
            const grid = document.getElementById("grid");
            grid.appendChild(fragment);
        }
    }
}

async function drawPage(title, text, url) {
    if ((text !== undefined && text !== "") || (url !== undefined && url !== "")) {
        console.log('Document control ' + title, text)
        const template = document.getElementById("document").content;
        const clone = template.cloneNode(true);
    
        clone.querySelector(".title").textContent = title;
        if (debugging) 
            clone.querySelector(".text").textContent = text;
        else {
            if (text != "" && text != "#") {
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
            } else {
                clone.querySelector(".text").style.display = "none";
                clone.querySelector(".line").style.display = "none";
            }
        }

        if (url != "" && url != "#") {
            if (url.endsWith(".pdf")) {
                clone.querySelector(".link").textContent = `Ver PDF: ${url.substr(url.lastIndexOf("/")+1)}`;
                clone.querySelector(".link").setAttribute("href", url);
                
                clone.querySelector(".embed").style.display = "none";
            } else if (url.endsWith(".html")) {    
                clone.querySelector(".link").style.display = "none";
    
                clone.querySelector(".embed").setAttribute("src", url);
                clone.querySelector(".embed").classList.add('html');
            } else {
                clone.querySelector(".link").textContent = `(${url})`;
                clone.querySelector(".link").setAttribute("href", url);
    
                if (url.startsWith("https://www.youtube.com/"))
                    url =  url.replace("watch?v=", "embed/");
                clone.querySelector(".embed").setAttribute("src", url);
                clone.querySelector(".embed").classList.add('video');
            }
        } else {
            clone.querySelector(".link").style.display = "none";

            clone.querySelector(".embed").style.display = "none";
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
