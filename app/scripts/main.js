// wait for the DOM to be ready
document.addEventListener('DOMContentLoaded', () => {

  // js is available, remove the nojs class
  document.querySelector('.nojs').classList.remove('nojs');

  // init all of the components
  PlayerStatsCard.init();  
});