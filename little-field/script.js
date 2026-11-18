'use strict';
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const parts = {
  camera:{kicker:'THE EYES',title:'A fresh perspective.',description:'A camera could capture leaves and fruit. A vision model could flag patterns for a grower to inspect; a picture alone is not a diagnosis.',icon:'◎'},
  computer:{kicker:'THE THINKING SPACE',title:'A place for patterns.',description:'The electronics enclosure could house an onboard computer. Local processing could turn images into observations without sending every frame to a cloud service.',icon:'✳'},
  frame:{kicker:'THE BACKBONE',title:'A steady point of view.',description:'The braced frame supports the sensor mast. A stable mounting point could help collect more consistent images over uneven ground.',icon:'△'},
  chassis:{kicker:'THE FOUNDATION',title:'Room to grow.',description:'The platform carries the frame and electronics. Any battery, payload capacity or weather protection would need engineering validation.',icon:'▱'},
  wheels:{kicker:'THE WAY FORWARD',title:'Ready for a field day.',description:'Four visible wheels suggest a mobile scouting platform. Grip, slopes, steering and stopping distances must be tested before a real field trial.',icon:'◉'},
  status:{kicker:'THE CHECK-IN',title:'Keep the grower informed.',description:'The visible front panel could display a status light. Our concept would distinguish working, waiting and needing human help.',icon:'◫'}
};
const partKeys=Object.keys(parts);
function setPart(key){
  const part=parts[key];if(!part)return;
  document.querySelectorAll('[data-part]').forEach(button=>{const active=button.dataset.part===key;button.classList.toggle('selected',active);button.setAttribute('aria-pressed',String(active));});
  document.querySelector('#part-kicker').textContent=part.kicker;
  document.querySelector('#part-title').textContent=part.title;
  document.querySelector('#part-description').textContent=part.description;
  document.querySelector('#part-icon').textContent=part.icon;
  document.querySelector('#part-counter').textContent=`0${partKeys.indexOf(key)+1} / 06`;
  const content=document.querySelector('.part-content');content.classList.remove('changing');void content.offsetWidth;content.classList.add('changing');
}
document.querySelectorAll('[data-part]').forEach(button=>button.addEventListener('click',()=>setPart(button.dataset.part)));

// A tiny orchard story. Motion is decorative; a normal link always opens page two.
const startButton=document.querySelector('#start-story');
const motionButton=document.querySelector('#motion-toggle');
let storyRunning=false;
motionButton?.addEventListener('click',()=>{
  const paused=document.body.classList.toggle('motion-paused');motionButton.setAttribute('aria-pressed',String(paused));motionButton.setAttribute('aria-label',paused?'Resume decorative motion':'Pause decorative motion');motionButton.innerHTML=paused?'▷ <span>Resume motion</span>':'Ⅱ <span>Pause motion</span>';
});
function goToRover(){try{sessionStorage.setItem('little-field-arrival','apple');}catch{}window.location.href='rover.html';}
startButton?.addEventListener('click',async()=>{
  if(storyRunning)return;if(reducedMotion.matches){goToRover();return;}
  storyRunning=true;startButton.disabled=true;startButton.textContent='A little adventure is growing…';
  motionButton.hidden=true;document.body.classList.remove('motion-paused');document.querySelector('.orchard').classList.add('story-running');
  const track=document.querySelector('.rover-track');const tree=document.querySelector('.tree-wrap');const apple=document.querySelector('.story-apple');const status=document.querySelector('#story-status');
  status.textContent='The rover is rolling toward the apple tree.';
  const orchard=document.querySelector('.orchard').getBoundingClientRect();const trunk=tree.getBoundingClientRect().left+tree.getBoundingClientRect().width*.52;
  const destination=trunk-track.getBoundingClientRect().width*.88-orchard.left;
  try{
    await track.animate([{left:getComputedStyle(track).left},{left:destination+'px'}],{duration:2000,easing:'cubic-bezier(.45,.05,.3,1)',fill:'forwards'}).finished;
    tree.classList.add('bumped');status.textContent='An apple drops and rolls into the next chapter.';
    const rect=apple.getBoundingClientRect();const groundY=orchard.bottom-104-rect.height;const drop=Math.max(75,groundY-rect.top);
    const dropAnim=apple.animate([{transform:'translate(0,0) rotate(-10deg)'},{transform:`translate(0,${drop}px) rotate(40deg)`,offset:.55},{transform:`translate(15px,${drop-36}px) rotate(90deg)`,offset:.75},{transform:`translate(30px,${drop}px) rotate(140deg)`}],{duration:1000,easing:'ease-in',fill:'forwards'});
    await dropAnim.finished;
    await apple.animate([{transform:`translate(30px,${drop}px) rotate(140deg)`},{transform:`translate(${window.innerWidth-rect.left+100}px,${drop}px) rotate(980deg)`}],{duration:1350,easing:'cubic-bezier(.35,.1,.8,.5)',fill:'forwards'}).finished;
    document.querySelector('.apple-transition').classList.add('expand');await new Promise(resolve=>setTimeout(resolve,570));goToRover();
  }catch{goToRover();}
});
if(document.querySelector('.arrival-apple')){
  try{if(sessionStorage.getItem('little-field-arrival')==='apple'){sessionStorage.removeItem('little-field-arrival');document.querySelector('.arrival-apple').classList.add('arriving');}}catch{}
}

// Native dialog provides focus containment, Escape to close and accessible naming.
const dialog=document.querySelector('#builder-dialog');
document.querySelectorAll('.open-builder').forEach(button=>button.addEventListener('click',()=>{dialog.showModal();document.querySelector('#save-status').textContent='';updateSummary();}));
dialog?.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();}});
function updateSummary(){const crop=document.querySelector('#crop');if(!crop)return;const focus=document.querySelector('input[name="focus"]:checked');document.querySelector('#build-summary').textContent=`Field Rover 01 · ${crop.value} · ${focus.value} · Supervised concept`;}
document.querySelector('#builder-form')?.addEventListener('change',updateSummary);
document.querySelector('#builder-form')?.addEventListener('submit',event=>{
  event.preventDefault();const crop=document.querySelector('#crop').value;const focus=document.querySelector('input[name="focus"]:checked').value;
  const summary=`LITTLE FIELD — YOUR CONCEPT BUILD\n\nMachine: Field Rover 01\nFarm: ${crop}\nFocus: ${focus}\nOperation: Supervised by a grower\n\nThis is an educational concept. Capabilities, safety, price and availability are not verified. No payment has been collected and no enquiry or order has been sent.\n\nExplore more: ${window.location.href.split('#')[0]}\n`;
  const url=URL.createObjectURL(new Blob([summary],{type:'text/plain;charset=utf-8'}));const a=document.createElement('a');a.href=url;a.download='little-field-concept-build.txt';document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);document.querySelector('#save-status').textContent='Your build summary is saved. No order or enquiry was sent.';
});
// Open source details before scrolling to citations inside a closed disclosure.
document.querySelectorAll('a.cite').forEach(link=>link.addEventListener('click',()=>{const sources=document.querySelector('#sources');if(sources)sources.open=true;}));
