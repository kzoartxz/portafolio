$(document).ready(function() {
    // Validación del formulario de contacto
    $('#contactForm').on('submit', function(event) {
        event.preventDefault(); // Evitar el envío del formulario

        // Validar los campos
        let name = $('#name').val().trim();
        let email = $('#email').val().trim();
        let message = $('#message').val().trim();

        if (name === "") {
            alert("Por favor, ingrese su nombre.");
            return;
        }

        if (email === "") {
            alert("Por favor, ingrese su correo electrónico.");
            return;
        }

        if (!validateEmail(email)) {
            alert("Por favor, ingrese un correo electrónico válido.");
            return;
        }

        if (message === "") {
            alert("Por favor, ingrese su mensaje.");
            return;
        }

        // Si todas las validaciones pasan, enviar el formulario
        this.submit();
    });

    // Función para validar el formato del correo electrónico
    function validateEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    // Manejar la solicitud a la API de OpenWeatherMap
    $('#weatherForm').on('submit', function(event) {
        event.preventDefault();

        let city = $('#city').val().trim();
        let apiKey = '83f651aca592a5908d196606c058ecbb'; // Reemplaza con tu API key de OpenWeatherMap
        let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=es`;

        $.ajax({
            url: apiUrl,
            method: 'GET',
            success: function(data) {
                let weatherResult = `
                    <h2>${data.name}, ${data.sys.country}</h2>
                    <p>Temperatura: ${data.main.temp} °C</p>
                    <p>Descripción: ${data.weather[0].description}</p>
                    <p>Humedad: ${data.main.humidity}%</p>
                    <p>Viento: ${data.wind.speed} m/s</p>
                `;
                $('#weatherResult').html(weatherResult);
            },
            error: function() {
                alert('No se pudo obtener los datos del clima. Por favor, intente de nuevo.');
            }
        });
    });

    // Inicialización del carrusel
    $('.carousel').carousel();
});
