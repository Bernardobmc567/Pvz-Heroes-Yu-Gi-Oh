const cartoes = document.querySelectorAll('.cartao');
const cartoesZombie = document.querySelectorAll('.cartaoTwo');
const plantButton = document.querySelector('.plant-button');
const zombieButton = document.querySelector('.zombie-button');
const btnAvancarZ = document.getElementById('btn-avancarZ');
const btnVoltarZ = document.getElementById('btn-voltarZ');
const btnAvancarP = document.getElementById('btn-avancarP');
const btnVoltarP = document.getElementById('btn-voltarP');
const allAudios = document.querySelectorAll("audio");
const btnFV = document.getElementById('btn-FV');
const btnCtt = document.getElementById('Btn-Ctt');
const btnIP = document.getElementById('Btn-IP');
const btnD = document.getElementById('Btn-D');
const cartaoThree = document.querySelector('.cartaoThree');
const cartaoFour = document.querySelector('.cartaoFour');
const cartaoFive = document.querySelector('.cartaoFive');
const cartaoSix = document.querySelector('.cartaoSix');
const notif = document.getElementById("notif");
const video = document.querySelector('.video1');
const video2 = document.querySelector('.video2');
const video3 = document.querySelector('.video3');
const video4 = document.querySelector('.video4');
const logo = document.querySelector('.cabecalho .logo'); // Seleciona a imagem dentro do header
const iniciar = document.querySelector(".iniciar");
const logo1 = document.querySelector('.logo.I');
const trailer = document.querySelector('.Trailer');
const background = document.querySelector('.back-intro');
const skip = document.querySelector(".button");
const loading = document.querySelector(".hit-loa");
const black = document.querySelector(".black");
const slider = document.querySelector(".slider");
const slider1 = document.querySelector(".oneS");
const slider2 = document.querySelector('.twoS');
const slider3 = document.querySelector('.threeS');
const totalCliques = 20; // Número necessário para ativar a notificação
const body = document.body; // Seleciona o body uma vez e reutiliza

let contagemLiberada = false; // Começa bloqueado
let cliques = 0;
let maxCliques = 10;
let contagemAtiva = true;  // Controla se a contagem está ativa ou não
let intervalVibration;

iniciar.addEventListener("click", function() {
  logo1.style.transform = "translateY(-100%)";
  logo1.style.opacity = "0";
  logo1.style.pointerEvents = "none";

  iniciar.style.transform = "translateY(100%)";
  iniciar.style.opacity = "0";
  iniciar.style.pointerEvents = "none"; // O botão também fica inativo

  background.style.opacity = "0";
  background.style.pointerEvents = "none";

  setTimeout(() => {
    trailer.play();
}, 2000); // 2 segundos de "paralisia"

setTimeout(() => {
  skip.style.pointerEvents = "auto";
  skip.style.opacity = "1";  // Torna o botão visível
  skip.style.transform = "translateX(0)"; // Move para a posição original
}, 7000); // Aguarda 7 segundos antes de aparecer
});

trailer.addEventListener("ended", function() {
  trailer.style.opacity = "0"; // Faz o vídeo sumir suavemente
  trailer.style.pointerEvents = "none";
  skip.style.opacity = "0";
  skip.style.pointerEvents = "none";
  loading.style.pointerEvents = "none";
  black.style.pointerEvents = "none";
  slider2.classList.remove('twoS');
  slider3.classList.remove('threeS');

  setTimeout(() => {
    loading.style.opacity = "1"; // Suavemente aparece
}, 100); // Pequeno delay para garantir transição

setTimeout(() => {
  sequenciaAtivada = true; // Ativa a sequência de músicas antes do loading sumir
    let firstButton = document.querySelector(".play");
    if (firstButton) firstButton.click(); // Começa a tocar a primeira música da lista
  
    setTimeout(() => {
    loading.style.opacity = "0";
    // Expande o círculo e some
    black.style.opacity = "0";

    setTimeout(() => {
        loading.style.display = "none"; // Remove a tela de loading
        }, 1500); // Tempo da transição
    }, 10000); // Espera 10 segundos antes de iniciar o efeito
}, 8000); // Espera 9 segundos antes de ativar a sequência (antes do loading sumir)
});

