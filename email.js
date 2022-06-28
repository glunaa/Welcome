// email 
// same dark function
function toggleDark(e){
    
    // very simple dark mode toggle for home
    document.body.classList.toggle("text-bg-dark");

    if(document.body.classList == "text-bg-dark"){
        document.getElementsByTagName('svg').toggle('moonlight');
    }

}

let form = document.querySelector("form");

form.addEventListener("submit", e => {
    console.log(e);
});