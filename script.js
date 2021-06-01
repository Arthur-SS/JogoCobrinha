var jogando = document.querySelector(".btaJogar")
jogando.style.display = "flex";

let canvas = document.getElementById("cobrinha"); //criar elemento que irá rodar o jogo
let context = canvas.getContext("2d"); //....
let box = 32;
let snake = [];
snake[0] = {
    x: 8 * box,
    y: 8 * box,
};
let direcao = "direita";
let comida = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box,
};
var fome = { x: -2, y: -2 };

const imgMaca = document.getElementById("maca") //Imagens de estilização 
var corpoCobra = document.getElementById("corpoCobra")
const cabecaCobra = document.getElementById("cabecaCobra")
const ossos = document.getElementById("morreCobra")
const imgFome = document.getElementById("fome-10")


document.addEventListener('keyup', setas)/* Adiciona o movimento ao personagem */

function setas(event) {
    let baixo = 40;
    let cima = 38;
    let esquerda = 37;
    let direita = 39;

    if (event.keyCode == esquerda && direcao != "direita") direcao = "esquerda";
    if (event.keyCode == direita && direcao != "esquerda") direcao = "direita";
    if (event.keyCode == cima && direcao != "baixo") direcao = "cima";
    if (event.keyCode == baixo && direcao != "cima") direcao = "baixo";
}
function botaoCima() {
    if (cima == cima && direcao != "baixo") direcao = "cima";
}
function botaoBaixo() {
    if (baixo == baixo && direcao != "cima") direcao = "baixo";
}
function botaoDireita() {
    if (direita == direita && direcao != "esquerda") direcao = "direita";
}
function botaoEsquerda() {
    if (esquerda == esquerda && direcao != "direita") direcao = "esquerda";
}

function jogoComeçar() {        //Função para add botão de jogar e reiniciar
    jogando.style.display = "none";
    snake.length = 1
    corpoCobra = document.getElementById("corpoCobra")
    var fome = { x: -2, y: -2 };

    let score = document.getElementById("pontos"); //Pontuação
    var ponto = 0;
    const textP = "Pontos: ";
    score.innerHTML = textP + ponto;
    let disparaFome = 100;


    function criarBG() {
        context.fillStyle = "lightgreen";
        context.fillRect(0, 0, 16 * box, 16 * box); //desenha o retângulo usando x e y e a largura e altura setadas
    };

    function criarCobrinha() {
        context.drawImage(cabecaCobra, snake[0].x, snake[0].y)
        for (i = 1; i < snake.length; i++) {
            context.drawImage(corpoCobra, snake[i].x, snake[i].y);
        }
    };

    function loop() {
        if (snake[0].x >= 16 * box) snake[0].x = 0;
        if (snake[0].x <= -1) snake[0].x = 16 * box;
        if (snake[0].y >= 16 * box) snake[0].y = 0;
        if (snake[0].y <= -1) snake[0].y = 16 * box;
    }


    function desenharComida() {
        context.drawImage(imgMaca, comida.x, comida.y);
    }

    function calcularPontos() {

        ponto = ponto + 10;
        score.innerHTML = textP + ponto;
    }
    function pontoCai() {
        ponto = ponto - 10
        score.innerHTML = textP + ponto
    }
    function desenharFome() {
        context.drawImage(imgFome, fome.x, fome.y)
    }
    var xyAleatorio = Math.floor(Math.random() * 15 + 1) * box;


    var perdeu = document.querySelector(".perdeu");
    perdeu.style.display = "none";

    function iniciarJogo() {

        for (i = 1; i < snake.length; i++) {
            if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
                corpoCobra = ossos
                var perdeu = document.querySelector(".perdeu");
                perdeu.style.display = "flex";
                let textHTML = ""
                textHTML += `!Você Perdeu! <div class="calculoF">seus pontos: ${ponto}</div>`
                perdeu.innerHTML = textHTML
                clearInterval(jogo)
                jogando.style.display = "block";
                jogando.value = "reiniciar";
            }
        };


        loop();
        criarBG();
        criarCobrinha();
        desenharComida();

        let snakeX = snake[0].x;
        let snakeY = snake[0].y;

        if (direcao == "direita") snakeX += box;
        if (direcao == "esquerda") snakeX -= box;
        if (direcao == "cima") snakeY -= box;
        if (direcao == "baixo") snakeY += box;

        if (snakeX != comida.x || snakeY != comida.y) {
            snake.pop();

        } else {
            comida.x = Math.floor(Math.random() * 15 + 1) * box;
            comida.y = Math.floor(Math.random() * 15 + 1) * box;

            calcularPontos();
        };

        /*  Controle Fome  */
        switch (ponto) {
            case disparaFome:
                fome.x = xyAleatorio;
                fome.y = xyAleatorio;
                break;
            default:
                break;
        };

        if (ponto >= disparaFome) {
            desenharFome();
        }
        if (snakeX != fome.x || snakeY != fome.y) {

        } else {
            snake.length = snake.length - 1;
            fome.x = Math.floor(Math.random() * 15 + 1) * box;
            fome.y = Math.floor(Math.random() * 15 + 1) * box;
            pontoCai();
        };


        var nCabeca = {
            x: snakeX,
            y: snakeY,
        };

        snake.unshift(nCabeca)

        /* Controle de velocidade */
        if (snake.length == 4) {
            clearInterval(jogo);
            jogo = setInterval(iniciarJogo, 185)
        } if (snake.length == 8) {
            clearInterval(jogo);
            jogo = setInterval(iniciarJogo, 170)
        } if (snake.length == 10) {
            clearInterval(jogo);
            jogo = setInterval(iniciarJogo, 160)
        } if (snake.length == 15) {
            clearInterval(jogo);
            jogo = setInterval(iniciarJogo, 140)
        } if (snake.length == 25) {
            clearInterval(jogo);
            jogo = setInterval(iniciarJogo, 110)
        } if (snake.length == 30) {
            clearInterval(jogo);
            jogo = setInterval(iniciarJogo, 100)
        }if (snake.length == 35) {
            clearInterval(jogo);
            jogo = setInterval(iniciarJogo, 80)
        }if (snake.length == 40) {
            clearInterval(jogo);
            jogo = setInterval(iniciarJogo, 75)
        };

    };


    var jogo = setInterval(iniciarJogo, 200);
    jogo;
}