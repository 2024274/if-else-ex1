// Variáveis de posição (começa no centro)
let circlePositionX = 300;
let circlePositionY = 300;

// Variáveis de velocidade (mudámos para valores iguais para o ricochete ser simétrico e previsível)
let circleSpeedX = 4;
let circleSpeedY = 3;

let circleRadius = 30;
let circleHue = 0;

// Variável para controlar a cor do preenchimento (0 = preto, 255 = branco)
let corInterior = 255; 

function setup() {
  // 1. Background maior (600x600 dá mais espaço para o movimento respirar)
  createCanvas(600, 600);

  ellipseMode(RADIUS);
  
  // Usamos HSB para a cor do contorno (Hue, Saturation, Brightness)
  colorMode(HSB);
  
  strokeWeight(5);

  describe(
    'Um círculo que se move num ecrã grande quando o rato é pressionado. Ele muda entre preto e branco sempre que bate numa parede, deixando um rasto de luz suave.'
  );
}

function draw() {
  /* 
    ELEMENTO DIFERENTE (Do site p5.js): 
    Em vez de limpar o fundo com background(20), usamos um fundo com transparência (alfa).
    Isto faz com que os frames anteriores desapareçam suavemente, criando um rasto de luz limpo,
    sem acumular círculos infinitos no ecrã.
  */
  background(20, 0.15); // O 0.15 controla a suavidade do rasto.

  // Define a cor do contorno com base no arco-íris atual
  stroke(circleHue, 80, 90);

  // Aplica a cor interior (que muda apenas quando bate nas paredes)
  fill(corInterior);

  // Desenha o círculo
  circle(circlePositionX, circlePositionY, circleRadius);

  // O movimento só acontece se o rato estiver pressionado
  if (mouseIsPressed === true) {
    circlePositionX = circlePositionX + circleSpeedX;
    circlePositionY = circlePositionY + circleSpeedY;

    // Avança a cor do contorno suavemente
    circleHue = circleHue + 1.5;
  }

  // Faz a cor do contorno voltar ao início se chegar ao fim do arco-íris
  if (circleHue >= 360) {
    circleHue = 0;
  }

  // CONDIÇÃO: Colisão com as paredes Esquerda/Direita
  if (circlePositionX < circleRadius || circlePositionX > width - circleRadius) {
    circleSpeedX = -circleSpeedX; // Inverte a direção
    
    // MUDANÇA DE COR AO BATER: Se estava branco, fica preto. Se estava preto, fica branco.
    if (corInterior === 255) {
      corInterior = 0;
    } else {
      corInterior = 255;
    }
  }

  // CONDIÇÃO: Colisão com as paredes Topo/Fundo
  if (circlePositionY < circleRadius || circlePositionY > height - circleRadius) {
    circleSpeedY = -circleSpeedY; // Inverte a direção
    
    // MUDANÇA DE COR AO BATER: Faz o mesmo efeito de alternância
    if (corInterior === 255) {
      corInterior = 0;
    } else {
      corInterior = 255;
    }
  }
}