skip.addEventListener("click", function() {
  trailer.style.pointerEvents = "none";
  trailer.style.opacity = "0"; // Faz o vídeo sumir suavemente
  skip.style.opacity = "0";
  skip.style.pointerEvents = "none";
  slider2.classList.remove('twoS');
  slider3.classList.remove('threeS');

  setTimeout(() => {
    trailer.pause();
    trailer.style.display = "none"; // Esconde o vídeo depois da animação
    setTimeout(() => {
      loading.style.opacity = "1"; // Suavemente aparece

      setTimeout(() => {
        sequenciaAtivada = true; // Ativa a sequência de músicas
      }, 7500); // tempo de ativar a sequência
    }, 100);
}, 2500); // Espera 1.5s para ocultar após a transição

setTimeout(() => {
  sequenciaAtivada = true; // Ativa a sequência de músicas antes do loading sumir
    let firstButton = document.querySelector(".play");
    if (firstButton) firstButton.click(); // Começa a tocar a primeira música da lista
  
    setTimeout(() => {
    loading.style.opacity = "0";
    // Expande o círculo e some
    black.style.opacity = "0";

    setTimeout(() => {
        loading.style.display = "none"; // Remove a tela de loading
        loading.style.pointerEvents = "none";
        black.style.pointerEvents = "none";
        }, 1500); // Tempo da transição
    }, 10000); // Espera 10 segundos antes de iniciar o efeito
}, 8000); // Espera 9 segundos antes de ativar a sequência (antes do loading sumir)
});

// Função para avançar para o próximo cartão
function avancar(cartaoSelecionado) {
  if (cartaoSelecionado.nextElementSibling) {
      cartaoSelecionado.classList.remove('selecionado', 'virado');
      cartaoSelecionado.nextElementSibling.classList.add('selecionado');
  }
}

// Função para voltar para o cartão anterior
function voltar(cartaoSelecionado) {
  if (cartaoSelecionado.previousElementSibling) {
      cartaoSelecionado.classList.remove('selecionado', 'virado');
      cartaoSelecionado.previousElementSibling.classList.add('selecionado');
  }
}

function contarCliques() {
  console.log(`Cliques: ${cliques}/${totalCliques}`);

  if (contagemAtiva && cliques < maxCliques) {
    cliques++
    console.log("Cliques:", cliques);
}
  else if (cliques >= maxCliques) {
  contagemAtiva = false;  // Desativa a contagem quando atingir 10
  contagemLiberada = true; // Agora permite contarCliques1 ser ativado
  console.log("Contagem pausada.");
  }
}

function contarCliques1() {
  if (!contagemLiberada) {
    console.log("Contador 2 ainda não pode ser ativado.");
    return; // Sai da função se não estiver liberado
  }

  cliques++;
  console.log(`Cliques: ${cliques}/${totalCliques}`);

  if (cliques === totalCliques) {
    showNotification();
  }
}

// Voltar nos botões de plantas
btnVoltarP.addEventListener('click', () => {
  const cartaoSelecionado = document.querySelector('.cartao.selecionado');
  if (cartaoSelecionado) {
      voltar(cartaoSelecionado);
      console.log('botão de voltar foi concluido')
  }
});

// Avançar nos botões de plantas
btnAvancarP.addEventListener('click', () => {
  const cartaoSelecionado = document.querySelector('.cartao.selecionado');
  if (cartaoSelecionado) {
      avancar(cartaoSelecionado);
      console.log('botão de avançar foi concluido')
      contarCliques(); // Incrementa o contador a cada clique
  }
});

// Avançar nos botões de zumbis
btnVoltarZ.addEventListener('click', () => {
  const cartaoSelecionado = document.querySelector('.cartaoTwo.selecionado');
  if (cartaoSelecionado) {
      voltar(cartaoSelecionado);
      
  }
});

// Voltar nos botões de zumbis
btnAvancarZ.addEventListener('click', () => {
  const cartaoSelecionado = document.querySelector('.cartaoTwo.selecionado');
  if (cartaoSelecionado) {
    avancar(cartaoSelecionado);
    contarCliques1();
  }
});

