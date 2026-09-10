const contador = document.getElementById("contador");
const semanasTexto = document.getElementById("semanas");
const diasTexto = document.getElementById("dias");
const horasTexto = document.getElementById("horas");
const minutosTexto = document.getElementById("minutos");
const segundosTexto = document.getElementById("segundos");
const mensagemContador = document.getElementById("status_contador");

const dataEvento = new Date("2026-10-09T12:00:00-03:00");

const agora = new Date();
let diferenca = Math.max(0, dataEvento.getTime() - agora.getTime());

let totalSegundos = Math.floor(diferenca / 1000);

let semana = Math.floor(totalSegundos / 604800);
totalSegundos %= 604800;

let dia = Math.floor(totalSegundos / 86400);
totalSegundos %= 86400;

let hora = Math.floor(totalSegundos / 3600);
totalSegundos %= 3600;

let minuto = Math.floor(totalSegundos / 60);
let segundo = totalSegundos % 60;

let intervalo;

const formulario = document.getElementById("formulario");
const mensagem = document.getElementById("mensagem_formulario");

function formatarTempo(tempo) {
  tempo = String(tempo);
  tempo = tempo.padStart(2, "0");
  return tempo;
}

function atualizarTela() {
  semanasTexto.textContent = formatarTempo(semana);
  diasTexto.textContent = formatarTempo(dia);
  horasTexto.textContent = formatarTempo(hora);
  minutosTexto.textContent = formatarTempo(minuto);
  segundosTexto.textContent = formatarTempo(segundo);
}

function jaFinalizou() {
  if (
    segundo === 0 &&
    minuto === 0 &&
    hora === 0 &&
    dia === 0 &&
    semana === 0
  ) {
    clearInterval(intervalo);
    contador.classList.add("finalizado");
    return true;
  }
  return false;
}
function contadorRegressivo() {
  if (jaFinalizou()) {
    return;
  }
  if (segundo > 0) {
    segundo--;
  } else {
    segundo = 59;

    if (minuto > 0) {
      minuto--;
    } else {
      minuto = 59;

      if (hora > 0) {
        hora--;
      } else {
        hora = 23;

        if (dia > 0) {
          dia--;
        } else {
          dia = 6;

          if (semana > 0) {
            semana--;
          }
        }
      }
    }
  }

  atualizarTela();
  if (jaFinalizou()) {
    return;
  }
}

function validarFormulario(evento) {
  evento.preventDefault();  

  formulario.classList.add("was-validated");

  if (formulario.checkValidity()) {
    formulario.style.display = "none";
    mensagem.classList.remove("d-none");
  } else {
    mensagem.classList.add("d-none");
  }
}


atualizarTela();
intervalo = setInterval(contadorRegressivo, 1000);

formulario.addEventListener("submit", validarFormulario);
