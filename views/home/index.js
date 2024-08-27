window.addEventListener('load', () => {
    document.getElementById('preloader').classList.remove('hidden'); // Mostrar el preloader
    setTimeout(() => {
      document.getElementById('preloader').classList.add('hidden'); // Ocultar el preloader después de un tiempo
    }, 2000); // Ajusta el tiempo de espera según tus necesidades
  });