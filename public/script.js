document.addEventListener("DOMContentLoaded", function() {
    const flowerContainer = document.getElementById('flower-container');
    const numFlowers = 10; // Número de flores
    const flowers = [];

    // Cargar imágenes de flores
  /*  const flowerImages = [
        'flor2.jpeg',
        'flor3.jpeg',
        'flor4.jpeg',
        'flor5.jpeg',
        'flor6.jpeg',
        'flor7.jpeg'
    ];
*/
    // Crear flores y asignarles movimiento
    for (let i = 0; i < numFlowers; i++) {
        const flower = document.createElement('div');
        flower.classList.add('flower');
        flower.style.backgroundImage = `url('${flowerImages[i % flowerImages.length]}')`;
        flower.style.left = `${Math.random() * 100}vw`;
        flower.style.top = `${Math.random() * 100}vh`;
        flowerContainer.appendChild(flower);
        flowers.push(flower);
    }

    // Función para mover las flores
    function moveFlowers() {
        flowers.forEach(flower => {
            const dx = (Math.random() - 0.5) * 0.3; // Movimiento horizontal aleatorio
            const dy = (Math.random() - 0.5) * 0.1; // Movimiento vertical aleatorio

            let x = parseFloat(flower.style.left) + dx;
            let y = parseFloat(flower.style.top) + dy;

            // Asegurar que las flores no salgan de la pantalla
            x = Math.max(0, Math.min(x, 100));
            y = Math.max(0, Math.min(y, 100));

            flower.style.left = `${x}vw`;
            flower.style.top = `${y}vh`;
        });

        requestAnimationFrame(moveFlowers);
    }

    // Iniciar el movimiento de las flores
    moveFlowers();
});