const generate = () => {
  const input = document.querySelector("#cantidad");

  //Resetear valores del result
  const copy = document.querySelector(".copy");
  const validationAlert = document.querySelector(".validation-alert");
  copy.style.display = "none";
  validationAlert.style.display = "none";

  let abc = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let symb = "@#$%*_+?";

  const char = parseInt(input.value);

  // hacer verificaciones del input de cantidad de caracteres que tendra el password

  const charAlert = document.querySelector(".char-alert");
  const passwordInput = document.querySelector(".container__contrasena");

  if (!char || typeof char != "number") {
    charAlert.style.display = "flex";
    charAlert.textContent = "Ingrese una cantidad de caracteres valida";
    passwordInput.classList.remove("validationNone");
    passwordInput.classList.remove("validationCheck");
  } else if (char < 8) {
    charAlert.style.display = "flex";
    charAlert.textContent = "La contraseña debe tener almenos 8 caracteres";
    passwordInput.classList.remove("validationNone");
    passwordInput.classList.remove("validationCheck");
  } else if (char > 24) {
    charAlert.style.display = "flex";
    charAlert.textContent = "La contraseña no puede tener más de 24 caracteres";
    passwordInput.classList.remove("validationNone");
    passwordInput.classList.remove("validationCheck");
  } else {
    charAlert.style.display = "none";
    //creamos la variable que almacenara el password
    let password = "";

    //Iteramos el string de caracteres para generar el numero de caracteres aleatorios indicado por el usuario

    for (let i = 0; i < char; i++) {
      let random = Math.floor(Math.random() * abc.length);

      //guardamos un caracter en la variable por cada iteracion
      password += abc[random];
    }

    //generamos un simbolo aleatorio usando el string de simbolos
    let randomSymb = Math.floor(Math.random() * symb.length);
    let symbol = symb[randomSymb];

    //reemplazamos un caracter aleatorio del password con el simbolo generado para asegurarnos que tenga un caracter especial
    password = password.replace(
      password[Math.floor(Math.random() * password.length)],
      symbol
    );

    //mostramos el password en el input

    const result = document.querySelector("#contrasena");
    result.value = password;
    validation();
  }
};

const validation = () => {
  //tomamos la contraseña del input
  const inputPass = document.querySelector("#contrasena");
  const password = inputPass.value;

  //si hay algo escrito realizamos las verificaciones
  if (password) {
    //Variable de switch para mostrar el copy
    let validation = false;

    //Obtener los elementos HTML, boton de validar e input
    const alert = document.querySelector(".validation-alert");
    const res = document.querySelector(".container__contrasena");

    //Cadenas de verificacion
    const mayusculas = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const num = "0123456789";
    const symb = "!@#$%^&*()-_=+{}[]|\\:;\"'<>,.?/";

    //Verificaciones
    //Que tenga mas de 8 caracteres
    if (password.length < 8) {
      alert.textContent = "La contraseña debe tener al menos 8 caracteres";
      alert.style.color = "red";
      alert.style.display = "flex";
      res.classList.add("validationNone");

      //Que tenga menos de 15 caracteres
    } else if (password.length > 24) {
      alert.textContent = "La contraseña no puede tener más de 15 caracteres";
      alert.style.color = "red";
      alert.style.display = "flex";
      res.classList.add("validationNone");

      //Que contenga al menos una mayuscula
    } else if (!mayusculas.split("").some((char) => password.includes(char))) {
      alert.textContent =
        "La contraseña debe contener al menos una letra mayúscula";
      alert.style.color = "red";
      alert.style.display = "flex";
      res.classList.add("validationNone");

      //Que contenga al menos un numero
    } else if (!num.split("").some((char) => password.includes(char))) {
      alert.textContent = "La contraseña debe contener al menos un número";
      alert.style.color = "red";
      alert.style.display = "flex";
      res.classList.add("validationNone");

      //Que contenga al menos un caractér especial
    } else if (!symb.split("").some((char) => password.includes(char))) {
      alert.textContent = "La contraseña debe contener un caractér especial";
      alert.style.color = "red";
      alert.style.display = "flex";
      res.classList.add("validationNone");

      //Validación éxitosa
    } else {
      alert.textContent = "La contraseña es segura";
      alert.style.color = "green";
      alert.style.display = "flex";
      res.classList.add("validationCheck");
      res.classList.remove("validationNone");
      validation = true;
    }

    //tomamos el elemento que copiara al clipboard
    const copy = document.querySelector(".copy");

    //Si el switch esta activado mostramos el elemento copy y
    //quitamos el mensaje de validacion despues de 1 segundo
    if (validation) {
      copy.style.display = "flex";
      //si el switch esta en false quitamos el elemento copy para evitar errores
    } else {
      copy.style.display = "none";
    }

    //si no hay nada escrito en el campo quitamos el copy,
    //quitamos el mensaje de validacion y quitamos el color de validacion del input
  } else {
    const copy = document.querySelector(".copy");
    const validationAlert = document.querySelector(".validation-alert");
    const containerPass = document.querySelector(".container__contrasena");
    validationAlert.style.display = "none";
    copy.style.display = "none";
    containerPass.classList.remove("validationNone");
    containerPass.classList.remove("validationCheck");
  }
};

//funcion para copiar al clipboard
const copy = () => {
  const password = document.querySelector(".container__contrasena").value;

  if (!password) alert("No hay nada para copiar");
  else {
    try {
      navigator.clipboard.writeText(password);
      alert("Contraseña copiada al portapapeles");
    } catch (error) {
      alert("Error al copiar la contraseña", error);
    }
  }
};

const reset = () => {
  const passwordInput = document.querySelector(".container__contrasena");
  const charAmount = document.querySelector(".container__input");

  charAmount.value = null;
  passwordInput.value = null;

  const copy = document.querySelector(".copy");
  const validationAlert = document.querySelector(".validation-alert");
  const containerPass = document.querySelector(".container__contrasena");
  const charAlert = document.querySelector(".char-alert");
  charAlert.style.display = "none";
  validationAlert.style.display = "none";
  copy.style.display = "none";
  containerPass.classList.remove("validationNone");
  containerPass.classList.remove("validationCheck");
};