// Exibir cartas de plantas
plantButton.addEventListener('click', () => {
  console.log('Botão de plantas clicado');
  // Remover 'selecionado' das cartas de zumbis e desmarcar os botões de zumbis
  cartoesZombie.forEach(cartao => cartao.classList.remove('selecionado', 'virado'));
  btnAvancarZ.classList.remove('selec');
  btnVoltarZ.classList.remove('selec');
  cartaoFive.classList.remove('selecionado', 'virado');
  cartaoFour.classList.remove('selecionado', 'virado'); // Remove seleção do cartaoFour
  cartaoThree.classList.remove('selecionado', 'virado'); // Remove seleção do cartaoThree
  cartaoSix.classList.remove('selecionado', 'virado');
  slider2.classList.remove('twoS');
  slider3.classList.remove('threeS');

  // Adicionar 'selecionado' à primeira carta de plantas
  cartoes.forEach(cartao => cartao.classList.remove('selecionado')); // Limpa qualquer seleção anterior
  cartoes[0].classList.add('selecionado'); // Marca a primeira carta como selecionada

  // Marcar os botões de plantas como selecionados
  btnAvancarP.classList.add('selec');
  btnVoltarP.classList.add('selec');
  slider.classList.add('slider');
  slider1.classList.add('oneS');

  // Atualiza a navegação
  btnAvancarP.disabled = false;
  btnVoltarP.disabled = false;

  video4.style.opacity = "0";
  video2.style.opacity = "0"; 
  video3.style.opacity = "0";
  video.style.opacity = "0";
  document.body.classList.remove("bg-removido");
  logo.src = "./src/images/PvZ_Heroes_logo.webp";
});

// Exibir cartas de zumbis
zombieButton.addEventListener('click', () => {
  console.log('Botão de zumbis clicado');
// Remover 'selecionado' das cartas de plantas e desmarcar os botões de plantas
  cartoes.forEach(cartao => cartao.classList.remove('selecionado', 'virado'));
  btnAvancarP.classList.remove('selec');
  btnVoltarP.classList.remove('selec');
  cartaoFive.classList.remove('selecionado', 'virado');
  cartaoFour.classList.remove('selecionado', 'virado'); // Remove seleção do cartaoFour
  cartaoThree.classList.remove('selecionado', 'virado'); // Remove seleção do cartaoThree
  cartaoSix.classList.remove('selecionado', 'virado');
  slider1.classList.remove('oneS');
  slider3.classList.remove('threeS');

  // Adicionar 'selecionado' à primeira carta de zumbis
  cartoesZombie.forEach(cartao => cartao.classList.remove('selecionado')); // Limpa qualquer seleção anterior
  cartoesZombie[0].classList.add('selecionado'); // Marca a primeira carta de zumbis como selecionada

  // Marcar os botões de zumbis como selecionados
  btnAvancarZ.classList.add('selec');
  btnVoltarZ.classList.add('selec');
  slider.classList.add('slider');
  slider2.classList.add('twoS');

  // Atualiza a navegação
  btnAvancarZ.disabled = false;
  btnVoltarZ.disabled = false;

  video4.style.opacity = "0";
  video2.style.opacity = "0"; 
  video3.style.opacity = "0";
  video.style.opacity = "0";
  document.body.classList.remove("bg-removido");
  logo.src = "./src/images/PvZ_Heroes_logo.webp";
});

btnFV.addEventListener('click', () => {
  // Remover selecionado de todos os cartões
  cartoesZombie.forEach(cartao => cartao.classList.remove('selecionado')); // Limpa qualquer seleção anterior
  cartoes.forEach(cartao => cartao.classList.remove('selecionado'));
  cartaoFour.classList.remove('selecionado', 'virado'); // Remove seleção do cartaoFour
  cartaoFive.classList.remove('selecionado', 'virado');
  cartaoSix.classList.remove('selecionado', 'virado');
  // Adicionar selecionado ao cartãoThree
  cartaoThree.classList.add('selecionado');
  slider3.classList.add('threeS');
  slider1.classList.remove('oneS');
  slider2.classList.add('twoS');
  // Remover seleção dos botões
  btnAvancarZ.classList.remove('selec');
  btnVoltarZ.classList.remove('selec');
  btnAvancarP.classList.remove('selec');
  btnVoltarP.classList.remove('selec');
  
  btnAvancarP.disabled = true;
  btnVoltarP.disabled = true;

  document.body.classList.add("video-active", "bg-removido"); 
  video.style.opacity = "0.6";
  video.play();
  video2.style.opacity = "0"; 
  video3.style.opacity = "0";
  video4.style.opacity = "0";
  logo.src = "./src/images/icone-gw2.png";
  logo.style.height = "30%";
});

