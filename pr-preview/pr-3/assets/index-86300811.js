var p=Object.defineProperty;var b=(n,e,t)=>e in n?p(n,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[e]=t;var r=(n,e,t)=>(b(n,typeof e!="symbol"?e+"":e,t),t);import"./modulepreload-polyfill-3cfb730f.js";class a{constructor(){r(this,"subscribers",[])}subscribe(e){this.subscribers=[...this.subscribers,e]}unsubscribe(e){this.subscribers=this.subscribers.filter(t=>t!==e)}notify(e){this.subscribers.forEach(t=>{t.update(e)})}}function y(n,e){const t=n+Math.random()*(e+1-n);return Math.floor(t)}class C extends a{update(e){this.notify({...e,diceResult:y(1,6)})}}class f extends a{constructor(){super(...arguments);r(this,"playersCount",0);r(this,"currentPlayerIndex",0)}turn(){const t=(this.currentPlayerIndex+1)%this.playersCount;this.notify({currentPlayerIndex:this.currentPlayerIndex,nextPlayerIndex:t}),this.currentPlayerIndex=t}}class h extends a{constructor(){super(...arguments);r(this,"results",[])}next(t){this.results=[...this.results,t],this.notify({results:this.results})}getScore(){return this.results.reduce((t,s)=>t+s,0)}}class _{constructor(){r(this,"results");this.results=new h}update(e){this.results.next(e.diceResult)}}const E=21;class x{constructor(e){r(this,"results");r(this,"isActive");r(this,"isWinner");this.playerIndex=e,this.results=new h,this.isActive=new a,this.isWinner=new a}update(e){e.currentPlayerIndex===this.playerIndex&&this.results.next(e.diceResult),this.isActive.notify({isActive:e.nextPlayerIndex===this.playerIndex}),this.isWinner.notify({isWinner:this.results.getScore()>=E})}}class c{constructor(){r(this,"resultInfoElement",null);r(this,"resultScoreElement",null)}render(e){const t=document.createElement("p");t.className="result-item__player-name typography-subtitle",t.textContent=e;const s=document.createElement("p");s.className="result-item__player-points typography-subtitle",s.textContent="0 points";const l=document.createElement("div");l.className="result-item__player-info",l.appendChild(t),l.appendChild(s),this.resultInfoElement=l,this.resultScoreElement=s}update(e){this.resultScoreElement!==null&&(this.resultScoreElement.textContent=`${e.results.reduce((t,s)=>t+s,0)} points`)}}class I{constructor(){r(this,"resultStatusElement",null)}render(){const e=document.createElement("div");e.className="result_item__indicator",this.resultStatusElement=e}update(e){this.resultStatusElement!==null&&(e.isActive?this.resultStatusElement.classList.add("result_item__indicator_active"):this.resultStatusElement.classList.remove("result_item__indicator_active"))}}class d{constructor(){r(this,"resultsContainer",null);r(this,"resultsValueContainer",null)}render(){const e=document.createElement("p");e.className="result_item__moves-subtitle typography-subtitle",e.textContent="Moves";const t=document.createElement("p");t.className="result-item__moves-data typography-body";const s=document.createElement("div");s.className="result-item__moves",s.appendChild(e),s.appendChild(t),this.resultsContainer=s,this.resultsValueContainer=t}update(e){this.resultsValueContainer!==null&&(this.resultsValueContainer.textContent=e.results.join(""))}}class m{constructor(){r(this,"resultElement",null)}render({resultInfo:e,resultStatus:t,resultTurns:s,className:l}){const u=document.querySelector(".blackjack__results");if(u===null)return;const i=document.createElement("div");i.className=`blackjack__result-item result-item ${l??""}`,e!==null&&i.appendChild(e),t!==null&&i.appendChild(t),s!==null&&i.appendChild(s),u.appendChild(i),this.resultElement=i}update(e){this.resultElement!==null&&e.isWinner&&this.resultElement.classList.add("result-item_winner")}}class S{constructor(){r(this,"turnGenerator");r(this,"diceGenerator");r(this,"playersCount",0);this.turnGenerator=new f,this.diceGenerator=new C}init(){const e=this.initPlayer("Player First",0),t=this.initPlayer("Player Second",1),s=this.initDiceResults();this.diceGenerator.subscribe(s),this.diceGenerator.subscribe(e),this.diceGenerator.subscribe(t),this.turnGenerator.subscribe(this.diceGenerator),this.playersCount=2,this.turnGenerator.playersCount=this.playersCount,this.listenTurn()}initPlayer(e,t){const s=new c;s.render(e);const l=new I;l.render();const u=new d;u.render();const i=new m;i.render({resultInfo:s.resultInfoElement,resultStatus:l.resultStatusElement,resultTurns:u.resultsContainer});const o=new x(t);return o.results.subscribe(s),o.results.subscribe(u),o.isActive.subscribe(l),o.isWinner.subscribe(i),o}initDiceResults(){const e=new c;e.render("Dice");const t=new d;t.render(),new m().render({resultInfo:e.resultInfoElement,resultStatus:null,resultTurns:t.resultsContainer,className:"game-result"});const l=new _;return l.results.subscribe(e),l.results.subscribe(t),l}listenTurn(){const e=document.querySelector(".blackjack__turn-button");e&&e.addEventListener("click",()=>{this.turnGenerator.turn()})}}const v=new S;v.init();
