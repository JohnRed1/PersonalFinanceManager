const trigger = document.querySelectorAll('.completed');
//const canvas = document.querySelector('#confetti');
const jsConfetti = new JSConfetti()

trigger.forEach( function (e) {e.addEventListener('click', () => {jsConfetti.addConfetti()})});



