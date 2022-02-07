const jsonFile = "./data/summary.json";
const dataError = false;

document.addEventListener("DOMContentLoaded", () => {
    let data = readData(jsonFile)
    console.log(data)
    drawCard(data);
})

function readData(jsonFile) {
    try {
        //let jsonTxt = '{"title":"Title", "descr":"Description", "url":"https://www.google.com", "image":"./img/icon_en.png"}';
        //let jsonData = JSON.parse(jsonTxt);
        //return jsonData
        
        let data = fetch(jsonFile).then(response => {
                            return response.json();
                        }).then(data => {
                            console.log(data);
                            return data
                            //this.dataJson = data
                        }).catch(err => {
                            console.error('Error:', error);
                            dataError = true;
                        });
        console.log(data)

        console.log(data)
        console.log(data.title)
        console.log(data.descr)
        console.log(data.url)

        return data

    } catch (error) {
        console.log(error)
    }
} 

function drawCard(data) {
    const template = document.getElementById("card").content;
    const clone = template.cloneNode(true);

    clone.querySelector(".image").setAttribute("src", data.image);
    //clone.querySelector(".title").innerHTML = `${data.title} <span>${pokemon.descr}hp</span>`;
    clone.querySelector(".title").textContent = data.title;
    clone.querySelector(".descr").textContent = data.descr;
    var button = clone.querySelector("button");
    //Add event handler
    button.addEventListener ("click", function() {
        window.open(data.url, "_newtab" );
        //window.open (data.url, "_blank" );
    });

    
    const fragment = document.createDocumentFragment();
    fragment.appendChild(clone);
    const grid = document.getElementById("grid");
    grid.appendChild(fragment);
}
