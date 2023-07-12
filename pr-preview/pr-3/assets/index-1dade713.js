var y=Object.defineProperty;var b=(r,t,e)=>t in r?y(r,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):r[t]=e;var n=(r,t,e)=>(b(r,typeof t!="symbol"?t+"":t,e),e);import"./modulepreload-polyfill-3cfb730f.js";class c{constructor(){n(this,"subscribers",[])}subscribe(t){this.subscribers=[...this.subscribers,t]}unsubscribe(t){this.subscribers=this.subscribers.filter(e=>e!==t)}notify(t){this.subscribers.forEach(e=>{e.update(t)})}}function v(r,t){const e=r+Math.random()*(t+1-r);return Math.floor(e)}function I(r,t,e){const s=document.createElement("div");s.className=`blackjack__result-item result-item ${e??""}`;const l=document.createElement("div");l.className="result-item__player-info";const i=document.createElement("p");i.className="result-item__player-name typography-subtitle",i.textContent=t;const a=document.createElement("p");a.className="result-item__player-points typography-subtitle",a.textContent="0 points",l.appendChild(i),l.appendChild(a);const h=document.createElement("div");h.className="result_item__indicator";const u=document.createElement("div");u.className="result-item__moves";const d=document.createElement("p");d.className="result_item__moves-subtitle typography-subtitle",d.textContent="Moves";const m=document.createElement("div");return m.className="result-item__moves-data typography-body",u.appendChild(d),u.appendChild(m),s.appendChild(l),s.appendChild(h),s.appendChild(u),r.appendChild(s),{resultHtml:s,resultMovesDataHtml:m,resultScoreHtml:a}}class H extends c{update(t){const l=v(1,6),i={...t,diceSide:l};this.notify(i)}}class P extends c{constructor(){super();n(this,"playersIds",[]);n(this,"currentPlayerIndex",0);this.move=this.move.bind(this)}move(){const e=(this.currentPlayerIndex+1)%this.playersIds.length,s=this.playersIds[e],l={currentPlayerId:this.playersIds[this.currentPlayerIndex],nextPlayerId:s};this.notify(l),this.currentPlayerIndex=e}updatePlayers(e){this.playersIds=e}}class _ extends c{constructor(){super(...arguments);n(this,"results",[])}update(e){this.results=[...this.results,e.diceSide];const s={status:[],results:this.results};this.notify(s)}}var o=(r=>(r.Active="result-item_active",r.Win="result-item_winning",r))(o||{});class p{constructor(t,e){n(this,"resultHtml",null);n(this,"resultMovesHtml",null);n(this,"resultScoreHtml",null);const s=document.querySelector(".blackjack__results");s!==null&&this.createElement(s,t,e)}update(t){if(this.resultHtml===null||this.resultMovesHtml===null||this.resultScoreHtml===null||(this.resultHtml.classList.remove(o.Active),t.status.length>0&&(this.resultHtml.className+=` ${t.status.join(" ")}`),t.results===void 0))return;const e=document.createElement("p");e.innerText=`${t.results[t.results.length-1]}`,this.resultMovesHtml.appendChild(e),this.resultScoreHtml.textContent=`${t.results.reduce((s,l)=>s+l,0)} points`}createElement(t,e,s){const{resultHtml:l,resultMovesDataHtml:i,resultScoreHtml:a}=I(t,e,s);this.resultHtml=l,this.resultMovesHtml=i,this.resultScoreHtml=a}}const f=21;class S extends c{constructor(e){super();n(this,"results",[]);this.playerId=e}update(e){let s=this.results.reduce((i,a)=>i+a,0);e.currentPlayerId===this.playerId&&(s+=e.diceSide,this.results=[...this.results,e.diceSide]);const l={status:this.getPlayerStatus(s,e.nextPlayerId===this.playerId),results:this.playerId===e.currentPlayerId?this.results:void 0};this.notify(l)}getPlayerStatus(e,s){const l=[];return e>=f&&l.push(o.Win),s&&l.push(o.Active),l}}class x{constructor(){n(this,"moveGenerator");n(this,"diceGenerator");n(this,"playerIds",[]);n(this,"lastPlayerId",0);this.moveGenerator=new P,this.diceGenerator=new H,this.addPlayerStatus("Computer"),this.addPlayerStatus("You"),this.addGameStatus(),this.moveGenerator.subscribe(this.diceGenerator),this.listenMove()}addPlayerStatus(t){this.lastPlayerId+=1,this.playerIds=[...this.playerIds,this.lastPlayerId];const e=new S(this.lastPlayerId),s=new p(t);e.subscribe(s),this.diceGenerator.subscribe(e),this.moveGenerator.updatePlayers(this.playerIds)}addGameStatus(){const t=new _,e=new p("Dice","game-result");t.subscribe(e),this.diceGenerator.subscribe(t)}listenMove(){const t=document.querySelector(".blackjack__turn-button");t&&t.addEventListener("click",this.moveGenerator.move)}}new x;
