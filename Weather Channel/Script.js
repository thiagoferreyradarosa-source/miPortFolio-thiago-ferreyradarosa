
function cargarCiudad(ciudad) {
 
    const apiKey = "fdd533266e28101881f610f2b8f1ebe1";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${apiKey}&units=metric`;

    $.getJSON(url, function(data) {
        console.log(data);

        document.querySelector(".container").style.visibility = "visible";

        document.querySelector("#ciudad").textContent = data.name;

        document.querySelector("#temperatura").innerHTML = `${Math.round(data.main.temp)} <sup>°C</sup>`;

        const iconoCodigo = data.weather[0].icon;
        document.querySelector("#icono").src = `https://openweathermap.org/img/wn/${iconoCodigo}@2x.png`;

        document.querySelector("#descripcion").textContent = data.weather[0].description;

    }).fail(function() {
        alert("No pudimos encontrar la ciudad ingresada. Por favor, verificá el nombre.");
    });
}
//futurama//
$(document).ready(function() {
    cargarCiudad("Buenos Aires");

    $("#btnBuscar").on("click", function(e) {
        e.preventDefault();
        
        const ciudad = $("#inputCiudad").val().trim();

        if (ciudad !== "") {
            cargarCiudad(ciudad);
        } else {
            alert("Por favor, ingresá una ciudad.");
        }
    });
});