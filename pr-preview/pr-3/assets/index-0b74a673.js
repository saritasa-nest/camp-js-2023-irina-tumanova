var h=Object.defineProperty;var y=(n,e,t)=>e in n?h(n,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[e]=t;var r=(n,e,t)=>(y(n,typeof e!="symbol"?e+"":e,t),t);import"./modulepreload-polyfill-3cfb730f.js";class a{constructor(){r(this,"subscribers",new Set)}subscribe(e){this.subscribers.add(e)}unsubscribe(e){this.subscribers.delete(e)}notify(e){this.subscribers.forEach(t=>{t.update(e)})}}function b(n,e){const t=n+Math.random()*(e+1-n);return Math.floor(t)}class C extends a{update(e){this.notify({...e,diceResult:b(1,6)})}}class _ extends a{constructor(){super(...arguments);r(this,"playersCount",0);r(this,"currentPlayerIndex",0)}turn(){const t=(this.currentPlayerIndex+1)%this.playersCount;this.notify({currentPlayerIndex:this.currentPlayerIndex,nextPlayerIndex:t}),this.currentPlayerIndex=t}}class p extends a{constructor(){super(...arguments);r(this,"results",[])}next(t){const s=[...this.results,t];this.results=s,this.notify(s)}getScore(){return this.results.reduce((t,s)=>t+s,0)}}class f{constructor(){r(this,"results",new p)}update(e){this.results.next(e.diceResult)}}const E=21;class x{constructor(e){r(this,"results",new p);r(this,"isActive",new a);r(this,"isWinner",new a);this.playerIndex=e}update(e){e.currentPlayerIndex===this.playerIndex&&this.results.next(e.diceResult),this.isActive.notify(e.nextPlayerIndex===this.playerIndex),this.isWinner.notify(this.results.getScore()>=E)}}class c{constructor(){r(this,"resultInfoElement",null);r(this,"resultScoreElement",null)}render(e){const t=document.createElement("p");t.className="result-item__player-name typography-subtitle",t.textContent=e;const s=document.createElement("p");s.className="result-item__player-points typography-subtitle",s.textContent="0 points";const l=document.createElement("div");l.className="result-item__player-info",l.appendChild(t),l.appendChild(s),this.resultInfoElement=l,this.resultScoreElement=s}update(e){this.resultScoreElement!==null&&(this.resultScoreElement.textContent=`${e.reduce((t,s)=>t+s,0)} points`)}}class I{constructor(){r(this,"resultStatusElement",null)}render(){const e=document.createElement("div");e.className="result_item__indicator",this.resultStatusElement=e}update(e){this.resultStatusElement!==null&&(e?this.resultStatusElement.classList.add("result_item__indicator_active"):this.resultStatusElement.classList.remove("result_item__indicator_active"))}}class d{constructor(){r(this,"resultsContainer",null);r(this,"resultsValueContainer",null)}render(){const e=document.createElement("p");e.className="result_item__moves-subtitle typography-subtitle",e.textContent="Moves";const t=document.createElement("p");t.className="result-item__moves-data typography-body";const s=document.createElement("div");s.className="result-item__moves",s.appendChild(e),s.appendChild(t),this.resultsContainer=s,this.resultsValueContainer=t}update(e){this.resultsValueContainer!==null&&(this.resultsValueContainer.textContent=e.join(""))}}class m{constructor(){r(this,"resultElement",null)}render({resultInfo:e,resultStatus:t,resultTurns:s,className:l}){const i=document.querySelector(".blackjack__results");if(i===null)return;const u=document.createElement("div");u.className=`blackjack__result-item result-item ${l??""}`,e!==null&&u.appendChild(e),t!==null&&u.appendChild(t),s!==null&&u.appendChild(s),i.appendChild(u),this.resultElement=u}update(e){this.resultElement!==null&&e&&this.resultElement.classList.add("result-item_winner")}}class S{constructor(){r(this,"turnGenerator");r(this,"diceGenerator");r(this,"playersCount",0);this.turnGenerator=new _,this.diceGenerator=new C}init(){const e=this.initPlayer("Player First",0),t=this.initPlayer("Player Second",1),s=this.initDiceResults();this.diceGenerator.subscribe(s),this.diceGenerator.subscribe(e),this.diceGenerator.subscribe(t),this.turnGenerator.subscribe(this.diceGenerator),this.playersCount=2,this.turnGenerator.playersCount=this.playersCount,this.listenTurn()}initPlayer(e,t){const s=new c;s.render(e);const l=new I;l.render();const i=new d;i.render();const u=new m;u.render({resultInfo:s.resultInfoElement,resultStatus:l.resultStatusElement,resultTurns:i.resultsContainer});const o=new x(t);return o.results.subscribe(s),o.results.subscribe(i),o.isActive.subscribe(l),o.isWinner.subscribe(u),o}initDiceResults(){const e=new c;e.render("Dice");const t=new d;t.render(),new m().render({resultInfo:e.resultInfoElement,resultStatus:null,resultTurns:t.resultsContainer,className:"game-result"});const l=new f;return l.results.subscribe(e),l.results.subscribe(t),l}listenTurn(){const e=document.querySelector(".blackjack__turn-button");e&&e.addEventListener("click",()=>{this.turnGenerator.turn()})}}const w=new S;w.init();
