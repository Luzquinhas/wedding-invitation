/* Lucas & Mirelly — convite de casamento
   Idioma (PT/EN), contagem regressiva e formulário de RSVP. */

(function () {
  'use strict';

  /* --- Idioma --- */
  var btnPt = document.getElementById('btn-pt');
  var btnEn = document.getElementById('btn-en');

  function setLang(lang) {
    document.documentElement.setAttribute('data-lang', lang);
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';
    btnPt.classList.toggle('active', lang === 'pt');
    btnEn.classList.toggle('active', lang === 'en');
  }

  btnPt.addEventListener('click', function () { setLang('pt'); });
  btnEn.addEventListener('click', function () { setLang('en'); });

  /* --- Contagem regressiva (10/01/2027 16h, horário de Brasília) --- */
  var TARGET = new Date('2027-01-10T16:00:00-03:00').getTime();
  var elDays = document.getElementById('cd-days');
  var elHours = document.getElementById('cd-hours');
  var elMinutes = document.getElementById('cd-minutes');
  var elSeconds = document.getElementById('cd-seconds');

  function pad(n) {
    return String(n).padStart(2, '0');
  }

  function tick() {
    var diff = Math.max(0, TARGET - Date.now());
    elDays.textContent = String(Math.floor(diff / 864e5));
    elHours.textContent = pad(Math.floor((diff % 864e5) / 36e5));
    elMinutes.textContent = pad(Math.floor((diff % 36e5) / 6e4));
    elSeconds.textContent = pad(Math.floor((diff % 6e4) / 1e3));
  }

  tick();
  setInterval(tick, 1000);

  /* --- RSVP --- */
  var form = document.getElementById('rsvp-form');
  var confirmation = document.getElementById('rsvp-confirmation');
  var choiceYes = document.getElementById('choice-yes');
  var choiceNo = document.getElementById('choice-no');
  var msgYes = document.getElementById('msg-yes');
  var msgNo = document.getElementById('msg-no');
  var attending = 'yes';

  function setAttending(value) {
    attending = value;
    choiceYes.classList.toggle('selected', value === 'yes');
    choiceNo.classList.toggle('selected', value === 'no');
  }

  choiceYes.addEventListener('click', function () { setAttending('yes'); });
  choiceNo.addEventListener('click', function () { setAttending('no'); });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    msgYes.classList.toggle('hidden', attending !== 'yes');
    msgNo.classList.toggle('hidden', attending !== 'no');
    form.classList.add('hidden');
    confirmation.classList.remove('hidden');
  });
})();