btnCtt.addEventListener('click', () => {
  // Remover selecionado de todos os cartões
  cartoesZombie.forEach(cartao => cartao.classList.remove('selecionado')); // Limpa qualquer seleção anterior
  cartoes.forEach(cartao => cartao.classList.remove('selecionado'));
  cartaoThree.classList.remove('selecionado', 'virado'); // Remove seleção do cartaoThree
  cartaoFive.classList.remove('selecionado', 'virado');
  cartaoSix.classList.remove('selecionado', 'virado');
  // Adicionar selecionado ao cartãoFour
  cartaoFour.classList.add('selecionado');
  body.classList.remove("video-active"); // Adiciona a classe para mostrar o vídeo
  // Remover seleção dos botões
  btnAvancarZ.classList.remove('selec');
  btnVoltarZ.classList.remove('selec');
  btnAvancarP.classList.remove('selec');
  btnVoltarP.classList.remove('selec');
  slider3.classList.add('threeS');
  slider1.classList.remove('oneS');
  slider2.classList.add('twoS');
  btnAvancarP.disabled = true;
  btnVoltarP.disabled = true;

  document.body.classList.add("video-active2", "bg-removido"); 
  video2.style.opacity = "0.6";
  video2.play();
  video.style.opacity = "0"; 
  video3.style.opacity = "0";
  video4.style.opacity = "0";
  logo.src = "./src/images/Pvz_logo.webp";
});

btnIP.addEventListener('click', () => {
  // Remover selecionado de todos os cartões
  cartoesZombie.forEach(cartao => cartao.classList.remove('selecionado')); // Limpa qualquer seleção anterior
  cartoes.forEach(cartao => cartao.classList.remove('selecionado'));
  cartaoFour.classList.remove('selecionado', 'virado'); // Remove seleção do cartaoFour
  cartaoThree.classList.remove('selecionado', 'virado');
  cartaoSix.classList.remove('selecionado', 'virado');
  // Adicionar selecionado ao cartãoThree
  cartaoFive.classList.add('selecionado');
  
  // Remover seleção dos botões
  btnAvancarZ.classList.remove('selec');
  btnVoltarZ.classList.remove('selec');
  btnAvancarP.classList.remove('selec');
  btnVoltarP.classList.remove('selec');
  slider3.classList.add('threeS');
  slider1.classList.remove('oneS');
  slider2.classList.add('twoS');
  btnAvancarP.disabled = true;
  btnVoltarP.disabled = true;

  document.body.classList.add("video-active3", "bg-removido"); 
  video3.style.opacity = "0.6";
  video3.play();
  video2.style.opacity = "0"; 
  video.style.opacity = "0";
  video4.style.opacity = "0";
  logo.src = "./src/images/Pvz_logo.webp";
});

btnD.addEventListener('click', () => {
  // Remover selecionado de todos os cartões
  cartoesZombie.forEach(cartao => cartao.classList.remove('selecionado')); // Limpa qualquer seleção anterior
  cartoes.forEach(cartao => cartao.classList.remove('selecionado'));
  cartaoFour.classList.remove('selecionado', 'virado'); // Remove seleção do cartaoFour
  cartaoThree.classList.remove('selecionado', 'virado');
  cartaoFive.classList.remove('selecionado');
  // Adicionar selecionado ao cartãoThree
  cartaoSix.classList.add('selecionado');
  
  // Remover seleção dos botões
  btnAvancarZ.classList.remove('selec');
  btnVoltarZ.classList.remove('selec');
  btnAvancarP.classList.remove('selec');
  btnVoltarP.classList.remove('selec');
  slider3.classList.add('threeS');
  slider1.classList.remove('oneS');
  slider2.classList.add('twoS');
  btnAvancarP.disabled = true;
  btnVoltarP.disabled = true;

  document.body.classList.add("video-active4", "bg-removido"); 
  video4.style.opacity = "0.6";
  video4.play();
  video2.style.opacity = "0"; 
  video3.style.opacity = "0";
  video.style.opacity = "0";
  logo.src = "./src/images/Pvz_logo.webp";
});

// Exibe a notificação e inicia a vibração intermitente
function showNotification() {
  notif.style.display = "flex";
  startVibration();
}

// Inicia a vibração com pausas de 4 segundos
function startVibration() {
  notif.classList.add("vibrate");

  intervalVibration = setInterval(() => {
      notif.classList.remove("vibrate");

      setTimeout(() => {
          notif.classList.add("vibrate");
      }, 4000);
  }, 5000);
}

