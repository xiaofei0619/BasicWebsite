document.addEventListener("DOMContentLoaded", function(event){
    document.getElementById("div1").textContent = "Document DOMContentLoaded event happended!"
});

window.onload = function() {
    document.getElementById("div2").textContent = "Window.onload event happened!"
};