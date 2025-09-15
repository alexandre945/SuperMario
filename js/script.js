let score = 0; 
let isGameOver = false; 
const scoreElement = document.getElementById('score');

// evento de pulo
document.addEventListener('keydown', (e) => {
    const mario = document.getElementById('mario');

    if (!mario.classList.contains('jump') && !isGameOver) {
        mario.classList.add('jump');

        setTimeout(() => {
            mario.classList.remove('jump'); 

            if (!isGameOver) {
                score += 10;
                scoreElement.textContent = `Score: ${score}`;
            }
        }, 500); 
    }
});

const loop = setInterval(() => {
    const mario = document.getElementById('mario');
    const pipe = document.getElementById('pipe');
    const sky = document.getElementById('sky');
    const pipePosition = pipe.offsetLeft;
    const skyPosition = sky.offsetLeft;
    const marioPosition = + window.getComputedStyle(mario).bottom.replace('px', '');

    const game = document.querySelector('.game');
    const restartBtn = document.getElementById('restart');

    if (pipePosition < 120 && pipePosition > 0 && marioPosition < 80) {
       isGameOver = true;

       // para animações
       pipe.style.animation = 'none'; 
       pipe.style.left = `${pipePosition}px`;

       mario.style.animation = 'none'; 
       mario.style.bottom = `${marioPosition}px`;

       sky.style.animation = 'none';
       sky.style.left = `${skyPosition}px`;

       mario.src = '../image/images.jpeg';
       mario.style.width = '100px';
       mario.style.marginLeft = '50px';

       // mensagem game over
       const text = document.createElement('h2');
       text.textContent = 'GAME OVER';
       game.appendChild(text);

   

       // input para nome
       const nameInput = document.createElement('input');
       nameInput.placeholder = "Digite seu nome";
       nameInput.id = "playerName";
       game.appendChild(nameInput);

       const saveBtn = document.createElement('button');
       saveBtn.textContent = "Salvar Score";
       game.appendChild(saveBtn);

           //css
         
        nameInput.style.padding = "10px";
        nameInput.style.border = "1px solid #ccc";
        nameInput.style.borderRadius = "6px";
        nameInput.style.width = "200px";
        nameInput.style.fontSize = "16px";
        nameInput.style.textAlign = "center";
        nameInput.style.marginBottom = "50px";
        nameInput.style.color = "#000";

        saveBtn.style.backgroundColor = "#3b82f6"; // azul
        saveBtn.style.color = "#fff";
        saveBtn.style.padding = "8px 16px";
        saveBtn.style.borderRadius = "6px";
        saveBtn.style.marginBottom = "10px";
        saveBtn.style.border = "none";
        saveBtn.style.cursor = "pointer";

       saveBtn.addEventListener('click', () => {
            const playerName = nameInput.value.trim();
            if (playerName) {
                saveScore(playerName, score);
                loadRanking();
                saveBtn.disabled = true;
                nameInput.disabled = true;
            }
       });

       restartBtn.style.display = 'block'; 
       restartBtn.addEventListener('click', () => {
            location.reload(); 
       });

       clearInterval(loop);
    }
}, 10);

// ---------------- RANKING ----------------
function saveScore(name, points) {
    let scores = JSON.parse(localStorage.getItem("ranking")) || [];

    // verifica se já existe o jogador
    let existing = scores.find(s => s.name === name);
    if (existing) {
        if (points > existing.score) {
            existing.score = points; // atualiza só se for maior
        }
    } else {
        scores.push({ name, score: points });
    }

    // ordena por score decrescente
    scores.sort((a, b) => b.score - a.score);

    localStorage.setItem("ranking", JSON.stringify(scores));
}

function loadRanking() {
    let scores = JSON.parse(localStorage.getItem("ranking")) || [];
    const rankingDiv = document.getElementById("ranking");
    rankingDiv.innerHTML = "<h2>🏆 Ranking</h2>";
    scores.forEach((s, i) => {
        rankingDiv.innerHTML += `<p>${i+1}. ${s.name} - ${s.score} pontos</p>`;
    });
}

// carrega ranking ao abrir
loadRanking();