// Esconde a notificação ao clicar
notif.addEventListener("click", () => {
  clearInterval(intervalVibration);
  notif.style.display = "none";

  const iconExc = document.querySelector(".icon-exc");
  iconExc.style.display = "flex"; 
  iconExc.style.gap = "13px";
  // Adiciona a animação de deslizar da esquerda para a posição final
  iconExc.style.animation = "slideInFromLeft 0.5s ease-in-out forwards";  // 0.5s para a animação de deslizar
});

document.querySelectorAll(".play").forEach((button, index, buttons) => {
  button.addEventListener("click", function () {
      let audio = this.parentElement.querySelector("audio");

      sequenciaAtivada = false;

      // Pausa todas as outras músicas e reseta ícones
      document.querySelectorAll("audio").forEach((a) => {
          if (a !== audio) {
              a.pause(); // Pausa outras músicas
              a.currentTime = 0; // Reseta o tempo das outras músicas
          }
      });

      document.querySelectorAll(".play").forEach((btn) => {
          if (btn !== this) btn.src = "./src/images/play-icon.png"; // Ícone de play para outros botões
      });

      // Se a música já estiver tocando, pausa ela
      if (!audio.paused) {
          audio.pause();
          this.src = "./src/images/play-icon.png";
          return;
      }

      // Toca a música selecionada
      audio.play();
      this.src = "./src/images/pause-icon.png"; // Muda para o ícone de pause

      audio.onended = function () {
          if (sequenciaAtivada) {
              let nextIndex = index + 1; 
              if (nextIndex < buttons.length) {
                  let nextButton = buttons[nextIndex];
                  nextButton.click();
                } else {
                  sequenciaAtivada = false; // Desativa a sequência ao terminar a última música
            }
          }
      };

      // Evento para quando a música terminar
      audio.addEventListener("ended", () => {
          this.src = "./src/images/play-icon.png"; // Volta para o ícone de play ao terminar
      });
  });
});



document.addEventListener("DOMContentLoaded", function () {
  const playlistImage = document.querySelector(".playlist-image");
  const songsList = document.querySelector(".songs");
  const songImage = document.querySelector(".song-image");
  let isMuted = false;

  // Alternar visibilidade da lista de músicas
  playlistImage.addEventListener("click", function () {
      if (songsList.style.display === "none" || songsList.style.display === "") {
          songsList.style.display = "block"; // Exibir a lista
      } else {
          songsList.style.display = "none"; // Esconder a lista
      }
  });

  // Alternar mute e trocar imagem da música
  songImage.addEventListener("click", function () {
      isMuted = !isMuted;
      const allAudios = document.querySelectorAll("audio");

      allAudios.forEach(audio => {
          audio.muted = isMuted;
      });

      songImage.src = isMuted ? "./src/images/music-off-icon-lg.png" : "./src/images/music-on.png";

  });
});

document.addEventListener("DOMContentLoaded", function () {
  const cartoes = document.querySelectorAll(".cartao");

  cartoes.forEach((cartao) => {
    cartao.addEventListener("click", function () {
      this.classList.toggle("virado");
      console.log("Classe .virado foi adicionada/removida:", this.classList.contains("virado"));
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const cartaoT = document.querySelectorAll(".cartaoTwo");

  cartaoT.forEach((cartao) => {
    cartao.addEventListener("click", function () {
      this.classList.toggle("virado");
      console.log("Classe .virado foi adicionada/removida:", this.classList.contains("virado"));
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const cartaoTh = document.querySelectorAll(".cartaoThree");

  cartaoTh.forEach((cartao) => {
    cartao.addEventListener("click", function () {
      this.classList.toggle("virado");
      console.log("Classe .virado foi adicionada/removida:", this.classList.contains("virado"));
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const cartaoFour = document.querySelectorAll(".cartaoFour");

  cartaoFour.forEach((cartao) => {
    cartao.addEventListener("click", function () {
      this.classList.toggle("virado");
      console.log("Classe .virado foi adicionada/removida:", this.classList.contains("virado"));
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const cartaoFive = document.querySelectorAll(".cartaoFive");

  cartaoFive.forEach((cartao) => {
    cartao.addEventListener("click", function () {
      this.classList.toggle("virado");
      console.log("Classe .virado foi adicionada/removida:", this.classList.contains("virado"));
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const cartaoSix = document.querySelectorAll(".cartaoSix");

  cartaoSix.forEach((cartao) => {
    cartao.addEventListener("click", function () {
      this.classList.toggle("virado");
      console.log("Classe .virado foi adicionada/removida:", this.classList.contains("virado"));
    });
  });
});