// ----------------------------------------------------------------------------------------------------
// Primary Application
// ----------------------------------------------------------------------------------------------------
const debugging = false
const jsonFileDefault = "./data/summary.json";

// Display formats
const dispNone = "none"
const dispGrid = "grid"
const dispCard = "flex"
const dispDoc = "flex"

// Initial execution
document.addEventListener("DOMContentLoaded", async() => {
    // Read and Draw data as Cards
    let dataJson = await readData(jsonFileDefault);
    drawCards(dataJson);

    // Hide Detail Document
    const doc = document.getElementById("page");
    doc.style.display = dispNone;
})

// Read data
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

// Draw each element as a Card
function drawCards(data) {
    if (Array.isArray(data)){
        data.forEach(element => drawCard(element));
    } else {
        drawCard(data);
    }
}

// Filter Cards with contain the Text of the input element
function filterCards() {
    const filterText = document.getElementById("search").value;

    const grid = document.getElementById("grid");
    for (let i = 0; i < grid.children.length; i++) {
        const child = grid.children[i];
        if (child.querySelector(".title").textContent.includes(filterText) || child.querySelector(".descr").textContent.includes(filterText)){
            child.style.display = dispCard;
        } else {
            child.style.display = dispNone;
        }
      }
}

// Drawing of a Card
function drawCard(element) {
    // Draw the Card only if element and its title is defined
    if (element !== undefined) {
        // Read every property of the element
        const title = element.hasOwnProperty('title')? element.title: "";
        const descr = element.hasOwnProperty('descr')? element.descr: "";
        const image = element.hasOwnProperty('image')? element.image: "";
        const url = element.hasOwnProperty('url')? element.url: "";
        const text = element.hasOwnProperty('text')? element.text: "";
        const html = element.hasOwnProperty('html')? element.html: "";

        if (title !== ""){
            // Take "Card" template
            //console.log('Card control ' + title, element)
            const template = document.getElementById("card").content;
            const clone = template.cloneNode(true);
        
            // Fill Card's Image, Title and Description
            clone.querySelector(".image").setAttribute("src", image);
            clone.querySelector(".title").textContent = title;
            clone.querySelector(".descr").textContent = descr;
    
            // Manage Card button's event
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
                    const grid = document.getElementById("grid");
                    grid.style.display = dispNone;
                }
            });
        
            // Add the new Card to the Grid section
            const fragment = document.createDocumentFragment();
            fragment.appendChild(clone);
            const grid = document.getElementById("grid");
            grid.appendChild(fragment);
        }
    }
}

// Drawing of the Detailed page
async function drawPage(title, text, url) {
    // Draw the Page only if its text or url is defined
    if ((text !== undefined && text !== "") || (url !== undefined && url !== "")) {
        // Take "Page" template
        //console.log('Document control ' + title, text)
        const template = document.getElementById("document").content;
        const clone = template.cloneNode(true);
    
        // Fill Page's Title and Text (if applicable)
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

                // Replace "url" with an <a> tag refered to the "url" (embed link to the url)
                let urlLink = "";
                let start = 0;
                let end = 0;
                do {
                    start = dataText.indexOf("http", start);
                    end = Math.min(dataText.indexOf(" ",start), dataText.indexOf("\n",start), dataText.indexOf("\t",start));
                    if (start != -1) {
                        if (end == -1) { end = dataText.length; }
                        let urlOld = dataText.substring(start,end);
                        let urlNew = `<a href="${urlOld}">${urlOld}</a>`;
                        dataText = dataText.replace(urlOld, urlNew);

                        start += urlNew.length - urlOld.length;
                    }
                } while (start != -1);

                clone.querySelector(".text").innerHTML = dataText;
            } else {
                clone.querySelector(".text").style.display = dispNone;
                clone.querySelector(".line").style.display = dispNone;
            }
        }

        // Manage Page's Url (if applicable)
        if (url != "" && url != "#") {
            if (url.endsWith(".pdf")) {
                // If the Url points a PDF, show the link 
                clone.querySelector(".link").textContent = `Ver PDF: ${url.substr(url.lastIndexOf("/")+1)}`;
                clone.querySelector(".link").setAttribute("href", url);
                
                clone.querySelector(".embed").style.display = dispNone;
            } else if (url.endsWith(".html")) {    
                // If the Url points a HTML, show it as embed element
                clone.querySelector(".link").style.display = dispNone;
    
                clone.querySelector(".embed").setAttribute("src", url);
                clone.querySelector(".embed").classList.add('html');
            } else {
                // Otherwise, show the link, and embed it
                clone.querySelector(".link").textContent = `(${url})`;
                clone.querySelector(".link").setAttribute("href", url);
    
                // If the link points to a Youtube video, ensure to mark as embed instead of watching
                if (url.startsWith("https://www.youtube.com/"))
                    url =  url.replace("watch?v=", "embed/");
                clone.querySelector(".embed").setAttribute("src", url);
                clone.querySelector(".embed").classList.add('video');
            }
        } else {
            clone.querySelector(".link").style.display = dispNone;

            clone.querySelector(".embed").style.display = dispNone;
        }

        // Manage Close button's event
        var close = clone.querySelector(".close");
        close.addEventListener ("click", function() {
            // Remove Detail Document
            erasePage()
            
            // Show Summary Grid
            const grid = document.getElementById("grid");
            grid.style.display = dispGrid;

            // Force navigation bar to the top of the Document
            document.documentElement.scrollTop = 0;
            document.body.scrollTop = 0;
        });

        // Add the new Detail Document to the Page section
        const fragment = document.createDocumentFragment();
        fragment.appendChild(clone);
        const doc = document.getElementById("page");
        doc.appendChild(fragment);

        // Show Detail Document
        doc.style.display = dispDoc;

        // Force navigation bar to the top of the Document
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
    }
}

// Manage Detail Document's hide and removal
function erasePage() {
    // Remove Detail Document
    const doc = document.getElementById("page");
    while (doc.firstChild) {
        doc.removeChild(doc.firstChild);
    };

    // Hide Detail Document
    doc.style.display = dispNone;
}
