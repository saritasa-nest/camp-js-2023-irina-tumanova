var h=Object.defineProperty;var p=(r,t,e)=>t in r?h(r,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):r[t]=e;var l=(r,t,e)=>(p(r,typeof t!="symbol"?t+"":t,e),e);import"./modulepreload-polyfill-3cfb730f.js";class u{constructor(){l(this,"subscribers",[])}subscribe(t){this.subscribers=[...this.subscribers,t]}unsubscribe(t){this.subscribers=this.subscribers.filter(e=>e!==t)}notify(t){this.subscribers.forEach(e=>{e.update(t)})}}function y(r,t){const e=r+Math.random()*(t+1-r);return Math.floor(e)}class b extends u{update(t){this.notify({...t,diceResult:y(1,6)})}}class R extends u{constructor(){super(...arguments);l(this,"playersCount",0);l(this,"currentPlayerIndex",0)}turn(){const e=(this.currentPlayerIndex+1)%this.playersCount;this.notify({currentPlayerIndex:this.currentPlayerIndex,nextPlayerIndex:e}),this.currentPlayerIndex=e}}class _ extends u{constructor(){super(...arguments);l(this,"turnResults",[])}update(e){this.turnResults=[...this.turnResults,e.diceResult],this.notify({turnResults:this.turnResults})}}class c{constructor(t,e){l(this,"resultHtml",null);l(this,"resultTurnsDataHtml",null);l(this,"resultScoreHtml",null);const s=document.querySelector(".blackjack__results");if(s===null)return;const n=this.createResultRootElement(e),{resultInfo:i,resultScore:a}=this.createResultInfoElement(t),o=this.createResultIndicatorElement(),{resultTurns:d,resultTurnsData:m}=this.createResultTurnsElement();n.appendChild(i),n.appendChild(o),n.appendChild(d),s.appendChild(n),this.resultHtml=n,this.resultTurnsDataHtml=m,this.resultScoreHtml=a}update(t){this.resultHtml===null||this.resultTurnsDataHtml===null||this.resultScoreHtml===null||(t.isActive?this.resultHtml.classList.add("result-item_active"):this.resultHtml.classList.remove("result-item_active"),t.isWinner&&this.resultHtml.classList.add("result-item_winner"),this.resultTurnsDataHtml.textContent=t.turnResults.join(""),this.resultScoreHtml.textContent=`${t.turnResults.reduce((e,s)=>e+s,0)} points`)}createResultRootElement(t){const e=document.createElement("div");return e.className=`blackjack__result-item result-item ${t??""}`,e}createResultInfoElement(t){const e=document.createElement("p");e.className="result-item__player-name typography-subtitle",e.textContent=t;const s=document.createElement("p");s.className="result-item__player-points typography-subtitle",s.textContent="0 points";const n=document.createElement("div");return n.className="result-item__player-info",n.appendChild(e),n.appendChild(s),{resultInfo:n,resultScore:s}}createResultIndicatorElement(){const t=document.createElement("div");return t.className="result_item__indicator",t}createResultTurnsElement(){const t=document.createElement("p");t.className="result_item__moves-subtitle typography-subtitle",t.textContent="Moves";const e=document.createElement("p");e.className="result-item__moves-data typography-body";const s=document.createElement("div");return s.className="result-item__moves",s.appendChild(t),s.appendChild(e),{resultTurns:s,resultTurnsData:e}}}const x=21;class I extends u{constructor(e){super();l(this,"turnResults",[]);this.playerIndex=e}update(e){let s=this.turnResults.reduce((i,a)=>i+a,0);e.currentPlayerIndex===this.playerIndex&&(s+=e.diceResult,this.turnResults=[...this.turnResults,e.diceResult]);const n={isActive:e.nextPlayerIndex===this.playerIndex,isWinner:s>=x,turnResults:this.turnResults};this.notify(n)}}class f{constructor(){l(this,"turnGenerator");l(this,"diceGenerator");l(this,"playersCount",0);this.turnGenerator=new R,this.diceGenerator=new b}init(){this.addPlayerStatus("Player One"),this.addPlayerStatus("Player Two"),this.addGameStatus(),this.turnGenerator.subscribe(this.diceGenerator),this.listenMove()}addPlayerStatus(t){const e=new I(this.playersCount),s=new c(t);e.subscribe(s),this.diceGenerator.subscribe(e),this.playersCount+=1,this.turnGenerator.playersCount+=1}addGameStatus(){const t=new _,e=new c("Dice","game-result");t.subscribe(e),this.diceGenerator.subscribe(t)}listenMove(){const t=document.querySelector(".blackjack__turn-button");t&&t.addEventListener("click",()=>{this.turnGenerator.turn()})}}const C=new f;C.init();
