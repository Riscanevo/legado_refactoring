// ------------ SCRIPT CALCULADORA LEGACY v1.2 ------------
// NO TOCAR NADA - FUNCIONA (A VECES)
// DO NOT TOUCH ANYTHING - IT WORKS (SOMETIMES)

// Variable que almacena el número mostrado en pantalla
// Variable that stores the number currently displayed
let buffer = "0";

// Variable que guarda el valor acumulado o resultado intermedio
// Variable that stores the accumulated or intermediate result
let memoria = 0;

// Variable que guarda el último operador pulsado (+, -, *, /)
// Variable that stores the last operator pressed (+, -, *, /)
let ultimo_operador;

// Maneja la entrada de números cuando el usuario presiona un dígito
// Handles number input when the user presses a digit
function handleNumber(numStr) {
  // Si el buffer tiene solo "0", lo reemplazamos
  // If buffer is just "0", replace it
  if (buffer === "0") {
    buffer = numStr;
  } else {
    // Si ya hay un número, concatenamos el nuevo dígito
    // If there's already a number, append the new digit
    buffer += numStr;
  }
  // Actualiza la pantalla con el nuevo valor
  // Update the display with the new value
  updateScreen();
}

// Maneja símbolos como C, =, +, -, *, /
// Handles symbols such as C, =, +, -, *, /
function handleSymbol(symbol) {
  switch (symbol) {
    case "C": // Limpiar todo / Clear everything
      buffer = "0";
      memoria = 0;
      ultimo_operador = null;
      break;

    case "=": // Calcular el resultado / Calculate the result
      if (ultimo_operador === null) {
        // Si no hay operación pendiente, salir / If no operation pending, exit
        return;
      }
      // Ejecuta la operación con el número actual / Perform operation with current number
      flushOperation(parseInt(buffer));
      // Limpia el operador usado / Clear used operator
      ultimo_operador = null;
      // Muestra el resultado / Display the result
      buffer = "" + memoria;
      // Reinicia la memoria / Reset memory
      memoria = 0;
      break;

    // Operadores matemáticos / Math operators
    case "+":
    case "-":
    case "*":
    case "/":
      handleMath(symbol);
      break;
  }
  // Refresca la pantalla / Refresh the display
  updateScreen();
}

// Maneja la lógica al presionar un operador matemático
// Handles logic when a math operator is pressed
function handleMath(symbol) {
  // Si no hay nada en pantalla ni memoria, no hace nada
  // If nothing in screen or memory, do nothing
  if (buffer === "0" && memoria === 0) {
    return;
  }

  // Convierte el valor del buffer a entero
  // Convert buffer value to integer
  let intBuffer = parseInt(buffer);

  // Si memoria está vacía, guarda el número actual
  // If memory is empty, store the current number
  if (memoria === 0) {
    memoria = intBuffer;
  } else {
    // Si ya hay un valor, realiza la operación previa
    // If there’s already a value, perform the previous operation
    flushOperation(intBuffer);
  }

  // Guarda el operador actual / Store current operator
  ultimo_operador = symbol;

  // Reinicia el buffer para el siguiente número
  // Reset buffer for next number
  buffer = "0";
}

// Ejecuta la operación aritmética pendiente
// Performs the pending arithmetic operation
function flushOperation(intBuffer) {
  if (ultimo_operador === "+") {
    memoria += intBuffer; // Suma / Addition
  } else if (ultimo_operador === "-") {
    memoria -= intBuffer; // Resta / Subtraction
  } else if (ultimo_operador === "*") {
    memoria *= intBuffer; // Multiplicación / Multiplication
  } else if (ultimo_operador === "/") {
    memoria /= intBuffer; // División / Division (⚠️ No maneja división por cero / No zero division handling)
  }
}

// Actualiza la pantalla con el valor actual del buffer
// Updates the display with the current buffer value
function updateScreen() {
  // Obtiene el elemento con id "display"
  // Get the element with id "display"
  let laPantalla = document.getElementById("display");

  // Muestra el valor actual del buffer en pantalla
  // Show the current buffer value on screen
  laPantalla.innerText = buffer;
}

// INICIALIZADOR DE BOTONES / BUTTON INITIALIZER
function init() {
  console.log("Calculadora inicializada... / Calculator initialized...");
  // Selecciona el contenedor de los botones / Select the button container
  document
    .querySelector(".buttons")
    // Agrega un listener para clicks en los botones / Add click listener to buttons
    .addEventListener("click", function (event) {
      // Obtiene el texto del botón presionado / Get the text of the clicked button
      buttonClick(event.target.innerText);
    });
}

// Determina si el botón presionado es número o símbolo
// Determines if the clicked button is a number or a symbol
function buttonClick(value) {
  // Si no es un número... / If it's not a number...
  if (isNaN(parseInt(value))) {
    handleSymbol(value); // Maneja el símbolo / Handle the symbol
  } else {
    handleNumber(value); // Maneja el número / Handle the number
  }
}

// Llama a la función init() al cargar el script
// Calls the init() function when the script loads
init();
