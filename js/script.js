


document.addEventListener('keydown', (e) => {
    const mario = document.getElementById('mario');
    mario.classList.add('jump');
    setTimeout(() => {
        const mario = document.getElementById('mario');
    mario.classList.remove('jump'); 
    }, 500)
} );

const loop = setInterval(() => {
    const mario = document.getElementById('mario');
    const pipe = document.getElementById('pipe');
    const sky = document.getElementById('sky');
    const pipePosition = pipe.offsetLeft;
    const skyPosition = sky.offsetLeft;
    const marioPosition = + window.getComputedStyle(mario).bottom.replace('px', '');

    if (pipePosition < 120 && pipePosition > 0 && marioPosition < 80) {
       pipe.style.animation = 'none'; 
       pipe.style.left = `${pipePosition}px`;

       mario.style.animation = 'none'; 
       mario.style.bottom = `${marioPosition}px`;

       sky.style.animation = 'none';
       sky.style.left = `${skyPosition}px`;

       mario.src = '../image/images.jpeg';
       mario.style.width = '100px';
       mario.style.marginLeft = '50px';

       clearInterval(loop);
    }
  

}, 10);

