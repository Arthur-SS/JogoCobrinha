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
}
let score = document.getElementById("pontos");
let ponto = 0
score.innerHTML = ponto


function criarBG() {
    context.fillStyle = "lightgreen";
    context.fillRect(0, 0, 16 * box, 16 * box); //desenha o retângulo usando x e y e a largura e altura setadas
};

function criarCobrinha() {
    for (i = 0; i < snake.length; i++) {
        context.fillStyle = "red"
        context.fillRect(snake[i].x, snake[i].y, box, box)
    }
};
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
function botaoCima(){
    if (cima == cima && direcao != "baixo") direcao = "cima";
}
function botaoBaixo(){
    if (baixo == baixo && direcao != "cima") direcao = "baixo";
}
function botaoDireita(){
    if (direita == direita && direcao != "esquerda") direcao = "direita";
}
function botaoEsquerda(){
    if (esquerda == esquerda && direcao != "direita") direcao = "esquerda";
}

function loop() {
    if (snake[0].x > 16 * box && direcao == "direita") snake[0].x = 0;
    if (snake[0].x < 0 && direcao == "esquerda") snake[0].x = 16 * box;
    if (snake[0].y > 16 * box && direcao == "baixo") snake[0].y = 0;
    if (snake[0].y < 0 && direcao == "cima") snake[0].y = 16 * box;
}

function desenharComida() {
    context.fillStyle = "orange";
    context.fillRect(comida.x, comida.y, box, box)
}
function calcularPontos() {
    ponto = ponto + 10

    score.innerHTML = ponto
}


function iniciarJogo() {

    for (i = 1; i < snake.length; i++) {
        if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
            var perdeu = document.querySelector(".perdeu");
            perdeu.style.display = "flex";
            let textHTML = ""
            textHTML += `!Você Perdeu! <div class="calculoF">seus pontos: ${ponto}</div>` 
            perdeu.innerHTML = textHTML
            clearInterval(jogo)
        }
    };

    criarBG();
    loop();
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
    }

    var nCabeca = {
        x: snakeX,
        y: snakeY,
    };

    snake.unshift(nCabeca)

}
let jogo = setInterval(iniciarJogo, 150);


