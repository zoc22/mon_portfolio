// script.js
(() => {
  function initCompetencesCarousel() {
    const container = document.querySelector('#competences .competence-scroll');
    if (!container) return;

    let cards = Array.from(container.querySelectorAll('.competence-card'));
    if (!cards.length) return;

    // --------- Zoom sur carte sélectionnée ---------
    cards.forEach(card => {
      card.addEventListener('click', () => {
        // retire le zoom des autres
        cards.forEach(c => c.classList.remove('active'));
        // applique le zoom sur celle cliquée
        card.classList.add('active');
      });
    });

    // --------- Carousel circulaire ---------
    // On clone le premier et le dernier élément pour créer un effet infini
    const firstClone = cards[0].cloneNode(true);
    const lastClone = cards[cards.length - 1].cloneNode(true);

    firstClone.classList.add('clone');
    lastClone.classList.add('clone');

    container.appendChild(firstClone);
    container.insertBefore(lastClone, cards[0]);

    // Mets à jour la liste des cartes après clonage
    cards = Array.from(container.querySelectorAll('.competence-card'));

    // Gère le "loop" quand on atteint les extrémités
    container.addEventListener('scroll', () => {
      const scrollLeft = container.scrollLeft;
      const maxScroll = container.scrollWidth - container.clientWidth;

      // Si on est complètement à gauche → sauter à la fin
      if (scrollLeft === 0) {
        container.scrollLeft = maxScroll - firstClone.offsetWidth;
      }

      // Si on est complètement à droite → sauter au début
      if (scrollLeft >= maxScroll) {
        container.scrollLeft = firstClone.offsetWidth;
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCompetencesCarousel);
  } else {
    initCompetencesCarousel();
  }
})();
