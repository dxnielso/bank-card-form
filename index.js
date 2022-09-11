// Input
const nameInput = document.getElementById("name");
const numberInput = document.getElementById("number");
const monthInput = document.getElementById("month");
const yearInput = document.getElementById("year");
const cvcInput = document.getElementById("cvc");
const formCard = document.getElementById("form-card");

// Text
const targetName = document.getElementById("target-name");
const targetNumber = document.getElementById("target-number");
const targetDate = document.getElementById("target-date");
const targetCvc = document.getElementById("target-cvc");

let month = '00', year = '00'


// EVENTOS
formCard.addEventListener("submit", async (e) => {
    e.preventDefault()

    // validamos todos los campos
    if ((nameInput.value).length > 50 || (nameInput.value).length <= 5) return showError(nameInput, "Nombre no válido")
    if ((numberInput.value).length != 16) return showError(numberInput, "Ingresa el numero de tarjeta completo")
    if ((monthInput.value).length > 2 || monthInput.value > 12 || monthInput.value <= 0) return showError(monthInput, "Formato incorrecto")
    if ((yearInput.value).length > 2 || yearInput.value > 50 || yearInput.value <= 0) return showError(yearInput, "Formato incorrecto")
    if ((cvcInput.value).length > 4 || (cvcInput.value).length == 0) return showError(cvcInput, "Formato incorrecto")

    // Los campos pasaron la fase de validacion

    let timerInterval
    const result = await Swal.fire({
        title: 'Payment',
        html: 'Processing the payment',
        timer: 2000,
        timerProgressBar: true,
        keydownListenerCapture: true,
        // showConfirmButton: false,
        didOpen: () => {
            Swal.showLoading()
        },
        willClose: () => {
            clearInterval(timerInterval)
        }
    })
    if (result.dismiss === Swal.DismissReason.timer) {
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Payment was successful',
            showConfirmButton: false,
            timer: 2500
        })
    }
})

// nombre
nameInput.addEventListener("input", () => {
    if (nameInput.value == "") {
        targetName.innerText = "YOUR NAME";
        showError(nameInput, "You must enter your name")
        return false
    }
    hideError(nameInput)
    if ((nameInput.value).length > 50) return (nameInput.value = nameInput.value.substr(0, 50))
    targetName.innerText = nameInput.value.toUpperCase();
});

// numero tarjeta
numberInput.addEventListener("input", () => {
    if (numberInput.value == "") {
        targetNumber.innerText = "0000 0000 0000 0000"
        showError(numberInput, "You must enter your card number")
        return
    }
    if ((numberInput.value).length > 16) return (numberInput.value = numberInput.value.substr(0, 16))
    hideError(numberInput)
    if ((numberInput.value).length < 16) showError(numberInput, "You must enter 16 digits")
    formatearNumeroTarjeta(numberInput);
});

// mes
monthInput.addEventListener("input", () => {
    if (monthInput.value == "") {
        month = "00"
        targetDate.innerText = month + '/' + year;
        showError(monthInput, "Required month")
        return
    }
    hideError(monthInput)
    if ((monthInput.value).length > 2) return (monthInput.value = monthInput.value.substr(0, 2))
    if ((monthInput.value).length < 2) {
        month = '0' + monthInput.value
    } else {
        month = monthInput.value
    }
    targetDate.innerText = month + '/' + year;
})

// año
yearInput.addEventListener("input", () => {
    if (yearInput.value == "") {
        year = "00"
        targetDate.innerText = month + '/' + year;
        showError(yearInput, "Required year")
        return
    }
    hideError(yearInput)
    if ((yearInput.value).length > 2) return (yearInput.value = yearInput.value.substr(0, 2))
    if ((yearInput.value).length < 2) {
        year = '0' + yearInput.value
    } else {
        year = yearInput.value
    }
    targetDate.innerText = month + '/' + year;
})

// CVC
cvcInput.addEventListener("input", () => {
    if (cvcInput.value == "") {
        targetCvc.innerText = "000";
        showError(cvcInput, "CVC required")
        return
    }
    hideError(cvcInput)
    if ((cvcInput.value).length > 4) return (cvcInput.value = cvcInput.value.substr(0, 4))
    targetCvc.innerText = cvcInput.value;
})



// FUNCIONES
function formatearNumeroTarjeta(numero) {
    const splitNumber = (numero.value).split('')
    let numFormateado = ''
    splitNumber.forEach((num, i) => {
        if (i == 4 || i == 8 || i == 12) {
            numFormateado += ' '
        }
        numFormateado += num.toString()
    });
    targetNumber.innerText = numFormateado
}

function showError(input, mensaje) {
    const formBox = input.parentElement
    const span = formBox.querySelector('span')
    span.innerText = mensaje
    span.classList.remove('error-oculto')
}

function hideError(input) {
    const formBox = input.parentElement
    const span = formBox.querySelector('span')
    span.classList.add('error-oculto')
}