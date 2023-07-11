var d=Object.defineProperty;var h=(r,t,e)=>t in r?d(r,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):r[t]=e;var l=(r,t,e)=>(h(r,typeof t!="symbol"?t+"":t,e),e);import"./modulepreload-polyfill-3cfb730f.js";class c{constructor(){l(this,"subscribers",[])}subscribe(t){this.subscribers=[...this.subscribers,t]}unsubscribe(t){this.subscribers=this.subscribers.filter(e=>e!==t)}notify(t){this.subscribers.forEach(e=>{e.update(t)})}}class m extends c{update(t){const e=this.generateRandomNumber(1,7),s={...t,diceSide:e};this.notify(s)}generateRandomNumber(t,e){const s=t+Math.random()*(e-t);return Math.floor(s)}}class y extends c{constructor(){super();l(this,"playersIds",[]);l(this,"currentPlayerIndex",0);this.move=this.move.bind(this)}move(){const e=(this.currentPlayerIndex+1)%this.playersIds.length,s=this.playersIds[e],i={currentPlayerId:this.playersIds[this.currentPlayerIndex],nextPlayerId:s};this.notify(i),this.currentPlayerIndex=e}updatePlayers(e){this.playersIds=e}}class p extends c{constructor(){super(...arguments);l(this,"results",[])}update(e){this.results=[...this.results,e.diceSide];const s={status:[],results:this.results};this.notify(s)}}var u=(r=>(r.Inactive="inactive",r.Active="active",r.Win="win",r))(u||{});class o{constructor(t){l(this,"resultHtml",null);l(this,"resultMovesHtml",null);l(this,"resultScoreHtml",null);const e=document.querySelector(".blackjack__results");e!==null&&this.createElement(e,t)}update(t){if(this.resultHtml===null||this.resultMovesHtml===null||this.resultScoreHtml===null||(this.resultHtml.classList.remove(u.Active),t.status.length>0&&(this.resultHtml.className+=` ${t.status.join(" ")}`),t.results===void 0))return;const e=document.createElement("p");e.innerText=`${t.results[t.results.length-1]}`,this.resultMovesHtml.appendChild(e),this.resultScoreHtml.textContent=t.results.reduce((s,i)=>s+i,0).toString()}createElement(t,e){const s=document.createElement("div");s.className="blackjack__result-item result-item";const i=document.createElement("p");i.className="result-item__name",i.textContent=`${e} -`;const n=document.createElement("p");n.className="result-item__score",n.textContent="0";const a=document.createElement("div");a.className="result-item__moves",s.appendChild(i),s.appendChild(n),s.appendChild(a),t.appendChild(s),this.resultHtml=s,this.resultMovesHtml=a,this.resultScoreHtml=n}}class b extends c{constructor(e){super();l(this,"results",[]);l(this,"winningPoints",21);this.playerId=e}update(e){let s=this.results.reduce((n,a)=>n+a,0);e.currentPlayerId===this.playerId&&(s+=e.diceSide,this.results=[...this.results,e.diceSide]);const i={status:this.getPlayerStatus(s,e.nextPlayerId===this.playerId),results:this.playerId===e.currentPlayerId?this.results:void 0};this.notify(i)}getPlayerStatus(e,s){const i=[];return e>=this.winningPoints&&i.push(u.Win),s&&i.push(u.Active),i}}class v{constructor(){l(this,"moveGenerator");l(this,"diceGenerator");l(this,"playerIds",[]);l(this,"lastPlayerId",0);this.moveGenerator=new y,this.diceGenerator=new m,this.addGameStatus(),this.addPlayerStatus("Computer"),this.addPlayerStatus("You"),this.moveGenerator.subscribe(this.diceGenerator),this.listenMove()}addPlayerStatus(t){this.lastPlayerId+=1,this.playerIds=[...this.playerIds,this.lastPlayerId];const e=new b(this.lastPlayerId),s=new o(t);e.subscribe(s),this.diceGenerator.subscribe(e),this.moveGenerator.updatePlayers(this.playerIds)}addGameStatus(){const t=new p,e=new o("Dice");t.subscribe(e),this.diceGenerator.subscribe(t)}listenMove(){var t;(t=document.querySelector(".blackjack__turn_button"))==null||t.addEventListener("click",this.moveGenerator.move)}}new v;
