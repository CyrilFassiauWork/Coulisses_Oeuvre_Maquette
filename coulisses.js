/* Maquette : comportements simulés (aucun envoi réel).
   Chaque bloc est indépendant : si un élément est absent du HTML, il est simplement ignoré. */
(function(){
  var $=function(s,c){return (c||document).querySelector(s)};
  var emailOk=function(v){return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)};
  var say=function(el,t,ok){el.textContent=t;el.className='cdo-msg '+(ok?'ok':'err')};

  /* Modale « Me prévenir » */
  var modal=$('#cdo-modal'),mode='',lastFocus=null;
  if(modal){
    var open=function(m,title){mode=m;lastFocus=document.activeElement;
      $('#cdo-modal-title').textContent=m==='alert'?'Être prévenu(e) de la parution':'Précommander';
      $('#cdo-modal-sub').textContent=m==='alert'
        ?'Recevez un e-mail dès que « '+title+' » est disponible.'
        :'Laissez-nous votre e-mail : nous vous contacterons dès l’ouverture des précommandes de « '+title+' ».';
      $('#cdo-modal-btn').textContent=m==='alert'?'Me prévenir':'Je me préinscris';
      $('#cdo-modal-form').reset();$('#cdo-modal-msg').textContent='';modal.hidden=false;$('#cdo-modal-email').focus();};
    var close=function(){modal.hidden=true;if(lastFocus)lastFocus.focus()};
    var closeBtn=$('.cdo-modal-close');
    if(closeBtn)closeBtn.addEventListener('click',close);
    modal.addEventListener('click',function(e){if(e.target===modal)close()});
    document.addEventListener('keydown',function(e){if(e.key==='Escape'&&!modal.hidden)close()});
    $('#cdo-modal-form').addEventListener('submit',function(e){e.preventDefault();var m=$('#cdo-modal-msg');
      if(!emailOk($('#cdo-modal-email').value.trim()))return say(m,'Merci de saisir une adresse e-mail valide.');
      if(!$('#cdo-modal-ok').checked)return say(m,'Merci de cocher la case de consentement.');
      say(m,mode==='alert'?'C’est noté, vous serez prévenu(e) (simulation).':'Préinscription enregistrée (simulation).',true);
      setTimeout(close,1400);});

    /* Boutons « Me prévenir » / « Précommander » de chaque carte « À paraître » */
    [].forEach.call(document.querySelectorAll('.cdo-up'),function(card){
      var alertBtn=$('.js-alert',card),preBtn=$('.js-preorder',card),title=card.getAttribute('data-title');
      if(alertBtn)alertBtn.addEventListener('click',function(){open('alert',title)});
      if(preBtn)preBtn.addEventListener('click',function(){open('preorder',title)});
    });
  }
})();

/* Maquette : liens désactivés */
document.addEventListener('click',function(e){var a=e.target.closest&&e.target.closest('a[href="#"]');if(a)e.preventDefault()});
