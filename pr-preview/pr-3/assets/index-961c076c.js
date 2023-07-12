var y=Object.defineProperty;var b=(r,t,e)=>t in r?y(r,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):r[t]=e;var n=(r,t,e)=>(b(r,typeof t!="symbol"?t+"":t,e),e);import"./modulepreload-polyfill-3cfb730f.js";class d{constructor(){n(this,"subscribers",[])}subscribe(t){this.subscribers=[...this.subscribers,t]}unsubscribe(t){this.subscribers=this.subscribers.filter(e=>e!==t)}notify(t){this.subscribers.forEach(e=>{e.update(t)})}}function v(r,t){const e=r+Math.random()*(t+1-r);return Math.floor(e)}function I(r,t,e){const s=document.createElement("p");s.className="result-item__player-name typography-subtitle",s.textContent=t;const l=document.createElement("p");l.className="result-item__player-points typography-subtitle",l.textContent="0 points";const a=document.createElement("div");a.className="result-item__player-info",a.appendChild(s),a.appendChild(l);const i=document.createElement("div");i.className="result_item__indicator";const m=document.createElement("p");m.className="result_item__moves-subtitle typography-subtitle",m.textContent="Moves";const h=document.createElement("p");h.className="result-item__moves-data typography-body";const o=document.createElement("div");o.className="result-item__moves",o.appendChild(m),o.appendChild(h);const u=document.createElement("div");return u.className=`blackjack__result-item result-item ${e??""}`,u.appendChild(a),u.appendChild(i),u.appendChild(o),r.appendChild(u),{resultHtml:u,resultMovesDataHtml:h,resultScoreHtml:l}}class P extends d{update(t){const l=v(1,6),a={...t,diceSide:l};this.notify(a)}}class _ extends d{constructor(){super();n(this,"playersIds",[]);n(this,"currentPlayerIndex",0);this.move=this.move.bind(this)}move(){const e=(this.currentPlayerIndex+1)%this.playersIds.length,s=this.playersIds[e],l={currentPlayerId:this.playersIds[this.currentPlayerIndex],nextPlayerId:s};this.notify(l),this.currentPlayerIndex=e}updatePlayers(e){this.playersIds=e}}class S extends d{constructor(){super(...arguments);n(this,"results",[])}update(e){this.results=[...this.results,e.diceSide];const s={status:[],results:this.results};this.notify(s)}}var c=(r=>(r.Active="result-item_active",r.Win="result-item_winning",r))(c||{});class p{constructor(t,e){n(this,"resultHtml",null);n(this,"resultMovesHtml",null);n(this,"resultScoreHtml",null);const s=document.querySelector(".blackjack__results");s!==null&&this.createElement(s,t,e)}update(t){this.resultHtml===null||this.resultMovesHtml===null||this.resultScoreHtml===null||(this.resultHtml.classList.remove(c.Active),t.status.length>0&&(this.resultHtml.className+=` ${t.status.join(" ")}`),this.resultMovesHtml.textContent=t.results.join(""),this.resultScoreHtml.textContent=`${t.results.reduce((e,s)=>e+s,0)} points`)}createElement(t,e,s){const{resultHtml:l,resultMovesDataHtml:a,resultScoreHtml:i}=I(t,e,s);this.resultHtml=l,this.resultMovesHtml=a,this.resultScoreHtml=i}}const f=21;class H extends d{constructor(e){super();n(this,"results",[]);this.playerId=e}update(e){let s=this.results.reduce((a,i)=>a+i,0);e.currentPlayerId===this.playerId&&(s+=e.diceSide,this.results=[...this.results,e.diceSide]);const l={status:this.getPlayerStatus(s,e.nextPlayerId===this.playerId),results:this.results};this.notify(l)}getPlayerStatus(e,s){const l=[];return e>=f&&l.push(c.Win),s&&l.push(c.Active),l}}class x{constructor(){n(this,"moveGenerator");n(this,"diceGenerator");n(this,"playerIds",[]);n(this,"lastPlayerId",0);this.moveGenerator=new _,this.diceGenerator=new P,this.addPlayerStatus("Player One"),this.addPlayerStatus("Player Two"),this.addGameStatus(),this.moveGenerator.subscribe(this.diceGenerator),this.listenMove()}addPlayerStatus(t){this.lastPlayerId+=1,this.playerIds=[...this.playerIds,this.lastPlayerId];const e=new H(this.lastPlayerId),s=new p(t);e.subscribe(s),this.diceGenerator.subscribe(e),this.moveGenerator.updatePlayers(this.playerIds)}addGameStatus(){const t=new S,e=new p("Dice","game-result");t.subscribe(e),this.diceGenerator.subscribe(t)}listenMove(){const t=document.querySelector(".blackjack__turn-button");t&&t.addEventListener("click",this.moveGenerator.move)}}new x;
