import{a as Ai,b as Ri,g as Mi,c as Li,r as w,R as Ut,L as Qe,u as en,d as Oi,B as Fi,e as Xs,f as st}from"./vendor-BVmym8AF.js";import{X as Di,T as $t,E as Bi,C as ct,M as Et,B as Zs,a as zt,P as tn,S as Ui,R as Wt,F as Pt,b as ys,A as $i,c as zi,d as Wi,e as Vi,f as sn,g as Ns,h as rn,U as dt,G as ut,i as Gi,L as Is,j as nn,k as er,l as js,m as an,n as tr,o as Hi,p as jt,q as qi,r as Ki,s as sr,t as rr,u as nr,v as Qi,w as on,x as Yi,y as Ji,z as Qt,D as ir,Z as Xi,H as Zi,I as ea,J as ta,K as sa,N as ra}from"./icons-YHZHqCEN.js";import{u as H,w as na,E as ia}from"./exportTools-CQ4r32fY.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))r(i);new MutationObserver(i=>{for(const a of i)if(a.type==="childList")for(const o of a.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function s(i){const a={};return i.integrity&&(a.integrity=i.integrity),i.referrerPolicy&&(a.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?a.credentials="include":i.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function r(i){if(i.ep)return;i.ep=!0;const a=s(i);fetch(i.href,a)}})();var Yt={exports:{}},rt={};/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var ar;function aa(){if(ar)return rt;ar=1;var t=Ai(),e=Symbol.for("react.element"),s=Symbol.for("react.fragment"),r=Object.prototype.hasOwnProperty,i=t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,a={key:!0,ref:!0,__self:!0,__source:!0};function o(l,c,d){var u,h={},f=null,m=null;d!==void 0&&(f=""+d),c.key!==void 0&&(f=""+c.key),c.ref!==void 0&&(m=c.ref);for(u in c)r.call(c,u)&&!a.hasOwnProperty(u)&&(h[u]=c[u]);if(l&&l.defaultProps)for(u in c=l.defaultProps,c)h[u]===void 0&&(h[u]=c[u]);return{$$typeof:e,type:l,key:f,ref:m,props:h,_owner:i.current}}return rt.Fragment=s,rt.jsx=o,rt.jsxs=o,rt}var or;function oa(){return or||(or=1,Yt.exports=aa()),Yt.exports}var n=oa(),yt={},lr;function la(){if(lr)return yt;lr=1;var t=Ri();return yt.createRoot=t.createRoot,yt.hydrateRoot=t.hydrateRoot,yt}var ca=la();const da=Mi(ca);let ua="useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict",M=(t=21)=>{let e="",s=crypto.getRandomValues(new Uint8Array(t|=0));for(;t--;)e+=ua[s[t]&63];return e};function ha(t){const e=[...t];for(let s=e.length-1;s>0;s--){const r=Math.floor(Math.random()*(s+1));[e[s],e[r]]=[e[r],e[s]]}return e}function ma(t){if(t<=1)return[0];let e=[0];for(;e.length<t;){const s=e.length*2;e=e.flatMap(r=>[r,s-1-r])}return e.slice(0,t)}function fa(t){switch(t){case 0:return"Final";case 1:return"Semi-finals";case 2:return"Quarter-finals";default:return`Round of ${2**(t+1)}`}}function Jt(t,e="none"){if(t.length<2)throw new Error("Need at least 2 players to generate a fixture");const s=2**Math.ceil(Math.log2(t.length)),r=s-t.length,i=Math.log2(s),a=ha(t),o=s/2,l=new Set(ma(o).slice(0,r)),c=Array.from({length:i},(u,h)=>({index:h,name:fa(i-1-h),matches:Array.from({length:s/2**(h+1)},(f,m)=>({id:M(),round:h,index:m,p1:{playerId:null},p2:{playerId:null},status:"pending"}))}));c[0].matches.forEach((u,h)=>{u.p1={playerId:a.shift().id},l.has(h)?(u.p2={playerId:null,isBye:!0},u.status="bye"):(u.p2={playerId:a.shift().id},u.status="ready")});const d={generatedAt:Date.now(),locked:!1,size:s,rounds:c};return i>=2&&(e==="bronze-match"?d.thirdPlace={id:M(),round:-1,index:0,p1:{playerId:null},p2:{playerId:null},status:"pending",isThirdPlace:!0}:e==="two-bronze"&&(d.twoBronze={loser1Id:null,loser2Id:null})),c[0].matches.filter(u=>u.status==="bye").forEach(u=>{cn(d,u,u.p1.playerId)}),d}function pa(t,e){if(e.isThirdPlace)return!1;let s=e.round,r=e.index;for(;s+1<t.rounds.length;){const a=t.rounds[s+1],o=Math.floor(r/2),l=a.matches[o];if(!l)break;if(l.status==="done"||l.winnerId||l.score1!==void 0)return!0;s++,r=o}return!!(e.round===t.rounds.length-2&&t.thirdPlace&&(t.thirdPlace.status==="done"||t.thirdPlace.winnerId||t.thirdPlace.score1!==void 0))}function ln(t,e,s){let r=e,i=s;if(r===t.rounds.length-2){if(t.thirdPlace){const a=i===0?"p1":"p2";t.thirdPlace[a]={playerId:null},t.thirdPlace.winnerId=void 0,t.thirdPlace.score1=void 0,t.thirdPlace.score2=void 0,t.thirdPlace.resultType=void 0,t.thirdPlace.status="pending"}t.twoBronze&&(i===0&&(t.twoBronze.loser1Id=null),i===1&&(t.twoBronze.loser2Id=null))}for(;r+1<t.rounds.length;){const a=t.rounds[r+1],o=Math.floor(i/2),l=a.matches[o];if(!l)break;const c=i%2===0?"p1":"p2";l[c]={playerId:null},l.winnerId=void 0,l.score1=void 0,l.score2=void 0,l.resultType=void 0,l.status="pending",r++,i=o}}function cn(t,e,s,r,i,a){const o=e.winnerId;e.winnerId=s,e.score1=r,e.score2=i,e.resultType=a,e.status!=="bye"&&(e.status="done"),o&&o!==s&&ln(t,e.round,e.index);const l=t.rounds[e.round+1];if(l){const d=l.matches[Math.floor(e.index/2)];if(d){const u=e.index%2===0?"p1":"p2";d[u]={playerId:s},d.p1.playerId&&d.p2.playerId&&(d.status="ready")}}if(e.round===t.rounds.length-2){const d=e.p1.playerId===s?e.p2.playerId:e.p1.playerId;if(t.thirdPlace){const u=e.index===0?"p1":"p2";t.thirdPlace[u]={playerId:d},t.thirdPlace.p1.playerId&&t.thirdPlace.p2.playerId&&(t.thirdPlace.status="ready")}t.twoBronze&&(e.index===0&&(t.twoBronze.loser1Id=d),e.index===1&&(t.twoBronze.loser2Id=d))}}function ga(t,e,s,r,i){t.thirdPlace&&(t.thirdPlace.winnerId=e,t.thirdPlace.score1=s,t.thirdPlace.score2=r,t.thirdPlace.resultType=i,t.thirdPlace.status="done")}function xa(t,e){if(t.thirdPlace&&t.thirdPlace.id===e){t.thirdPlace.winnerId=void 0,t.thirdPlace.score1=void 0,t.thirdPlace.score2=void 0,t.thirdPlace.resultType=void 0,t.thirdPlace.status=t.thirdPlace.p1.playerId&&t.thirdPlace.p2.playerId?"ready":"pending";return}for(const s of t.rounds){const r=s.matches.find(i=>i.id===e);if(r){ln(t,r.round,r.index),r.winnerId=void 0,r.score1=void 0,r.score2=void 0,r.resultType=void 0,r.status=r.p1.playerId&&r.p2.playerId?"ready":"pending";return}}}if(typeof window<"u"&&window.localStorage)try{localStorage.removeItem("tournax-store-v2"),localStorage.removeItem("tournax-store"),localStorage.removeItem("matmaster-store-v1")}catch{}function ds(t,e,s,r){let i="";e===null&&s!==null?i=`Under ${s}kg`:e!==null&&s===null?i=`Above ${e}kg`:e!==null&&s!==null?i=`${e}kg to ${s}kg`:i="Open Weight";const a=r?` [${r}]`:"";return`${t} ${i}${a}`.trim()}const Xt={name:"Championship Name",date:new Date().toISOString().split("T")[0],venue:"Location Name",organizer:"Tournament Organizer"},Je=Li()((t,e)=>({tournament:{...Xt},categories:[],updateTournament:s=>t(r=>({tournament:{...r.tournament,...s}})),addCategory:s=>{var c;const{categories:r}=e(),i=ds(s.ageGroup,s.weightMin,s.weightMax,s.gender),a=(c=s.name)!=null&&c.trim()?s.name.trim():i;if(r.some(d=>d.ageGroup.toLowerCase()===s.ageGroup.toLowerCase()&&d.weightMin===s.weightMin&&d.weightMax===s.weightMax&&d.gender===s.gender))return{error:"A category with the exact same age group, weight class, and gender already exists."};const l={id:M(),name:a,ageGroup:s.ageGroup,weightMin:s.weightMin,weightMax:s.weightMax,gender:s.gender||"Men / Boys",thirdPlaceMode:s.thirdPlaceMode||"bronze-match",players:[],fixture:null,createdAt:Date.now()};return t(d=>({categories:[...d.categories,l]})),l},updateCategory:(s,r)=>t(i=>({categories:i.categories.map(a=>{if(a.id!==s)return a;const o={...a,...r};return(r.ageGroup!==void 0||r.weightMin!==void 0||r.weightMax!==void 0||r.gender!==void 0)&&!r.name&&(o.name=ds(o.ageGroup,o.weightMin,o.weightMax,o.gender)),o})})),deleteCategory:s=>t(r=>({categories:r.categories.filter(i=>i.id!==s)})),duplicateCategory:s=>{const r=e().categories.find(a=>a.id===s);if(!r)return{error:"Category not found"};const i={...r,id:M(),name:`${r.name} (Copy)`,fixture:null,players:r.players.map(a=>({...a,id:M()})),createdAt:Date.now()};return t(a=>({categories:[...a.categories,i]})),i},addPlayer:(s,r)=>{var l,c;const i=e().categories.find(d=>d.id===s);if(!i)return{error:"Category not found"};if(i.fixture)return{error:"Cannot add players while fixture is active. Reset fixture first."};const a=r.name.trim();if(!a)return{error:"Player name is required."};const o={id:M(),name:a,club:((l=r.club)==null?void 0:l.trim())||void 0,weight:r.weight?Number(r.weight):void 0,dob:((c=r.dob)==null?void 0:c.trim())||void 0};return t(d=>({categories:d.categories.map(u=>u.id===s?{...u,players:[...u.players,o]}:u)})),{}},updatePlayer:(s,r,i)=>t(a=>({categories:a.categories.map(o=>o.id!==s||o.fixture?o:{...o,players:o.players.map(l=>l.id===r?{...l,...i}:l)})})),removePlayer:(s,r)=>t(i=>({categories:i.categories.map(a=>a.id!==s||a.fixture?a:{...a,players:a.players.filter(o=>o.id!==r)})})),bulkAddPlayers:(s,r,i)=>{const a=e().categories.find(l=>l.id===s);if(!a||a.fixture)return 0;const o=r.map(l=>l.trim()).filter(l=>l.length>0).map(l=>({id:M(),name:l,club:(i==null?void 0:i.trim())||void 0}));return o.length===0?0:(t(l=>({categories:l.categories.map(c=>c.id===s?{...c,players:[...c.players,...o]}:c)})),o.length)},importPlayers:(s,r)=>{const i=e().categories.find(o=>o.id===s);if(!i||i.fixture)return 0;const a=r.filter(o=>o.name&&o.name.trim()).map(o=>{var l,c;return{id:M(),name:o.name.trim(),club:(l=o.club)==null?void 0:l.trim(),weight:o.weight?Number(o.weight):void 0,dob:(c=o.dob)==null?void 0:c.trim()}});return a.length===0?0:(t(o=>({categories:o.categories.map(l=>l.id===s?{...l,players:[...l.players,...a]}:l)})),a.length)},generateCategoryFixture:s=>{const r=e().categories.find(a=>a.id===s);if(!r||r.players.length<2)return;const i=Jt(r.players,r.thirdPlaceMode);t(a=>({categories:a.categories.map(o=>o.id===s?{...o,fixture:i}:o)}))},toggleLockFixture:s=>t(r=>({categories:r.categories.map(i=>i.id!==s||!i.fixture?i:{...i,fixture:{...i.fixture,locked:!i.fixture.locked}})})),updateThirdPlaceMode:(s,r)=>t(i=>({categories:i.categories.map(a=>a.id!==s?a:{...a,thirdPlaceMode:r})})),recordMatchResult:(s,r,i,a,o,l)=>t(c=>({categories:c.categories.map(d=>{if(d.id!==s||!d.fixture)return d;const u=JSON.parse(JSON.stringify(d.fixture));if(u.thirdPlace&&u.thirdPlace.id===r)ga(u,i,a,o,l);else for(const h of u.rounds){const f=h.matches.find(m=>m.id===r);if(f){cn(u,f,i,a,o,l);break}}return{...d,fixture:u}})})),resetCategoryMatch:(s,r)=>t(i=>({categories:i.categories.map(a=>{if(a.id!==s||!a.fixture)return a;const o=JSON.parse(JSON.stringify(a.fixture));return xa(o,r),{...a,fixture:o}})})),resetCategoryFixture:s=>t(r=>({categories:r.categories.map(i=>i.id===s?{...i,fixture:null}:i)})),importState:s=>t({tournament:s.tournament||Xt,categories:s.categories||[]}),resetAllData:()=>t({tournament:{...Xt},categories:[]}),loadDemoData:()=>{const s=[{id:M(),name:"Aman Sehrawat",club:"Chhatrasal Stadium, Delhi",weight:57},{id:M(),name:"Ravi Kumar Dahiya",club:"Northern Railway",weight:57},{id:M(),name:"Udit Kumar",club:"Haryana Police",weight:57},{id:M(),name:"Shubham",club:"Services Sports Control",weight:56.8},{id:M(),name:"Rahul Rathi",club:"Delhi Wrestling Academy",weight:57},{id:M(),name:"Akash Dahiya",club:"Guru Hanuman Akhada",weight:56.5},{id:M(),name:"Vicky Chahar",club:"Punjab Police",weight:57},{id:M(),name:"Sumit Malik",club:"Railway Sports Board",weight:56.9},{id:M(),name:"Naveen Malik",club:"Air Force Sports",weight:57},{id:M(),name:"Deepak Punia",club:"Services",weight:57},{id:M(),name:"Praveen Chahar",club:"UP Police",weight:56.2}],r=[{id:M(),name:"Bajrang Punia",club:"Railways",weight:65},{id:M(),name:"Sujeet Kalkal",club:"Haryana",weight:65},{id:M(),name:"Rohit Singh",club:"Services",weight:65},{id:M(),name:"Vishal Kaliraman",club:"Army Sports",weight:64.8},{id:M(),name:"Anuj Kumar",club:"Delhi",weight:65},{id:M(),name:"Mohit Kumar",club:"Haryana Police",weight:64.9},{id:M(),name:"Sachin Mor",club:"CRPF",weight:65},{id:M(),name:"Sonu",club:"Chandigarh",weight:65}],i=Jt(s,"bronze-match"),a=Jt(r,"two-bronze"),o=[{id:M(),name:"U19 Under 57kg [Men / Boys]",ageGroup:"U19",weightMin:null,weightMax:57,gender:"Men / Boys",thirdPlaceMode:"bronze-match",players:s,fixture:i,createdAt:Date.now()-36e5*2},{id:M(),name:"U23 55kg to 65kg [Men / Boys]",ageGroup:"U23",weightMin:55,weightMax:65,gender:"Men / Boys",thirdPlaceMode:"two-bronze",players:r,fixture:a,createdAt:Date.now()-36e5},{id:M(),name:"U17 Under 50kg [Women / Girls]",ageGroup:"U17",weightMin:null,weightMax:50,gender:"Women / Girls",thirdPlaceMode:"bronze-match",players:[{id:M(),name:"Antim Panghal",club:"Hisar, Haryana",weight:49.5},{id:M(),name:"Priya Malik",club:"Nidani, Haryana",weight:50},{id:M(),name:"Komal",club:"Meerut, UP",weight:49},{id:M(),name:"Reetika Hooda",club:"Rohtak, Haryana",weight:50},{id:M(),name:"Savita Mor",club:"Delhi",weight:49.8}],fixture:null,createdAt:Date.now()}];t({tournament:{name:"Championship Name",date:new Date().toISOString().split("T")[0],venue:"Location Name",organizer:"Tournament Organizer"},categories:o})}}));function dn(t){var e,s,r="";if(typeof t=="string"||typeof t=="number")r+=t;else if(typeof t=="object")if(Array.isArray(t)){var i=t.length;for(e=0;e<i;e++)t[e]&&(s=dn(t[e]))&&(r&&(r+=" "),r+=s)}else for(s in t)t[s]&&(r&&(r+=" "),r+=s);return r}function ba(){for(var t,e,s=0,r="",i=arguments.length;s<i;s++)(t=arguments[s])&&(e=dn(t))&&(r&&(r+=" "),r+=e);return r}const Ss="-",wa=t=>{const e=ya(t),{conflictingClassGroups:s,conflictingClassGroupModifiers:r}=t;return{getClassGroupId:o=>{const l=o.split(Ss);return l[0]===""&&l.length!==1&&l.shift(),un(l,e)||va(o)},getConflictingClassGroupIds:(o,l)=>{const c=s[o]||[];return l&&r[o]?[...c,...r[o]]:c}}},un=(t,e)=>{var o;if(t.length===0)return e.classGroupId;const s=t[0],r=e.nextPart.get(s),i=r?un(t.slice(1),r):void 0;if(i)return i;if(e.validators.length===0)return;const a=t.join(Ss);return(o=e.validators.find(({validator:l})=>l(a)))==null?void 0:o.classGroupId},cr=/^\[(.+)\]$/,va=t=>{if(cr.test(t)){const e=cr.exec(t)[1],s=e==null?void 0:e.substring(0,e.indexOf(":"));if(s)return"arbitrary.."+s}},ya=t=>{const{theme:e,prefix:s}=t,r={nextPart:new Map,validators:[]};return Ia(Object.entries(t.classGroups),s).forEach(([a,o])=>{us(o,r,a,e)}),r},us=(t,e,s,r)=>{t.forEach(i=>{if(typeof i=="string"){const a=i===""?e:dr(e,i);a.classGroupId=s;return}if(typeof i=="function"){if(Na(i)){us(i(r),e,s,r);return}e.validators.push({validator:i,classGroupId:s});return}Object.entries(i).forEach(([a,o])=>{us(o,dr(e,a),s,r)})})},dr=(t,e)=>{let s=t;return e.split(Ss).forEach(r=>{s.nextPart.has(r)||s.nextPart.set(r,{nextPart:new Map,validators:[]}),s=s.nextPart.get(r)}),s},Na=t=>t.isThemeGetter,Ia=(t,e)=>e?t.map(([s,r])=>{const i=r.map(a=>typeof a=="string"?e+a:typeof a=="object"?Object.fromEntries(Object.entries(a).map(([o,l])=>[e+o,l])):a);return[s,i]}):t,ja=t=>{if(t<1)return{get:()=>{},set:()=>{}};let e=0,s=new Map,r=new Map;const i=(a,o)=>{s.set(a,o),e++,e>t&&(e=0,r=s,s=new Map)};return{get(a){let o=s.get(a);if(o!==void 0)return o;if((o=r.get(a))!==void 0)return i(a,o),o},set(a,o){s.has(a)?s.set(a,o):i(a,o)}}},hn="!",Sa=t=>{const{separator:e,experimentalParseClassName:s}=t,r=e.length===1,i=e[0],a=e.length,o=l=>{const c=[];let d=0,u=0,h;for(let p=0;p<l.length;p++){let I=l[p];if(d===0){if(I===i&&(r||l.slice(p,p+a)===e)){c.push(l.slice(u,p)),u=p+a;continue}if(I==="/"){h=p;continue}}I==="["?d++:I==="]"&&d--}const f=c.length===0?l:l.substring(u),m=f.startsWith(hn),g=m?f.substring(1):f,v=h&&h>u?h-u:void 0;return{modifiers:c,hasImportantModifier:m,baseClassName:g,maybePostfixModifierPosition:v}};return s?l=>s({className:l,parseClassName:o}):o},_a=t=>{if(t.length<=1)return t;const e=[];let s=[];return t.forEach(r=>{r[0]==="["?(e.push(...s.sort(),r),s=[]):s.push(r)}),e.push(...s.sort()),e},Ca=t=>({cache:ja(t.cacheSize),parseClassName:Sa(t),...wa(t)}),ka=/\s+/,Ta=(t,e)=>{const{parseClassName:s,getClassGroupId:r,getConflictingClassGroupIds:i}=e,a=[],o=t.trim().split(ka);let l="";for(let c=o.length-1;c>=0;c-=1){const d=o[c],{modifiers:u,hasImportantModifier:h,baseClassName:f,maybePostfixModifierPosition:m}=s(d);let g=!!m,v=r(g?f.substring(0,m):f);if(!v){if(!g){l=d+(l.length>0?" "+l:l);continue}if(v=r(f),!v){l=d+(l.length>0?" "+l:l);continue}g=!1}const p=_a(u).join(":"),I=h?p+hn:p,S=I+v;if(a.includes(S))continue;a.push(S);const x=i(v,g);for(let C=0;C<x.length;++C){const j=x[C];a.push(I+j)}l=d+(l.length>0?" "+l:l)}return l};function Ea(){let t=0,e,s,r="";for(;t<arguments.length;)(e=arguments[t++])&&(s=mn(e))&&(r&&(r+=" "),r+=s);return r}const mn=t=>{if(typeof t=="string")return t;let e,s="";for(let r=0;r<t.length;r++)t[r]&&(e=mn(t[r]))&&(s&&(s+=" "),s+=e);return s};function Pa(t,...e){let s,r,i,a=o;function o(c){const d=e.reduce((u,h)=>h(u),t());return s=Ca(d),r=s.cache.get,i=s.cache.set,a=l,l(c)}function l(c){const d=r(c);if(d)return d;const u=Ta(c,s);return i(c,u),u}return function(){return a(Ea.apply(null,arguments))}}const z=t=>{const e=s=>s[t]||[];return e.isThemeGetter=!0,e},fn=/^\[(?:([a-z-]+):)?(.+)\]$/i,Aa=/^\d+\/\d+$/,Ra=new Set(["px","full","screen"]),Ma=/^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/,La=/\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/,Oa=/^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/,Fa=/^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/,Da=/^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/,ue=t=>Ge(t)||Ra.has(t)||Aa.test(t),Ne=t=>Xe(t,"length",Ha),Ge=t=>!!t&&!Number.isNaN(Number(t)),Zt=t=>Xe(t,"number",Ge),nt=t=>!!t&&Number.isInteger(Number(t)),Ba=t=>t.endsWith("%")&&Ge(t.slice(0,-1)),R=t=>fn.test(t),Ie=t=>Ma.test(t),Ua=new Set(["length","size","percentage"]),$a=t=>Xe(t,Ua,pn),za=t=>Xe(t,"position",pn),Wa=new Set(["image","url"]),Va=t=>Xe(t,Wa,Ka),Ga=t=>Xe(t,"",qa),it=()=>!0,Xe=(t,e,s)=>{const r=fn.exec(t);return r?r[1]?typeof e=="string"?r[1]===e:e.has(r[1]):s(r[2]):!1},Ha=t=>La.test(t)&&!Oa.test(t),pn=()=>!1,qa=t=>Fa.test(t),Ka=t=>Da.test(t),Qa=()=>{const t=z("colors"),e=z("spacing"),s=z("blur"),r=z("brightness"),i=z("borderColor"),a=z("borderRadius"),o=z("borderSpacing"),l=z("borderWidth"),c=z("contrast"),d=z("grayscale"),u=z("hueRotate"),h=z("invert"),f=z("gap"),m=z("gradientColorStops"),g=z("gradientColorStopPositions"),v=z("inset"),p=z("margin"),I=z("opacity"),S=z("padding"),x=z("saturate"),C=z("scale"),j=z("sepia"),P=z("skew"),N=z("space"),A=z("translate"),_=()=>["auto","contain","none"],b=()=>["auto","hidden","clip","visible","scroll"],y=()=>["auto",R,e],k=()=>[R,e],G=()=>["",ue,Ne],K=()=>["auto",Ge,R],F=()=>["bottom","center","left","left-bottom","left-top","right","right-bottom","right-top","top"],se=()=>["solid","dashed","dotted","double","none"],Pe=()=>["normal","multiply","screen","overlay","darken","lighten","color-dodge","color-burn","hard-light","soft-light","difference","exclusion","hue","saturation","color","luminosity"],O=()=>["start","end","center","between","around","evenly","stretch"],$=()=>["","0",R],B=()=>["auto","avoid","all","avoid-page","page","left","right","column"],W=()=>[Ge,R];return{cacheSize:500,separator:":",theme:{colors:[it],spacing:[ue,Ne],blur:["none","",Ie,R],brightness:W(),borderColor:[t],borderRadius:["none","","full",Ie,R],borderSpacing:k(),borderWidth:G(),contrast:W(),grayscale:$(),hueRotate:W(),invert:$(),gap:k(),gradientColorStops:[t],gradientColorStopPositions:[Ba,Ne],inset:y(),margin:y(),opacity:W(),padding:k(),saturate:W(),scale:W(),sepia:$(),skew:W(),space:k(),translate:k()},classGroups:{aspect:[{aspect:["auto","square","video",R]}],container:["container"],columns:[{columns:[Ie]}],"break-after":[{"break-after":B()}],"break-before":[{"break-before":B()}],"break-inside":[{"break-inside":["auto","avoid","avoid-page","avoid-column"]}],"box-decoration":[{"box-decoration":["slice","clone"]}],box:[{box:["border","content"]}],display:["block","inline-block","inline","flex","inline-flex","table","inline-table","table-caption","table-cell","table-column","table-column-group","table-footer-group","table-header-group","table-row-group","table-row","flow-root","grid","inline-grid","contents","list-item","hidden"],float:[{float:["right","left","none","start","end"]}],clear:[{clear:["left","right","both","none","start","end"]}],isolation:["isolate","isolation-auto"],"object-fit":[{object:["contain","cover","fill","none","scale-down"]}],"object-position":[{object:[...F(),R]}],overflow:[{overflow:b()}],"overflow-x":[{"overflow-x":b()}],"overflow-y":[{"overflow-y":b()}],overscroll:[{overscroll:_()}],"overscroll-x":[{"overscroll-x":_()}],"overscroll-y":[{"overscroll-y":_()}],position:["static","fixed","absolute","relative","sticky"],inset:[{inset:[v]}],"inset-x":[{"inset-x":[v]}],"inset-y":[{"inset-y":[v]}],start:[{start:[v]}],end:[{end:[v]}],top:[{top:[v]}],right:[{right:[v]}],bottom:[{bottom:[v]}],left:[{left:[v]}],visibility:["visible","invisible","collapse"],z:[{z:["auto",nt,R]}],basis:[{basis:y()}],"flex-direction":[{flex:["row","row-reverse","col","col-reverse"]}],"flex-wrap":[{flex:["wrap","wrap-reverse","nowrap"]}],flex:[{flex:["1","auto","initial","none",R]}],grow:[{grow:$()}],shrink:[{shrink:$()}],order:[{order:["first","last","none",nt,R]}],"grid-cols":[{"grid-cols":[it]}],"col-start-end":[{col:["auto",{span:["full",nt,R]},R]}],"col-start":[{"col-start":K()}],"col-end":[{"col-end":K()}],"grid-rows":[{"grid-rows":[it]}],"row-start-end":[{row:["auto",{span:[nt,R]},R]}],"row-start":[{"row-start":K()}],"row-end":[{"row-end":K()}],"grid-flow":[{"grid-flow":["row","col","dense","row-dense","col-dense"]}],"auto-cols":[{"auto-cols":["auto","min","max","fr",R]}],"auto-rows":[{"auto-rows":["auto","min","max","fr",R]}],gap:[{gap:[f]}],"gap-x":[{"gap-x":[f]}],"gap-y":[{"gap-y":[f]}],"justify-content":[{justify:["normal",...O()]}],"justify-items":[{"justify-items":["start","end","center","stretch"]}],"justify-self":[{"justify-self":["auto","start","end","center","stretch"]}],"align-content":[{content:["normal",...O(),"baseline"]}],"align-items":[{items:["start","end","center","baseline","stretch"]}],"align-self":[{self:["auto","start","end","center","stretch","baseline"]}],"place-content":[{"place-content":[...O(),"baseline"]}],"place-items":[{"place-items":["start","end","center","baseline","stretch"]}],"place-self":[{"place-self":["auto","start","end","center","stretch"]}],p:[{p:[S]}],px:[{px:[S]}],py:[{py:[S]}],ps:[{ps:[S]}],pe:[{pe:[S]}],pt:[{pt:[S]}],pr:[{pr:[S]}],pb:[{pb:[S]}],pl:[{pl:[S]}],m:[{m:[p]}],mx:[{mx:[p]}],my:[{my:[p]}],ms:[{ms:[p]}],me:[{me:[p]}],mt:[{mt:[p]}],mr:[{mr:[p]}],mb:[{mb:[p]}],ml:[{ml:[p]}],"space-x":[{"space-x":[N]}],"space-x-reverse":["space-x-reverse"],"space-y":[{"space-y":[N]}],"space-y-reverse":["space-y-reverse"],w:[{w:["auto","min","max","fit","svw","lvw","dvw",R,e]}],"min-w":[{"min-w":[R,e,"min","max","fit"]}],"max-w":[{"max-w":[R,e,"none","full","min","max","fit","prose",{screen:[Ie]},Ie]}],h:[{h:[R,e,"auto","min","max","fit","svh","lvh","dvh"]}],"min-h":[{"min-h":[R,e,"min","max","fit","svh","lvh","dvh"]}],"max-h":[{"max-h":[R,e,"min","max","fit","svh","lvh","dvh"]}],size:[{size:[R,e,"auto","min","max","fit"]}],"font-size":[{text:["base",Ie,Ne]}],"font-smoothing":["antialiased","subpixel-antialiased"],"font-style":["italic","not-italic"],"font-weight":[{font:["thin","extralight","light","normal","medium","semibold","bold","extrabold","black",Zt]}],"font-family":[{font:[it]}],"fvn-normal":["normal-nums"],"fvn-ordinal":["ordinal"],"fvn-slashed-zero":["slashed-zero"],"fvn-figure":["lining-nums","oldstyle-nums"],"fvn-spacing":["proportional-nums","tabular-nums"],"fvn-fraction":["diagonal-fractions","stacked-fractions"],tracking:[{tracking:["tighter","tight","normal","wide","wider","widest",R]}],"line-clamp":[{"line-clamp":["none",Ge,Zt]}],leading:[{leading:["none","tight","snug","normal","relaxed","loose",ue,R]}],"list-image":[{"list-image":["none",R]}],"list-style-type":[{list:["none","disc","decimal",R]}],"list-style-position":[{list:["inside","outside"]}],"placeholder-color":[{placeholder:[t]}],"placeholder-opacity":[{"placeholder-opacity":[I]}],"text-alignment":[{text:["left","center","right","justify","start","end"]}],"text-color":[{text:[t]}],"text-opacity":[{"text-opacity":[I]}],"text-decoration":["underline","overline","line-through","no-underline"],"text-decoration-style":[{decoration:[...se(),"wavy"]}],"text-decoration-thickness":[{decoration:["auto","from-font",ue,Ne]}],"underline-offset":[{"underline-offset":["auto",ue,R]}],"text-decoration-color":[{decoration:[t]}],"text-transform":["uppercase","lowercase","capitalize","normal-case"],"text-overflow":["truncate","text-ellipsis","text-clip"],"text-wrap":[{text:["wrap","nowrap","balance","pretty"]}],indent:[{indent:k()}],"vertical-align":[{align:["baseline","top","middle","bottom","text-top","text-bottom","sub","super",R]}],whitespace:[{whitespace:["normal","nowrap","pre","pre-line","pre-wrap","break-spaces"]}],break:[{break:["normal","words","all","keep"]}],hyphens:[{hyphens:["none","manual","auto"]}],content:[{content:["none",R]}],"bg-attachment":[{bg:["fixed","local","scroll"]}],"bg-clip":[{"bg-clip":["border","padding","content","text"]}],"bg-opacity":[{"bg-opacity":[I]}],"bg-origin":[{"bg-origin":["border","padding","content"]}],"bg-position":[{bg:[...F(),za]}],"bg-repeat":[{bg:["no-repeat",{repeat:["","x","y","round","space"]}]}],"bg-size":[{bg:["auto","cover","contain",$a]}],"bg-image":[{bg:["none",{"gradient-to":["t","tr","r","br","b","bl","l","tl"]},Va]}],"bg-color":[{bg:[t]}],"gradient-from-pos":[{from:[g]}],"gradient-via-pos":[{via:[g]}],"gradient-to-pos":[{to:[g]}],"gradient-from":[{from:[m]}],"gradient-via":[{via:[m]}],"gradient-to":[{to:[m]}],rounded:[{rounded:[a]}],"rounded-s":[{"rounded-s":[a]}],"rounded-e":[{"rounded-e":[a]}],"rounded-t":[{"rounded-t":[a]}],"rounded-r":[{"rounded-r":[a]}],"rounded-b":[{"rounded-b":[a]}],"rounded-l":[{"rounded-l":[a]}],"rounded-ss":[{"rounded-ss":[a]}],"rounded-se":[{"rounded-se":[a]}],"rounded-ee":[{"rounded-ee":[a]}],"rounded-es":[{"rounded-es":[a]}],"rounded-tl":[{"rounded-tl":[a]}],"rounded-tr":[{"rounded-tr":[a]}],"rounded-br":[{"rounded-br":[a]}],"rounded-bl":[{"rounded-bl":[a]}],"border-w":[{border:[l]}],"border-w-x":[{"border-x":[l]}],"border-w-y":[{"border-y":[l]}],"border-w-s":[{"border-s":[l]}],"border-w-e":[{"border-e":[l]}],"border-w-t":[{"border-t":[l]}],"border-w-r":[{"border-r":[l]}],"border-w-b":[{"border-b":[l]}],"border-w-l":[{"border-l":[l]}],"border-opacity":[{"border-opacity":[I]}],"border-style":[{border:[...se(),"hidden"]}],"divide-x":[{"divide-x":[l]}],"divide-x-reverse":["divide-x-reverse"],"divide-y":[{"divide-y":[l]}],"divide-y-reverse":["divide-y-reverse"],"divide-opacity":[{"divide-opacity":[I]}],"divide-style":[{divide:se()}],"border-color":[{border:[i]}],"border-color-x":[{"border-x":[i]}],"border-color-y":[{"border-y":[i]}],"border-color-s":[{"border-s":[i]}],"border-color-e":[{"border-e":[i]}],"border-color-t":[{"border-t":[i]}],"border-color-r":[{"border-r":[i]}],"border-color-b":[{"border-b":[i]}],"border-color-l":[{"border-l":[i]}],"divide-color":[{divide:[i]}],"outline-style":[{outline:["",...se()]}],"outline-offset":[{"outline-offset":[ue,R]}],"outline-w":[{outline:[ue,Ne]}],"outline-color":[{outline:[t]}],"ring-w":[{ring:G()}],"ring-w-inset":["ring-inset"],"ring-color":[{ring:[t]}],"ring-opacity":[{"ring-opacity":[I]}],"ring-offset-w":[{"ring-offset":[ue,Ne]}],"ring-offset-color":[{"ring-offset":[t]}],shadow:[{shadow:["","inner","none",Ie,Ga]}],"shadow-color":[{shadow:[it]}],opacity:[{opacity:[I]}],"mix-blend":[{"mix-blend":[...Pe(),"plus-lighter","plus-darker"]}],"bg-blend":[{"bg-blend":Pe()}],filter:[{filter:["","none"]}],blur:[{blur:[s]}],brightness:[{brightness:[r]}],contrast:[{contrast:[c]}],"drop-shadow":[{"drop-shadow":["","none",Ie,R]}],grayscale:[{grayscale:[d]}],"hue-rotate":[{"hue-rotate":[u]}],invert:[{invert:[h]}],saturate:[{saturate:[x]}],sepia:[{sepia:[j]}],"backdrop-filter":[{"backdrop-filter":["","none"]}],"backdrop-blur":[{"backdrop-blur":[s]}],"backdrop-brightness":[{"backdrop-brightness":[r]}],"backdrop-contrast":[{"backdrop-contrast":[c]}],"backdrop-grayscale":[{"backdrop-grayscale":[d]}],"backdrop-hue-rotate":[{"backdrop-hue-rotate":[u]}],"backdrop-invert":[{"backdrop-invert":[h]}],"backdrop-opacity":[{"backdrop-opacity":[I]}],"backdrop-saturate":[{"backdrop-saturate":[x]}],"backdrop-sepia":[{"backdrop-sepia":[j]}],"border-collapse":[{border:["collapse","separate"]}],"border-spacing":[{"border-spacing":[o]}],"border-spacing-x":[{"border-spacing-x":[o]}],"border-spacing-y":[{"border-spacing-y":[o]}],"table-layout":[{table:["auto","fixed"]}],caption:[{caption:["top","bottom"]}],transition:[{transition:["none","all","","colors","opacity","shadow","transform",R]}],duration:[{duration:W()}],ease:[{ease:["linear","in","out","in-out",R]}],delay:[{delay:W()}],animate:[{animate:["none","spin","ping","pulse","bounce",R]}],transform:[{transform:["","gpu","none"]}],scale:[{scale:[C]}],"scale-x":[{"scale-x":[C]}],"scale-y":[{"scale-y":[C]}],rotate:[{rotate:[nt,R]}],"translate-x":[{"translate-x":[A]}],"translate-y":[{"translate-y":[A]}],"skew-x":[{"skew-x":[P]}],"skew-y":[{"skew-y":[P]}],"transform-origin":[{origin:["center","top","top-right","right","bottom-right","bottom","bottom-left","left","top-left",R]}],accent:[{accent:["auto",t]}],appearance:[{appearance:["none","auto"]}],cursor:[{cursor:["auto","default","pointer","wait","text","move","help","not-allowed","none","context-menu","progress","cell","crosshair","vertical-text","alias","copy","no-drop","grab","grabbing","all-scroll","col-resize","row-resize","n-resize","e-resize","s-resize","w-resize","ne-resize","nw-resize","se-resize","sw-resize","ew-resize","ns-resize","nesw-resize","nwse-resize","zoom-in","zoom-out",R]}],"caret-color":[{caret:[t]}],"pointer-events":[{"pointer-events":["none","auto"]}],resize:[{resize:["none","y","x",""]}],"scroll-behavior":[{scroll:["auto","smooth"]}],"scroll-m":[{"scroll-m":k()}],"scroll-mx":[{"scroll-mx":k()}],"scroll-my":[{"scroll-my":k()}],"scroll-ms":[{"scroll-ms":k()}],"scroll-me":[{"scroll-me":k()}],"scroll-mt":[{"scroll-mt":k()}],"scroll-mr":[{"scroll-mr":k()}],"scroll-mb":[{"scroll-mb":k()}],"scroll-ml":[{"scroll-ml":k()}],"scroll-p":[{"scroll-p":k()}],"scroll-px":[{"scroll-px":k()}],"scroll-py":[{"scroll-py":k()}],"scroll-ps":[{"scroll-ps":k()}],"scroll-pe":[{"scroll-pe":k()}],"scroll-pt":[{"scroll-pt":k()}],"scroll-pr":[{"scroll-pr":k()}],"scroll-pb":[{"scroll-pb":k()}],"scroll-pl":[{"scroll-pl":k()}],"snap-align":[{snap:["start","end","center","align-none"]}],"snap-stop":[{snap:["normal","always"]}],"snap-type":[{snap:["none","x","y","both"]}],"snap-strictness":[{snap:["mandatory","proximity"]}],touch:[{touch:["auto","none","manipulation"]}],"touch-x":[{"touch-pan":["x","left","right"]}],"touch-y":[{"touch-pan":["y","up","down"]}],"touch-pz":["touch-pinch-zoom"],select:[{select:["none","text","all","auto"]}],"will-change":[{"will-change":["auto","scroll","contents","transform",R]}],fill:[{fill:[t,"none"]}],"stroke-w":[{stroke:[ue,Ne,Zt]}],stroke:[{stroke:[t,"none"]}],sr:["sr-only","not-sr-only"],"forced-color-adjust":[{"forced-color-adjust":["auto","none"]}]},conflictingClassGroups:{overflow:["overflow-x","overflow-y"],overscroll:["overscroll-x","overscroll-y"],inset:["inset-x","inset-y","start","end","top","right","bottom","left"],"inset-x":["right","left"],"inset-y":["top","bottom"],flex:["basis","grow","shrink"],gap:["gap-x","gap-y"],p:["px","py","ps","pe","pt","pr","pb","pl"],px:["pr","pl"],py:["pt","pb"],m:["mx","my","ms","me","mt","mr","mb","ml"],mx:["mr","ml"],my:["mt","mb"],size:["w","h"],"font-size":["leading"],"fvn-normal":["fvn-ordinal","fvn-slashed-zero","fvn-figure","fvn-spacing","fvn-fraction"],"fvn-ordinal":["fvn-normal"],"fvn-slashed-zero":["fvn-normal"],"fvn-figure":["fvn-normal"],"fvn-spacing":["fvn-normal"],"fvn-fraction":["fvn-normal"],"line-clamp":["display","overflow"],rounded:["rounded-s","rounded-e","rounded-t","rounded-r","rounded-b","rounded-l","rounded-ss","rounded-se","rounded-ee","rounded-es","rounded-tl","rounded-tr","rounded-br","rounded-bl"],"rounded-s":["rounded-ss","rounded-es"],"rounded-e":["rounded-se","rounded-ee"],"rounded-t":["rounded-tl","rounded-tr"],"rounded-r":["rounded-tr","rounded-br"],"rounded-b":["rounded-br","rounded-bl"],"rounded-l":["rounded-tl","rounded-bl"],"border-spacing":["border-spacing-x","border-spacing-y"],"border-w":["border-w-s","border-w-e","border-w-t","border-w-r","border-w-b","border-w-l"],"border-w-x":["border-w-r","border-w-l"],"border-w-y":["border-w-t","border-w-b"],"border-color":["border-color-s","border-color-e","border-color-t","border-color-r","border-color-b","border-color-l"],"border-color-x":["border-color-r","border-color-l"],"border-color-y":["border-color-t","border-color-b"],"scroll-m":["scroll-mx","scroll-my","scroll-ms","scroll-me","scroll-mt","scroll-mr","scroll-mb","scroll-ml"],"scroll-mx":["scroll-mr","scroll-ml"],"scroll-my":["scroll-mt","scroll-mb"],"scroll-p":["scroll-px","scroll-py","scroll-ps","scroll-pe","scroll-pt","scroll-pr","scroll-pb","scroll-pl"],"scroll-px":["scroll-pr","scroll-pl"],"scroll-py":["scroll-pt","scroll-pb"],touch:["touch-x","touch-y","touch-pz"],"touch-x":["touch"],"touch-y":["touch"],"touch-pz":["touch"]},conflictingClassGroupModifiers:{"font-size":["leading"]}}},Ya=Pa(Qa);function Q(...t){return Ya(ba(t))}function Vt(t){if(!t)return"";try{return new Date(t).toLocaleDateString("en-US",{year:"numeric",month:"short",day:"numeric"})}catch{return t}}const gn=[{value:"points",label:"Points Decision",code:"PTS",description:"Won by points at match completion"},{value:"tech",label:"Technical Superiority / Gap",code:"TECH",description:"Point difference or dominance limit reached"},{value:"fall",label:"Stoppage / Knockout / Pin",code:"STOP",description:"Match-ending decisive finish"},{value:"walkover",label:"Walkover / Forfeit",code:"W/O",description:"Opponent conceded or did not contest"},{value:"dq",label:"Disqualification",code:"DSQ",description:"Disqualified for violation or penalties"}],$e=({isOpen:t,onClose:e,title:s,subtitle:r,children:i,footer:a,maxWidth:o="md"})=>{if(w.useEffect(()=>{const c=d=>{d.key==="Escape"&&e()};return t&&(document.body.style.overflow="hidden",window.addEventListener("keydown",c)),()=>{document.body.style.overflow="",window.removeEventListener("keydown",c)}},[t,e]),!t)return null;const l={sm:"max-w-sm",md:"max-w-md",lg:"max-w-lg",xl:"max-w-xl","2xl":"max-w-2xl"};return n.jsxs("div",{className:"fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto",children:[n.jsx("div",{className:"fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity animate-in fade-in",onClick:e,"aria-hidden":"true"}),n.jsxs("div",{className:Q("relative w-full rounded-2xl bg-white shadow-2xl border border-slate-200 z-10 overflow-hidden transform transition-all",l[o]),role:"dialog","aria-modal":"true",children:[(s||r)&&n.jsxs("div",{className:"flex items-start justify-between border-b border-slate-100 px-6 py-4 bg-slate-50/50",children:[n.jsxs("div",{children:[s&&n.jsx("h3",{className:"text-lg font-bold text-slate-900 leading-tight",children:s}),r&&n.jsx("p",{className:"text-xs text-slate-500 mt-0.5",children:r})]}),n.jsx("button",{onClick:e,className:"rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors","aria-label":"Close dialog",children:n.jsx(Di,{className:"h-5 w-5"})})]}),n.jsx("div",{className:"px-6 py-5 max-h-[calc(85vh-120px)] overflow-y-auto",children:i}),a&&n.jsx("div",{className:"flex items-center justify-end gap-3 border-t border-slate-100 bg-slate-50 px-6 py-3.5",children:a})]})]})},L=Ut.forwardRef(({className:t,variant:e="primary",size:s="md",icon:r,children:i,disabled:a,...o},l)=>{const c="inline-flex items-center justify-center font-medium transition-all duration-150 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none shadow-sm",d={primary:"bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white focus:ring-blue-500 shadow-blue-500/20",secondary:"bg-slate-800 hover:bg-slate-900 active:bg-black text-white focus:ring-slate-700",danger:"bg-rose-600 hover:bg-rose-700 active:bg-rose-800 text-white focus:ring-rose-500 shadow-rose-500/20",outline:"bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 focus:ring-slate-400",ghost:"bg-transparent hover:bg-slate-100 text-slate-700 shadow-none border-transparent",gold:"bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-slate-950 font-semibold focus:ring-amber-400 shadow-amber-500/25"},u={sm:"px-2.5 py-1.5 text-xs gap-1.5",md:"px-3.5 py-2 text-sm gap-2",lg:"px-5 py-2.5 text-base gap-2.5"};return n.jsxs("button",{ref:l,className:Q(c,d[e],u[s],t),disabled:a,...o,children:[r&&n.jsx("span",{className:"shrink-0",children:r}),i]})});L.displayName="Button";const Ja=({isOpen:t,onClose:e,tournament:s,onSave:r})=>{const[i,a]=w.useState(s.name),[o,l]=w.useState(s.date),[c,d]=w.useState(s.venue),[u,h]=w.useState(s.organizer||"");w.useEffect(()=>{t&&(a(s.name),l(s.date),d(s.venue),h(s.organizer||""))},[t,s]);const f=m=>{m.preventDefault(),r({name:i.trim()||"Championship Name",date:o,venue:c.trim()||"Location Name",organizer:u.trim()}),e()};return n.jsx($e,{isOpen:t,onClose:e,title:"Edit Tournament Details",subtitle:"Configure title, scheduled date, location, and organizing body",maxWidth:"lg",footer:n.jsxs(n.Fragment,{children:[n.jsx(L,{variant:"outline",size:"md",onClick:e,type:"button",children:"Cancel"}),n.jsx(L,{variant:"primary",size:"md",onClick:f,type:"button",children:"Save Tournament Details"})]}),children:n.jsxs("form",{onSubmit:f,className:"space-y-5 py-1",children:[n.jsxs("div",{className:"rounded-xl border border-amber-300 bg-amber-50 p-3 text-xs text-amber-900 flex items-start gap-2.5",children:[n.jsx($t,{className:"h-4 w-4 text-amber-600 shrink-0 mt-0.5"}),n.jsxs("div",{children:[n.jsx("span",{className:"font-bold",children:"Active Session Note:"})," TournaX operates within this browser tab session. Refreshing the page, opening a new tab, or switching devices/IPs will reset all data to default values."]})]}),n.jsxs("div",{className:"rounded-2xl bg-gradient-to-br from-slate-900 via-slate-850 to-slate-900 p-4 sm:p-5 text-white border border-slate-700/80 shadow-md",children:[n.jsxs("div",{className:"flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-amber-400 mb-2",children:[n.jsx(Bi,{className:"h-3.5 w-3.5"}),n.jsx("span",{children:"Header Tile Live Preview"})]}),n.jsx("div",{className:"flex flex-col sm:flex-row sm:items-center justify-between gap-3",children:n.jsxs("div",{className:"min-w-0",children:[n.jsx("h4",{className:"text-lg sm:text-xl font-extrabold text-white tracking-tight truncate",children:i.trim()||"Championship Name"}),n.jsxs("div",{className:"flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-slate-300 mt-1.5 font-medium",children:[o&&n.jsxs("span",{className:"flex items-center gap-1.5 bg-slate-800/80 px-2.5 py-1 rounded-lg border border-slate-700/60",children:[n.jsx(ct,{className:"h-3.5 w-3.5 text-amber-400"}),Vt(o)]}),n.jsxs("span",{className:"flex items-center gap-1.5 bg-slate-800/80 px-2.5 py-1 rounded-lg border border-slate-700/60",children:[n.jsx(Et,{className:"h-3.5 w-3.5 text-blue-400"}),c||"Location Name"]}),u&&n.jsxs("span",{className:"flex items-center gap-1.5 bg-slate-800/80 px-2.5 py-1 rounded-lg border border-slate-700/60",children:[n.jsx(Zs,{className:"h-3.5 w-3.5 text-emerald-400"}),u]})]})]})})]}),n.jsxs("div",{className:"space-y-4",children:[n.jsxs("div",{children:[n.jsxs("label",{className:"block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5",children:["Championship / Tournament Name ",n.jsx("span",{className:"text-rose-500",children:"*"})]}),n.jsxs("div",{className:"relative",children:[n.jsx("div",{className:"pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400",children:n.jsx(zt,{className:"h-5 w-5 text-amber-500"})}),n.jsx("input",{type:"text",value:i,onChange:m=>a(m.target.value),required:!0,placeholder:"Championship Name",className:"block w-full rounded-xl border border-slate-300 bg-white pl-11 pr-4 py-2.5 text-base font-semibold text-slate-900 placeholder-slate-400 shadow-xs focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"})]})]}),n.jsxs("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-4",children:[n.jsxs("div",{children:[n.jsx("label",{className:"block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5",children:"Tournament Date"}),n.jsxs("div",{className:"relative",children:[n.jsx("div",{className:"pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400",children:n.jsx(ct,{className:"h-4 w-4 text-slate-400"})}),n.jsx("input",{type:"date",value:o,onChange:m=>l(m.target.value),className:"block w-full rounded-xl border border-slate-300 bg-white pl-10 pr-3 py-2.5 text-sm font-medium text-slate-900 shadow-xs focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"})]})]}),n.jsxs("div",{children:[n.jsx("label",{className:"block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5",children:"Organizer / Federation"}),n.jsxs("div",{className:"relative",children:[n.jsx("div",{className:"pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400",children:n.jsx(Zs,{className:"h-4 w-4 text-slate-400"})}),n.jsx("input",{type:"text",value:u,onChange:m=>h(m.target.value),placeholder:"e.g. State Sports Association",className:"block w-full rounded-xl border border-slate-300 bg-white pl-10 pr-3 py-2.5 text-sm font-medium text-slate-900 placeholder-slate-400 shadow-xs focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"})]})]})]}),n.jsxs("div",{children:[n.jsxs("label",{className:"block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5",children:["Location Name / Venue ",n.jsx("span",{className:"text-rose-500",children:"*"})]}),n.jsxs("div",{className:"relative",children:[n.jsx("div",{className:"pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400",children:n.jsx(Et,{className:"h-4 w-4 text-slate-400"})}),n.jsx("input",{type:"text",value:c,onChange:m=>d(m.target.value),placeholder:"Location Name",className:"block w-full rounded-xl border border-slate-300 bg-white pl-10 pr-3 py-2.5 text-sm font-medium text-slate-900 placeholder-slate-400 shadow-xs focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"})]})]})]})]})})},Xa=()=>{const{tournament:t,updateTournament:e}=Je(),[s,r]=w.useState(!1);return n.jsxs(n.Fragment,{children:[n.jsx("header",{className:"sticky top-0 z-40 bg-slate-900 text-white shadow-xl border-b border-slate-800/80 print:hidden",children:n.jsx("div",{className:"max-w-7xl mx-auto px-3 sm:px-6 lg:px-8",children:n.jsxs("div",{className:"flex flex-col md:flex-row md:items-center justify-between py-2 sm:py-3 gap-2.5 sm:gap-4",children:[n.jsx("div",{className:"flex items-center shrink-0",children:n.jsxs(Qe,{to:"/",className:"flex items-center gap-2.5 sm:gap-3 group shrink-0",title:"TournaX",children:[n.jsxs("div",{className:"relative",children:[n.jsx("img",{src:"/logo.jpg",alt:"TournaX Logo",className:"h-9 w-9 sm:h-12 sm:w-12 rounded-xl object-cover ring-2 ring-amber-400/40 shadow-md group-hover:scale-105 transition-transform"}),n.jsx("div",{className:"absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-emerald-500 ring-2 ring-slate-900"})]}),n.jsxs("div",{children:[n.jsx("span",{className:"text-lg sm:text-2xl font-black tracking-tight text-white group-hover:text-amber-400 transition-colors font-sans block leading-none",children:"TournaX"}),n.jsx("span",{className:"text-[9px] sm:text-[11px] uppercase font-bold tracking-widest text-amber-400/90 block mt-1",children:"Fixture Planner"})]})]})}),n.jsx("div",{onClick:()=>r(!0),className:"group relative flex-1 w-full md:max-w-2xl lg:max-w-3xl rounded-2xl bg-slate-850 hover:bg-slate-800/95 px-3.5 sm:px-5 py-2 sm:py-2.5 transition-all cursor-pointer shadow-inner md:ml-6 active:scale-[0.99] touch-manipulation border-none",title:"Click to edit tournament name, date, location",children:n.jsxs("div",{className:"flex items-center justify-between gap-2.5 sm:gap-3",children:[n.jsxs("div",{className:"min-w-0 flex-1",children:[n.jsx("div",{className:"flex items-center gap-2",children:n.jsx("h1",{className:"text-sm sm:text-lg lg:text-xl font-extrabold text-white tracking-tight truncate group-hover:text-amber-300 transition-colors",children:t.name||"Championship Name"})}),n.jsxs("div",{className:"mt-0.5 sm:mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-300",children:[t.date&&n.jsxs("span",{className:"flex items-center gap-1.5 font-medium",children:[n.jsx(ct,{className:"h-3.5 w-3.5 text-amber-400 shrink-0"}),n.jsx("span",{children:Vt(t.date)})]}),n.jsxs("span",{className:"flex items-center gap-1.5 font-medium truncate max-w-xs sm:max-w-md",children:[n.jsx(Et,{className:"h-3.5 w-3.5 text-blue-400 shrink-0"}),n.jsx("span",{className:"truncate",children:t.venue||"Location Name"})]})]})]}),n.jsx("div",{className:"shrink-0 flex items-center",children:n.jsx("div",{className:"p-1.5 sm:p-2 rounded-xl text-slate-400 group-hover:text-amber-400 group-hover:bg-slate-750 transition-colors",title:"Edit Tournament",children:n.jsx(tn,{className:"h-4 w-4 sm:h-4.5 sm:w-4.5"})})})]})})]})})}),n.jsx(Ja,{isOpen:s,onClose:()=>r(!1),tournament:t,onSave:e})]})},Za=({isOpen:t,onClose:e})=>{const[s,r]=w.useState(!1),[i,a]=w.useState(!1);if(!t)return null;const o=()=>{if(!s){a(!0);return}e()};return n.jsxs("div",{className:"fixed inset-0 z-50 flex items-center justify-center p-3.5 sm:p-5 overflow-y-auto",children:[n.jsx("div",{className:"fixed inset-0 bg-slate-950/85 backdrop-blur-md transition-opacity animate-in fade-in","aria-hidden":"true"}),n.jsxs("div",{className:"relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200/90 flex flex-col overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-200",role:"dialog","aria-modal":"true",children:[n.jsxs("div",{className:"bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 px-5 py-3.5 text-white flex items-center justify-between border-b border-slate-800",children:[n.jsxs("div",{className:"flex items-center gap-3",children:[n.jsxs("div",{className:"relative",children:[n.jsx("img",{src:"/logo.jpg",alt:"TournaX",className:"h-9 w-9 rounded-xl object-cover ring-2 ring-amber-400/50 shadow-md"}),n.jsx("div",{className:"absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-slate-900"})]}),n.jsxs("div",{children:[n.jsx("span",{className:"text-xl font-black tracking-tight text-white leading-none",children:"TournaX"}),n.jsx("p",{className:"text-[10px] text-amber-300 font-bold uppercase tracking-wider mt-0.5",children:"Session Advisory"})]})]}),n.jsxs("div",{className:"flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-400/15 border border-amber-400/30 text-amber-300 text-xs font-bold",children:[n.jsx($t,{className:"h-3.5 w-3.5"}),n.jsx("span",{children:"Notice"})]})]}),n.jsxs("div",{className:"p-5 space-y-3.5",children:[n.jsxs("div",{className:"flex items-start gap-3 bg-amber-50/80 p-3 rounded-2xl border border-amber-200 text-amber-950",children:[n.jsx(Ui,{className:"h-5 w-5 text-amber-600 shrink-0 mt-0.5"}),n.jsxs("div",{children:[n.jsx("h4",{className:"text-sm font-bold text-slate-900",children:"Session Only Application"}),n.jsx("p",{className:"text-xs text-slate-600 mt-0.5 leading-relaxed",children:"TournaX operates strictly in your active browser session without database storage."})]})]}),n.jsxs("div",{className:"space-y-2 text-xs",children:[n.jsxs("div",{className:"flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-50 border border-slate-200",children:[n.jsx(Wt,{className:"h-4 w-4 text-blue-600 shrink-0 mt-0.5"}),n.jsxs("div",{children:[n.jsx("strong",{className:"text-slate-900",children:"Resets on Refresh:"})," ",n.jsx("span",{className:"text-slate-600",children:"Reloading (F5) or opening a new tab resets data to default."})]})]}),n.jsxs("div",{className:"flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-50 border border-slate-200",children:[n.jsx(Pt,{className:"h-4 w-4 text-rose-600 shrink-0 mt-0.5"}),n.jsxs("div",{children:[n.jsx("strong",{className:"text-slate-900",children:"Export PDF (A4):"})," ",n.jsx("span",{className:"text-slate-600",children:"Download your bracket in A4 PDF format before closing."})]})]}),n.jsxs("div",{className:"flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-50 border border-slate-200",children:[n.jsx(tn,{className:"h-4 w-4 text-purple-600 shrink-0 mt-0.5"}),n.jsxs("div",{children:[n.jsx("strong",{className:"text-slate-900",children:"Edit Details:"})," ",n.jsx("span",{className:"text-slate-600",children:"Click the pen icon in the top header anytime to edit championship details."})]})]})]}),n.jsxs("div",{className:`p-3 rounded-2xl border transition-all ${i&&!s?"bg-rose-50 border-rose-400 ring-2 ring-rose-400/30":"bg-slate-50 border-slate-300"}`,children:[n.jsxs("label",{className:"flex items-center gap-2.5 cursor-pointer select-none",children:[n.jsx("input",{type:"checkbox",checked:s,onChange:l=>{r(l.target.checked),l.target.checked&&a(!1)},className:"h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 accent-blue-600 cursor-pointer shrink-0"}),n.jsx("span",{className:"text-xs font-semibold text-slate-800",children:"I understand that refreshing will reset data to default"})]}),i&&!s&&n.jsx("p",{className:"mt-1.5 text-xs font-bold text-rose-600 pl-6.5",children:"Please check the box to continue."})]})]}),n.jsx("div",{className:"p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-end",children:n.jsxs("button",{type:"button",onClick:o,className:"w-full sm:w-auto px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 min-h-[44px]",children:[n.jsx(ys,{className:"h-4 w-4"}),n.jsx("span",{children:"I Understand and Continue"}),n.jsx($i,{className:"h-4 w-4"})]})})]})]})},he=({className:t,variant:e="blue",size:s="md",children:r,...i})=>{const a={blue:"bg-blue-50 text-blue-700 border-blue-200/80",green:"bg-emerald-50 text-emerald-700 border-emerald-200/80",amber:"bg-amber-50 text-amber-700 border-amber-200/80",rose:"bg-rose-50 text-rose-700 border-rose-200/80",slate:"bg-slate-100 text-slate-700 border-slate-200",purple:"bg-purple-50 text-purple-700 border-purple-200/80",gold:"bg-amber-100 text-amber-900 border-amber-300 font-semibold"},o={sm:"text-[11px] px-2 py-0.5",md:"text-xs px-2.5 py-1"};return n.jsx("span",{className:Q("inline-flex items-center font-medium rounded-full border shadow-2xs",a[e],o[s],t),...i,children:r})},ht=({isOpen:t,onClose:e,onConfirm:s,title:r,description:i,confirmText:a="Confirm",cancelText:o="Cancel",variant:l="danger",isLoading:c=!1})=>{const d=l==="danger",u=l==="warning";return n.jsx($e,{isOpen:t,onClose:e,maxWidth:"md",footer:n.jsxs(n.Fragment,{children:[n.jsx(L,{variant:"outline",onClick:e,disabled:c,children:o}),n.jsx(L,{variant:d?"danger":u?"gold":"primary",onClick:()=>{s(),e()},disabled:c,children:a})]}),children:n.jsxs("div",{className:"flex items-start gap-4",children:[n.jsx("div",{className:`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${d?"bg-rose-100 text-rose-600":"bg-amber-100 text-amber-600"}`,children:d?n.jsx($t,{className:"h-6 w-6"}):n.jsx(zi,{className:"h-6 w-6"})}),n.jsxs("div",{children:[n.jsx("h3",{className:"text-base font-bold text-slate-900",children:r}),n.jsx("div",{className:"mt-2 text-sm text-slate-600 leading-relaxed",children:i})]})]})})},q=Ut.forwardRef(({className:t,label:e,error:s,helperText:r,leftIcon:i,id:a,...o},l)=>{const c=a||o.name||Math.random().toString(36).substring(7);return n.jsxs("div",{className:"w-full",children:[e&&n.jsxs("label",{htmlFor:c,className:"block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1",children:[e,o.required&&n.jsx("span",{className:"text-rose-500 ml-1",children:"*"})]}),n.jsxs("div",{className:"relative rounded-lg shadow-sm",children:[i&&n.jsx("div",{className:"pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400",children:i}),n.jsx("input",{ref:l,id:c,className:Q("block w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder-slate-400 shadow-sm transition-colors","focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:bg-slate-100 disabled:text-slate-500",i&&"pl-9",s&&"border-rose-500 focus:border-rose-500 focus:ring-rose-500 text-rose-900",t),...o})]}),s&&n.jsx("p",{className:"mt-1 text-xs text-rose-600",children:s}),r&&!s&&n.jsx("p",{className:"mt-1 text-xs text-slate-500",children:r})]})});q.displayName="Input";const at=Ut.forwardRef(({className:t,label:e,error:s,helperText:r,options:i,children:a,id:o,...l},c)=>{const d=o||l.name||Math.random().toString(36).substring(7);return n.jsxs("div",{className:"w-full",children:[e&&n.jsxs("label",{htmlFor:d,className:"block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1",children:[e,l.required&&n.jsx("span",{className:"text-rose-500 ml-1",children:"*"})]}),n.jsx("select",{ref:c,id:d,className:Q("block w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm transition-colors","focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:bg-slate-100 disabled:text-slate-500",s&&"border-rose-500 focus:border-rose-500 focus:ring-rose-500",t),...l,children:i?i.map(u=>n.jsx("option",{value:u.value,children:u.label},u.value)):a}),s&&n.jsx("p",{className:"mt-1 text-xs text-rose-600",children:s}),r&&!s&&n.jsx("p",{className:"mt-1 text-xs text-slate-500",children:r})]})});at.displayName="Select";const ur=[{value:"Under 14",label:"Under 14"},{value:"Under 17",label:"Under 17"},{value:"Under 19",label:"Under 19"},{value:"Under 23",label:"Under 23"},{value:"Senior",label:"Senior"},{value:"Custom",label:"Custom"}],_s=({isOpen:t,onClose:e,onSubmit:s,initialData:r})=>{const[i,a]=w.useState("Under 19"),[o,l]=w.useState(""),[c,d]=w.useState("Men / Boys"),[u,h]=w.useState("under"),[f,m]=w.useState("55"),[g,v]=w.useState("65"),[p,I]=w.useState("bronze-match"),[S,x]=w.useState(""),[C,j]=w.useState(null);w.useEffect(()=>{r?(ur.some(k=>k.value===r.ageGroup)?(a(r.ageGroup),l("")):(a("Custom"),l(r.ageGroup)),d(r.gender==="Women / Girls"?"Women / Girls":"Men / Boys"),I(r.thirdPlaceMode||"bronze-match"),x(r.name||""),r.weightMin!==null&&r.weightMax!==null?(h("range"),m(r.weightMin.toString()),v(r.weightMax.toString())):r.weightMin===null&&r.weightMax!==null?(h("under"),v(r.weightMax.toString())):r.weightMin!==null&&r.weightMax===null?(h("above"),m(r.weightMin.toString())):h("open")):(a("Under 19"),l(""),d("Men / Boys"),h("under"),m("55"),v("55"),I("bronze-match"),x("")),j(null)},[r,t]);const P=i==="Custom"?o.trim():i,N=(u==="range"||u==="above")&&f?parseFloat(f):null,A=(u==="under"||u==="range")&&g?parseFloat(g):null,_=ds(P||"Under 19",N,A,c),b=y=>{if(y.preventDefault(),j(null),!P){j("Please select an age group.");return}if(u==="range"){if(N===null||A===null){j("Please enter both minimum and maximum weight.");return}if(A<=N){j("Maximum weight must be strictly greater than minimum weight.");return}}else if(u==="under"){if(A===null||A<=0){j("Please enter a valid weight limit.");return}}else if(u==="above"&&(N===null||N<=0)){j("Please enter a valid minimum weight.");return}const k=s({name:S.trim()||void 0,ageGroup:P,weightMin:N,weightMax:A,gender:c,thirdPlaceMode:p});k&&k.error?j(k.error):e()};return n.jsx($e,{isOpen:t,onClose:e,title:r?"Edit Category":"Create Category",subtitle:"Age group, weight limit, and gender",maxWidth:"lg",footer:n.jsxs(n.Fragment,{children:[n.jsx(L,{variant:"outline",size:"md",onClick:e,type:"button",children:"Cancel"}),n.jsx(L,{variant:"primary",size:"md",onClick:b,type:"button",children:r?"Save Changes":"Create Category"})]}),children:n.jsxs("form",{onSubmit:b,className:"space-y-4",children:[C&&n.jsx("div",{className:"rounded-xl bg-rose-50 border border-rose-200 p-3 text-xs font-semibold text-rose-700",children:C}),n.jsxs("div",{className:"rounded-2xl bg-gradient-to-br from-slate-900 to-slate-850 p-4 sm:p-5 text-white shadow-md border border-slate-750",children:[n.jsx("div",{className:"text-[11px] font-bold uppercase tracking-wider text-amber-400",children:"Category Name Preview"}),n.jsx("div",{className:"text-lg sm:text-xl font-extrabold text-white mt-1 tracking-tight",children:S.trim()||_})]}),n.jsxs("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-4",children:[n.jsxs("div",{children:[n.jsx(at,{label:"Age Group",value:i,onChange:y=>a(y.target.value),options:ur}),i==="Custom"&&n.jsx("div",{className:"mt-2",children:n.jsx(q,{placeholder:"e.g. Under 21",value:o,onChange:y=>l(y.target.value),autoFocus:!0})})]}),n.jsx(at,{label:"Gender",value:c,onChange:y=>d(y.target.value),options:[{value:"Men / Boys",label:"Men / Boys"},{value:"Women / Girls",label:"Women / Girls"}]})]}),n.jsxs("div",{className:"space-y-1.5",children:[n.jsx("label",{className:"block text-xs font-bold uppercase tracking-wider text-slate-700",children:"Weight Category"}),n.jsx("div",{className:"grid grid-cols-2 sm:grid-cols-4 gap-2",children:[{id:"under",label:"Under"},{id:"range",label:"Weight Range"},{id:"above",label:"Above"},{id:"open",label:"Open Weight"}].map(y=>n.jsx("button",{type:"button",onClick:()=>h(y.id),className:`py-2 px-3 text-xs font-bold rounded-xl border text-center transition-all ${u===y.id?"bg-blue-50 border-blue-600 text-blue-700 ring-1 ring-blue-500 shadow-2xs":"bg-white border-slate-200 text-slate-700 hover:bg-slate-50"}`,children:y.label},y.id))})]}),u==="under"&&n.jsx(q,{label:"Under Weight (kg)",type:"number",step:"0.1",min:"1",max:"250",placeholder:"e.g. 55",value:g,onChange:y=>v(y.target.value),required:!0}),u==="range"&&n.jsxs("div",{className:"grid grid-cols-2 gap-4",children:[n.jsx(q,{label:"Minimum Weight (kg)",type:"number",step:"0.1",min:"1",max:"250",placeholder:"e.g. 55",value:f,onChange:y=>m(y.target.value),required:!0}),n.jsx(q,{label:"Maximum Weight (kg)",type:"number",step:"0.1",min:"1",max:"250",placeholder:"e.g. 65",value:g,onChange:y=>v(y.target.value),required:!0})]}),u==="above"&&n.jsx(q,{label:"Above Minimum Weight (kg)",type:"number",step:"0.1",min:"1",max:"250",placeholder:"e.g. 70",value:f,onChange:y=>m(y.target.value),required:!0}),n.jsx(at,{label:"Playoff Rule",value:p,onChange:y=>I(y.target.value),options:[{value:"bronze-match",label:"Bronze Match Play-off"},{value:"two-bronze",label:"Two Bronze Medals"},{value:"none",label:"None (Gold & Silver Only)"}]}),n.jsx(q,{label:"Custom Name Override (Optional)",placeholder:"Leave blank to use preview name",value:S,onChange:y=>x(y.target.value)})]})})};function xn(t,e,s,r){if(t.isThirdPlace)return"3P";const i=s-1-e;return r||i===0?"F":i===1?`SF${t.index+1}`:i===2?`QF${t.index+1}`:i===3?`R16-${t.index+1}`:i===4?`R32-${t.index+1}`:i===5?`R64-${t.index+1}`:i===6?`R128-${t.index+1}`:`R${e+1}-${t.index+1}`}function Cs(t,e,s){if(t.isThirdPlace||e>=s-2)return"FINALS";const r=s-3;if(r<0)return"FINALS";const i=r-e,a=Math.pow(2,i),o=Math.floor(t.index/a);return o===0?"QF1":o===1?"QF2":o===2?"QF3":"QF4"}function hr(t,e,s,r,i){const a=e===s-1,o=xn(t,e,s,a),l=t.p1.playerId?i.get(t.p1.playerId):null,c=t.p2.playerId?i.get(t.p2.playerId):null,d=l?l.name:t.p1.isBye?"BYE":"TBD",u=c?c.name:t.p2.isBye?"BYE":"TBD",h=(l==null?void 0:l.club)||"—",f=(c==null?void 0:c.club)||"—";let m="Pending";if(t.winnerId){const g=i.get(t.winnerId);m=g?g.name:t.winnerId}else t.status==="bye"&&(m=d!=="BYE"?d:u);return{"Match Code":o,"Stage / Round":r,"Match #":t.index+1,"Player 1":d,"Club / State 1":h,"Score 1":t.score1!==void 0?t.score1:"","Score 2":t.score2!==void 0?t.score2:"","Player 2":u,"Club / State 2":f,Winner:m,"Decision / Method":t.resultType||"",Status:t.status.toUpperCase()}}function je(t,e){if(!e||e.length===0)return;const s=Object.keys(e[0]);t["!cols"]=s.map(r=>{let i=r.length;return e.forEach(a=>{const o=a[r];if(o!=null){const l=String(o).length;l>i&&(i=l)}}),{wch:Math.min(Math.max(i+3,10),40)}})}function eo(t,e){const s=H.book_new(),r=new Map(t.players.map(u=>[u.id,u])),i=t.fixture,a=[{Property:"Tournament Name",Value:(e==null?void 0:e.name)||"Tournament Championship"},{Property:"Scheduled Date",Value:(e==null?void 0:e.date)||"—"},{Property:"Venue & Location",Value:(e==null?void 0:e.venue)||"—"},{Property:"Organizer / Federation",Value:(e==null?void 0:e.organizer)||"—"},{Property:"Category Name",Value:t.name},{Property:"Age Group",Value:t.ageGroup},{Property:"Gender Classification",Value:t.gender||"Men / Boys"},{Property:"Weight Division",Value:`${t.weightMin??0} - ${t.weightMax??"Unlimited"} kg`},{Property:"Total Registered Players",Value:t.players.length},{Property:"Knockout Fixture Status",Value:i?i.locked?"Locked":"Drawn / In Progress":"Not Drawn"},{Property:"Bracket Size Slots",Value:i?`${i.size} Slots`:"—"}],o=H.json_to_sheet(a);je(o,a),H.book_append_sheet(s,o,"Overview");const l=t.players.map((u,h)=>({"Sr No":h+1,"Player Name":u.name,"Club / State / Team":u.club||"—","Weight (kg)":u.weight??"—","DOB / Age":u.dob||"—"})),c=H.json_to_sheet(l);if(je(c,l),H.book_append_sheet(s,c,"Players Roster"),i){const u=i.rounds.length,h=u>=3,f=[],m=[],g=[],v=[],p=[],I=[];if(i.rounds.forEach(x=>{x.matches.forEach(C=>{const j=hr(C,x.index,u,x.name,r);f.push(j);const P=Cs(C,x.index,u);P==="QF1"?m.push(j):P==="QF2"?g.push(j):P==="QF3"?v.push(j):P==="QF4"?p.push(j):I.push(j)})}),i.thirdPlace){const x=i.thirdPlace,C=hr(x,u-1,u,"3rd Place Bronze Medal Playoff",r);I.push(C),f.push(C)}if(h){if(m.length>0){const x=H.json_to_sheet(m);je(x,m),H.book_append_sheet(s,x,"Section 1 - QF1")}if(g.length>0){const x=H.json_to_sheet(g);je(x,g),H.book_append_sheet(s,x,"Section 2 - QF2")}if(v.length>0){const x=H.json_to_sheet(v);je(x,v),H.book_append_sheet(s,x,"Section 3 - QF3")}if(p.length>0){const x=H.json_to_sheet(p);je(x,p),H.book_append_sheet(s,x,"Section 4 - QF4")}}if(I.length>0){const x=H.json_to_sheet(I);je(x,I),H.book_append_sheet(s,x,"Finals Stage (SF & F)")}const S=H.json_to_sheet(f);je(S,f),H.book_append_sheet(s,S,"Master Bracket")}const d=`${t.name.replace(/[^a-zA-Z0-9_-]/g,"_")}_Tournament_Fixtures.xlsx`;na(s,d)}const to=({category:t})=>{const{deleteCategory:e,duplicateCategory:s,updateCategory:r,tournament:i}=Je(),[a,o]=w.useState(!1),[l,c]=w.useState(!1),d=t.players.length,u=t.fixture;let h=null;if(u&&u.rounds.length>0){const g=u.rounds[u.rounds.length-1].matches[0];if(g&&g.status==="done"&&g.winnerId){const v=t.players.find(p=>p.id===g.winnerId);h=v?v.name:"Completed"}}let f=n.jsx(he,{variant:"slate",size:"sm",children:"Not Drawn"});return u&&(h?f=n.jsxs(he,{variant:"gold",size:"sm",className:"gap-1",children:[n.jsx(zt,{className:"h-3 w-3 text-amber-600"}),"Completed"]}):u.locked?f=n.jsxs(he,{variant:"amber",size:"sm",className:"gap-1",children:[n.jsx(Is,{className:"h-3 w-3 text-amber-600"}),"Locked"]}):f=n.jsxs(he,{variant:"blue",size:"sm",className:"gap-1",children:[n.jsx(ut,{className:"h-3 w-3 text-blue-600"}),"Bracket Drawn"]})),n.jsxs(n.Fragment,{children:[n.jsxs("div",{className:"group relative flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md",children:[n.jsxs("div",{children:[n.jsxs("div",{className:"flex items-start justify-between gap-3",children:[n.jsxs("div",{className:"flex flex-wrap items-center gap-1.5",children:[n.jsx(he,{variant:"purple",size:"sm",children:t.ageGroup}),n.jsx(he,{variant:"slate",size:"sm",children:t.gender||"Men / Boys"}),f]}),n.jsxs("div",{className:"flex items-center gap-1 opacity-90 group-hover:opacity-100 transition-opacity",children:[n.jsx("button",{onClick:()=>s(t.id),className:"p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors",title:"Duplicate Category","aria-label":"Duplicate category",children:n.jsx(Wi,{className:"h-4 w-4"})}),n.jsx("button",{onClick:()=>eo(t,i),className:"p-1.5 rounded-lg text-slate-400 hover:text-emerald-700 hover:bg-emerald-50 transition-colors",title:"Export Excel (.xlsx)","aria-label":"Export category to Excel",children:n.jsx(Vi,{className:"h-4 w-4"})}),n.jsx("button",{onClick:()=>o(!0),className:"p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors",title:"Delete Category","aria-label":"Delete category",children:n.jsx(sn,{className:"h-4 w-4"})})]})]}),n.jsxs("div",{className:"mt-3 flex items-center justify-between gap-2",children:[n.jsx(Qe,{to:`/category/${t.id}`,className:"block group-hover:text-blue-600 flex-1 min-w-0",children:n.jsx("h3",{className:"text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1",children:t.name})}),n.jsx("button",{onClick:()=>c(!0),className:"p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors shrink-0",title:"Edit Category Name","aria-label":"Edit Category Name",children:n.jsx(Ns,{className:"h-3.5 w-3.5"})})]}),h&&n.jsxs("div",{className:"mt-2.5 flex items-center gap-2 rounded-lg bg-gradient-to-r from-amber-50 to-amber-100/70 border border-amber-200 px-3 py-1.5 text-xs text-amber-900 font-semibold",children:[n.jsx(rn,{className:"h-4 w-4 text-amber-600 shrink-0"}),n.jsxs("span",{className:"truncate",children:["Champion: ",h]})]}),n.jsxs("div",{className:"mt-4 flex flex-wrap items-center gap-4 text-xs text-slate-500",children:[n.jsxs("div",{className:"flex items-center gap-1.5",children:[n.jsx(dt,{className:"h-4 w-4 text-slate-400"}),n.jsx("span",{className:"font-semibold text-slate-700",children:d}),n.jsx("span",{children:d===1?"player":"players"})]}),u&&n.jsxs("div",{className:"flex items-center gap-1.5",children:[n.jsx(ut,{className:"h-4 w-4 text-blue-500"}),n.jsxs("span",{className:"font-medium text-slate-600",children:[u.rounds.length," rounds (",u.size," bracket)"]})]})]})]}),n.jsxs("div",{className:"mt-5 pt-3.5 border-t border-slate-100 flex items-center justify-between",children:[n.jsx("span",{className:"text-xs text-slate-400",children:t.thirdPlaceMode==="bronze-match"?"Bronze Match":t.thirdPlaceMode==="two-bronze"?"2 Bronze Medals":"Gold/Silver only"}),n.jsx(Qe,{to:`/category/${t.id}`,children:n.jsxs(L,{variant:"outline",size:"sm",className:"gap-1 group-hover:border-blue-300",children:[u?"View Fixture":"Manage Players",n.jsx(Gi,{className:"h-3.5 w-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform"})]})})]})]}),n.jsx(_s,{isOpen:l,onClose:()=>c(!1),initialData:t,onSubmit:m=>r(t.id,m)}),n.jsx(ht,{isOpen:a,onClose:()=>o(!1),onConfirm:()=>e(t.id),title:`Delete "${t.name}"?`,variant:"danger",confirmText:"Delete Category",description:"This will permanently delete this category, all registered players, and its fixture bracket. This action cannot be undone."})]})},so=()=>{const{categories:t,tournament:e,addCategory:s}=Je(),[r,i]=w.useState(!1),[a,o]=w.useState(""),[l,c]=w.useState("ALL"),[d,u]=w.useState("ALL"),h=w.useMemo(()=>t.reduce((p,I)=>p+I.players.length,0),[t]),f=w.useMemo(()=>t.filter(p=>p.fixture!==null).length,[t]),m=w.useMemo(()=>t.filter(p=>{if(!p.fixture||p.fixture.rounds.length===0)return!1;const I=p.fixture.rounds[p.fixture.rounds.length-1].matches[0];return I&&I.status==="done"&&I.winnerId}).length,[t]),g=w.useMemo(()=>{const p=new Set;return t.forEach(I=>p.add(I.ageGroup)),Array.from(p)},[t]),v=w.useMemo(()=>t.filter(p=>{const I=p.name.toLowerCase().includes(a.toLowerCase())||p.ageGroup.toLowerCase().includes(a.toLowerCase())||p.gender&&p.gender.toLowerCase().includes(a.toLowerCase()),S=l==="ALL"||p.ageGroup===l,x=d==="ALL"||p.gender===d||d==="Men / Boys"&&(p.gender==="Men / Boys"||p.gender==="Men")||d==="Women / Girls"&&(p.gender==="Women / Girls"||p.gender==="Women");return I&&S&&x}),[t,a,l,d]);return n.jsxs("div",{className:"space-y-7",children:[n.jsxs("div",{className:"relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-850 to-slate-900 p-6 sm:p-8 text-white shadow-xl border border-slate-800",children:[n.jsx("div",{className:"absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 rounded-full bg-blue-600/10 blur-3xl pointer-events-none"}),n.jsx("div",{className:"absolute bottom-0 left-1/3 -mb-20 w-80 h-80 rounded-full bg-amber-500/10 blur-3xl pointer-events-none"}),n.jsxs("div",{className:"relative flex flex-col md:flex-row md:items-center justify-between gap-6",children:[n.jsxs("div",{className:"max-w-2xl",children:[n.jsx("h1",{className:"text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight",children:e.name||"Championship Name"}),n.jsxs("div",{className:"mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs sm:text-sm text-slate-300",children:[e.date&&n.jsxs("span",{className:"flex items-center gap-1.5",children:[n.jsx(ct,{className:"h-4 w-4 text-amber-400"}),n.jsx("span",{children:Vt(e.date)})]}),n.jsxs("span",{className:"flex items-center gap-1.5",children:[n.jsx(Et,{className:"h-4 w-4 text-blue-400"}),n.jsx("span",{children:e.venue||"Location Name"})]}),e.organizer&&n.jsxs("span",{className:"flex items-center gap-1.5 text-slate-400",children:[n.jsx(nn,{className:"h-4 w-4 text-emerald-400"}),e.organizer]})]})]}),n.jsx("div",{className:"flex items-center gap-3 shrink-0",children:n.jsx(L,{variant:"gold",size:"lg",className:"font-bold shadow-lg shadow-amber-500/20",icon:n.jsx(er,{className:"h-5 w-5"}),onClick:()=>i(!0),children:"Create Category"})})]})]}),n.jsxs("div",{className:"grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5",children:[n.jsxs("div",{className:"rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs hover:border-slate-300 transition-all",children:[n.jsxs("div",{className:"flex items-center justify-between",children:[n.jsxs("div",{children:[n.jsx("div",{className:"text-xs font-semibold uppercase tracking-wider text-slate-500",children:"Total Categories"}),n.jsx("div",{className:"text-3xl font-black text-slate-900 mt-1",children:t.length})]}),n.jsx("div",{className:"p-3 rounded-2xl bg-blue-50 text-blue-600 border border-blue-100",children:n.jsx(js,{className:"h-6 w-6"})})]}),n.jsx("div",{className:"mt-3 text-[11px] text-slate-500 font-medium flex items-center gap-1",children:n.jsx("span",{children:"Age & weight groups"})})]}),n.jsxs("div",{className:"rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs hover:border-slate-300 transition-all",children:[n.jsxs("div",{className:"flex items-center justify-between",children:[n.jsxs("div",{children:[n.jsx("div",{className:"text-xs font-semibold uppercase tracking-wider text-slate-500",children:"Registered Players"}),n.jsx("div",{className:"text-3xl font-black text-slate-900 mt-1",children:h})]}),n.jsx("div",{className:"p-3 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-100",children:n.jsx(dt,{className:"h-6 w-6"})})]}),n.jsx("div",{className:"mt-3 text-[11px] text-slate-500 font-medium flex items-center gap-1",children:n.jsx("span",{children:"Across all rosters"})})]}),n.jsxs("div",{className:"rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs hover:border-slate-300 transition-all",children:[n.jsxs("div",{className:"flex items-center justify-between",children:[n.jsxs("div",{children:[n.jsx("div",{className:"text-xs font-semibold uppercase tracking-wider text-slate-500",children:"Brackets Drawn"}),n.jsx("div",{className:"text-3xl font-black text-slate-900 mt-1",children:f})]}),n.jsx("div",{className:"p-3 rounded-2xl bg-purple-50 text-purple-600 border border-purple-100",children:n.jsx(ut,{className:"h-6 w-6"})})]}),n.jsx("div",{className:"mt-3 text-[11px] text-slate-500 font-medium flex items-center gap-1",children:n.jsxs("span",{children:[t.length-f," pending draw"]})})]}),n.jsxs("div",{className:"rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs hover:border-slate-300 transition-all",children:[n.jsxs("div",{className:"flex items-center justify-between",children:[n.jsxs("div",{children:[n.jsx("div",{className:"text-xs font-semibold uppercase tracking-wider text-slate-500",children:"Completed Finals"}),n.jsx("div",{className:"text-3xl font-black text-slate-900 mt-1",children:m})]}),n.jsx("div",{className:"p-3 rounded-2xl bg-amber-50 text-amber-600 border border-amber-100",children:n.jsx(ys,{className:"h-6 w-6"})})]}),n.jsx("div",{className:"mt-3 text-[11px] text-slate-500 font-medium flex items-center gap-1",children:n.jsx("span",{children:"Championships decided"})})]})]}),n.jsxs("div",{className:"space-y-4",children:[n.jsxs("div",{className:"flex flex-col sm:flex-row sm:items-center justify-between gap-3",children:[n.jsxs("div",{children:[n.jsx("h2",{className:"text-xl font-bold text-slate-900",children:"Tournament Categories"}),n.jsx("p",{className:"text-xs text-slate-500 mt-0.5",children:"Manage player rosters and knockout brackets."})]}),n.jsxs("div",{className:"text-xs font-semibold text-slate-500",children:["Showing ",v.length," of ",t.length," categories"]})]}),t.length>0&&n.jsxs("div",{className:"flex flex-col lg:flex-row lg:items-center justify-between gap-3 bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs",children:[n.jsxs("div",{className:"relative min-w-[240px] sm:min-w-[300px]",children:[n.jsx(an,{className:"absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400"}),n.jsx("input",{type:"text",placeholder:"Search by category name, age, or weight...",value:a,onChange:p=>o(p.target.value),className:"w-full pl-10 pr-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-slate-50 focus:bg-white transition-all font-medium"})]}),n.jsxs("div",{className:"flex flex-wrap items-center gap-2",children:[n.jsx("div",{className:"flex items-center rounded-xl bg-slate-100 p-1",children:[{value:"ALL",label:"All"},{value:"Men / Boys",label:"Men / Boys"},{value:"Women / Girls",label:"Women / Girls"}].map(p=>n.jsx("button",{onClick:()=>u(p.value),className:`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${d===p.value?"bg-white text-slate-900 shadow-xs":"text-slate-600 hover:text-slate-900"}`,children:p.label},p.value))}),g.length>0&&n.jsxs("div",{className:"flex items-center gap-1 overflow-x-auto py-1",children:[n.jsx("button",{onClick:()=>c("ALL"),className:`px-3 py-1.5 text-xs font-semibold rounded-xl transition-all ${l==="ALL"?"bg-blue-600 text-white shadow-xs":"bg-slate-100 text-slate-600 hover:bg-slate-200"}`,children:"All Ages"}),g.map(p=>n.jsx("button",{onClick:()=>c(p),className:`px-3 py-1.5 text-xs font-semibold rounded-xl transition-all ${l===p?"bg-blue-600 text-white shadow-xs":"bg-slate-100 text-slate-600 hover:bg-slate-200"}`,children:p},p))]})]})]})]}),t.length===0?n.jsxs("div",{className:"rounded-3xl border-2 border-dashed border-slate-300/80 bg-white p-12 sm:p-16 text-center shadow-xs",children:[n.jsx("div",{className:"mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-blue-50 text-blue-600 mb-5 shadow-inner",children:n.jsx(zt,{className:"h-10 w-10 text-blue-600"})}),n.jsx("h3",{className:"text-xl font-bold text-slate-900",children:"No Tournament Categories Yet"}),n.jsx("p",{className:"mx-auto mt-2 max-w-md text-xs sm:text-sm text-slate-500 leading-relaxed",children:"Create your first category to start adding players and drawing brackets."}),n.jsx("div",{className:"mt-7 flex justify-center",children:n.jsx(L,{variant:"primary",size:"lg",className:"font-bold shadow-lg shadow-blue-500/20",icon:n.jsx(er,{className:"h-5 w-5"}),onClick:()=>i(!0),children:"Create First Category"})})]}):v.length===0?n.jsxs("div",{className:"rounded-2xl border border-slate-200 bg-white p-12 text-center text-slate-500 shadow-xs",children:[n.jsx("p",{className:"text-base font-semibold text-slate-700",children:"No categories match your filters."}),n.jsx("p",{className:"text-xs text-slate-400 mt-1",children:"Try resetting the search keyword or gender filter."}),n.jsx("button",{onClick:()=>{o(""),c("ALL"),u("ALL")},className:"mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition-colors",children:"Reset Filters"})]}):n.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5",children:v.map(p=>n.jsx(to,{category:p},p.id))}),n.jsx(_s,{isOpen:r,onClose:()=>i(!1),onSubmit:s})]})},ro=({onAdd:t,disabled:e})=>{const[s,r]=w.useState(""),[i,a]=w.useState(""),[o,l]=w.useState(""),[c,d]=w.useState(""),[u,h]=w.useState(null),f=m=>{m.preventDefault(),h(null);const g=s.trim();if(!g){h("Player name is required.");return}const v=t({name:g,club:i.trim()||void 0,weight:o?parseFloat(o):void 0,dob:c.trim()||void 0});v&&v.error?h(v.error):(r(""),a(""),l(""),d(""))};return n.jsxs("form",{onSubmit:f,className:"rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs transition-shadow",children:[n.jsxs("div",{className:"flex items-center gap-2 mb-3",children:[n.jsx("div",{className:"p-1.5 rounded-lg bg-blue-50 text-blue-600",children:n.jsx(tr,{className:"h-4 w-4"})}),n.jsx("h4",{className:"text-sm font-bold text-slate-900",children:"Add Player to Roster"})]}),u&&n.jsx("div",{className:"mb-3 rounded-lg bg-rose-50 border border-rose-200 p-2.5 text-xs text-rose-700",children:u}),n.jsxs("div",{className:"grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3",children:[n.jsx(q,{label:"Player Name",placeholder:"e.g. Alex Johnson (Compulsory)",value:s,onChange:m=>r(m.target.value),disabled:e,required:!0}),n.jsx(q,{label:"Club / Team (Optional)",placeholder:"Club, Team, or City",value:i,onChange:m=>a(m.target.value),leftIcon:n.jsx(nn,{className:"h-4 w-4"}),disabled:e}),n.jsx(q,{label:"Weight (Optional)",placeholder:"Weight in kg",type:"number",step:"0.1",value:o,onChange:m=>l(m.target.value),leftIcon:n.jsx(Hi,{className:"h-4 w-4"}),disabled:e}),n.jsx(q,{label:"Age / DOB (Optional)",placeholder:"Age or Date of Birth",value:c,onChange:m=>d(m.target.value),leftIcon:n.jsx(ct,{className:"h-4 w-4"}),disabled:e})]}),n.jsx("div",{className:"mt-3 flex justify-end",children:n.jsx(L,{type:"submit",variant:"primary",size:"sm",disabled:e||!s.trim(),icon:n.jsx(tr,{className:"h-3.5 w-3.5"}),children:"Add Player"})})]})},no=({players:t,isFixtureActive:e,onUpdatePlayer:s,onRemovePlayer:r,onResetFixture:i,onOpenBulkAdd:a,onOpenCsvImport:o})=>{const[l,c]=w.useState(""),[d,u]=w.useState(null),[h,f]=w.useState(""),[m,g]=w.useState(""),[v,p]=w.useState(""),[I,S]=w.useState(""),[x,C]=w.useState(null),j=t.filter(b=>{const y=l.toLowerCase();return b.name.toLowerCase().includes(y)||b.club&&b.club.toLowerCase().includes(y)}),[P,N]=w.useState(null),A=b=>{u(b),f(b.name),g(b.club||""),p(b.weight?b.weight.toString():""),S(b.dob||""),N(null)},_=()=>{if(d){if(!h.trim()){N("Player name is compulsory.");return}s(d.id,{name:h.trim(),club:m.trim()||void 0,weight:v?parseFloat(v):void 0,dob:I.trim()||void 0}),u(null)}};return n.jsxs("div",{className:"space-y-4",children:[e&&n.jsxs("div",{className:"flex items-center justify-between rounded-xl border border-amber-300 bg-amber-50 p-4 text-amber-900 shadow-2xs",children:[n.jsxs("div",{className:"flex items-center gap-3",children:[n.jsx(Is,{className:"h-5 w-5 text-amber-600 shrink-0"}),n.jsxs("div",{children:[n.jsx("h5",{className:"text-sm font-bold",children:"Roster Locked During Active Fixture"}),n.jsx("p",{className:"text-xs text-amber-700 mt-0.5",children:"Players cannot be added, edited, or removed while a bracket is generated."})]})]}),n.jsx(L,{variant:"outline",size:"sm",onClick:i,className:"border-amber-300 bg-white hover:bg-amber-100/50 text-amber-900 shrink-0",icon:n.jsx(Wt,{className:"h-3.5 w-3.5"}),children:"Reset Fixture to Edit"})]}),t.length<2&&!e&&n.jsxs("div",{className:"flex items-center gap-3 rounded-xl border border-blue-200 bg-blue-50/70 p-4 text-blue-900 shadow-2xs",children:[n.jsx($t,{className:"h-5 w-5 text-blue-600 shrink-0"}),n.jsxs("div",{className:"text-xs",children:[n.jsx("span",{className:"font-bold",children:"Need at least 2 players to generate a bracket."})," ","Add players using the form above, or click Bulk Add to paste a list."]})]}),n.jsxs("div",{className:"flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200 shadow-xs",children:[n.jsx("div",{className:"flex items-center gap-3",children:n.jsxs("div",{className:"flex items-center gap-2",children:[n.jsx("div",{className:"flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-700 font-bold text-xs",children:t.length}),n.jsxs("div",{children:[n.jsx("h3",{className:"text-sm font-bold text-slate-900",children:"Registered Players"}),n.jsx("p",{className:"text-[11px] text-slate-500",children:t.length===1?"1 player registered":`${t.length} players registered`})]})]})}),n.jsxs("div",{className:"flex items-center gap-2 flex-wrap",children:[n.jsxs("div",{className:"relative min-w-[160px] sm:min-w-[200px]",children:[n.jsx(an,{className:"absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400"}),n.jsx("input",{type:"text",placeholder:"Search roster...",value:l,onChange:b=>c(b.target.value),className:"w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-slate-50 focus:bg-white"})]}),!e&&n.jsxs(n.Fragment,{children:[n.jsx(L,{variant:"outline",size:"sm",onClick:a,className:"text-xs",icon:n.jsx(dt,{className:"h-3.5 w-3.5"}),children:"Bulk Add"}),n.jsx(L,{variant:"outline",size:"sm",onClick:o,className:"text-xs",icon:n.jsx(jt,{className:"h-3.5 w-3.5"}),children:"CSV Import"})]})]})]}),n.jsx("div",{className:"rounded-xl border border-slate-200 bg-white overflow-hidden shadow-xs",children:j.length===0?n.jsxs("div",{className:"py-12 text-center text-slate-400",children:[n.jsx(dt,{className:"h-10 w-10 mx-auto text-slate-300 mb-2 stroke-[1.5]"}),n.jsx("p",{className:"text-sm font-medium text-slate-600",children:t.length===0?"No players added yet":"No players match your search"}),n.jsx("p",{className:"text-xs text-slate-400 mt-1",children:t.length===0?"Use the form above to add participants to this division.":"Try clearing the search query."})]}):n.jsx("div",{className:"overflow-x-auto",children:n.jsxs("table",{className:"w-full text-left text-sm text-slate-700",children:[n.jsx("thead",{className:"bg-slate-50 text-[11px] font-bold uppercase tracking-wider text-slate-500 border-b border-slate-200",children:n.jsxs("tr",{children:[n.jsx("th",{className:"px-4 py-3 w-12 text-center",children:"#"}),n.jsx("th",{className:"px-4 py-3",children:"Player Name"}),n.jsx("th",{className:"px-4 py-3",children:"Club / Team / State"}),n.jsx("th",{className:"px-4 py-3",children:"Weight / Rating"}),n.jsx("th",{className:"px-4 py-3",children:"DOB / Age"}),!e&&n.jsx("th",{className:"px-4 py-3 text-right",children:"Actions"})]})}),n.jsx("tbody",{className:"divide-y divide-slate-100",children:j.map((b,y)=>n.jsxs("tr",{className:"hover:bg-slate-50/80 transition-colors",children:[n.jsx("td",{className:"px-4 py-3 text-center text-xs font-semibold text-slate-400",children:y+1}),n.jsx("td",{className:"px-4 py-3 font-semibold text-slate-900",children:b.name}),n.jsx("td",{className:"px-4 py-3 text-slate-600 text-xs",children:b.club?n.jsx("span",{className:"inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-slate-100 text-slate-700",children:b.club}):n.jsx("span",{className:"text-slate-400 italic",children:"—"})}),n.jsx("td",{className:"px-4 py-3 text-slate-600 text-xs",children:b.weight?n.jsxs("span",{className:"font-medium text-slate-800",children:[b.weight," kg"]}):n.jsx("span",{className:"text-slate-400 italic",children:"—"})}),n.jsx("td",{className:"px-4 py-3 text-slate-600 text-xs",children:b.dob||n.jsx("span",{className:"text-slate-400 italic",children:"—"})}),!e&&n.jsx("td",{className:"px-4 py-3 text-right",children:n.jsxs("div",{className:"flex items-center justify-end gap-1",children:[n.jsx("button",{onClick:()=>A(b),className:"p-1 rounded-md text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors",title:"Edit player",children:n.jsx(Ns,{className:"h-3.5 w-3.5"})}),n.jsx("button",{onClick:()=>C(b),className:"p-1 rounded-md text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors",title:"Remove player",children:n.jsx(sn,{className:"h-3.5 w-3.5"})})]})})]},b.id))})]})})}),d&&n.jsx($e,{isOpen:!0,onClose:()=>u(null),title:"Edit Player Information",maxWidth:"sm",footer:n.jsxs(n.Fragment,{children:[n.jsx(L,{variant:"outline",onClick:()=>u(null),children:"Cancel"}),n.jsx(L,{variant:"primary",onClick:_,children:"Save Changes"})]}),children:n.jsxs("div",{className:"space-y-3",children:[P&&n.jsx("div",{className:"p-2.5 rounded-lg bg-rose-50 border border-rose-200 text-xs text-rose-700 font-semibold",children:P}),n.jsx(q,{label:"Player Name",value:h,onChange:b=>{f(b.target.value),N(null)},required:!0,autoFocus:!0}),n.jsx(q,{label:"Club / Team / State",value:m,onChange:b=>g(b.target.value)}),n.jsx(q,{label:"Weight (kg) or Rating",type:"number",step:"0.1",value:v,onChange:b=>p(b.target.value)}),n.jsx(q,{label:"DOB / Age",value:I,onChange:b=>S(b.target.value)})]})}),x&&n.jsx(ht,{isOpen:!0,onClose:()=>C(null),onConfirm:()=>{r(x.id),C(null)},title:`Remove "${x.name}"?`,description:"Are you sure you want to remove this player from the roster?",confirmText:"Remove Player",variant:"danger"})]})},io=({isOpen:t,onClose:e,onAdd:s})=>{const[r,i]=w.useState(""),[a,o]=w.useState(""),[l,c]=w.useState(null),d=h=>{h.preventDefault(),c(null);const f=r.split(`
`).map(g=>g.trim()).filter(g=>g.length>0);if(f.length===0){c("Please enter at least one player name.");return}s(f,a.trim()||void 0)>0&&(i(""),o(""),e())},u=r.split(`
`).map(h=>h.trim()).filter(Boolean).length;return n.jsx($e,{isOpen:t,onClose:e,title:"Bulk Add Players",subtitle:"Quickly paste a list of players (one per line)",maxWidth:"md",footer:n.jsxs(n.Fragment,{children:[n.jsx(L,{variant:"outline",onClick:e,type:"button",children:"Cancel"}),n.jsxs(L,{variant:"primary",onClick:d,disabled:u===0,type:"button",children:["Add ",u," ",u===1?"Player":"Players"]})]}),children:n.jsxs("form",{onSubmit:d,className:"space-y-4",children:[l&&n.jsx("div",{className:"rounded-lg bg-rose-50 border border-rose-200 p-2.5 text-xs text-rose-700",children:l}),n.jsxs("div",{children:[n.jsx("label",{className:"block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5",children:"Player Names (1 per line)"}),n.jsx("textarea",{rows:8,className:"block w-full rounded-lg border border-slate-300 p-3 text-sm text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 font-mono",placeholder:`Alex Johnson
Marcus Vance
Liam Smith
David Brown
Chris Lee
Jordan Taylor`,value:r,onChange:h=>i(h.target.value),autoFocus:!0}),n.jsxs("div",{className:"mt-1.5 flex justify-between text-xs text-slate-500",children:[n.jsxs("span",{children:["Detected: ",u," names"]}),n.jsx("span",{children:"Duplicates in list will still be added"})]})]}),n.jsx(q,{label:"Default Club / Team / State for All (Optional)",placeholder:"e.g. City Sports Academy",value:a,onChange:h=>o(h.target.value)})]})})},ao=({isOpen:t,onClose:e,onImport:s})=>{const[r,i]=w.useState(""),[a,o]=w.useState([]),[l,c]=w.useState(null),d=m=>{c(null);try{const g=m.split(/\r?\n/).map(P=>P.trim()).filter(Boolean);if(g.length===0){o([]);return}let v=0;const p=g[0].toLowerCase();let I=0,S=1,x=2,C=3;(p.includes("name")||p.includes("player")||p.includes("wrestler"))&&(v=1,g[0].split(",").map(N=>N.trim().toLowerCase()).forEach((N,A)=>{N.includes("name")||N.includes("player")||N.includes("wrestler")?I=A:N.includes("club")||N.includes("state")||N.includes("team")?S=A:N.includes("weight")||N.includes("rating")||N.includes("kg")?x=A:(N.includes("dob")||N.includes("age")||N.includes("birth"))&&(C=A)}));const j=[];for(let P=v;P<g.length;P++){const N=g[P].split(",").map(_=>_.trim().replace(/^["']|["']$/g,"")),A=N[I];if(A){const _=N[S]||void 0,b=N[x]?parseFloat(N[x]):void 0,y=N[C]||void 0;j.push({name:A,club:_,weight:isNaN(b)?void 0:b,dob:y})}}o(j)}catch(g){c("Could not parse CSV content: "+g.message)}},u=m=>{var p;const g=(p=m.target.files)==null?void 0:p[0];if(!g)return;const v=new FileReader;v.onload=I=>{var x;const S=(x=I.target)==null?void 0:x.result;i(S),d(S)},v.readAsText(g)},h=m=>{i(m.target.value),d(m.target.value)},f=()=>{if(a.length===0)return;s(a)>0&&(i(""),o([]),e())};return n.jsx($e,{isOpen:t,onClose:e,title:"Import Players from CSV",subtitle:"Upload or paste comma-separated player data (Name, Club, Weight/Rating, DOB)",maxWidth:"lg",footer:n.jsxs(n.Fragment,{children:[n.jsx(L,{variant:"outline",onClick:e,type:"button",children:"Cancel"}),n.jsxs(L,{variant:"primary",onClick:f,disabled:a.length===0,type:"button",children:["Import ",a.length," Players"]})]}),children:n.jsxs("div",{className:"space-y-4",children:[l&&n.jsx("div",{className:"rounded-lg bg-rose-50 border border-rose-200 p-2.5 text-xs text-rose-700",children:l}),n.jsxs("label",{className:"flex flex-col items-center justify-center p-4 border-2 border-dashed border-slate-300 rounded-xl hover:border-blue-400 bg-slate-50/50 hover:bg-blue-50/30 cursor-pointer transition-colors text-center",children:[n.jsx(qi,{className:"h-6 w-6 text-slate-400 mb-1"}),n.jsx("span",{className:"text-sm font-semibold text-slate-700",children:"Choose a CSV file"}),n.jsx("span",{className:"text-xs text-slate-400",children:"or drag and drop here"}),n.jsx("input",{type:"file",accept:".csv,text/csv",onChange:u,className:"hidden"})]}),n.jsxs("div",{children:[n.jsxs("div",{className:"flex justify-between items-center mb-1",children:[n.jsx("span",{className:"text-xs font-semibold uppercase tracking-wider text-slate-700",children:"Or Paste CSV Data Directly"}),n.jsx("span",{className:"text-xs text-slate-400",children:"Columns: Name, Club, Weight, DOB"})]}),n.jsx("textarea",{rows:5,className:"block w-full rounded-lg border border-slate-300 p-2.5 text-xs font-mono text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500",placeholder:`Name,Club,Weight,DOB
Alex Johnson,Metro Club,65,2003-07-16
Liam Smith,United Sports,65,1999-12-12`,value:r,onChange:h})]}),a.length>0&&n.jsxs("div",{children:[n.jsxs("div",{className:"flex items-center gap-1.5 text-xs font-bold text-emerald-700 mb-2",children:[n.jsx(ys,{className:"h-4 w-4"}),n.jsxs("span",{children:["Parsed ",a.length," players ready to import:"]})]}),n.jsx("div",{className:"max-h-48 overflow-y-auto border border-slate-200 rounded-lg",children:n.jsxs("table",{className:"w-full text-left text-xs text-slate-700",children:[n.jsx("thead",{className:"bg-slate-100 text-slate-600 uppercase text-[10px] sticky top-0",children:n.jsxs("tr",{children:[n.jsx("th",{className:"px-3 py-2",children:"#"}),n.jsx("th",{className:"px-3 py-2",children:"Player Name"}),n.jsx("th",{className:"px-3 py-2",children:"Club / Team"}),n.jsx("th",{className:"px-3 py-2",children:"Weight / Rating"}),n.jsx("th",{className:"px-3 py-2",children:"DOB"})]})}),n.jsxs("tbody",{className:"divide-y divide-slate-100 bg-white",children:[a.slice(0,15).map((m,g)=>n.jsxs("tr",{className:"hover:bg-slate-50",children:[n.jsx("td",{className:"px-3 py-1.5 text-slate-400",children:g+1}),n.jsx("td",{className:"px-3 py-1.5 font-medium text-slate-900",children:m.name}),n.jsx("td",{className:"px-3 py-1.5 text-slate-500",children:m.club||"—"}),n.jsx("td",{className:"px-3 py-1.5 text-slate-500",children:m.weight?`${m.weight} kg`:"—"}),n.jsx("td",{className:"px-3 py-1.5 text-slate-500",children:m.dob||"—"})]},g)),a.length>15&&n.jsx("tr",{children:n.jsxs("td",{colSpan:5,className:"px-3 py-2 text-center text-slate-400 italic bg-slate-50",children:["...and ",a.length-15," more"]})})]})]})})]})]})})},bn=({match:t,player1:e,player2:s,isFinal:r,roundIndex:i,totalRounds:a,onClick:o,className:l})=>{const c=t.status==="bye",d=t.status==="ready",u=t.status==="done";t.status;const h=!c&&(d||u),f=t.p1,m=t.p2,g=_=>{if(t.isThirdPlace)return _===1?"Runner-up of SF1":"Runner-up of SF2";const b=a-1-i;return r||b===0?_===1?"Winner of SF1":"Winner of SF2":b===1?t.index===0?_===1?"Winner of QF1":"Winner of QF2":_===1?"Winner of QF3":"Winner of QF4":b===2?`Winner of R16-${t.index*2+_}`:i>0?`Winner of Match #${t.index*2+_}`:"TBD"},v=g(1),p=g(2),I=e?e.name:f.isBye?"BYE":v,S=s?s.name:m.isBye?"BYE":p,x=!!(t.winnerId&&f.playerId&&t.winnerId===f.playerId),C=!!(t.winnerId&&m.playerId&&t.winnerId===m.playerId),j=gn.find(_=>_.value===t.resultType),P=a-1-i,A=(()=>{if(t.isThirdPlace)return{code:"3P",title:"3RD PLACE PLAYOFF",badgeClass:"bg-amber-900 text-amber-100 border border-amber-300"};if(r||P===0)return{code:"F",title:"FINAL",badgeClass:"bg-emerald-950 text-emerald-100 border border-emerald-300"};if(P===1){const _=t.index+1;return{code:`SF${_}`,title:`SEMIFINAL ${_}`,badgeClass:"bg-indigo-950 text-indigo-100 border border-indigo-300"}}if(P===2){const _=t.index+1;return{code:`QF${_}`,title:`QUARTERFINAL ${_}`,badgeClass:"bg-amber-950 text-amber-200 border border-amber-400"}}if(P===3){const _=t.index+1;return{code:`R16-${_}`,title:`ROUND OF 16 (#${_})`,badgeClass:"bg-slate-700 text-slate-100 border border-slate-600"}}return{code:`M${t.index+1}`,title:`MATCH #${t.index+1}`,badgeClass:"bg-slate-200 text-slate-800 border border-slate-300"}})();return n.jsxs("div",{"data-match-id":t.id,onClick:h?o:void 0,className:Q("group relative w-56 select-none rounded-xl border bg-white text-xs shadow-xs transition-all duration-150",h?"cursor-pointer hover:-translate-y-0.5 hover:shadow-md hover:ring-2 hover:ring-blue-400":"cursor-default",u?"border-slate-300":"border-slate-200",r&&u&&"border-emerald-400 ring-1 ring-emerald-400/40",l),children:[n.jsxs("div",{className:Q("flex items-center justify-between px-2 py-1 text-[10px] font-semibold rounded-t-[11px] border-b",r?"bg-emerald-600 text-white border-emerald-700":P===1?"bg-indigo-600 text-white border-indigo-700":P===2?"bg-amber-500 text-slate-950 border-amber-600":"bg-slate-100 text-slate-700 border-slate-200"),children:[n.jsxs("div",{className:"flex items-center gap-1.5 font-bold min-w-0",children:[n.jsx("span",{className:Q("px-1.5 py-0.5 rounded text-[10px] font-black tracking-wider uppercase font-mono shadow-2xs shrink-0",A.badgeClass),children:A.code}),n.jsx("span",{className:"truncate",children:A.title})]}),n.jsx("div",{className:"shrink-0 ml-1.5",children:u?n.jsx("span",{className:"inline-flex items-center gap-0.5 text-[9px] uppercase font-bold tracking-wider",children:j?j.code.split("/")[0]:"DONE"}):d?n.jsx("span",{className:r||P===1?"text-amber-200 uppercase font-bold text-[9px]":"text-blue-700 uppercase font-bold text-[9px]",children:"Ready"}):c?n.jsx("span",{className:"opacity-75 italic",children:"BYE"}):n.jsxs("span",{className:"opacity-60 flex items-center gap-0.5",children:[n.jsx(Ki,{className:"h-2.5 w-2.5"})," TBD"]})})]}),n.jsxs("div",{className:Q("flex items-center justify-between px-2.5 py-2 border-b border-slate-100 transition-colors",x&&"bg-blue-50/80 font-bold text-blue-950",!f.playerId&&"text-slate-400",f.isBye&&"italic text-slate-400 bg-slate-50/50"),children:[n.jsxs("div",{className:"flex items-center gap-1.5 min-w-0 pr-2",children:[x&&n.jsx(sr,{className:"h-3.5 w-3.5 text-blue-600 shrink-0"}),n.jsxs("div",{className:"truncate",children:[n.jsx("span",{className:Q("block truncate",x?"font-bold text-slate-900":"text-slate-700 font-medium"),children:I}),(e==null?void 0:e.club)&&n.jsx("span",{className:"block truncate text-[10px] text-slate-400 -mt-0.5 font-normal",children:e.club})]})]}),n.jsx("div",{className:Q("flex h-6 min-w-[24px] items-center justify-center rounded px-1.5 text-xs font-mono font-bold shrink-0",x?"bg-blue-600 text-white shadow-2xs":t.score1!==void 0?"bg-slate-200 text-slate-800":"bg-slate-100 text-slate-400"),children:t.score1!==void 0?t.score1:(f.isBye,"-")})]}),n.jsxs("div",{className:Q("flex items-center justify-between px-2.5 py-2 rounded-b-xl transition-colors",C&&"bg-blue-50/80 font-bold text-blue-950",!m.playerId&&"text-slate-400",m.isBye&&"italic text-slate-400 bg-slate-50/50"),children:[n.jsxs("div",{className:"flex items-center gap-1.5 min-w-0 pr-2",children:[C&&n.jsx(sr,{className:"h-3.5 w-3.5 text-blue-600 shrink-0"}),n.jsxs("div",{className:"truncate",children:[n.jsx("span",{className:Q("block truncate",C?"font-bold text-slate-900":"text-slate-700 font-medium"),children:S}),(s==null?void 0:s.club)&&n.jsx("span",{className:"block truncate text-[10px] text-slate-400 -mt-0.5 font-normal",children:s.club})]})]}),n.jsx("div",{className:Q("flex h-6 min-w-[24px] items-center justify-center rounded px-1.5 text-xs font-mono font-bold shrink-0",C?"bg-blue-600 text-white shadow-2xs":t.score2!==void 0?"bg-slate-200 text-slate-800":"bg-slate-100 text-slate-400"),children:t.score2!==void 0?t.score2:(m.isBye,"-")})]})]})},wn=({round:t,playersMap:e,totalRounds:s,onMatchClick:r})=>{const i=t.index===s-1,a=s-1-t.index,o=()=>i?"bg-emerald-600 text-white shadow-emerald-600/20":a===1?"bg-indigo-600 text-white shadow-indigo-600/20":a===2?"bg-amber-500 text-slate-950 shadow-amber-500/20":"bg-blue-600 text-white shadow-blue-600/20",l=()=>i?"Final (F)":a===1?"Semifinals (SF)":a===2?"Quarterfinals (QF)":t.name;return n.jsxs("div",{className:"flex flex-col min-w-[240px] max-w-[260px] shrink-0",children:[n.jsxs("div",{className:Q("mb-4 rounded-xl px-4 py-2 text-center text-xs font-bold uppercase tracking-wider shadow-sm select-none transition-transform",o()),children:[l(),n.jsxs("span",{className:"block text-[10px] font-normal opacity-90 lowercase mt-0.5",children:[t.matches.length," ",t.matches.length===1?"match":"matches"]})]}),n.jsx("div",{className:"flex flex-1 flex-col justify-around py-2 gap-4",children:t.matches.map(c=>{const d=c.p1.playerId&&e.get(c.p1.playerId)||null,u=c.p2.playerId&&e.get(c.p2.playerId)||null;return n.jsx("div",{className:"flex justify-center my-auto py-2",children:n.jsx(bn,{match:c,player1:d,player2:u,isFinal:i,roundIndex:t.index,totalRounds:s,onClick:()=>r(c)})},c.id)})})]})},oo=({fixture:t,containerRef:e,zoom:s=1})=>{const[r,i]=w.useState([]),a=w.useCallback(()=>{const o=e.current;if(!o)return;const l=o.getBoundingClientRect(),c=[];for(let d=0;d<t.rounds.length-1;d++){const u=t.rounds[d],h=t.rounds[d+1];for(const f of u.matches){const m=Math.floor(f.index/2),g=h.matches[m];if(!g)continue;const v=o.querySelector(`[data-match-id="${f.id}"]`),p=o.querySelector(`[data-match-id="${g.id}"]`);if(!v||!p)continue;const I=v.getBoundingClientRect(),S=p.getBoundingClientRect(),x=(I.right-l.left)/s,C=(I.top+I.height/2-l.top)/s,j=f.index%2===0,P=(S.left-l.left)/s,A=((j?S.top+S.height*.35:S.top+S.height*.65)-l.top)/s,_=(x+P)/2,b=`M ${x} ${C} L ${_} ${C} L ${_} ${A} L ${P} ${A}`,y=!!(f.winnerId&&(g.p1.playerId===f.winnerId||g.p2.playerId===f.winnerId));c.push({id:`${f.id}-${g.id}`,d:b,isActive:y})}}i(c)},[t,e,s]);return w.useLayoutEffect(()=>{a();const o=e.current;if(!o)return;const l=new ResizeObserver(()=>{a()});l.observe(o),window.addEventListener("resize",a);const c=setTimeout(a,100);return()=>{l.disconnect(),window.removeEventListener("resize",a),clearTimeout(c)}},[a]),n.jsx("svg",{className:"pointer-events-none absolute inset-0 h-full w-full overflow-visible",style:{zIndex:0},xmlns:"http://www.w3.org/2000/svg",children:r.map(o=>n.jsx("path",{d:o.d,fill:"none",stroke:o.isActive?"#3b82f6":"#cbd5e1",strokeWidth:o.isActive?2.5:2,strokeLinecap:"round",strokeLinejoin:"round",className:"transition-all duration-300"},o.id))})},lo=({isOpen:t,onClose:e,match:s,player1:r,player2:i,roundName:a,hasDownstreamResults:o,onSaveResult:l,onResetMatch:c})=>{const[d,u]=w.useState(""),[h,f]=w.useState(""),[m,g]=w.useState(""),[v,p]=w.useState("points"),[I,S]=w.useState(null),[x,C]=w.useState(!1);w.useEffect(()=>{s&&(u(s.winnerId||""),f(s.score1!==void 0?s.score1.toString():""),g(s.score2!==void 0?s.score2.toString():""),p(s.resultType||"points"),S(null))},[s,t]);const j=y=>{f(y),S(null);const k=parseFloat(y),G=parseFloat(m);!isNaN(k)&&!isNaN(G)&&r&&i&&(k>G?u(r.id):G>k&&u(i.id))},P=y=>{g(y),S(null);const k=parseFloat(h),G=parseFloat(y);!isNaN(k)&&!isNaN(G)&&r&&i&&(k>G?u(r.id):G>k&&u(i.id))},N=()=>{const y=h!==""?parseFloat(h):void 0,k=m!==""?parseFloat(m):void 0;l(d,y,k,v),e()},A=y=>{if(y.preventDefault(),S(null),!d){S("Please select a match winner.");return}const k=h!==""?parseFloat(h):void 0,G=m!==""?parseFloat(m):void 0;if(k!==void 0&&G!==void 0&&k===G&&v==="points"){S("Scores cannot be tied in a match. Please adjust points or select result decision.");return}if(s.winnerId&&s.winnerId!==d&&o){C(!0);return}N()},_=r?r.name:s.p1.isBye?"BYE":"TBD",b=i?i.name:s.p2.isBye?"BYE":"TBD";return n.jsxs(n.Fragment,{children:[n.jsx($e,{isOpen:t,onClose:e,title:s.isThirdPlace?"Bronze Medal Playoff":a,subtitle:`Match #${s.index+1} Result Entry`,maxWidth:"md",footer:n.jsxs("div",{className:"flex items-center justify-between w-full",children:[n.jsx("div",{children:s.status==="done"&&n.jsx(L,{variant:"ghost",size:"sm",onClick:()=>{c(),e()},className:"text-rose-600 hover:bg-rose-50 hover:text-rose-700",icon:n.jsx(Wt,{className:"h-3.5 w-3.5"}),children:"Reset Match"})}),n.jsxs("div",{className:"flex items-center gap-2",children:[n.jsx(L,{variant:"outline",onClick:e,type:"button",children:"Cancel"}),n.jsx(L,{variant:"primary",onClick:A,disabled:!d,type:"button",children:"Save Result & Advance"})]})]}),children:n.jsxs("form",{onSubmit:A,className:"space-y-5",children:[I&&n.jsx("div",{className:"rounded-lg bg-rose-50 border border-rose-200 p-2.5 text-xs text-rose-700",children:I}),n.jsx("div",{className:"text-xs font-semibold uppercase tracking-wider text-slate-500 text-center",children:"Click player to designate winner or enter scores below"}),n.jsxs("div",{className:"space-y-3",children:[n.jsxs("div",{onClick:()=>r&&u(r.id),className:`cursor-pointer relative flex items-center justify-between p-3.5 rounded-xl border-2 transition-all ${d===(r==null?void 0:r.id)?"border-blue-600 bg-blue-50/70 shadow-sm":"border-slate-200 hover:border-slate-300 bg-white"} ${r?"":"opacity-50 pointer-events-none"}`,children:[n.jsxs("div",{className:"flex items-center gap-3",children:[n.jsx("div",{className:`flex h-7 w-7 items-center justify-center rounded-full border text-xs font-bold ${d===(r==null?void 0:r.id)?"bg-blue-600 text-white border-blue-600":"border-slate-300 text-slate-500"}`,children:d===(r==null?void 0:r.id)?n.jsx(rr,{className:"h-4 w-4"}):"1"}),n.jsxs("div",{children:[n.jsx("div",{className:"font-bold text-slate-900 text-sm",children:_}),(r==null?void 0:r.club)&&n.jsx("div",{className:"text-xs text-slate-500",children:r.club})]})]}),n.jsxs("div",{className:"flex items-center gap-2",onClick:y=>y.stopPropagation(),children:[n.jsx("label",{className:"text-[11px] font-bold text-slate-400 uppercase",children:"Points:"}),n.jsx("input",{type:"number",min:"0",max:"99",value:h,onChange:y=>j(y.target.value),className:"w-16 rounded-lg border border-slate-300 py-1.5 px-2 text-center text-sm font-bold text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500",placeholder:"0"})]})]}),n.jsx("div",{className:"text-center font-bold text-xs uppercase text-slate-400 my-1",children:"vs"}),n.jsxs("div",{onClick:()=>i&&u(i.id),className:`cursor-pointer relative flex items-center justify-between p-3.5 rounded-xl border-2 transition-all ${d===(i==null?void 0:i.id)?"border-blue-600 bg-blue-50/70 shadow-sm":"border-slate-200 hover:border-slate-300 bg-white"} ${i?"":"opacity-50 pointer-events-none"}`,children:[n.jsxs("div",{className:"flex items-center gap-3",children:[n.jsx("div",{className:`flex h-7 w-7 items-center justify-center rounded-full border text-xs font-bold ${d===(i==null?void 0:i.id)?"bg-blue-600 text-white border-blue-600":"border-slate-300 text-slate-500"}`,children:d===(i==null?void 0:i.id)?n.jsx(rr,{className:"h-4 w-4"}):"2"}),n.jsxs("div",{children:[n.jsx("div",{className:"font-bold text-slate-900 text-sm",children:b}),(i==null?void 0:i.club)&&n.jsx("div",{className:"text-xs text-slate-500",children:i.club})]})]}),n.jsxs("div",{className:"flex items-center gap-2",onClick:y=>y.stopPropagation(),children:[n.jsx("label",{className:"text-[11px] font-bold text-slate-400 uppercase",children:"Points:"}),n.jsx("input",{type:"number",min:"0",max:"99",value:m,onChange:y=>P(y.target.value),className:"w-16 rounded-lg border border-slate-300 py-1.5 px-2 text-center text-sm font-bold text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500",placeholder:"0"})]})]})]}),n.jsx(at,{label:"Method of Victory (Decision Type)",value:v,onChange:y=>p(y.target.value),options:gn.map(y=>({value:y.value,label:`${y.label} (${y.code})`})),helperText:"Official tournament victory classification criteria."})]})}),n.jsx(ht,{isOpen:x,onClose:()=>C(!1),onConfirm:N,title:"Warning: Downstream Matches Will Reset",variant:"danger",confirmText:"Change Winner & Reset Later Rounds",description:"Matches in subsequent rounds that depend on this result have already been completed. Changing the winner will clear those downstream match results and require them to be replayed. Do you wish to continue?"})]})},vn=({category:t,playersMap:e,onMatchClick:s})=>{const r=t.fixture;if(!r||t.thirdPlaceMode==="none")return null;if(t.thirdPlaceMode==="bronze-match"&&r.thirdPlace){const i=r.thirdPlace,a=i.p1.playerId&&e.get(i.p1.playerId)||null,o=i.p2.playerId&&e.get(i.p2.playerId)||null,l=i.winnerId?e.get(i.winnerId):null;return n.jsxs("div",{className:"mt-8 pt-6 border-t border-slate-200 flex flex-col items-center",children:[n.jsxs("div",{className:"flex items-center gap-2 mb-3",children:[n.jsx(nr,{className:"h-4 w-4 text-amber-700"}),n.jsx("h4",{className:"text-xs font-bold uppercase tracking-wider text-slate-700",children:"Bronze Medal Playoff (3rd Place)"})]}),n.jsxs("div",{className:"flex flex-col items-center",children:[n.jsx(bn,{match:i,player1:a,player2:o,roundIndex:0,totalRounds:1,onClick:()=>s(i)}),l&&n.jsxs("div",{className:"mt-2.5 flex items-center gap-1.5 px-3 py-1 bg-amber-100/80 border border-amber-300 rounded-full text-xs font-bold text-amber-950",children:[n.jsx(rn,{className:"h-3.5 w-3.5 text-amber-700"}),n.jsxs("span",{children:["Bronze Medalist: ",l.name]})]})]})]})}if(t.thirdPlaceMode==="two-bronze"&&r.twoBronze){const i=r.twoBronze.loser1Id?e.get(r.twoBronze.loser1Id):null,a=r.twoBronze.loser2Id?e.get(r.twoBronze.loser2Id):null;return n.jsxs("div",{className:"mt-8 pt-6 border-t border-slate-200 flex flex-col items-center",children:[n.jsxs("div",{className:"flex items-center gap-2 mb-3",children:[n.jsx(nr,{className:"h-4 w-4 text-amber-700"}),n.jsx("h4",{className:"text-xs font-bold uppercase tracking-wider text-slate-700",children:"Bronze Medalists (Semi-Final Losers)"})]}),n.jsxs("div",{className:"flex items-center gap-4 flex-wrap justify-center",children:[n.jsxs("div",{className:"flex items-center gap-3 px-4 py-2.5 rounded-xl border border-amber-200 bg-amber-50/70 text-xs",children:[n.jsx("div",{className:"h-7 w-7 rounded-full bg-amber-200 text-amber-800 flex items-center justify-center font-bold",children:"🥉"}),n.jsxs("div",{children:[n.jsx("div",{className:"font-bold text-slate-900",children:i?i.name:n.jsx("span",{className:"text-slate-400 italic",children:"Semi-final 1 Loser (TBD)"})}),(i==null?void 0:i.club)&&n.jsx("div",{className:"text-[10px] text-slate-500",children:i.club})]})]}),n.jsxs("div",{className:"flex items-center gap-3 px-4 py-2.5 rounded-xl border border-amber-200 bg-amber-50/70 text-xs",children:[n.jsx("div",{className:"h-7 w-7 rounded-full bg-amber-200 text-amber-800 flex items-center justify-center font-bold",children:"🥉"}),n.jsxs("div",{children:[n.jsx("div",{className:"font-bold text-slate-900",children:a?a.name:n.jsx("span",{className:"text-slate-400 italic",children:"Semi-final 2 Loser (TBD)"})}),(a==null?void 0:a.club)&&n.jsx("div",{className:"text-[10px] text-slate-500",children:a.club})]})]})]})]})}return null};function mr(t,e,s){if(t.getTextWidth(e)<=s)return e;let r=e;for(;r.length>0&&t.getTextWidth(r+"...")>s;)r=r.slice(0,-1);return r.length>0?r+"...":e}function fr(t,e,s,r,i){if(t.isThirdPlace)return e===1?"Runner-up of SF1":"Runner-up of SF2";const a=r-1-s;return i||a===0?e===1?"Winner of SF1":"Winner of SF2":a===1?t.index===0?e===1?"Winner of QF1":"Winner of QF2":e===1?"Winner of QF3":"Winner of QF4":a===2?`Winner of R16-${t.index*2+e}`:s>0?`Winner of Match #${t.index*2+e}`:"TBD"}function pr(t,e,s,r,i,a,o,l,c,d,u){const h=e.p1,f=e.p2,m=h.playerId?o.get(h.playerId):void 0,g=f.playerId?o.get(f.playerId):void 0,v=!!(e.winnerId&&h.playerId&&e.winnerId===h.playerId),p=!!(e.winnerId&&f.playerId&&e.winnerId===f.playerId),I=fr(e,1,l,c,d),S=fr(e,2,l,c,d);t.setFillColor(255,255,255),t.setDrawColor(71,85,105),t.setLineWidth(.75),t.rect(s,r,i,a,"FD");const x=r+a/2;t.setDrawColor(203,213,225),t.setLineWidth(.5),t.line(s,x,s+i,x);const C=u?"3P":xn(e,l,c,d);t.setFont("helvetica","bold"),t.setFontSize(6),t.setTextColor(100,116,139),t.text(C,s+i-2,r-2.5,{align:"right"}),v&&(t.setFillColor(37,99,235),t.rect(s,r,2.5,a/2,"F")),p&&(t.setFillColor(37,99,235),t.rect(s,x,2.5,a/2,"F")),t.setFont("helvetica","bold"),t.setFontSize(6.5),t.setTextColor(148,163,184),t.text("1",s+4.5,r+a*.32);let j;m?j=m.club?`${m.name} (${m.club})`:m.name:h.isBye?j="BYE":j=I,t.setFont("helvetica",v?"bold":"normal"),t.setFontSize(7.5),v?t.setTextColor(15,23,42):h.isBye||!h.playerId?t.setTextColor(100,116,139):t.setTextColor(51,65,85);const P=mr(t,j,i-38);t.text(P,s+11.5,r+a*.32);let N="";e.score1!==void 0?N=String(e.score1):(h.isBye||e.status==="ready"||e.status==="done")&&(N="-"),N&&(t.setFont("helvetica",v?"bold":"normal"),t.setFontSize(7.5),t.setTextColor(15,23,42),t.text(N,s+i-4,r+a*.32,{align:"right"})),t.setFont("helvetica","bold"),t.setFontSize(6.5),t.setTextColor(148,163,184),t.text("2",s+4.5,r+a*.82);let A;g?A=g.club?`${g.name} (${g.club})`:g.name:f.isBye?A="BYE":A=S,t.setFont("helvetica",p?"bold":"normal"),t.setFontSize(7.5),p?t.setTextColor(15,23,42):f.isBye||!f.playerId?t.setTextColor(100,116,139):t.setTextColor(51,65,85);const _=mr(t,A,i-38);t.text(_,s+11.5,r+a*.82);let b="";e.score2!==void 0?b=String(e.score2):(f.isBye||e.status==="ready"||e.status==="done")&&(b="-"),b&&(t.setFont("helvetica",p?"bold":"normal"),t.setFontSize(7.5),t.setTextColor(15,23,42),t.text(b,s+i-4,r+a*.82,{align:"right"}))}function gr(t,e,s,r,i,a,o,l,c,d){var Pe;const u=t.internal.pageSize.getWidth(),h=t.internal.pageSize.getHeight(),f=28,m=28,g=24,v=20,p=new Map;e.players.forEach(O=>p.set(O.id,O)),t.setFont("helvetica","bold"),t.setFontSize(8),t.setTextColor(100,116,139),t.text("TOURNAMENT KNOCKOUT FIXTURE",f,g+6),t.setFont("helvetica","bold"),t.setFontSize(14),t.setTextColor(15,23,42);const I=(s==null?void 0:s.name)||"TournaX Championship Tournament";t.text(I,f,g+22),t.setFont("helvetica","bold"),t.setFontSize(10),t.setTextColor(37,99,235);const S=`${e.name}  •  ${e.ageGroup}  •  ${e.gender||"Men / Boys"}`;t.text(S,f,g+36),t.setFont("helvetica","normal"),t.setFontSize(8),t.setTextColor(71,85,105);const x=[];s!=null&&s.date&&x.push(`Date: ${s.date}`),s!=null&&s.venue&&x.push(`Venue: ${s.venue}`),x.length>0&&t.text(x.join("  |  "),u-m,g+10,{align:"right"});const C=e.fixture?e.fixture.size:e.players.length;t.text(`Total Players: ${e.players.length}  |  ${C}-Slot Knockout Bracket`,u-m,g+22,{align:"right"}),t.setFont("helvetica","bold"),t.setFontSize(9),t.setTextColor(180,83,9),t.text(`[ ${c} ]`,u-m,g+36,{align:"right"}),t.setDrawColor(203,213,225),t.setLineWidth(.75),t.line(f,g+44,u-m,g+44);const j=g+64,N=h-v-18-j,A=u-f-m,_=r.length;if(_===0)return;let b=140;_<=2?b=160:_===3?b=150:_===4?b=138:b=118;const y=_>1?Math.max(38,(A-_*b)/(_-1)):0,k=Math.max(1,r[0].matches.length),G=N/k,K=Math.min(34,Math.max(22,G-8)),F=new Map,se=f;r[0].matches.forEach((O,$)=>{const B=j+($+.5)*G,W=B-K/2;F.set(O.id,{x:se,y:W,centerY:B})});for(let O=1;O<_;O++){const $=f+O*(b+y),B=r[O-1],W=r[O];W.matches.forEach((T,D)=>{const ee=T.index*2,ie=T.index*2+1,X=B.matches.find(re=>re.index===ee),te=B.matches.find(re=>re.index===ie);let V;if(X&&te&&F.has(X.id)&&F.has(te.id)){const re=F.get(X.id).centerY,Ae=F.get(te.id).centerY;V=(re+Ae)/2}else if(X&&F.has(X.id))V=F.get(X.id).centerY;else if(te&&F.has(te.id))V=F.get(te.id).centerY;else{const re=N/W.matches.length;V=j+(D+.5)*re}const tt=V-K/2;F.set(T.id,{x:$,y:tt,centerY:V})})}t.setDrawColor(71,85,105),t.setLineWidth(.85);for(let O=1;O<_;O++){const $=f+O*(b+y),B=r[O-1];r[O].matches.forEach(T=>{const D=T.index*2,ee=T.index*2+1,ie=B.matches.find(V=>V.index===D),X=B.matches.find(V=>V.index===ee),te=F.get(T.id);if(te){if(ie&&X&&F.has(ie.id)&&F.has(X.id)){const V=F.get(ie.id),tt=F.get(X.id),re=V.x+b,Ae=re+y/2;t.line(re,V.centerY,Ae,V.centerY),t.line(re,tt.centerY,Ae,tt.centerY),t.line(Ae,V.centerY,Ae,tt.centerY),t.line(Ae,te.centerY,$,te.centerY)}else if(ie&&F.has(ie.id)){const V=F.get(ie.id);t.line(V.x+b,V.centerY,$,te.centerY)}else if(X&&F.has(X.id)){const V=F.get(X.id);t.line(V.x+b,V.centerY,$,te.centerY)}}})}if(r.forEach((O,$)=>{const B=f+$*(b+y);t.setFont("helvetica","bold"),t.setFontSize(8),t.setTextColor(30,41,59),t.text(O.name.toUpperCase(),B+b/2,j-8,{align:"center"}),t.setDrawColor(226,232,240),t.setLineWidth(.5),t.line(B+8,j-4,B+b-8,j-4);const W=$===_-1&&l==="ALL";O.matches.forEach(T=>{const D=F.get(T.id);D&&pr(t,T,D.x,D.y,b,K,p,O.index,i,W)})}),["QF1","QF2","QF3","QF4"].includes(l)){const O=r[r.length-1],$=O==null?void 0:O.matches[0];if($&&F.has($.id)){const B=F.get($.id),W=B.x+b,T=W+26;t.setDrawColor(37,99,235),t.setLineWidth(1.2),t.line(W,B.centerY,T,B.centerY),t.line(T,B.centerY,T-4,B.centerY-3),t.line(T,B.centerY,T-4,B.centerY+3);const D=l==="QF1"||l==="QF2"?"Semifinal 1 (SF1)":"Semifinal 2 (SF2)";t.setFont("helvetica","bold"),t.setFontSize(7.5),t.setTextColor(37,99,235),t.text(`Advances to ${D}`,T+6,B.centerY+2.5)}}if(d&&((Pe=e.fixture)!=null&&Pe.thirdPlace)&&e.thirdPlaceMode==="bronze-match"){const O=e.fixture.thirdPlace,$=f+(_-1)*(b+y),B=h-v-K-8;t.setFont("helvetica","bold"),t.setFontSize(6.5),t.setTextColor(180,83,9),t.text("3RD PLACE BRONZE PLAYOFF",$+b/2,B-3,{align:"center"}),pr(t,O,$,B,b,K,p,i-1,i,!1,!0)}t.setFont("helvetica","normal"),t.setFontSize(7),t.setTextColor(148,163,184),t.text("TournaX Tournament Planner  •  Official Knockout Fixture Sheet (A4 Vector Format)",f,h-8),t.text(`Page ${a} of ${o}`,u-m,h-8,{align:"right"})}async function hs(t,e,s){const r=t.fixture;if(!r||r.rounds.length===0)throw new Error("No fixture available to export.");const i=r.rounds.length,a=(s==null?void 0:s.section)||"ALL",o=new ia({orientation:"landscape",unit:"pt",format:"a4"});if(a==="ALL"&&t.players.length>16&&i>=3){const d=[{id:"QF1",label:"Section 1 (➔ QF1)",rounds:We(r,"QF1",i),includeThirdPlace:!1},{id:"QF2",label:"Section 2 (➔ QF2)",rounds:We(r,"QF2",i),includeThirdPlace:!1},{id:"QF3",label:"Section 3 (➔ QF3)",rounds:We(r,"QF3",i),includeThirdPlace:!1},{id:"QF4",label:"Section 4 (➔ QF4)",rounds:We(r,"QF4",i),includeThirdPlace:!1},{id:"FINALS",label:"Finals Stage (QF, SF & Final F)",rounds:We(r,"FINALS",i),includeThirdPlace:!0}],u=d.length;d.forEach((h,f)=>{f>0&&o.addPage("a4","landscape"),gr(o,t,e,h.rounds,i,f+1,u,h.id,h.label,h.includeThirdPlace)})}else{const d=We(r,a,i),u=(s==null?void 0:s.sectionLabel)||(a==="ALL"?"Complete Tournament Bracket":a==="FINALS"?"Finals Stage (SF & Final F)":`Section ${a}`);gr(o,t,e,d,i,1,1,a,u,a==="ALL"||a==="FINALS")}const l=t.name.replace(/[^a-zA-Z0-9_-]/g,"_"),c=s!=null&&s.sectionLabel?`_${s.sectionLabel.replace(/[^a-zA-Z0-9_-]/g,"_")}`:a!=="ALL"?`_${a}`:"_Complete";o.save(`${l}${c}_A4.pdf`)}function We(t,e,s){if(e==="ALL"||s<3)return t.rounds;if(e==="FINALS")return t.rounds.filter(i=>i.index>=s-3);const r=s-3;return t.rounds.filter(i=>i.index<=r).map(i=>({...i,matches:i.matches.filter(a=>Cs(a,i.index,s)===e)})).filter(i=>i.matches.length>0)}const co=({category:t,tournament:e,bracketElementRef:s,onExportSectionPdf:r})=>{const[i,a]=w.useState(!1),[o,l]=w.useState(!1),c=t.fixture,d=c&&c.rounds.length>=3,u=async()=>{try{l(!0),a(!1),r?await r("ALL","Full Fixture"):await hs(t,e,{section:"ALL",sectionLabel:"Complete Fixture"})}catch(m){console.error(m),alert("Error generating PDF. Please try again.")}finally{l(!1)}},h=async(m,g)=>{try{l(!0),a(!1),r?await r(m,g):await hs(t,e,{section:m,sectionLabel:g})}catch(v){console.error(v),alert("Error generating section PDF. Please try again.")}finally{l(!1)}},f=()=>{a(!1),window.print()};return n.jsxs("div",{className:"relative inline-block text-left",children:[n.jsxs(L,{variant:"primary",size:"sm",onClick:()=>a(!i),disabled:o,icon:n.jsx(Pt,{className:"h-4 w-4 text-white"}),className:"font-bold shadow-xs",children:[n.jsx("span",{children:o?"Generating PDF...":"Export PDF (A4)"}),n.jsx(Qi,{className:"h-3 w-3 text-white/80 ml-1"})]}),i&&n.jsxs(n.Fragment,{children:[n.jsx("div",{className:"fixed inset-0 z-20",onClick:()=>a(!1)}),n.jsxs("div",{className:"absolute right-0 mt-1.5 w-64 rounded-2xl bg-white p-2 shadow-2xl border border-slate-200 z-30 animate-in fade-in zoom-in-95 text-xs",children:[n.jsxs("div",{className:"px-2.5 py-1.5 border-b border-slate-100 flex items-center justify-between",children:[n.jsx("span",{className:"text-[10px] uppercase font-bold tracking-wider text-slate-400",children:"A4 PDF Exports"}),n.jsx("span",{className:"text-[9px] font-bold px-1.5 py-0.5 rounded bg-blue-50 text-blue-700",children:"Auto Landscape/Portrait"})]}),n.jsxs("button",{onClick:u,className:"flex w-full items-start gap-2.5 rounded-xl p-2.5 text-slate-700 hover:bg-blue-50 hover:text-blue-950 transition-colors text-left mt-1",children:[n.jsx(Pt,{className:"h-4 w-4 text-blue-600 mt-0.5 shrink-0"}),n.jsxs("div",{children:[n.jsx("span",{className:"font-bold text-slate-900 block",children:"Export Complete Bracket (A4)"}),n.jsx("span",{className:"text-[11px] text-slate-500 block leading-tight mt-0.5",children:"Complete tournament fixture scaled to single A4 sheet"})]})]}),d&&r&&n.jsxs("div",{className:"my-1.5 py-1.5 border-t border-b border-slate-100",children:[n.jsxs("div",{className:"px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5",children:[n.jsx(js,{className:"h-3 w-3 text-amber-500"}),n.jsx("span",{children:"Section PDF Exports (A4)"})]}),n.jsxs("div",{className:"grid grid-cols-2 gap-1 px-1 mt-1",children:[n.jsx("button",{onClick:()=>h("QF1","Section 1 - QF1"),className:"px-2 py-1.5 rounded-lg bg-amber-50/80 hover:bg-amber-100 text-amber-950 font-bold text-[11px] text-left transition-colors flex items-center justify-between",children:n.jsx("span",{children:"Section 1 (QF1)"})}),n.jsx("button",{onClick:()=>h("QF2","Section 2 - QF2"),className:"px-2 py-1.5 rounded-lg bg-amber-50/80 hover:bg-amber-100 text-amber-950 font-bold text-[11px] text-left transition-colors flex items-center justify-between",children:n.jsx("span",{children:"Section 2 (QF2)"})}),n.jsx("button",{onClick:()=>h("QF3","Section 3 - QF3"),className:"px-2 py-1.5 rounded-lg bg-amber-50/80 hover:bg-amber-100 text-amber-950 font-bold text-[11px] text-left transition-colors flex items-center justify-between",children:n.jsx("span",{children:"Section 3 (QF3)"})}),n.jsx("button",{onClick:()=>h("QF4","Section 4 - QF4"),className:"px-2 py-1.5 rounded-lg bg-amber-50/80 hover:bg-amber-100 text-amber-950 font-bold text-[11px] text-left transition-colors flex items-center justify-between",children:n.jsx("span",{children:"Section 4 (QF4)"})})]}),n.jsx("div",{className:"px-1 mt-1.5",children:n.jsx("button",{onClick:()=>h("FINALS","Finals Stage - SF and Final"),className:"w-full px-2.5 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-950 font-bold text-[11px] text-left transition-colors flex items-center justify-between",children:n.jsx("span",{children:"Finals Stage (SF1, SF2 & Final F)"})})})]}),n.jsxs("button",{onClick:f,className:"flex w-full items-center gap-2.5 rounded-xl px-2.5 py-2 text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-colors mt-0.5",children:[n.jsx(on,{className:"h-4 w-4 text-slate-600 shrink-0"}),n.jsx("span",{children:"Print Fixture (A4)"})]})]})]})]})},uo=({category:t})=>{var W;const{tournament:e,generateCategoryFixture:s,toggleLockFixture:r,updateThirdPlaceMode:i,recordMatchResult:a,resetCategoryMatch:o,resetCategoryFixture:l}=Je(),c=t.fixture,d=w.useRef(null),u=w.useRef(null),[h,f]=w.useState(1),[m,g]=w.useState(null),[v,p]=w.useState(!1),[I,S]=w.useState(!1),[x,C]=w.useState("ALL"),[j,P]=w.useState(!0),[N,A]=w.useState(!1),_=w.useMemo(()=>{const T=new Map;return t.players.forEach(D=>T.set(D.id,D)),T},[t.players]);if(!c)return null;const b=c.rounds.length,y=b>=3,k=w.useMemo(()=>{if(x==="ALL"||!y)return c.rounds;if(x==="FINALS")return c.rounds.filter(D=>D.index>=b-2);const T=b-3;return c.rounds.filter(D=>D.index<=T).map(D=>({...D,matches:D.matches.filter(ee=>Cs(ee,D.index,b)===x)})).filter(D=>D.matches.length>0)},[c.rounds,x,y,b]),G=w.useMemo(()=>{var T;for(const D of c.rounds)for(const ee of D.matches)if(ee.status==="done"&&!ee.p2.isBye||ee.winnerId&&!ee.p2.isBye)return!0;return!!((T=c.thirdPlace)!=null&&T.winnerId)},[c]),K=c.rounds[c.rounds.length-1],F=K==null?void 0:K.matches[0],se=F&&F.status==="done"&&F.winnerId?_.get(F.winnerId):null,Pe=()=>{c.locked||(G?p(!0):s(t.id))},O=T=>{g(T)},$=w.useMemo(()=>{if(!m)return"";if(m.isThirdPlace)return"3rd Place Bronze Match";const T=c.rounds.find(D=>D.index===m.round);return T?T.name:`Round ${m.round+1}`},[m,c]),B=async(T,D)=>{await hs(t,e,{section:T,sectionLabel:D})};return n.jsxs("div",{className:"space-y-4 w-full",children:[se&&n.jsxs("div",{className:"rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 p-5 text-slate-950 shadow-md flex flex-col sm:flex-row items-center justify-between gap-4 animate-in fade-in",children:[n.jsxs("div",{className:"flex items-center gap-3.5",children:[n.jsx("div",{className:"flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950 text-amber-400 shadow-md",children:n.jsx(zt,{className:"h-7 w-7"})}),n.jsxs("div",{children:[n.jsx("div",{className:"text-xs uppercase font-extrabold tracking-widest text-slate-900/80",children:"Tournament Champion"}),n.jsx("div",{className:"text-xl font-black text-slate-950 leading-tight",children:se.name}),se.club&&n.jsx("div",{className:"text-xs font-semibold text-slate-900/90",children:se.club})]})]}),n.jsx("div",{className:"flex items-center gap-2",children:n.jsx("span",{className:"px-3 py-1 rounded-full bg-slate-950 text-amber-400 text-xs font-extrabold uppercase tracking-wider",children:"1st Place - Gold"})})]}),n.jsxs("div",{className:"flex flex-wrap items-center justify-between gap-3 bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs print:hidden",children:[n.jsxs("div",{className:"flex items-center gap-2 flex-wrap",children:[n.jsx(L,{variant:c.locked?"secondary":"outline",size:"sm",onClick:()=>r(t.id),icon:c.locked?n.jsx(Is,{className:"h-3.5 w-3.5 text-amber-400"}):n.jsx(Yi,{className:"h-3.5 w-3.5 text-slate-400"}),children:c.locked?"Fixture Locked":"Lock Fixture"}),n.jsx(L,{variant:"outline",size:"sm",onClick:Pe,disabled:c.locked,icon:n.jsx(Ji,{className:"h-3.5 w-3.5 text-slate-500"}),title:c.locked?"Unlock fixture to re-draw":"Re-draw tournament bracket",children:"Re-Draw Bracket"}),n.jsx("div",{className:"h-6 w-px bg-slate-200 hidden sm:block mx-1"}),n.jsxs("div",{className:"flex items-center gap-1.5 text-xs text-slate-600",children:[n.jsx("span",{className:"font-semibold text-slate-500 hidden md:inline",children:"Playoff:"}),n.jsxs("select",{value:t.thirdPlaceMode,disabled:c.locked,onChange:T=>i(t.id,T.target.value),className:"rounded-lg border border-slate-300 bg-slate-50 px-2 py-1 text-xs font-medium text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:opacity-60",children:[n.jsx("option",{value:"bronze-match",children:"Bronze Match Play-off"}),n.jsx("option",{value:"two-bronze",children:"Two Bronze Medals"}),n.jsx("option",{value:"none",children:"No 3rd Place Match"})]})]})]}),n.jsxs("div",{className:"flex items-center gap-2 flex-wrap",children:[n.jsx("button",{type:"button",onClick:()=>P(!j),className:`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all shadow-xs ${j?"bg-blue-600 text-white hover:bg-blue-700 shadow-blue-500/20":"bg-white text-slate-700 border border-slate-300 hover:bg-slate-50"}`,title:j?"Collapse bracket to standard width":"Expand bracket to full width",children:j?n.jsxs(n.Fragment,{children:[n.jsx(Qt,{className:"h-3.5 w-3.5 text-blue-200"}),n.jsx("span",{children:"Expanded View"}),n.jsx("span",{className:"px-1.5 py-0.5 rounded text-[10px] font-black bg-blue-500 text-white uppercase tracking-wider",children:"Active"})]}):n.jsxs(n.Fragment,{children:[n.jsx(ir,{className:"h-3.5 w-3.5 text-slate-600"}),n.jsx("span",{children:"Expand Full"})]})}),n.jsxs("div",{className:"flex items-center rounded-lg border border-slate-200 bg-slate-50 p-0.5 text-slate-600",children:[n.jsx("button",{onClick:()=>f(T=>Math.max(.6,Math.round((T-.1)*10)/10)),className:"p-1 rounded hover:bg-white text-slate-600 hover:text-slate-900 transition-colors",title:"Zoom out",children:n.jsx(Xi,{className:"h-3.5 w-3.5"})}),n.jsxs("span",{className:"px-2 text-[11px] font-mono font-semibold text-slate-700 min-w-[3rem] text-center",children:[Math.round(h*100),"%"]}),n.jsx("button",{onClick:()=>f(T=>Math.min(1.5,Math.round((T+.1)*10)/10)),className:"p-1 rounded hover:bg-white text-slate-600 hover:text-slate-900 transition-colors",title:"Zoom in",children:n.jsx(Zi,{className:"h-3.5 w-3.5"})}),n.jsx("button",{onClick:()=>f(1),className:"p-1 rounded hover:bg-white text-slate-400 hover:text-slate-700 transition-colors",title:"Reset Zoom to 100%",children:n.jsx(Wt,{className:"h-3 w-3"})}),n.jsx("button",{onClick:()=>A(!N),className:`p-1 rounded transition-colors ${N?"bg-amber-400 text-slate-950 font-bold":"hover:bg-white text-slate-500 hover:text-slate-900"}`,title:N?"Exit Full Screen":"Full Screen View",children:N?n.jsx(Qt,{className:"h-3.5 w-3.5"}):n.jsx(ir,{className:"h-3.5 w-3.5"})})]}),n.jsx(co,{category:t,tournament:e,bracketElementRef:d,onExportSectionPdf:B}),n.jsx(L,{variant:"ghost",size:"sm",onClick:()=>S(!0),className:"text-slate-400 hover:text-rose-600 hover:bg-rose-50",title:"Reset fixture completely",children:"Reset"})]})]}),y&&n.jsxs("div",{className:"flex flex-wrap items-center justify-between gap-2.5 bg-slate-900 text-white px-4 py-2.5 rounded-2xl border border-slate-800 shadow-md",children:[n.jsxs("div",{className:"flex items-center gap-2",children:[n.jsx(js,{className:"h-4 w-4 text-amber-400 shrink-0"}),n.jsx("span",{className:"text-xs font-bold uppercase tracking-wider text-amber-300",children:"Bracket Section View:"})]}),n.jsx("div",{className:"flex items-center gap-1.5 flex-wrap",children:[{id:"ALL",label:`Full Bracket (${t.players.length} Players)`},{id:"QF1",label:"Section 1 (➔ QF1)"},{id:"QF2",label:"Section 2 (➔ QF2)"},{id:"QF3",label:"Section 3 (➔ QF3)"},{id:"QF4",label:"Section 4 (➔ QF4)"},{id:"FINALS",label:"Finals (SF & Final F)"}].map(T=>n.jsx("button",{type:"button",onClick:()=>C(T.id),className:`px-3 py-1 rounded-xl text-xs font-bold transition-all ${x===T.id?"bg-amber-400 text-slate-950 shadow-md":"bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white"}`,children:T.label},T.id))})]}),n.jsxs("div",{className:`w-full bg-slate-50/50 rounded-2xl overflow-x-auto min-h-[620px] border border-slate-200/90 shadow-2xs transition-all ${N?"fixed inset-0 z-50 rounded-none border-none bg-slate-950 p-4 sm:p-6 min-h-screen overflow-auto":j?"relative left-1/2 -translate-x-1/2 w-[calc(100vw-2.5rem)] max-w-[1920px] shadow-lg border-blue-200 bg-white/80 p-2 sm:p-4":""}`,children:[N&&n.jsxs("div",{className:"mb-4 flex items-center justify-between pb-3 border-b border-slate-800 text-white",children:[n.jsxs("div",{className:"flex items-center gap-3",children:[n.jsxs("span",{className:"text-lg font-black text-white",children:[t.name," : Full Tab Fixture View"]}),n.jsx("span",{className:"text-xs px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 font-bold",children:x==="ALL"?"Full Bracket":`Section: ${x}`})]}),n.jsxs("button",{onClick:()=>A(!1),className:"px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold flex items-center gap-1.5 border border-slate-700 transition-colors",children:[n.jsx(Qt,{className:"h-4 w-4 text-amber-400"}),n.jsx("span",{children:"Exit Full Screen"})]})]}),n.jsxs("div",{ref:d,className:"p-4 sm:p-6 bg-white inline-block min-w-full rounded-xl",style:{transform:h!==1?`scale(${h})`:void 0,transformOrigin:"top left",transition:"transform 100ms ease-out"},children:[n.jsxs("div",{className:"mb-6 pb-4 border-b border-slate-200 flex items-center justify-between",children:[n.jsxs("div",{children:[n.jsx("div",{className:"text-xs uppercase font-extrabold tracking-widest text-blue-600",children:"Official Knockout Bracket"}),n.jsx("h2",{className:"text-xl font-black text-slate-900",children:t.name}),n.jsxs("div",{className:"text-xs text-slate-500 mt-0.5",children:[e.name," • ",t.players.length," Players • ",c.size,"-Slot Bracket",x!=="ALL"&&n.jsxs("span",{className:"ml-2 font-bold text-amber-600",children:["[Viewing: ",x==="FINALS"?"Finals Stage":`Section ${x}`,"]"]})]})]}),n.jsx("div",{className:"text-right",children:n.jsxs("span",{className:"text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200",children:[t.ageGroup," / ",t.gender||"Men / Boys"]})})]}),n.jsxs("div",{ref:u,className:"relative flex items-stretch gap-16 py-6 overflow-visible",style:{minHeight:`${(((W=k[0])==null?void 0:W.matches.length)||c.rounds[0].matches.length)*85+120}px`},children:[n.jsx(oo,{fixture:c,containerRef:u,zoom:h}),k.map(T=>n.jsx(wn,{round:T,playersMap:_,totalRounds:c.rounds.length,onMatchClick:O},T.index))]}),(x==="ALL"||x==="FINALS")&&n.jsx(vn,{category:t,playersMap:_,onMatchClick:O})]})]}),m&&n.jsx(lo,{isOpen:!0,onClose:()=>g(null),match:m,player1:m.p1.playerId&&_.get(m.p1.playerId)||null,player2:m.p2.playerId&&_.get(m.p2.playerId)||null,roundName:$,hasDownstreamResults:pa(c,m),onSaveResult:(T,D,ee,ie)=>{a(t.id,m.id,T,D,ee,ie)},onResetMatch:()=>{o(t.id,m.id)}}),n.jsx(ht,{isOpen:v,onClose:()=>p(!1),onConfirm:()=>s(t.id),title:"Re-draw Bracket & Lose Entered Scores?",variant:"warning",confirmText:"Yes, Re-draw Bracket",description:"Matches in this category already have recorded scores or winners. Re-drawing will generate a new randomized draw and discard all entered match results. Are you sure you want to proceed?"}),n.jsx(ht,{isOpen:I,onClose:()=>S(!1),onConfirm:()=>l(t.id),title:"Reset Fixture?",variant:"danger",confirmText:"Reset Fixture",description:"This will remove the current bracket and all entered match scores, unlocking the roster so you can add or remove players."})]})},ho=()=>{const{id:t}=en();Oi();const{categories:e,tournament:s,updateCategory:r,addPlayer:i,updatePlayer:a,removePlayer:o,bulkAddPlayers:l,importPlayers:c,generateCategoryFixture:d,resetCategoryFixture:u}=Je(),h=e.find(N=>N.id===t),[f,m]=w.useState(h!=null&&h.fixture?"fixture":"players"),[g,v]=w.useState(!1),[p,I]=w.useState(!1),[S,x]=w.useState(!1);if(!h)return n.jsxs("div",{className:"py-16 text-center",children:[n.jsx("h2",{className:"text-xl font-bold text-slate-800",children:"Category Not Found"}),n.jsx("p",{className:"text-sm text-slate-500 mt-2",children:"The category you are looking for does not exist."}),n.jsx(Qe,{to:"/",className:"mt-4 inline-block",children:n.jsx(L,{variant:"primary",children:"Return to Dashboard"})})]});const C=!!h.fixture,j=h.players.length,P=()=>{j<2||(d(h.id),m("fixture"))};return n.jsxs("div",{className:"space-y-6",children:[n.jsxs("div",{className:"flex items-center gap-2 text-xs text-slate-500",children:[n.jsxs(Qe,{to:"/",className:"hover:text-blue-600 flex items-center gap-1",children:[n.jsx(ea,{className:"h-3.5 w-3.5"}),"Dashboard"]}),n.jsx("span",{children:"/"}),n.jsx("span",{className:"font-semibold text-slate-700 truncate",children:h.name})]}),n.jsxs("div",{className:"rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4",children:[n.jsxs("div",{children:[n.jsxs("div",{className:"flex flex-wrap items-center gap-2 mb-1.5",children:[n.jsx(he,{variant:"purple",size:"sm",children:h.ageGroup}),n.jsx(he,{variant:"slate",size:"sm",children:h.gender||"Men / Boys"}),n.jsx(he,{variant:C?"blue":"slate",size:"sm",children:C?"Fixture Drawn":"Roster In Preparation"})]}),n.jsxs("div",{className:"flex items-center gap-3",children:[n.jsx("h1",{className:"text-2xl font-black text-slate-900 tracking-tight",children:h.name}),n.jsx("button",{onClick:()=>v(!0),className:"p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors",title:"Edit Category Name & Parameters",children:n.jsx(Ns,{className:"h-4 w-4"})})]}),n.jsxs("div",{className:"mt-2 flex flex-wrap items-center gap-4 text-xs text-slate-500",children:[n.jsxs("span",{children:["Weight Limit:"," ",n.jsx("strong",{className:"text-slate-700 font-semibold",children:h.weightMin!==null&&h.weightMax!==null?`${h.weightMin}kg to ${h.weightMax}kg`:h.weightMax!==null?`Under ${h.weightMax}kg`:h.weightMin!==null?`Above ${h.weightMin}kg`:"Open Weight"})]}),n.jsx("span",{children:"•"}),n.jsxs("span",{children:["Playoff Mode:"," ",n.jsx("strong",{className:"text-slate-700 font-semibold",children:h.thirdPlaceMode==="bronze-match"?"Bronze Match Playoff":h.thirdPlaceMode==="two-bronze"?"2 Bronze Medals":"Gold & Silver Only"})]})]})]}),n.jsxs("div",{className:"flex items-center gap-2.5 shrink-0",children:[C&&n.jsx(L,{variant:"outline",size:"sm",icon:n.jsx(Pt,{className:"h-4 w-4 text-rose-500"}),onClick:()=>m("fixture"),children:"Export PDF (A4)"}),!C&&n.jsx(L,{variant:"primary",size:"md",disabled:j<2,icon:n.jsx(jt,{className:"h-4 w-4"}),onClick:P,children:"Generate Fixture"})]})]}),n.jsxs("div",{className:"flex border-b border-slate-200",children:[n.jsxs("button",{onClick:()=>m("players"),className:`flex items-center gap-2 py-3 px-5 text-sm font-bold border-b-2 transition-colors ${f==="players"?"border-blue-600 text-blue-600":"border-transparent text-slate-500 hover:text-slate-800"}`,children:[n.jsx(dt,{className:"h-4 w-4"}),n.jsx("span",{children:"Players Roster"}),n.jsx("span",{className:`px-2 py-0.5 text-xs rounded-full font-bold ${f==="players"?"bg-blue-100 text-blue-700":"bg-slate-100 text-slate-600"}`,children:j})]}),n.jsxs("button",{onClick:()=>m("fixture"),className:`flex items-center gap-2 py-3 px-5 text-sm font-bold border-b-2 transition-colors ${f==="fixture"?"border-blue-600 text-blue-600":"border-transparent text-slate-500 hover:text-slate-800"}`,children:[n.jsx(ut,{className:"h-4 w-4"}),n.jsx("span",{children:"Knockout Fixture"}),C&&n.jsx("span",{className:`px-2 py-0.5 text-xs rounded-full font-bold ${f==="fixture"?"bg-blue-100 text-blue-700":"bg-slate-100 text-slate-600"}`,children:"Active"})]})]}),f==="players"&&n.jsxs("div",{className:"space-y-6",children:[!C&&n.jsx(ro,{onAdd:N=>i(h.id,N),disabled:C}),n.jsx(no,{players:h.players,isFixtureActive:C,onUpdatePlayer:(N,A)=>a(h.id,N,A),onRemovePlayer:N=>o(h.id,N),onResetFixture:()=>u(h.id),onOpenBulkAdd:()=>I(!0),onOpenCsvImport:()=>x(!0)}),!C&&j>=2&&n.jsxs("div",{className:"flex items-center justify-between p-5 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl shadow-xs",children:[n.jsxs("div",{children:[n.jsx("h4",{className:"text-sm font-bold text-blue-950",children:"Ready to Draw Knockout Bracket?"}),n.jsxs("p",{className:"text-xs text-blue-700 mt-0.5",children:["You have ",j," registered players. The system will auto-calculate byes and perform an unbiased Fisher-Yates draw."]})]}),n.jsx(L,{variant:"primary",size:"md",onClick:P,icon:n.jsx(jt,{className:"h-4 w-4"}),children:"Generate Fixture Now"})]})]}),f==="fixture"&&n.jsx("div",{className:"w-full -mx-1 sm:-mx-3 md:-mx-4 lg:-mx-6 px-1 sm:px-3 md:px-4 lg:px-6",children:C?n.jsx(uo,{category:h}):n.jsxs("div",{className:"rounded-3xl border-2 border-dashed border-slate-300 bg-white p-12 text-center shadow-xs",children:[n.jsx("div",{className:"mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 mb-4",children:n.jsx(ut,{className:"h-8 w-8"})}),n.jsx("h3",{className:"text-lg font-bold text-slate-900",children:"No Fixture Bracket Generated Yet"}),n.jsx("p",{className:"mx-auto mt-1.5 max-w-md text-xs text-slate-500 leading-relaxed",children:j<2?"Add at least 2 players to the roster to generate the knockout tournament bracket.":`You have ${j} players ready in the roster. Click below to randomly draw the knockout fixture bracket.`}),n.jsx("div",{className:"mt-6 flex justify-center gap-3",children:j<2?n.jsx(L,{variant:"primary",onClick:()=>m("players"),children:"Go to Players Roster"}):n.jsx(L,{variant:"primary",size:"lg",icon:n.jsx(jt,{className:"h-5 w-5"}),onClick:P,children:"Draw Knockout Bracket Now"})})]})}),n.jsx(_s,{isOpen:g,onClose:()=>v(!1),initialData:h,onSubmit:N=>r(h.id,N)}),n.jsx(io,{isOpen:p,onClose:()=>I(!1),onAdd:(N,A)=>l(h.id,N,A)}),n.jsx(ao,{isOpen:S,onClose:()=>x(!1),onImport:N=>c(h.id,N)})]})},xr=()=>{const{id:t}=en(),{categories:e,tournament:s}=Je(),r=t?e.filter(i=>i.id===t):e.filter(i=>i.fixture!==null);return n.jsxs("div",{className:"bg-white min-h-screen p-8 text-slate-900 print:p-0",children:[n.jsxs("div",{className:"mb-6 flex items-center justify-between border-b pb-4 print:hidden",children:[n.jsx(Qe,{to:"/",children:n.jsx(L,{variant:"outline",size:"sm",icon:n.jsx(ta,{className:"h-4 w-4"}),children:"Back to App"})}),n.jsx(L,{variant:"primary",size:"sm",icon:n.jsx(on,{className:"h-4 w-4"}),onClick:()=>window.print(),children:"Print Now"})]}),r.length===0?n.jsx("div",{className:"text-center py-12 text-slate-500",children:"No categories with active fixtures found."}):r.map(i=>{const a=i.fixture;if(!a)return null;const o=new Map;return i.players.forEach(l=>o.set(l.id,l)),n.jsxs("div",{className:"page-break mb-12 border-b border-slate-300 pb-12 print:mb-0 print:border-none print:pb-0",style:{pageBreakAfter:"always"},children:[n.jsxs("div",{className:"mb-6 border-b-2 border-slate-800 pb-3 flex justify-between items-end",children:[n.jsxs("div",{children:[n.jsx("h1",{className:"text-xl font-black uppercase tracking-wider text-slate-900",children:s.name}),n.jsx("h2",{className:"text-lg font-bold text-blue-700",children:i.name})]}),n.jsxs("div",{className:"text-right text-xs text-slate-500",children:[s.venue&&n.jsxs("div",{children:["Venue: ",s.venue]}),s.date&&n.jsxs("div",{children:["Date: ",Vt(s.date)]}),n.jsxs("div",{children:["Total Players: ",i.players.length]})]})]}),n.jsx("div",{className:"relative flex items-stretch gap-12 py-4 overflow-visible",children:a.rounds.map(l=>n.jsx(wn,{round:l,playersMap:o,totalRounds:a.rounds.length,onMatchClick:()=>{}},l.index))}),n.jsx(vn,{category:i,playersMap:o,onMatchClick:()=>{}})]},i.id)})]})};function mo(){const[t,e]=w.useState(!0);return n.jsxs(Fi,{children:[n.jsx(Za,{isOpen:t,onClose:()=>e(!1)}),n.jsxs(Xs,{children:[n.jsx(st,{path:"/print/:id",element:n.jsx(xr,{})}),n.jsx(st,{path:"/print-all",element:n.jsx(xr,{})}),n.jsx(st,{path:"*",element:n.jsxs("div",{className:"min-h-screen bg-slate-50 flex flex-col overflow-x-hidden",children:[n.jsx(Xa,{}),n.jsx("main",{className:"flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8",children:n.jsxs(Xs,{children:[n.jsx(st,{path:"/",element:n.jsx(so,{})}),n.jsx(st,{path:"/category/:id",element:n.jsx(ho,{})})]})}),n.jsx("footer",{className:"border-t border-slate-200 bg-white py-5 text-xs text-slate-500 print:hidden",children:n.jsxs("div",{className:"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3",children:[n.jsxs("div",{className:"flex items-center gap-1.5 font-medium text-slate-700",children:[n.jsx("span",{children:"© 2026 TournaX."}),n.jsx("span",{children:"Tournament Knockout Fixture Planner & Scoring System"})]}),n.jsxs("div",{className:"flex items-center gap-4",children:[n.jsx("span",{className:"text-slate-400 hidden md:inline",children:"Supports 2 to 128 Players • Automatic Bye Distribution"}),n.jsxs("div",{className:"flex items-center gap-2",children:[n.jsxs("a",{href:"mailto:mohank12092003@gmail.com",className:"flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-slate-600 hover:text-blue-600 hover:bg-blue-50 transition-all font-medium",title:"Send email to mohank12092003@gmail.com",children:[n.jsx(sa,{className:"h-4 w-4 text-blue-600"}),n.jsx("span",{children:"Email"})]}),n.jsxs("a",{href:"https://www.linkedin.com/in/mohank17/",target:"_blank",rel:"noopener noreferrer",className:"flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-slate-600 hover:text-blue-600 hover:bg-blue-50 transition-all font-medium",title:"LinkedIn Profile",children:[n.jsx(ra,{className:"h-4 w-4 text-blue-600"}),n.jsx("span",{children:"LinkedIn"})]})]})]})]})})]})})]})]})}const fo=()=>{};var br={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yn=function(t){const e=[];let s=0;for(let r=0;r<t.length;r++){let i=t.charCodeAt(r);i<128?e[s++]=i:i<2048?(e[s++]=i>>6|192,e[s++]=i&63|128):(i&64512)===55296&&r+1<t.length&&(t.charCodeAt(r+1)&64512)===56320?(i=65536+((i&1023)<<10)+(t.charCodeAt(++r)&1023),e[s++]=i>>18|240,e[s++]=i>>12&63|128,e[s++]=i>>6&63|128,e[s++]=i&63|128):(e[s++]=i>>12|224,e[s++]=i>>6&63|128,e[s++]=i&63|128)}return e},po=function(t){const e=[];let s=0,r=0;for(;s<t.length;){const i=t[s++];if(i<128)e[r++]=String.fromCharCode(i);else if(i>191&&i<224){const a=t[s++];e[r++]=String.fromCharCode((i&31)<<6|a&63)}else if(i>239&&i<365){const a=t[s++],o=t[s++],l=t[s++],c=((i&7)<<18|(a&63)<<12|(o&63)<<6|l&63)-65536;e[r++]=String.fromCharCode(55296+(c>>10)),e[r++]=String.fromCharCode(56320+(c&1023))}else{const a=t[s++],o=t[s++];e[r++]=String.fromCharCode((i&15)<<12|(a&63)<<6|o&63)}}return e.join("")},Nn={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(t,e){if(!Array.isArray(t))throw Error("encodeByteArray takes an array as a parameter");this.init_();const s=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let i=0;i<t.length;i+=3){const a=t[i],o=i+1<t.length,l=o?t[i+1]:0,c=i+2<t.length,d=c?t[i+2]:0,u=a>>2,h=(a&3)<<4|l>>4;let f=(l&15)<<2|d>>6,m=d&63;c||(m=64,o||(f=64)),r.push(s[u],s[h],s[f],s[m])}return r.join("")},encodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(t):this.encodeByteArray(yn(t),e)},decodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(t):po(this.decodeStringToByteArray(t,e))},decodeStringToByteArray(t,e){this.init_();const s=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let i=0;i<t.length;){const a=s[t.charAt(i++)],l=i<t.length?s[t.charAt(i)]:0;++i;const d=i<t.length?s[t.charAt(i)]:64;++i;const h=i<t.length?s[t.charAt(i)]:64;if(++i,a==null||l==null||d==null||h==null)throw new go;const f=a<<2|l>>4;if(r.push(f),d!==64){const m=l<<4&240|d>>2;if(r.push(m),h!==64){const g=d<<6&192|h;r.push(g)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let t=0;t<this.ENCODED_VALS.length;t++)this.byteToCharMap_[t]=this.ENCODED_VALS.charAt(t),this.charToByteMap_[this.byteToCharMap_[t]]=t,this.byteToCharMapWebSafe_[t]=this.ENCODED_VALS_WEBSAFE.charAt(t),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[t]]=t,t>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(t)]=t,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(t)]=t)}}};class go extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const xo=function(t){const e=yn(t);return Nn.encodeByteArray(e,!0)},In=function(t){return xo(t).replace(/\./g,"")},jn=function(t){try{return Nn.decodeString(t,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function bo(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wo=()=>bo().__FIREBASE_DEFAULTS__,vo=()=>{if(typeof process>"u"||typeof br>"u")return;const t=br.__FIREBASE_DEFAULTS__;if(t)return JSON.parse(t)},yo=()=>{if(typeof document>"u")return;let t;try{t=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=t&&jn(t[1]);return e&&JSON.parse(e)},ks=()=>{try{return fo()||wo()||vo()||yo()}catch(t){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${t}`);return}},No=t=>{var e,s;return(s=(e=ks())==null?void 0:e.emulatorHosts)==null?void 0:s[t]},Sn=()=>{var t;return(t=ks())==null?void 0:t.config},_n=t=>{var e;return(e=ks())==null?void 0:e[`_${t}`]};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Io{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,s)=>{this.resolve=e,this.reject=s})}wrapCallback(e){return(s,r)=>{s?this.reject(s):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(s):e(s,r))}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function J(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function jo(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(J())}function So(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function Ts(){const t=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof t=="object"&&t.id!==void 0}function _o(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function Co(){const t=J();return t.indexOf("MSIE ")>=0||t.indexOf("Trident/")>=0}function Es(){try{return typeof indexedDB=="object"}catch{return!1}}function Ps(){return new Promise((t,e)=>{try{let s=!0;const r="validate-browser-context-for-indexeddb-analytics-module",i=self.indexedDB.open(r);i.onsuccess=()=>{i.result.close(),s||self.indexedDB.deleteDatabase(r),t(!0)},i.onupgradeneeded=()=>{s=!1},i.onerror=()=>{var a;e(((a=i.error)==null?void 0:a.message)||"")}}catch(s){e(s)}})}function Cn(){return!(typeof navigator>"u"||!navigator.cookieEnabled)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ko="FirebaseError";class de extends Error{constructor(e,s,r){super(s),this.code=e,this.customData=r,this.name=ko,Object.setPrototypeOf(this,de.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,ze.prototype.create)}}class ze{constructor(e,s,r){this.service=e,this.serviceName=s,this.errors=r}create(e,...s){const r=s[0]||{},i=`${this.service}/${e}`,a=this.errors[e],o=a?To(a,r):"Error",l=`${this.serviceName}: ${o} (${i}).`;return new de(i,l,r)}}function To(t,e){try{let s=0,r="";for(;s<t.length;){const i=t.indexOf("{$",s);if(i===-1){r+=t.substring(s);break}const a=t.indexOf("}",i+2);if(a===-1){r+=t.substring(s);break}const o=t.substring(i+2,a),l=e[o];r+=t.substring(s,i)+(l!=null?String(l):`<${o}?>`),s=a+1}return r}catch{return t}}function Eo(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}function Fe(t,e){if(t===e)return!0;const s=Object.keys(t),r=Object.keys(e);for(const i of s){if(!r.includes(i))return!1;const a=t[i],o=e[i];if(wr(a)&&wr(o)){if(!Fe(a,o))return!1}else if(a!==o)return!1}for(const i of r)if(!s.includes(i))return!1;return!0}function wr(t){return t!==null&&typeof t=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function gt(t){const e=[];for(const[s,r]of Object.entries(t))Array.isArray(r)?r.forEach(i=>{e.push(encodeURIComponent(s)+"="+encodeURIComponent(i))}):e.push(encodeURIComponent(s)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}function Po(t,e){const s=new Ao(t,e);return s.subscribe.bind(s)}class Ao{constructor(e,s){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=s,this.task.then(()=>{e(this)}).catch(r=>{this.error(r)})}next(e){this.forEachObserver(s=>{s.next(e)})}error(e){this.forEachObserver(s=>{s.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,s,r){let i;if(e===void 0&&s===void 0&&r===void 0)throw new Error("Missing Observer.");Ro(e,["next","error","complete"])?i=e:i={next:e,error:s,complete:r},i.next===void 0&&(i.next=es),i.error===void 0&&(i.error=es),i.complete===void 0&&(i.complete=es);const a=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?i.error(this.finalError):i.complete()}catch{}}),this.observers.push(i),a}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let s=0;s<this.observers.length;s++)this.sendOne(s,e)}sendOne(e,s){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{s(this.observers[e])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function Ro(t,e){if(typeof t!="object"||t===null)return!1;for(const s of e)if(s in t&&typeof t[s]=="function")return!0;return!1}function es(){}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Mo=1e3,Lo=2,Oo=14400*1e3,Fo=.5;function vr(t,e=Mo,s=Lo){const r=e*Math.pow(s,t),i=Math.round(Fo*r*(Math.random()-.5)*2);return Math.min(Oo,r+i)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ye(t){return t&&t._delegate?t._delegate:t}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function As(t){try{return(t.startsWith("http://")||t.startsWith("https://")?new URL(t).hostname:t).endsWith(".cloudworkstations.dev")}catch{return!1}}async function Do(t){return(await fetch(t,{credentials:"include"})).ok}class ce{constructor(e,s,r){this.name=e,this.instanceFactory=s,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Re="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bo{constructor(e,s){this.name=e,this.container=s,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const s=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(s)){const r=new Io;if(this.instancesDeferred.set(s,r),this.isInitialized(s)||this.shouldAutoInitialize())try{const i=this.getOrInitializeService({instanceIdentifier:s});i&&r.resolve(i)}catch{}}return this.instancesDeferred.get(s).promise}getImmediate(e){const s=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),r=(e==null?void 0:e.optional)??!1;if(this.isInitialized(s)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:s})}catch(i){if(r)return null;throw i}else{if(r)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if($o(e))try{this.getOrInitializeService({instanceIdentifier:Re})}catch{}for(const[s,r]of this.instancesDeferred.entries()){const i=this.normalizeInstanceIdentifier(s);try{const a=this.getOrInitializeService({instanceIdentifier:i});r.resolve(a)}catch{}}}}clearInstance(e=Re){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(s=>"INTERNAL"in s).map(s=>s.INTERNAL.delete()),...e.filter(s=>"_delete"in s).map(s=>s._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=Re){return this.instances.has(e)}getOptions(e=Re){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:s={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const i=this.getOrInitializeService({instanceIdentifier:r,options:s});for(const[a,o]of this.instancesDeferred.entries()){const l=this.normalizeInstanceIdentifier(a);r===l&&o.resolve(i)}return i}onInit(e,s){const r=this.normalizeInstanceIdentifier(s),i=this.onInitCallbacks.get(r)??new Set;i.add(e),this.onInitCallbacks.set(r,i);const a=this.instances.get(r);return a&&e(a,r),()=>{i.delete(e)}}invokeOnInitCallbacks(e,s){const r=this.onInitCallbacks.get(s);if(r)for(const i of r)try{i(e,s)}catch{}}getOrInitializeService({instanceIdentifier:e,options:s={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:Uo(e),options:s}),this.instances.set(e,r),this.instancesOptions.set(e,s),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=Re){return this.component?this.component.multipleInstances?e:Re:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function Uo(t){return t===Re?void 0:t}function $o(t){return t.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zo{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const s=this.getProvider(e.name);if(s.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);s.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const s=new Bo(e,this);return this.providers.set(e,s),s}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var U;(function(t){t[t.DEBUG=0]="DEBUG",t[t.VERBOSE=1]="VERBOSE",t[t.INFO=2]="INFO",t[t.WARN=3]="WARN",t[t.ERROR=4]="ERROR",t[t.SILENT=5]="SILENT"})(U||(U={}));const Wo={debug:U.DEBUG,verbose:U.VERBOSE,info:U.INFO,warn:U.WARN,error:U.ERROR,silent:U.SILENT},Vo=U.INFO,Go={[U.DEBUG]:"log",[U.VERBOSE]:"log",[U.INFO]:"info",[U.WARN]:"warn",[U.ERROR]:"error"},Ho=(t,e,...s)=>{if(e<t.logLevel)return;const r=new Date().toISOString(),i=Go[e];if(i)console[i](`[${r}]  ${t.name}:`,...s);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class Rs{constructor(e){this.name=e,this._logLevel=Vo,this._logHandler=Ho,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in U))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?Wo[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,U.DEBUG,...e),this._logHandler(this,U.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,U.VERBOSE,...e),this._logHandler(this,U.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,U.INFO,...e),this._logHandler(this,U.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,U.WARN,...e),this._logHandler(this,U.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,U.ERROR,...e),this._logHandler(this,U.ERROR,...e)}}const qo=(t,e)=>e.some(s=>t instanceof s);let yr,Nr;function Ko(){return yr||(yr=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Qo(){return Nr||(Nr=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const kn=new WeakMap,ms=new WeakMap,Tn=new WeakMap,ts=new WeakMap,Ms=new WeakMap;function Yo(t){const e=new Promise((s,r)=>{const i=()=>{t.removeEventListener("success",a),t.removeEventListener("error",o)},a=()=>{s(Ee(t.result)),i()},o=()=>{r(t.error),i()};t.addEventListener("success",a),t.addEventListener("error",o)});return e.then(s=>{s instanceof IDBCursor&&kn.set(s,t)}).catch(()=>{}),Ms.set(e,t),e}function Jo(t){if(ms.has(t))return;const e=new Promise((s,r)=>{const i=()=>{t.removeEventListener("complete",a),t.removeEventListener("error",o),t.removeEventListener("abort",o)},a=()=>{s(),i()},o=()=>{r(t.error||new DOMException("AbortError","AbortError")),i()};t.addEventListener("complete",a),t.addEventListener("error",o),t.addEventListener("abort",o)});ms.set(t,e)}let fs={get(t,e,s){if(t instanceof IDBTransaction){if(e==="done")return ms.get(t);if(e==="objectStoreNames")return t.objectStoreNames||Tn.get(t);if(e==="store")return s.objectStoreNames[1]?void 0:s.objectStore(s.objectStoreNames[0])}return Ee(t[e])},set(t,e,s){return t[e]=s,!0},has(t,e){return t instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in t}};function Xo(t){fs=t(fs)}function Zo(t){return t===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...s){const r=t.call(ss(this),e,...s);return Tn.set(r,e.sort?e.sort():[e]),Ee(r)}:Qo().includes(t)?function(...e){return t.apply(ss(this),e),Ee(kn.get(this))}:function(...e){return Ee(t.apply(ss(this),e))}}function el(t){return typeof t=="function"?Zo(t):(t instanceof IDBTransaction&&Jo(t),qo(t,Ko())?new Proxy(t,fs):t)}function Ee(t){if(t instanceof IDBRequest)return Yo(t);if(ts.has(t))return ts.get(t);const e=el(t);return e!==t&&(ts.set(t,e),Ms.set(e,t)),e}const ss=t=>Ms.get(t);function En(t,e,{blocked:s,upgrade:r,blocking:i,terminated:a}={}){const o=indexedDB.open(t,e),l=Ee(o);return r&&o.addEventListener("upgradeneeded",c=>{r(Ee(o.result),c.oldVersion,c.newVersion,Ee(o.transaction),c)}),s&&o.addEventListener("blocked",c=>s(c.oldVersion,c.newVersion,c)),l.then(c=>{a&&c.addEventListener("close",()=>a()),i&&c.addEventListener("versionchange",d=>i(d.oldVersion,d.newVersion,d))}).catch(()=>{}),l}const tl=["get","getKey","getAll","getAllKeys","count"],sl=["put","add","delete","clear"],rs=new Map;function Ir(t,e){if(!(t instanceof IDBDatabase&&!(e in t)&&typeof e=="string"))return;if(rs.get(e))return rs.get(e);const s=e.replace(/FromIndex$/,""),r=e!==s,i=sl.includes(s);if(!(s in(r?IDBIndex:IDBObjectStore).prototype)||!(i||tl.includes(s)))return;const a=async function(o,...l){const c=this.transaction(o,i?"readwrite":"readonly");let d=c.store;return r&&(d=d.index(l.shift())),(await Promise.all([d[s](...l),i&&c.done]))[0]};return rs.set(e,a),a}Xo(t=>({...t,get:(e,s,r)=>Ir(e,s)||t.get(e,s,r),has:(e,s)=>!!Ir(e,s)||t.has(e,s)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rl{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(s=>{if(nl(s)){const r=s.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(s=>s).join(" ")}}function nl(t){const e=t.getComponent();return(e==null?void 0:e.type)==="VERSION"}const ps="@firebase/app",jr="0.16.3";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xe=new Rs("@firebase/app"),il="@firebase/app-compat",al="@firebase/analytics-compat",ol="@firebase/analytics",ll="@firebase/app-check-compat",cl="@firebase/app-check",dl="@firebase/auth",ul="@firebase/auth-compat",hl="@firebase/database",ml="@firebase/data-connect",fl="@firebase/database-compat",pl="@firebase/functions",gl="@firebase/functions-compat",xl="@firebase/installations",bl="@firebase/installations-compat",wl="@firebase/messaging",vl="@firebase/messaging-compat",yl="@firebase/performance",Nl="@firebase/performance-compat",Il="@firebase/remote-config",jl="@firebase/remote-config-compat",Sl="@firebase/storage",_l="@firebase/storage-compat",Cl="@firebase/firestore",kl="@firebase/ai",Tl="@firebase/firestore-compat",El="firebase",Pl="13.0.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gs="[DEFAULT]",Al={[ps]:"fire-core",[il]:"fire-core-compat",[ol]:"fire-analytics",[al]:"fire-analytics-compat",[cl]:"fire-app-check",[ll]:"fire-app-check-compat",[dl]:"fire-auth",[ul]:"fire-auth-compat",[hl]:"fire-rtdb",[ml]:"fire-data-connect",[fl]:"fire-rtdb-compat",[pl]:"fire-fn",[gl]:"fire-fn-compat",[xl]:"fire-iid",[bl]:"fire-iid-compat",[wl]:"fire-fcm",[vl]:"fire-fcm-compat",[yl]:"fire-perf",[Nl]:"fire-perf-compat",[Il]:"fire-rc",[jl]:"fire-rc-compat",[Sl]:"fire-gcs",[_l]:"fire-gcs-compat",[Cl]:"fire-fst",[Tl]:"fire-fst-compat",[kl]:"fire-vertex","fire-js":"fire-js",[El]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mt=new Map,Rl=new Map,xs=new Map;function Sr(t,e){try{t.container.addComponent(e)}catch(s){xe.debug(`Component ${e.name} failed to register with FirebaseApp ${t.name}`,s)}}function be(t){const e=t.name;if(xs.has(e))return xe.debug(`There were multiple attempts to register component ${e}.`),!1;xs.set(e,t);for(const s of mt.values())Sr(s,t);for(const s of Rl.values())Sr(s,t);return!0}function Ze(t,e){const s=t.container.getProvider("heartbeat").getImmediate({optional:!0});return s&&s.triggerHeartbeat(),t.container.getProvider(e)}function me(t){return t==null?!1:t.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ml={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different {$mismatchedParam}. Existing: '{$oldValue}'. New: '{$newValue}'.","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},fe=new ze("app","Firebase",Ml);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ll{constructor(e,s,r){this._isDeleted=!1,this._options={...e},this._config={...s},this._name=s.name,this._automaticDataCollectionEnabled=s.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new ce("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw fe.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xt=Pl;function Pn(t,e={}){let s=t;typeof e!="object"&&(e={name:e});const r={name:gs,automaticDataCollectionEnabled:!0,...e},i=r.name;if(typeof i!="string"||!i)throw fe.create("bad-app-name",{appName:String(i)});if(s||(s=Sn()),!s)throw fe.create("no-options");const a=mt.get(i);if(a)if(Fe(s,a.options)){if(Fe(r,a.config))return a;throw fe.create("duplicate-app",{appName:i,mismatchedParam:"config",oldValue:JSON.stringify(a.config),newValue:JSON.stringify(r)})}else throw fe.create("duplicate-app",{appName:i,mismatchedParam:"options",oldValue:JSON.stringify(a.options),newValue:JSON.stringify(s)});const o=new zo(i);for(const c of xs.values())o.addComponent(c);const l=new Ll(s,r,o);return mt.set(i,l),l}function Ls(t=gs){const e=mt.get(t);if(!e&&t===gs&&Sn())return Pn();if(!e)throw fe.create("no-app",{appName:t});return e}function Ol(){return Array.from(mt.values())}function ae(t,e,s){let r=Al[t]??t;s&&(r+=`-${s}`);const i=r.match(/\s|\//),a=e.match(/\s|\//);if(i||a){const o=[`Unable to register library "${r}" with version "${e}":`];i&&o.push(`library name "${r}" contains illegal characters (whitespace or "/")`),i&&a&&o.push("and"),a&&o.push(`version name "${e}" contains illegal characters (whitespace or "/")`),xe.warn(o.join(" "));return}be(new ce(`${r}-version`,()=>({library:r,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Fl="firebase-heartbeat-database",Dl=1,ft="firebase-heartbeat-store";let ns=null;function An(){return ns||(ns=En(Fl,Dl,{upgrade:(t,e)=>{switch(e){case 0:try{t.createObjectStore(ft)}catch(s){console.warn(s)}}}}).catch(t=>{throw fe.create("idb-open",{originalErrorMessage:t.message})})),ns}async function Bl(t){try{const s=(await An()).transaction(ft),r=await s.objectStore(ft).get(Rn(t));return await s.done,r}catch(e){if(e instanceof de)xe.warn(e.message);else{const s=fe.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});xe.warn(s.message)}}}async function _r(t,e){try{const r=(await An()).transaction(ft,"readwrite");await r.objectStore(ft).put(e,Rn(t)),await r.done}catch(s){if(s instanceof de)xe.warn(s.message);else{const r=fe.create("idb-set",{originalErrorMessage:s==null?void 0:s.message});xe.warn(r.message)}}}function Rn(t){return`${t.name}!${t.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ul=1024,$l=30;class zl{constructor(e){this.container=e,this._heartbeatsCache=null;const s=this.container.getProvider("app").getImmediate();this._storage=new Vl(s),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){var e,s;try{const i=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),a=Cr();if(((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((s=this._heartbeatsCache)==null?void 0:s.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===a||this._heartbeatsCache.heartbeats.some(o=>o.date===a))return;if(this._heartbeatsCache.heartbeats.push({date:a,agent:i}),this._heartbeatsCache.heartbeats.length>$l){const o=Gl(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(o,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(r){xe.warn(r)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const s=Cr(),{heartbeatsToSend:r,unsentEntries:i}=Wl(this._heartbeatsCache.heartbeats),a=In(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=s,i.length>0?(this._heartbeatsCache.heartbeats=i,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),a}catch(s){return xe.warn(s),""}}}function Cr(){return new Date().toISOString().substring(0,10)}function Wl(t,e=Ul){const s=[];let r=t.slice();for(const i of t){const a=s.find(o=>o.agent===i.agent);if(a){if(a.dates.push(i.date),kr(s)>e){a.dates.pop();break}}else if(s.push({agent:i.agent,dates:[i.date]}),kr(s)>e){s.pop();break}r=r.slice(1)}return{heartbeatsToSend:s,unsentEntries:r}}class Vl{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return Es()?Ps().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const s=await Bl(this.app);return s!=null&&s.heartbeats?s:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){const r=await this.read();return _r(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){if(await this._canUseIndexedDBPromise){const r=await this.read();return _r(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:[...r.heartbeats,...e.heartbeats]})}else return}}function kr(t){return In(JSON.stringify({version:2,heartbeats:t})).length}function Gl(t){if(t.length===0)return-1;let e=0,s=t[0].date;for(let r=1;r<t.length;r++)t[r].date<s&&(s=t[r].date,e=r);return e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Hl(t){be(new ce("platform-logger",e=>new rl(e),"PRIVATE")),be(new ce("heartbeat",e=>new zl(e),"PRIVATE")),ae(ps,jr,t),ae(ps,jr,"esm2020"),ae("fire-js","")}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Hl("");var ql="firebase",Kl="13.0.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ae(ql,Kl,"app");const Mn="@firebase/installations",Os="0.6.24";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ln=1e4,On=`w:${Os}`,Fn="FIS_v2",Ql="https://firebaseinstallations.googleapis.com/v1",Yl=3600*1e3,Jl="installations",Xl="Installations";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Zl={"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"not-registered":"Firebase Installation is not registered.","installation-not-found":"Firebase Installation not found.","request-failed":'{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',"app-offline":"Could not process request. Application offline.","delete-pending-registration":"Can't delete installation while there is a pending registration request."},De=new ze(Jl,Xl,Zl);function Dn(t){return t instanceof de&&t.code.includes("request-failed")}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Bn({projectId:t}){return`${Ql}/projects/${t}/installations`}function Un(t){return{token:t.token,requestStatus:2,expiresIn:tc(t.expiresIn),creationTime:Date.now()}}async function $n(t,e){const r=(await e.json()).error;return De.create("request-failed",{requestName:t,serverCode:r.code,serverMessage:r.message,serverStatus:r.status})}function zn({apiKey:t}){return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":t})}function ec(t,{refreshToken:e}){const s=zn(t);return s.append("Authorization",sc(e)),s}async function Wn(t){const e=await t();return e.status>=500&&e.status<600?t():e}function tc(t){return Number(t.replace("s","000"))}function sc(t){return`${Fn} ${t}`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function rc({appConfig:t,heartbeatServiceProvider:e},{fid:s}){const r=Bn(t),i=zn(t),a=e.getImmediate({optional:!0});if(a){const d=await a.getHeartbeatsHeader();d&&i.append("x-firebase-client",d)}const o={fid:s,authVersion:Fn,appId:t.appId,sdkVersion:On},l={method:"POST",headers:i,body:JSON.stringify(o)},c=await Wn(()=>fetch(r,l));if(c.ok){const d=await c.json();return{fid:d.fid||s,registrationStatus:2,refreshToken:d.refreshToken,authToken:Un(d.authToken)}}else throw await $n("Create Installation",c)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Vn(t){return new Promise(e=>{setTimeout(e,t)})}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function nc(t){return btoa(String.fromCharCode(...t)).replace(/\+/g,"-").replace(/\//g,"_")}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ic=/^[cdef][\w-]{21}$/,bs="";function ac(){try{const t=new Uint8Array(17);(self.crypto||self.msCrypto).getRandomValues(t),t[0]=112+t[0]%16;const s=oc(t);return ic.test(s)?s:bs}catch{return bs}}function oc(t){return nc(t).substr(0,22)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Gt(t){return`${t.appName}!${t.appId}`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Gn=new Map;function Hn(t,e){const s=Gt(t);qn(s,e),lc(s,e)}function qn(t,e){const s=Gn.get(t);if(s)for(const r of s)r(e)}function lc(t,e){const s=cc();s&&s.postMessage({key:t,fid:e}),dc()}let Me=null;function cc(){return!Me&&"BroadcastChannel"in self&&(Me=new BroadcastChannel("[Firebase] FID Change"),Me.onmessage=t=>{qn(t.data.key,t.data.fid)}),Me}function dc(){Gn.size===0&&Me&&(Me.close(),Me=null)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const uc="firebase-installations-database",hc=1,Be="firebase-installations-store";let is=null;function Fs(){return is||(is=En(uc,hc,{upgrade:(t,e)=>{switch(e){case 0:t.createObjectStore(Be)}}})),is}async function At(t,e){const s=Gt(t),i=(await Fs()).transaction(Be,"readwrite"),a=i.objectStore(Be),o=await a.get(s);return await a.put(e,s),await i.done,(!o||o.fid!==e.fid)&&Hn(t,e.fid),e}async function Kn(t){const e=Gt(t),r=(await Fs()).transaction(Be,"readwrite");await r.objectStore(Be).delete(e),await r.done}async function Ht(t,e){const s=Gt(t),i=(await Fs()).transaction(Be,"readwrite"),a=i.objectStore(Be),o=await a.get(s),l=e(o);return l===void 0?await a.delete(s):await a.put(l,s),await i.done,l&&(!o||o.fid!==l.fid)&&Hn(t,l.fid),l}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ds(t){let e;const s=await Ht(t.appConfig,r=>{const i=mc(r),a=fc(t,i);return e=a.registrationPromise,a.installationEntry});return s.fid===bs?{installationEntry:await e}:{installationEntry:s,registrationPromise:e}}function mc(t){const e=t||{fid:ac(),registrationStatus:0};return Qn(e)}function fc(t,e){if(e.registrationStatus===0){if(!navigator.onLine){const i=Promise.reject(De.create("app-offline"));return{installationEntry:e,registrationPromise:i}}const s={fid:e.fid,registrationStatus:1,registrationTime:Date.now()},r=pc(t,s);return{installationEntry:s,registrationPromise:r}}else return e.registrationStatus===1?{installationEntry:e,registrationPromise:gc(t)}:{installationEntry:e}}async function pc(t,e){try{const s=await rc(t,e);return At(t.appConfig,s)}catch(s){throw Dn(s)&&s.customData.serverCode===409?await Kn(t.appConfig):await At(t.appConfig,{fid:e.fid,registrationStatus:0}),s}}async function gc(t){let e=await Tr(t.appConfig);for(;e.registrationStatus===1;)await Vn(100),e=await Tr(t.appConfig);if(e.registrationStatus===0){const{installationEntry:s,registrationPromise:r}=await Ds(t);return r||s}return e}function Tr(t){return Ht(t,e=>{if(!e)throw De.create("installation-not-found");return Qn(e)})}function Qn(t){return xc(t)?{fid:t.fid,registrationStatus:0}:t}function xc(t){return t.registrationStatus===1&&t.registrationTime+Ln<Date.now()}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function bc({appConfig:t,heartbeatServiceProvider:e},s){const r=wc(t,s),i=ec(t,s),a=e.getImmediate({optional:!0});if(a){const d=await a.getHeartbeatsHeader();d&&i.append("x-firebase-client",d)}const o={installation:{sdkVersion:On,appId:t.appId}},l={method:"POST",headers:i,body:JSON.stringify(o)},c=await Wn(()=>fetch(r,l));if(c.ok){const d=await c.json();return Un(d)}else throw await $n("Generate Auth Token",c)}function wc(t,{fid:e}){return`${Bn(t)}/${e}/authTokens:generate`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Bs(t,e=!1){let s;const r=await Ht(t.appConfig,a=>{if(!Yn(a))throw De.create("not-registered");const o=a.authToken;if(!e&&Nc(o))return a;if(o.requestStatus===1)return s=vc(t,e),a;{if(!navigator.onLine)throw De.create("app-offline");const l=jc(a);return s=yc(t,l),l}});return s?await s:r.authToken}async function vc(t,e){let s=await Er(t.appConfig);for(;s.authToken.requestStatus===1;)await Vn(100),s=await Er(t.appConfig);const r=s.authToken;return r.requestStatus===0?Bs(t,e):r}function Er(t){return Ht(t,e=>{if(!Yn(e))throw De.create("not-registered");const s=e.authToken;return Sc(s)?{...e,authToken:{requestStatus:0}}:e})}async function yc(t,e){try{const s=await bc(t,e),r={...e,authToken:s};return await At(t.appConfig,r),s}catch(s){if(Dn(s)&&(s.customData.serverCode===401||s.customData.serverCode===404))await Kn(t.appConfig);else{const r={...e,authToken:{requestStatus:0}};await At(t.appConfig,r)}throw s}}function Yn(t){return t!==void 0&&t.registrationStatus===2}function Nc(t){return t.requestStatus===2&&!Ic(t)}function Ic(t){const e=Date.now();return e<t.creationTime||t.creationTime+t.expiresIn<e+Yl}function jc(t){const e={requestStatus:1,requestTime:Date.now()};return{...t,authToken:e}}function Sc(t){return t.requestStatus===1&&t.requestTime+Ln<Date.now()}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function _c(t){const e=t,{installationEntry:s,registrationPromise:r}=await Ds(e);return r?r.catch(console.error):Bs(e).catch(console.error),s.fid}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Cc(t,e=!1){const s=t;return await kc(s),(await Bs(s,e)).token}async function kc(t){const{registrationPromise:e}=await Ds(t);e&&await e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Tc(t){if(!t||!t.options)throw as("App Configuration");if(!t.name)throw as("App Name");const e=["projectId","apiKey","appId"];for(const s of e)if(!t.options[s])throw as(s);return{appName:t.name,projectId:t.options.projectId,apiKey:t.options.apiKey,appId:t.options.appId}}function as(t){return De.create("missing-app-config-values",{valueName:t})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Jn="installations",Ec="installations-internal",Pc=t=>{const e=t.getProvider("app").getImmediate(),s=Tc(e),r=Ze(e,"heartbeat");return{app:e,appConfig:s,heartbeatServiceProvider:r,_delete:()=>Promise.resolve()}},Ac=t=>{const e=t.getProvider("app").getImmediate(),s=Ze(e,Jn).getImmediate();return{getId:()=>_c(s),getToken:i=>Cc(s,i)}};function Rc(){be(new ce(Jn,Pc,"PUBLIC")),be(new ce(Ec,Ac,"PRIVATE"))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Rc();ae(Mn,Os);ae(Mn,Os,"esm2020");/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Rt="analytics",Mc="firebase_id",Lc="origin",Oc=60*1e3,Fc="https://firebase.googleapis.com/v1alpha/projects/-/apps/{app-id}/webConfig",Us="https://www.googletagmanager.com/gtag/js";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Y=new Rs("@firebase/analytics");/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Dc={"already-exists":"A Firebase Analytics instance with the appId {$id}  already exists. Only one Firebase Analytics instance can be created for each appId.","already-initialized":"initializeAnalytics() cannot be called again with different options than those it was initially called with. It can be called again with the same options to return the existing instance, or getAnalytics() can be used to get a reference to the already-initialized instance.","already-initialized-settings":"Firebase Analytics has already been initialized.settings() must be called before initializing any Analytics instanceor it will have no effect.","interop-component-reg-failed":"Firebase Analytics Interop Component failed to instantiate: {$reason}","invalid-analytics-context":"Firebase Analytics is not supported in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}","indexeddb-unavailable":"IndexedDB unavailable or restricted in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}","fetch-throttle":"The config fetch request timed out while in an exponential backoff state. Unix timestamp in milliseconds when fetch request throttling ends: {$throttleEndTimeMillis}.","config-fetch-failed":"Dynamic config fetch failed: [{$httpStatus}] {$responseMessage}","no-api-key":'The "apiKey" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid API key.',"no-app-id":'The "appId" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid app ID.',"no-client-id":'The "client_id" field is empty.',"invalid-gtag-resource":"Trusted Types detected an invalid gtag resource: {$gtagURL}."},Z=new ze("analytics","Analytics",Dc);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Bc(t){if(!t.startsWith(Us)){const e=Z.create("invalid-gtag-resource",{gtagURL:t});return Y.warn(e.message),""}return t}function Xn(t){return Promise.all(t.map(e=>e.catch(s=>s)))}function Uc(t,e){let s;return window.trustedTypes&&(s=window.trustedTypes.createPolicy(t,e)),s}function $c(t,e){const s=Uc("firebase-js-sdk-policy",{createScriptURL:Bc}),r=document.createElement("script"),i=`${Us}?l=${t}&id=${e}`;r.src=s?s==null?void 0:s.createScriptURL(i):i,r.async=!0,document.head.appendChild(r)}function zc(t){let e=[];return Array.isArray(window[t])?e=window[t]:window[t]=e,e}async function Wc(t,e,s,r,i,a){const o=r[i];try{if(o)await e[o];else{const c=(await Xn(s)).find(d=>d.measurementId===i);c&&await e[c.appId]}}catch(l){Y.error(l)}t("config",i,a)}async function Vc(t,e,s,r,i){try{let a=[];if(i&&i.send_to){let o=i.send_to;Array.isArray(o)||(o=[o]);const l=await Xn(s);for(const c of o){const d=l.find(h=>h.measurementId===c),u=d&&e[d.appId];if(u)a.push(u);else{a=[];break}}}a.length===0&&(a=Object.values(e)),await Promise.all(a),t("event",r,i||{})}catch(a){Y.error(a)}}function Gc(t,e,s,r){async function i(a,...o){try{if(a==="event"){const[l,c]=o;await Vc(t,e,s,l,c)}else if(a==="config"){const[l,c]=o;await Wc(t,e,s,r,l,c)}else if(a==="consent"){const[l,c]=o;t("consent",l,c)}else if(a==="get"){const[l,c,d]=o;t("get",l,c,d)}else if(a==="set"){const[l]=o;t("set",l)}else t(a,...o)}catch(l){Y.error(l)}}return i}function Hc(t,e,s,r,i){let a=function(...o){window[r].push(arguments)};return window[i]&&typeof window[i]=="function"&&(a=window[i]),window[i]=Gc(a,t,e,s),{gtagCore:a,wrappedGtag:window[i]}}function qc(t){const e=window.document.getElementsByTagName("script");for(const s of Object.values(e))if(s.src&&s.src.includes(Us)&&s.src.includes(t))return s;return null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Kc=30,Qc=1e3;class Yc{constructor(e={},s=Qc){this.throttleMetadata=e,this.intervalMillis=s}getThrottleMetadata(e){return this.throttleMetadata[e]}setThrottleMetadata(e,s){this.throttleMetadata[e]=s}deleteThrottleMetadata(e){delete this.throttleMetadata[e]}}const Zn=new Yc;function Jc(t){return new Headers({Accept:"application/json","x-goog-api-key":t})}async function Xc(t){var o;const{appId:e,apiKey:s}=t,r={method:"GET",headers:Jc(s)},i=Fc.replace("{app-id}",e),a=await fetch(i,r);if(a.status!==200&&a.status!==304){let l="";try{const c=await a.json();(o=c.error)!=null&&o.message&&(l=c.error.message)}catch{}throw Z.create("config-fetch-failed",{httpStatus:a.status,responseMessage:l})}return a.json()}async function Zc(t,e=Zn,s){const{appId:r,apiKey:i,measurementId:a}=t.options;if(!r)throw Z.create("no-app-id");if(!i){if(a)return{measurementId:a,appId:r};throw Z.create("no-api-key")}const o=e.getThrottleMetadata(r)||{backoffCount:0,throttleEndTimeMillis:Date.now()},l=new sd;return setTimeout(async()=>{l.abort()},Oc),ei({appId:r,apiKey:i,measurementId:a},o,l,e)}async function ei(t,{throttleEndTimeMillis:e,backoffCount:s},r,i=Zn){var l;const{appId:a,measurementId:o}=t;try{await ed(r,e)}catch(c){if(o)return Y.warn(`Timed out fetching this Firebase app's measurement ID from the server. Falling back to the measurement ID ${o} provided in the "measurementId" field in the local Firebase config. [${c==null?void 0:c.message}]`),{appId:a,measurementId:o};throw c}try{const c=await Xc(t);return i.deleteThrottleMetadata(a),c}catch(c){const d=c;if(!td(d)){if(i.deleteThrottleMetadata(a),o)return Y.warn(`Failed to fetch this Firebase app's measurement ID from the server. Falling back to the measurement ID ${o} provided in the "measurementId" field in the local Firebase config. [${d==null?void 0:d.message}]`),{appId:a,measurementId:o};throw c}const u=Number((l=d==null?void 0:d.customData)==null?void 0:l.httpStatus)===503?vr(s,i.intervalMillis,Kc):vr(s,i.intervalMillis),h={throttleEndTimeMillis:Date.now()+u,backoffCount:s+1};return i.setThrottleMetadata(a,h),Y.debug(`Calling attemptFetch again in ${u} millis`),ei(t,h,r,i)}}function ed(t,e){return new Promise((s,r)=>{const i=Math.max(e-Date.now(),0),a=setTimeout(s,i);t.addEventListener(()=>{clearTimeout(a),r(Z.create("fetch-throttle",{throttleEndTimeMillis:e}))})})}function td(t){if(!(t instanceof de)||!t.customData)return!1;const e=Number(t.customData.httpStatus);return e===429||e===500||e===503||e===504}class sd{constructor(){this.listeners=[]}addEventListener(e){this.listeners.push(e)}abort(){this.listeners.forEach(e=>e())}}async function rd(t,e,s,r,i){if(i&&i.global){t("event",s,r);return}else{const a=await e,o={...r,send_to:a};t("event",s,o)}}async function nd(t,e,s,r){if(r&&r.global){const i={};for(const a of Object.keys(s))i[`user_properties.${a}`]=s[a];return t("set",i),Promise.resolve()}else{const i=await e;t("config",i,{update:!0,user_properties:s})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function id(){if(Es())try{await Ps()}catch(t){return Y.warn(Z.create("indexeddb-unavailable",{errorInfo:t==null?void 0:t.toString()}).message),!1}else return Y.warn(Z.create("indexeddb-unavailable",{errorInfo:"IndexedDB is not available in this environment."}).message),!1;return!0}async function ad(t,e,s,r,i,a,o){const l=Zc(t);l.then(f=>{s[f.measurementId]=f.appId,t.options.measurementId&&f.measurementId!==t.options.measurementId&&Y.warn(`The measurement ID in the local Firebase config (${t.options.measurementId}) does not match the measurement ID fetched from the server (${f.measurementId}). To ensure analytics events are always sent to the correct Analytics property, update the measurement ID field in the local config or remove it from the local config.`)}).catch(f=>Y.error(f)),e.push(l);const c=id().then(f=>{if(f)return r.getId()}),[d,u]=await Promise.all([l,c]);qc(a)||$c(a,d.measurementId),i("js",new Date);const h=(o==null?void 0:o.config)??{};return h[Lc]="firebase",h.update=!0,u!=null&&(h[Mc]=u),i("config",d.measurementId,h),d.measurementId}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class od{constructor(e){this.app=e}_delete(){return delete He[this.app.options.appId],Promise.resolve()}}let He={},Pr=[];const Ar={};let os="dataLayer",ld="gtag",Rr,$s,Mr=!1;function cd(){const t=[];if(Ts()&&t.push("This is a browser extension environment."),Cn()||t.push("Cookies are not available."),t.length>0){const e=t.map((r,i)=>`(${i+1}) ${r}`).join(" "),s=Z.create("invalid-analytics-context",{errorInfo:e});Y.warn(s.message)}}function dd(t,e,s){cd();const r=t.options.appId;if(!r)throw Z.create("no-app-id");if(!t.options.apiKey)if(t.options.measurementId)Y.warn(`The "apiKey" field is empty in the local Firebase config. This is needed to fetch the latest measurement ID for this Firebase app. Falling back to the measurement ID ${t.options.measurementId} provided in the "measurementId" field in the local Firebase config.`);else throw Z.create("no-api-key");if(He[r]!=null)throw Z.create("already-exists",{id:r});if(!Mr){zc(os);const{wrappedGtag:a,gtagCore:o}=Hc(He,Pr,Ar,os,ld);$s=a,Rr=o,Mr=!0}return He[r]=ad(t,Pr,Ar,e,Rr,os,s),new od(t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ud(t=Ls()){t=ye(t);const e=Ze(t,Rt);return e.isInitialized()?e.getImmediate():hd(t)}function hd(t,e={}){const s=Ze(t,Rt);if(s.isInitialized()){const i=s.getImmediate();if(Fe(e,s.getOptions()))return i;throw Z.create("already-initialized")}return s.initialize({options:e})}async function md(){if(Ts()||!Cn()||!Es())return!1;try{return await Ps()}catch{return!1}}function fd(t,e,s){t=ye(t),nd($s,He[t.app.options.appId],e,s).catch(r=>Y.error(r))}function pd(t,e,s,r){t=ye(t),rd($s,He[t.app.options.appId],e,s,r).catch(i=>Y.error(i))}const Lr="@firebase/analytics",Or="0.10.25";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function gd(){be(new ce(Rt,(e,{options:s})=>{const r=e.getProvider("app").getImmediate(),i=e.getProvider("installations-internal").getImmediate();return dd(r,i,s)},"PUBLIC")),be(new ce("analytics-internal",t,"PRIVATE")),ae(Lr,Or),ae(Lr,Or,"esm2020");function t(e){try{const s=e.getProvider(Rt).getImmediate();return{logEvent:(r,i,a)=>pd(s,r,i,a),setUserProperties:(r,i)=>fd(s,r,i)}}catch(s){throw Z.create("interop-component-reg-failed",{reason:s})}}}gd();function ti(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const xd=ti,si=new ze("auth","Firebase",ti());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Mt=new Rs("@firebase/auth");function St(t,...e){Mt.logLevel<=U.WARN&&Mt.warn(`Auth (${xt}): ${t}`,...e)}function _t(t,...e){Mt.logLevel<=U.ERROR&&Mt.error(`Auth (${xt}): ${t}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function we(t,...e){throw Ws(t,...e)}function oe(t,...e){return Ws(t,...e)}function zs(t,e,s){const r={...xd(),[e]:s};return new ze("auth","Firebase",r).create(e,{appName:t.name})}function Le(t){return zs(t,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function Ws(t,...e){if(typeof t!="string"){const s=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=t.name),t._errorFactory.create(s,...r)}return si.create(t,...e)}function E(t,e,...s){if(!t)throw Ws(e,...s)}function pe(t){const e="INTERNAL ASSERTION FAILED: "+t;throw _t(e),new Error(e)}function ve(t,e){t||pe(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ws(){var t;return typeof self<"u"&&((t=self.location)==null?void 0:t.href)||""}function bd(){return Fr()==="http:"||Fr()==="https:"}function Fr(){var t;return typeof self<"u"&&((t=self.location)==null?void 0:t.protocol)||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function wd(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(bd()||Ts()||"connection"in navigator)?navigator.onLine:!0}function vd(){if(typeof navigator>"u")return null;const t=navigator;return t.languages&&t.languages[0]||t.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bt{constructor(e,s){this.shortDelay=e,this.longDelay=s,ve(s>e,"Short delay should be less than long delay!"),this.isMobile=jo()||_o()}get(){return wd()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Vs(t,e){ve(t.emulator,"Emulator should always be set here");const{url:s}=t.emulator;return e?`${s}${e.startsWith("/")?e.slice(1):e}`:s}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ri{static initialize(e,s,r){this.fetchImpl=e,s&&(this.headersImpl=s),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;pe("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;pe("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;pe("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yd={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Nd=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],Id=new bt(3e4,6e4);function Gs(t,e){return t.tenantId&&!e.tenantId?{...e,tenantId:t.tenantId}:e}async function et(t,e,s,r,i={}){return ni(t,i,async()=>{let a={},o={};r&&(e==="GET"?o=r:a={body:JSON.stringify(r)});const l=gt({...o,key:t.config.apiKey}).slice(1),c=await t._getAdditionalHeaders();c["Content-Type"]="application/json",t.languageCode&&(c["X-Firebase-Locale"]=t.languageCode);const d={method:e,headers:c,...a};return So()||(d.referrerPolicy="strict-origin-when-cross-origin"),t.emulatorConfig&&As(t.emulatorConfig.host)&&(d.credentials="include"),ri.fetch()(await ii(t,t.config.apiHost,s,l),d)})}async function ni(t,e,s){t._canInitEmulator=!1;const r={...yd,...e};try{const i=new Sd(t),a=await Promise.race([s(),i.promise]);i.clearNetworkTimeout();const o=await a.json();if("needConfirmation"in o)throw Nt(t,"account-exists-with-different-credential",o);if(a.ok&&!("errorMessage"in o))return o;{const l=a.ok?o.errorMessage:o.error.message,[c,d]=l.split(" : ");if(c==="FEDERATED_USER_ID_ALREADY_LINKED")throw Nt(t,"credential-already-in-use",o);if(c==="EMAIL_EXISTS")throw Nt(t,"email-already-in-use",o);if(c==="USER_DISABLED")throw Nt(t,"user-disabled",o);const u=r[c]||c.toLowerCase().replace(/[_\s]+/g,"-");if(d)throw zs(t,u,d);we(t,u)}}catch(i){if(i instanceof de)throw i;we(t,"network-request-failed",{message:String(i)})}}async function jd(t,e,s,r,i={}){const a=await et(t,e,s,r,i);return"mfaPendingCredential"in a&&we(t,"multi-factor-auth-required",{_serverResponse:a}),a}async function ii(t,e,s,r){const i=`${e}${s}?${r}`,a=t,o=a.config.emulator?Vs(t.config,i):`${t.config.apiScheme}://${i}`;return Nd.includes(s)&&(await a._persistenceManagerAvailable,a._getPersistenceType()==="COOKIE")?a._getPersistence()._getFinalTarget(o).toString():o}class Sd{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((s,r)=>{this.timer=setTimeout(()=>r(oe(this.auth,"network-request-failed")),Id.get())})}}function Nt(t,e,s){const r={appName:t.name};s.email&&(r.email=s.email),s.phoneNumber&&(r.phoneNumber=s.phoneNumber);const i=oe(t,e,r);return i.customData._tokenResponse=s,i}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function _d(t,e){return et(t,"POST","/v1/accounts:delete",e)}async function Lt(t,e){return et(t,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ot(t){if(t)try{const e=new Date(Number(t));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function Cd(t,e=!1){const s=ye(t),r=await s.getIdToken(e),i=Hs(r);E(i&&i.exp&&i.auth_time&&i.iat,s.auth,"internal-error");const a=typeof i.firebase=="object"?i.firebase:void 0,o=a==null?void 0:a.sign_in_provider;return{claims:i,token:r,authTime:ot(ls(i.auth_time)),issuedAtTime:ot(ls(i.iat)),expirationTime:ot(ls(i.exp)),signInProvider:o||null,signInSecondFactor:(a==null?void 0:a.sign_in_second_factor)||null}}function ls(t){return Number(t)*1e3}function Hs(t){const[e,s,r]=t.split(".");if(e===void 0||s===void 0||r===void 0)return _t("JWT malformed, contained fewer than 3 sections"),null;try{const i=jn(s);return i?JSON.parse(i):(_t("Failed to decode base64 JWT payload"),null)}catch(i){return _t("Caught error parsing JWT payload as JSON",i==null?void 0:i.toString()),null}}function Dr(t){const e=Hs(t);return E(e,"internal-error"),E(typeof e.exp<"u","internal-error"),E(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function pt(t,e,s=!1){if(s)return e;try{return await e}catch(r){throw r instanceof de&&kd(r)&&t.auth.currentUser===t&&await t.auth.signOut(),r}}function kd({code:t}){return t==="auth/user-disabled"||t==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Td{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){if(e){const s=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),s}else{this.errorBackoff=3e4;const r=(this.user.stsTokenManager.expirationTime??0)-Date.now()-3e5;return Math.max(0,r)}}schedule(e=!1){if(!this.isRunning)return;const s=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},s)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vs{constructor(e,s){this.createdAt=e,this.lastLoginAt=s,this._initializeTime()}_initializeTime(){this.lastSignInTime=ot(this.lastLoginAt),this.creationTime=ot(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ot(t){var h;const e=t.auth,s=await t.getIdToken(),r=await pt(t,Lt(e,{idToken:s}));E(r==null?void 0:r.users.length,e,"internal-error");const i=r.users[0];t._notifyReloadListener(i);const a=(h=i.providerUserInfo)!=null&&h.length?ai(i.providerUserInfo):[],o=Pd(t.providerData,a),l=t.isAnonymous,c=!(t.email&&i.passwordHash)&&!(o!=null&&o.length),d=l?c:!1,u={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:o,metadata:new vs(i.createdAt,i.lastLoginAt),isAnonymous:d};Object.assign(t,u)}async function Ed(t){const e=ye(t);await Ot(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function Pd(t,e){return[...t.filter(r=>!e.some(i=>i.providerId===r.providerId)),...e]}function ai(t){return t.map(({providerId:e,...s})=>({providerId:e,uid:s.rawId||"",displayName:s.displayName||null,email:s.email||null,phoneNumber:s.phoneNumber||null,photoURL:s.photoUrl||null}))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ad(t,e){const s=await ni(t,{},async()=>{const r=gt({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:i,apiKey:a}=t.config,o=await ii(t,i,"/v1/token",`key=${a}`),l=await t._getAdditionalHeaders();l["Content-Type"]="application/x-www-form-urlencoded";const c={method:"POST",headers:l,body:r};return t.emulatorConfig&&As(t.emulatorConfig.host)&&(c.credentials="include"),ri.fetch()(o,c)});return{accessToken:s.access_token,expiresIn:s.expires_in,refreshToken:s.refresh_token}}async function Rd(t,e){return et(t,"POST","/v2/accounts:revokeToken",Gs(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qe{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){E(e.idToken,"internal-error"),E(typeof e.idToken<"u","internal-error"),E(typeof e.refreshToken<"u","internal-error");const s="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):Dr(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,s)}updateFromIdToken(e){E(e.length!==0,"internal-error");const s=Dr(e);this.updateTokensAndExpiration(e,null,s)}async getToken(e,s=!1){return!s&&this.accessToken&&!this.isExpired?this.accessToken:(E(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,s){const{accessToken:r,refreshToken:i,expiresIn:a}=await Ad(e,s);this.updateTokensAndExpiration(r,i,Number(a))}updateTokensAndExpiration(e,s,r){this.refreshToken=s||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,s){const{refreshToken:r,accessToken:i,expirationTime:a}=s,o=new qe;return r&&(E(typeof r=="string","internal-error",{appName:e}),o.refreshToken=r),i&&(E(typeof i=="string","internal-error",{appName:e}),o.accessToken=i),a&&(E(typeof a=="number","internal-error",{appName:e}),o.expirationTime=a),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new qe,this.toJSON())}_performRefresh(){return pe("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Se(t,e){E(typeof t=="string"||typeof t>"u","internal-error",{appName:e})}class ne{constructor({uid:e,auth:s,stsTokenManager:r,...i}){this.providerId="firebase",this.proactiveRefresh=new Td(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=e,this.auth=s,this.stsTokenManager=r,this.accessToken=r.accessToken,this.displayName=i.displayName||null,this.email=i.email||null,this.emailVerified=i.emailVerified||!1,this.phoneNumber=i.phoneNumber||null,this.photoURL=i.photoURL||null,this.isAnonymous=i.isAnonymous||!1,this.tenantId=i.tenantId||null,this.providerData=i.providerData?[...i.providerData]:[],this.metadata=new vs(i.createdAt||void 0,i.lastLoginAt||void 0)}async getIdToken(e){const s=await pt(this,this.stsTokenManager.getToken(this.auth,e));return E(s,this.auth,"internal-error"),this.accessToken!==s&&(this.accessToken=s,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),s}getIdTokenResult(e){return Cd(this,e)}reload(){return Ed(this)}_assign(e){this!==e&&(E(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(s=>({...s})),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const s=new ne({...this,auth:e,stsTokenManager:this.stsTokenManager._clone()});return s.metadata._copy(this.metadata),s}_onReload(e){E(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,s=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),s&&await Ot(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(me(this.auth.app))return Promise.reject(Le(this.auth));const e=await this.getIdToken();return await pt(this,_d(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return{uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>({...e})),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId,...this.metadata.toJSON(),apiKey:this.auth.config.apiKey,appName:this.auth.name}}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,s){const r=s.displayName??void 0,i=s.email??void 0,a=s.phoneNumber??void 0,o=s.photoURL??void 0,l=s.tenantId??void 0,c=s._redirectEventId??void 0,d=s.createdAt??void 0,u=s.lastLoginAt??void 0,{uid:h,emailVerified:f,isAnonymous:m,providerData:g,stsTokenManager:v}=s;E(h&&v,e,"internal-error");const p=qe.fromJSON(this.name,v);E(typeof h=="string",e,"internal-error"),Se(r,e.name),Se(i,e.name),E(typeof f=="boolean",e,"internal-error"),E(typeof m=="boolean",e,"internal-error"),Se(a,e.name),Se(o,e.name),Se(l,e.name),Se(c,e.name),Se(d,e.name),Se(u,e.name);const I=new ne({uid:h,auth:e,email:i,emailVerified:f,displayName:r,isAnonymous:m,photoURL:o,phoneNumber:a,tenantId:l,stsTokenManager:p,createdAt:d,lastLoginAt:u});return g&&Array.isArray(g)&&(I.providerData=g.map(S=>({...S}))),c&&(I._redirectEventId=c),I}static async _fromIdTokenResponse(e,s,r=!1){const i=new qe;i.updateFromServerResponse(s);const a=new ne({uid:s.localId,auth:e,stsTokenManager:i,isAnonymous:r});return await Ot(a),a}static async _fromGetAccountInfoResponse(e,s,r){const i=s.users[0];E(i.localId!==void 0,"internal-error");const a=i.providerUserInfo!==void 0?ai(i.providerUserInfo):[],o=!(i.email&&i.passwordHash)&&!(a!=null&&a.length),l=new qe;l.updateFromIdToken(r);const c=new ne({uid:i.localId,auth:e,stsTokenManager:l,isAnonymous:o}),d={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:a,metadata:new vs(i.createdAt,i.lastLoginAt),isAnonymous:!(i.email&&i.passwordHash)&&!(a!=null&&a.length)};return Object.assign(c,d),c}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Br=new Map;function ge(t){ve(t instanceof Function,"Expected a class definition");let e=Br.get(t);return e?(ve(e instanceof t,"Instance stored in cache mismatched with class"),e):(e=new t,Br.set(t,e),e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oi{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,s){this.storage[e]=s}async _get(e){const s=this.storage[e];return s===void 0?null:s}async _remove(e){delete this.storage[e]}_addListener(e,s){}_removeListener(e,s){}}oi.type="NONE";const Ur=oi;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ct(t,e,s){return`firebase:${t}:${e}:${s}`}class Oe{constructor(e,s,r){this.persistence=e,this.auth=s,this.userKey=r;const{config:i,name:a}=this.auth;this.fullUserKey=Ct(this.userKey,i.apiKey,a),this.fullPersistenceKey=Ct("persistence",i.apiKey,a),this.boundEventHandler=s._onStorageEvent.bind(s);try{this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}catch{}}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);if(!e)return null;if(typeof e=="string"){const s=await Lt(this.auth,{idToken:e}).catch(()=>{});return s?ne._fromGetAccountInfoResponse(this.auth,s,e):null}return ne._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const s=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,s)return this.setCurrentUser(s)}delete(){try{this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}catch{}}static async create(e,s,r="authUser"){if(!s.length)return new Oe(ge(Ur),e,r);const i=(await Promise.all(s.map(async d=>{try{if(await d._isAvailable())return d}catch{return}}))).filter(d=>d);let a=i[0]||ge(Ur);const o=Ct(r,e.config.apiKey,e.name);let l=null;for(const d of s)try{const u=await d._get(o);if(u){let h;if(typeof u=="string"){const f=await Lt(e,{idToken:u}).catch(()=>{});if(!f)break;h=await ne._fromGetAccountInfoResponse(e,f,u)}else h=ne._fromJSON(e,u);d!==a&&(l=h),a=d;break}}catch{}const c=i.filter(d=>d._shouldAllowMigration);return!a._shouldAllowMigration||!c.length?new Oe(a,e,r):(a=c[0],l&&await a._set(o,l.toJSON()),await Promise.all(s.map(async d=>{if(d!==a)try{await d._remove(o)}catch{}})),new Oe(a,e,r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $r(t){const e=t.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(ui(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(li(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(mi(e))return"Blackberry";if(fi(e))return"Webos";if(ci(e))return"Safari";if((e.includes("chrome/")||di(e))&&!e.includes("edge/"))return"Chrome";if(hi(e))return"Android";{const s=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=t.match(s);if((r==null?void 0:r.length)===2)return r[1]}return"Other"}function li(t=J()){return/firefox\//i.test(t)}function ci(t=J()){const e=t.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function di(t=J()){return/crios\//i.test(t)}function ui(t=J()){return/iemobile/i.test(t)}function hi(t=J()){return/android/i.test(t)}function mi(t=J()){return/blackberry/i.test(t)}function fi(t=J()){return/webos/i.test(t)}function qs(t=J()){return/iphone|ipad|ipod/i.test(t)||/macintosh/i.test(t)&&/mobile/i.test(t)}function Md(t=J()){var e;return qs(t)&&!!((e=window.navigator)!=null&&e.standalone)}function Ld(){return Co()&&document.documentMode===10}function pi(t=J()){return qs(t)||hi(t)||fi(t)||mi(t)||/windows phone/i.test(t)||ui(t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function gi(t,e=[]){let s;switch(t){case"Browser":s=$r(J());break;case"Worker":s=`${$r(J())}-${t}`;break;default:s=t}const r=e.length?e.join(","):"FirebaseCore-web";return`${s}/JsCore/${xt}/${r}`}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Od{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,s){const r=a=>new Promise((o,l)=>{try{const c=e(a);o(c)}catch(c){l(c)}});r.onAbort=s,this.queue.push(r);const i=this.queue.length-1;return()=>{this.queue[i]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const s=[];try{for(const r of this.queue)await r(e),r.onAbort&&s.push(r.onAbort)}catch(r){s.reverse();for(const i of s)try{i()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r==null?void 0:r.message})}}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Fd(t,e={}){return et(t,"GET","/v2/passwordPolicy",Gs(t,e))}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Dd=6;class Bd{constructor(e){var r;const s=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=s.minPasswordLength??Dd,s.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=s.maxPasswordLength),s.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=s.containsLowercaseCharacter),s.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=s.containsUppercaseCharacter),s.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=s.containsNumericCharacter),s.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=s.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=((r=e.allowedNonAlphanumericCharacters)==null?void 0:r.join(""))??"",this.forceUpgradeOnSignin=e.forceUpgradeOnSignin??!1,this.schemaVersion=e.schemaVersion}validatePassword(e){const s={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,s),this.validatePasswordCharacterOptions(e,s),s.isValid&&(s.isValid=s.meetsMinPasswordLength??!0),s.isValid&&(s.isValid=s.meetsMaxPasswordLength??!0),s.isValid&&(s.isValid=s.containsLowercaseLetter??!0),s.isValid&&(s.isValid=s.containsUppercaseLetter??!0),s.isValid&&(s.isValid=s.containsNumericCharacter??!0),s.isValid&&(s.isValid=s.containsNonAlphanumericCharacter??!0),s}validatePasswordLengthOptions(e,s){const r=this.customStrengthOptions.minPasswordLength,i=this.customStrengthOptions.maxPasswordLength;r&&(s.meetsMinPasswordLength=e.length>=r),i&&(s.meetsMaxPasswordLength=e.length<=i)}validatePasswordCharacterOptions(e,s){this.updatePasswordCharacterOptionsStatuses(s,!1,!1,!1,!1);let r;for(let i=0;i<e.length;i++)r=e.charAt(i),this.updatePasswordCharacterOptionsStatuses(s,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(e,s,r,i,a){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=s)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=i)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=a))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ud{constructor(e,s,r,i){this.app=e,this.heartbeatServiceProvider=s,this.appCheckServiceProvider=r,this.config=i,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new zr(this),this.idTokenSubscription=new zr(this),this.beforeStateQueue=new Od(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=si,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=i.sdkClientVersion,this._persistenceManagerAvailable=new Promise(a=>this._resolvePersistenceManagerAvailable=a)}_initializeWithPersistence(e,s){return s&&(this._popupRedirectResolver=ge(s)),this._initializationPromise=this.queue(async()=>{var r,i,a;if(!this._deleted){try{this.persistenceManager=await Oe.create(this,e)}catch(o){St(`Failed to initialize persistence: ${o}`),this.persistenceManager=await Oe.create(this,[])}finally{(r=this._resolvePersistenceManagerAvailable)==null||r.call(this)}if(!this._deleted){if((i=this._popupRedirectResolver)!=null&&i._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}try{await this.initializeCurrentUser(s)}catch(o){St(`Failed to initialize current user: ${o}`),await this.directlySetCurrentUser(null).catch(()=>{})}this.lastNotifiedUid=((a=this.currentUser)==null?void 0:a.uid)||null,!this._deleted&&(this._isInitialized=!0)}}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const s=await Lt(this,{idToken:e}),r=await ne._fromGetAccountInfoResponse(this,s,e);await this.directlySetCurrentUser(r)}catch(s){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",s),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var a;if(me(this.app)){const o=this.app.settings.authIdToken;return o?new Promise(l=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(o).then(l,l))}):this.directlySetCurrentUser(null)}const s=await this.assertedPersistence.getCurrentUser();let r=s,i=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const o=(a=this.redirectUser)==null?void 0:a._redirectEventId,l=r==null?void 0:r._redirectEventId,c=await this.tryRedirectSignIn(e);(!o||o===l)&&(c!=null&&c.user)&&(r=c.user,i=!0)}if(!r)return this.directlySetCurrentUser(null);if(!r._redirectEventId){if(i)try{await this.beforeStateQueue.runMiddleware(r)}catch(o){r=s,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(o))}return r?this.reloadAndSetCurrentUserOrClear(r):this.directlySetCurrentUser(null)}return E(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===r._redirectEventId?this.directlySetCurrentUser(r):this.reloadAndSetCurrentUserOrClear(r)}async tryRedirectSignIn(e){let s=null;try{s=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return s}async reloadAndSetCurrentUserOrClear(e){try{await Ot(e)}catch(s){const r=s==null?void 0:s.code;if(r!=="auth/network-request-failed"&&r!=="auth/too-many-requests"&&!(r!=null&&r.startsWith("auth/quota-exceeded")))return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=vd()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(me(this.app))return Promise.reject(Le(this));const s=e?ye(e):null;return s&&E(s.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(s&&s._clone(this))}async _updateCurrentUser(e,s=!1){if(!this._deleted)return e&&E(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),s||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return me(this.app)?Promise.reject(Le(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return me(this.app)?Promise.reject(Le(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(ge(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const s=this._getPasswordPolicyInternal();return s.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):s.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await Fd(this),s=new Bd(e);this.tenantId===null?this._projectPasswordPolicy=s:this._tenantPasswordPolicies[this.tenantId]=s}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new ze("auth","Firebase",e())}onAuthStateChanged(e,s,r){return this.registerStateListener(this.authStateSubscription,e,s,r)}beforeAuthStateChanged(e,s){return this.beforeStateQueue.pushCallback(e,s)}onIdTokenChanged(e,s,r){return this.registerStateListener(this.idTokenSubscription,e,s,r)}authStateReady(){return new Promise((e,s)=>{if(this.currentUser)e();else{const r=this.onAuthStateChanged(()=>{r(),e()},s)}})}async revokeAccessToken(e){if(this.currentUser){const s=await this.currentUser.getIdToken(),r={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:s};this.tenantId!=null&&(r.tenantId=this.tenantId),await Rd(this,r)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)==null?void 0:e.toJSON()}}async _setRedirectUser(e,s){const r=await this.getOrInitRedirectPersistenceManager(s);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const s=e&&ge(e)||this._popupRedirectResolver;E(s,this,"argument-error"),this.redirectPersistenceManager=await Oe.create(this,[ge(s._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var s,r;return this._isInitialized&&await this.queue(async()=>{}),((s=this._currentUser)==null?void 0:s._redirectEventId)===e?this._currentUser:((r=this.redirectUser)==null?void 0:r._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var s;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const e=((s=this.currentUser)==null?void 0:s.uid)??null;this.lastNotifiedUid!==e&&(this.lastNotifiedUid=e,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,s,r,i){if(this._deleted)return()=>{};const a=typeof s=="function"?s:s.next.bind(s);let o=!1;const l=this._isInitialized?Promise.resolve():this._initializationPromise;if(E(l,this,"internal-error"),l.then(()=>{o||a(this.currentUser)}).catch(c=>{if(!o)if(typeof s!="function"&&s.error)s.error(c);else if(r)r(c);else throw c}),typeof s=="function"){const c=e.addObserver(s,r,i);return()=>{o=!0,c()}}else{const c=e.addObserver(s);return()=>{o=!0,c()}}}async directlySetCurrentUser(e){if(this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,this.persistenceManager)try{e?await this.persistenceManager.setCurrentUser(e):await this.persistenceManager.removeCurrentUser()}catch(s){const r=(s==null?void 0:s.message)||String(s),i=zs(this,"internal-error",`An internal AuthError has occurred: ${r}`);throw i.customData={originalError:s},i}}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return E(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=gi(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var i;const e={"X-Client-Version":this.clientVersion};this.app.options.appId&&(e["X-Firebase-gmpid"]=this.app.options.appId);const s=await((i=this.heartbeatServiceProvider.getImmediate({optional:!0}))==null?void 0:i.getHeartbeatsHeader());s&&(e["X-Firebase-Client"]=s);const r=await this._getAppCheckToken();return r&&(e["X-Firebase-AppCheck"]=r),e}async _getAppCheckToken(){var s;if(me(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=await((s=this.appCheckServiceProvider.getImmediate({optional:!0}))==null?void 0:s.getToken());return e!=null&&e.error&&St(`Error while retrieving App Check token: ${e.error}`),e==null?void 0:e.token}}function Ks(t){return ye(t)}class zr{constructor(e){this.auth=e,this.observer=null,this.addObserver=Po(s=>this.observer=s)}get next(){return E(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Qs={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function $d(t){Qs=t}function zd(t){return Qs.loadJS(t)}function Wd(){return Qs.gapiScript}function Vd(t){return`__${t}${Math.floor(Math.random()*1e6)}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Gd(t,e){const s=Ze(t,"auth");if(s.isInitialized()){const i=s.getImmediate(),a=s.getOptions();if(Fe(a,e??{}))return i;we(i,"already-initialized")}return s.initialize({options:e})}function Hd(t,e){const s=(e==null?void 0:e.persistence)||[],r=(Array.isArray(s)?s:[s]).map(ge);e!=null&&e.errorMap&&t._updateErrorMap(e.errorMap),t._initializeWithPersistence(r,e==null?void 0:e.popupRedirectResolver)}function qd(t,e,s){const r=Ks(t);E(/^https?:\/\//.test(e),r,"invalid-emulator-scheme");const i=!1,a=xi(e),{host:o,port:l}=Kd(e),c=l===null?"":`:${l}`,d={url:`${a}//${o}${c}/`},u=Object.freeze({host:o,port:l,protocol:a.replace(":",""),options:Object.freeze({disableWarnings:i})});if(!r._canInitEmulator){E(r.config.emulator&&r.emulatorConfig,r,"emulator-config-failed"),E(Fe(d,r.config.emulator)&&Fe(u,r.emulatorConfig),r,"emulator-config-failed");return}r.config.emulator=d,r.emulatorConfig=u,r.settings.appVerificationDisabledForTesting=!0,As(o)?Do(`${a}//${o}${c}`):Qd()}function xi(t){const e=t.indexOf(":");return e<0?"":t.substr(0,e+1)}function Kd(t){const e=xi(t),s=/(\/\/)?([^?#/]+)/.exec(t.substr(e.length));if(!s)return{host:"",port:null};const r=s[2].split("@").pop()||"",i=/^(\[[^\]]+\])(:|$)/.exec(r);if(i){const a=i[1];return{host:a,port:Wr(r.substr(a.length+1))}}else{const[a,o]=r.split(":");return{host:a,port:Wr(o)}}}function Wr(t){if(!t)return null;const e=Number(t);return isNaN(e)?null:e}function Qd(){function t(){const e=document.createElement("p"),s=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",s.position="fixed",s.width="100%",s.backgroundColor="#ffffff",s.border=".1em solid #000000",s.color="#b50000",s.bottom="0px",s.left="0px",s.margin="0px",s.zIndex="10000",s.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",t):t())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bi{constructor(e,s){this.providerId=e,this.signInMethod=s}toJSON(){return pe("not implemented")}_getIdTokenResponse(e){return pe("not implemented")}_linkToIdToken(e,s){return pe("not implemented")}_getReauthenticationResolver(e){return pe("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ke(t,e){return jd(t,"POST","/v1/accounts:signInWithIdp",Gs(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Yd="http://localhost";class Ue extends bi{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const s=new Ue(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(s.idToken=e.idToken),e.accessToken&&(s.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(s.nonce=e.nonce),e.pendingToken&&(s.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(s.accessToken=e.oauthToken,s.secret=e.oauthTokenSecret):we("argument-error"),s}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const s=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:i,...a}=s;if(!r||!i)return null;const o=new Ue(r,i);return o.idToken=a.idToken||void 0,o.accessToken=a.accessToken||void 0,o.secret=a.secret,o.nonce=a.nonce,o.pendingToken=a.pendingToken||null,o}_getIdTokenResponse(e){const s=this.buildRequest();return Ke(e,s)}_linkToIdToken(e,s){const r=this.buildRequest();return r.idToken=s,Ke(e,r)}_getReauthenticationResolver(e){const s=this.buildRequest();return s.autoCreate=!1,Ke(e,s)}buildRequest(){const e={requestUri:Yd,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const s={};this.idToken&&(s.id_token=this.idToken),this.accessToken&&(s.access_token=this.accessToken),this.secret&&(s.oauth_token_secret=this.secret),s.providerId=this.providerId,this.nonce&&!this.pendingToken&&(s.nonce=this.nonce),e.postBody=gt(s)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wi{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wt extends wi{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _e extends wt{constructor(){super("facebook.com")}static credential(e){return Ue._fromParams({providerId:_e.PROVIDER_ID,signInMethod:_e.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return _e.credentialFromTaggedObject(e)}static credentialFromError(e){return _e.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return _e.credential(e.oauthAccessToken)}catch{return null}}}_e.FACEBOOK_SIGN_IN_METHOD="facebook.com";_e.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ce extends wt{constructor(){super("google.com"),this.addScope("profile")}static credential(e,s){return Ue._fromParams({providerId:Ce.PROVIDER_ID,signInMethod:Ce.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:s})}static credentialFromResult(e){return Ce.credentialFromTaggedObject(e)}static credentialFromError(e){return Ce.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:s,oauthAccessToken:r}=e;if(!s&&!r)return null;try{return Ce.credential(s,r)}catch{return null}}}Ce.GOOGLE_SIGN_IN_METHOD="google.com";Ce.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ke extends wt{constructor(){super("github.com")}static credential(e){return Ue._fromParams({providerId:ke.PROVIDER_ID,signInMethod:ke.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return ke.credentialFromTaggedObject(e)}static credentialFromError(e){return ke.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return ke.credential(e.oauthAccessToken)}catch{return null}}}ke.GITHUB_SIGN_IN_METHOD="github.com";ke.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Te extends wt{constructor(){super("twitter.com")}static credential(e,s){return Ue._fromParams({providerId:Te.PROVIDER_ID,signInMethod:Te.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:s})}static credentialFromResult(e){return Te.credentialFromTaggedObject(e)}static credentialFromError(e){return Te.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:s,oauthTokenSecret:r}=e;if(!s||!r)return null;try{return Te.credential(s,r)}catch{return null}}}Te.TWITTER_SIGN_IN_METHOD="twitter.com";Te.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ye{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,s,r,i=!1){const a=await ne._fromIdTokenResponse(e,r,i),o=Vr(r);return new Ye({user:a,providerId:o,_tokenResponse:r,operationType:s})}static async _forOperation(e,s,r){await e._updateTokensIfNecessary(r,!0);const i=Vr(r);return new Ye({user:e,providerId:i,_tokenResponse:r,operationType:s})}}function Vr(t){return t.providerId?t.providerId:"phoneNumber"in t?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ft extends de{constructor(e,s,r,i){super(s.code,s.message),this.operationType=r,this.user=i,Object.setPrototypeOf(this,Ft.prototype),this.customData={appName:e.name,tenantId:e.tenantId??void 0,_serverResponse:s.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,s,r,i){return new Ft(e,s,r,i)}}function vi(t,e,s,r){return(e==="reauthenticate"?s._getReauthenticationResolver(t):s._getIdTokenResponse(t)).catch(a=>{throw a.code==="auth/multi-factor-auth-required"?Ft._fromErrorAndOperation(t,a,e,r):a})}async function Jd(t,e,s=!1){const r=await pt(t,e._linkToIdToken(t.auth,await t.getIdToken()),s);return Ye._forOperation(t,"link",r)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Xd(t,e,s=!1){const{auth:r}=t;if(me(r.app))return Promise.reject(Le(r));const i="reauthenticate";try{const a=await pt(t,vi(r,i,e,t),s);E(a.idToken,r,"internal-error");const o=Hs(a.idToken);E(o,r,"internal-error");const{sub:l}=o;return E(t.uid===l,r,"user-mismatch"),Ye._forOperation(t,i,a)}catch(a){throw(a==null?void 0:a.code)==="auth/user-not-found"&&we(r,"user-mismatch"),a}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Zd(t,e,s=!1){if(me(t.app))return Promise.reject(Le(t));const r="signIn",i=await vi(t,r,e),a=await Ye._fromIdTokenResponse(t,r,i);return s||await t._updateCurrentUser(a.user),a}function eu(t,e,s,r){return ye(t).onIdTokenChanged(e,s,r)}function tu(t,e,s){return ye(t).beforeAuthStateChanged(e,s)}const Dt="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yi{constructor(e,s){this.storageRetriever=e,this.type=s}_isAvailable(){try{return this.storage?(this.storage.setItem(Dt,"1"),this.storage.removeItem(Dt),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,s){return this.storage.setItem(e,JSON.stringify(s)),Promise.resolve()}_get(e){const s=this.storage.getItem(e);return Promise.resolve(s?JSON.parse(s):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const su=1e3,ru=10;class Ni extends yi{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,s)=>this.onStorageEvent(e,s),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=pi(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const s of Object.keys(this.listeners)){const r=this.storage.getItem(s),i=this.localCache[s];r!==i&&e(s,i,r)}}onStorageEvent(e,s=!1){if(!e.key){this.forAllChangedKeys((o,l,c)=>{this.notifyListeners(o,c)});return}const r=e.key;s?this.detachListener():this.stopPolling();const i=()=>{const o=this.storage.getItem(r);!s&&this.localCache[r]===o||this.notifyListeners(r,o)},a=this.storage.getItem(r);Ld()&&a!==e.newValue&&e.newValue!==e.oldValue?setTimeout(i,ru):i()}notifyListeners(e,s){this.localCache[e]=s;const r=this.listeners[e];if(r)for(const i of Array.from(r))i(s&&JSON.parse(s))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,s,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:s,newValue:r}),!0)})},su)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,s){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(s)}_removeListener(e,s){this.listeners[e]&&(this.listeners[e].delete(s),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,s){await super._set(e,s),this.localCache[e]=JSON.stringify(s)}async _get(e){const s=await super._get(e);return this.localCache[e]=JSON.stringify(s),s}async _remove(e){await super._remove(e),delete this.localCache[e]}}Ni.type="LOCAL";const nu=Ni;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ii extends yi{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,s){}_removeListener(e,s){}}Ii.type="SESSION";const ji=Ii;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function iu(t){return Promise.all(t.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(s){return{fulfilled:!1,reason:s}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qt{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const s=this.receivers.find(i=>i.isListeningto(e));if(s)return s;const r=new qt(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const s=e,{eventId:r,eventType:i,data:a}=s.data,o=this.handlersMap[i];if(!(o!=null&&o.size))return;s.ports[0].postMessage({status:"ack",eventId:r,eventType:i});const l=Array.from(o).map(async d=>d(s.origin,a)),c=await iu(l);s.ports[0].postMessage({status:"done",eventId:r,eventType:i,response:c})}_subscribe(e,s){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(s)}_unsubscribe(e,s){this.handlersMap[e]&&s&&this.handlersMap[e].delete(s),(!s||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}qt.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ys(t="",e=10){let s="";for(let r=0;r<e;r++)s+=Math.floor(Math.random()*10);return t+s}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class au{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,s,r=50){const i=typeof MessageChannel<"u"?new MessageChannel:null;if(!i)throw new Error("connection_unavailable");let a,o;return new Promise((l,c)=>{const d=Ys("",20);i.port1.start();const u=setTimeout(()=>{c(new Error("unsupported_event"))},r);o={messageChannel:i,onMessage(h){const f=h;if(f.data.eventId===d)switch(f.data.status){case"ack":clearTimeout(u),a=setTimeout(()=>{c(new Error("timeout"))},3e3);break;case"done":clearTimeout(a),l(f.data.response);break;default:clearTimeout(u),clearTimeout(a),c(new Error("invalid_response"));break}}},this.handlers.add(o),i.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:e,eventId:d,data:s},[i.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function le(){return window}function ou(t){le().location.href=t}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Si(){return typeof le().WorkerGlobalScope<"u"&&typeof le().importScripts=="function"}async function lu(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function cu(){var t;return((t=navigator==null?void 0:navigator.serviceWorker)==null?void 0:t.controller)||null}function du(){return Si()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _i="firebaseLocalStorageDb",uu=1,Bt="firebaseLocalStorage",Ci="fbase_key";class vt{constructor(e){this.request=e}toPromise(){return new Promise((e,s)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{s(this.request.error)})})}}function Kt(t,e){return t.transaction([Bt],e?"readwrite":"readonly").objectStore(Bt)}function hu(){const t=indexedDB.deleteDatabase(_i);return new vt(t).toPromise()}function ki(){const t=indexedDB.open(_i,uu);return new Promise((e,s)=>{t.addEventListener("error",()=>{s(t.error)}),t.addEventListener("upgradeneeded",()=>{const r=t.result;try{r.createObjectStore(Bt,{keyPath:Ci})}catch(i){s(i)}}),t.addEventListener("success",async()=>{const r=t.result;r.objectStoreNames.contains(Bt)?e(r):(r.close(),await hu(),e(await ki()))})})}async function Gr(t,e,s){const r=Kt(t,!0).put({[Ci]:e,value:s});return new vt(r).toPromise()}async function mu(t,e){const s=Kt(t,!1).get(e),r=await new vt(s).toPromise();return r===void 0?null:r.value}function Hr(t,e){const s=Kt(t,!0).delete(e);return new vt(s).toPromise()}const fu=800,pu=3;class Ti{registerLifecycleListeners(){typeof window<"u"&&typeof window.addEventListener=="function"&&(window.addEventListener("pagehide",this.onPageHide),window.addEventListener("pageshow",this.onPageShow))}unregisterLifecycleListeners(){typeof window<"u"&&typeof window.removeEventListener=="function"&&(window.removeEventListener("pagehide",this.onPageHide),window.removeEventListener("pageshow",this.onPageShow))}constructor(){this.type="LOCAL",this.dbPromise=null,this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.isClosing=!1,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this.onPageHide=()=>{this.isClosing=!0,this.stopPolling(),this.dbPromise&&(this.dbPromise.then(e=>e.close()).catch(()=>{}),this.dbPromise=null)},this.onPageShow=()=>{this.isClosing&&(this.isClosing=!1,Object.keys(this.listeners).length>0&&this.startPolling())},this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.dbPromise?this.dbPromise:(this.dbPromise=ki(),this.dbPromise.catch(()=>{this.dbPromise=null}),this.dbPromise)}async _withRetries(e){let s=0;for(;;)try{const r=await this._openDb();return await e(r)}catch(r){if(s++>pu)throw r;if(this.dbPromise){const i=this.dbPromise;this.dbPromise=null;try{(await i).close()}catch{}}}}async initializeServiceWorkerMessaging(){return Si()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=qt._getInstance(du()),this.receiver._subscribe("keyChanged",async(e,s)=>({keyProcessed:(await this._poll()).includes(s.key)})),this.receiver._subscribe("ping",async(e,s)=>["keyChanged"])}async initializeSender(){var s,r;if(this.activeServiceWorker=await lu(),!this.activeServiceWorker)return;this.sender=new au(this.activeServiceWorker);const e=await this.sender._send("ping",{},800);e&&(s=e[0])!=null&&s.fulfilled&&(r=e[0])!=null&&r.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||cu()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{return indexedDB?(await this._withRetries(async e=>{await Gr(e,Dt,"1"),await Hr(e,Dt)}),!0):!1}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,s){return this._withPendingWrite(async()=>(await this._withRetries(r=>Gr(r,e,s)),this.localCache[e]=s,this.notifyServiceWorker(e)))}async _get(e){const s=await this._withRetries(r=>mu(r,e));return this.localCache[e]=s,s}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(s=>Hr(s,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){if(this.isClosing)return[];try{const e=await this._withRetries(i=>{const a=Kt(i,!1).getAll();return new vt(a).toPromise()});if(this.isClosing)return[];if(!e)return[];if(this.pendingWrites!==0)return[];const s=[],r=new Set;if(e.length!==0)for(const{fbase_key:i,value:a}of e)r.add(i),JSON.stringify(this.localCache[i])!==JSON.stringify(a)&&(this.notifyListeners(i,a),s.push(i));for(const i of Object.keys(this.localCache))this.localCache[i]&&!r.has(i)&&(this.notifyListeners(i,null),s.push(i));return s}catch(e){return this.isClosing||St(`Firebase Auth cross-tab polling failed with error: ${e}`),[]}}notifyListeners(e,s){this.localCache[e]=s;const r=this.listeners[e];if(r)for(const i of Array.from(r))i(s)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),fu)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,s){Object.keys(this.listeners).length===0&&(this.startPolling(),this.registerLifecycleListeners()),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(s)}_removeListener(e,s){this.listeners[e]&&(this.listeners[e].delete(s),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.stopPolling(),this.unregisterLifecycleListeners())}}Ti.type="LOCAL";const gu=Ti;new bt(3e4,6e4);/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xu(t,e){return e?ge(e):(E(t._popupRedirectResolver,t,"argument-error"),t._popupRedirectResolver)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Js extends bi{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return Ke(e,this._buildIdpRequest())}_linkToIdToken(e,s){return Ke(e,this._buildIdpRequest(s))}_getReauthenticationResolver(e){return Ke(e,this._buildIdpRequest())}_buildIdpRequest(e){const s={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(s.idToken=e),s}}function bu(t){return Zd(t.auth,new Js(t),t.bypassAuthState)}function wu(t){const{auth:e,user:s}=t;return E(s,e,"internal-error"),Xd(s,new Js(t),t.bypassAuthState)}async function vu(t){const{auth:e,user:s}=t;return E(s,e,"internal-error"),Jd(s,new Js(t),t.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ei{constructor(e,s,r,i,a=!1){this.auth=e,this.resolver=r,this.user=i,this.bypassAuthState=a,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(s)?s:[s]}execute(){return new Promise(async(e,s)=>{this.pendingPromise={resolve:e,reject:s};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(e){const{urlResponse:s,sessionId:r,postBody:i,tenantId:a,error:o,type:l}=e;if(o){this.reject(o);return}const c={auth:this.auth,requestUri:s,sessionId:r,tenantId:a||void 0,postBody:i||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(l)(c))}catch(d){this.reject(d)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return bu;case"linkViaPopup":case"linkViaRedirect":return vu;case"reauthViaPopup":case"reauthViaRedirect":return wu;default:we(this.auth,"internal-error")}}resolve(e){ve(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){ve(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yu=new bt(2e3,1e4);class Ve extends Ei{constructor(e,s,r,i,a){super(e,s,i,a),this.provider=r,this.authWindow=null,this.pollId=null,Ve.currentPopupAction&&Ve.currentPopupAction.cancel(),Ve.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return E(e,this.auth,"internal-error"),e}async onExecution(){ve(this.filter.length===1,"Popup operations only handle one event");const e=Ys();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(s=>{this.reject(s)}),this.resolver._isIframeWebStorageSupported(this.auth,s=>{s||this.reject(oe(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)==null?void 0:e.associatedEvent)||null}cancel(){this.reject(oe(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,Ve.currentPopupAction=null}pollUserCancellation(){const e=()=>{var s,r;if((r=(s=this.authWindow)==null?void 0:s.window)!=null&&r.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(oe(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,yu.get())};e()}}Ve.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Nu="pendingRedirect",kt=new Map;class Iu extends Ei{constructor(e,s,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],s,void 0,r),this.eventId=null}async execute(){let e=kt.get(this.auth._key());if(!e){try{const r=await ju(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(r)}catch(s){e=()=>Promise.reject(s)}kt.set(this.auth._key(),e)}return this.bypassAuthState||kt.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const s=await this.auth._redirectUserForId(e.eventId);if(s)return this.user=s,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function ju(t,e){const s=Cu(e),r=_u(t);if(!await r._isAvailable())return!1;const i=await r._get(s)==="true";return await r._remove(s),i}function Su(t,e){kt.set(t._key(),e)}function _u(t){return ge(t._redirectPersistence)}function Cu(t){return Ct(Nu,t.config.apiKey,t.name)}async function ku(t,e,s=!1){if(me(t.app))return Promise.reject(Le(t));const r=Ks(t),i=xu(r,e),o=await new Iu(r,i,s).execute();return o&&!s&&(delete o.user._redirectEventId,await r._persistUserIfCurrent(o.user),await r._setRedirectUser(null,e)),o}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Tu=600*1e3;class Eu{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let s=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(s=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!Pu(e)||(this.hasHandledPotentialRedirect=!0,s||(this.queuedRedirectEvent=e,s=!0)),s}sendToConsumer(e,s){var r;if(e.error&&!Pi(e)){const i=((r=e.error.code)==null?void 0:r.split("auth/")[1])||"internal-error";s.onError(oe(this.auth,i))}else s.onAuthEvent(e)}isEventForConsumer(e,s){const r=s.eventId===null||!!e.eventId&&e.eventId===s.eventId;return s.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=Tu&&this.cachedEventUids.clear(),this.cachedEventUids.has(qr(e))}saveEventToCache(e){this.cachedEventUids.add(qr(e)),this.lastProcessedEventTime=Date.now()}}function qr(t){return[t.type,t.eventId,t.sessionId,t.tenantId].filter(e=>e).join("-")}function Pi({type:t,error:e}){return t==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function Pu(t){switch(t.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return Pi(t);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Au(t,e={}){return et(t,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ru=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,Mu=/^https?/;async function Lu(t){if(t.config.emulator)return;const{authorizedDomains:e}=await Au(t);for(const s of e)try{if(Ou(s))return}catch{}we(t,"unauthorized-domain")}function Ou(t){const e=ws(),{protocol:s,hostname:r}=new URL(e);if(t.startsWith("chrome-extension://")){const o=new URL(t);return o.hostname===""&&r===""?s==="chrome-extension:"&&t.replace("chrome-extension://","")===e.replace("chrome-extension://",""):s==="chrome-extension:"&&o.hostname===r}if(!Mu.test(s))return!1;if(Ru.test(t))return r===t;const i=t.replace(/\./g,"\\.");return new RegExp("^(.+\\."+i+"|"+i+")$","i").test(r)}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Fu=new bt(3e4,6e4);function Kr(){const t=le().___jsl;if(t!=null&&t.H){for(const e of Object.keys(t.H))if(t.H[e].r=t.H[e].r||[],t.H[e].L=t.H[e].L||[],t.H[e].r=[...t.H[e].L],t.CP)for(let s=0;s<t.CP.length;s++)t.CP[s]=null}}function Du(t){return new Promise((e,s)=>{var i,a,o;function r(){Kr(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{Kr(),s(oe(t,"network-request-failed"))},timeout:Fu.get()})}if((a=(i=le().gapi)==null?void 0:i.iframes)!=null&&a.Iframe)e(gapi.iframes.getContext());else if((o=le().gapi)!=null&&o.load)r();else{const l=Vd("iframefcb");return le()[l]=()=>{gapi.load?r():s(oe(t,"network-request-failed"))},zd(`${Wd()}?onload=${l}`).catch(c=>s(c))}}).catch(e=>{throw Tt=null,e})}let Tt=null;function Bu(t){return Tt=Tt||Du(t),Tt}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Uu=new bt(5e3,15e3),$u="__/auth/iframe",zu="emulator/auth/iframe",Wu={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},Vu=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function Gu(t){const e=t.config;E(e.authDomain,t,"auth-domain-config-required");const s=e.emulator?Vs(e,zu):`https://${t.config.authDomain}/${$u}`,r={apiKey:e.apiKey,appName:t.name,v:xt},i=Vu.get(t.config.apiHost);i&&(r.eid=i);const a=t._getFrameworks();return a.length&&(r.fw=a.join(",")),`${s}?${gt(r).slice(1)}`}async function Hu(t){const e=await Bu(t),s=le().gapi;return E(s,t,"internal-error"),e.open({where:document.body,url:Gu(t),messageHandlersFilter:s.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:Wu,dontclear:!0},r=>new Promise(async(i,a)=>{await r.restyle({setHideOnLeave:!1});const o=oe(t,"network-request-failed"),l=le().setTimeout(()=>{a(o)},Uu.get());function c(){le().clearTimeout(l),i(r)}r.ping(c).then(c,()=>{a(o)})}))}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qu={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},Ku=500,Qu=600,Yu="_blank",Ju="http://localhost";class Qr{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function Xu(t,e,s,r=Ku,i=Qu){const a=Math.max((window.screen.availHeight-i)/2,0).toString(),o=Math.max((window.screen.availWidth-r)/2,0).toString();let l="";const c={...qu,width:r.toString(),height:i.toString(),top:a,left:o},d=J().toLowerCase();s&&(l=di(d)?Yu:s),li(d)&&(e=e||Ju,c.scrollbars="yes");const u=Object.entries(c).reduce((f,[m,g])=>`${f}${m}=${g},`,"");if(Md(d)&&l!=="_self")return Zu(e||"",l),new Qr(null);const h=window.open(e||"",l,u);E(h,t,"popup-blocked");try{h.focus()}catch{}return new Qr(h)}function Zu(t,e){const s=document.createElement("a");s.href=t,s.target=e;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),s.dispatchEvent(r)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const eh="__/auth/handler",th="emulator/auth/handler",sh=encodeURIComponent("fac");async function Yr(t,e,s,r,i,a){E(t.config.authDomain,t,"auth-domain-config-required"),E(t.config.apiKey,t,"invalid-api-key");const o={apiKey:t.config.apiKey,appName:t.name,authType:s,redirectUrl:r,v:xt,eventId:i};if(e instanceof wi){e.setDefaultLanguage(t.languageCode),o.providerId=e.providerId||"",Eo(e.getCustomParameters())||(o.customParameters=JSON.stringify(e.getCustomParameters()));for(const[u,h]of Object.entries({}))o[u]=h}if(e instanceof wt){const u=e.getScopes().filter(h=>h!=="");u.length>0&&(o.scopes=u.join(","))}t.tenantId&&(o.tid=t.tenantId);const l=o;for(const u of Object.keys(l))l[u]===void 0&&delete l[u];const c=await t._getAppCheckToken(),d=c?`#${sh}=${encodeURIComponent(c)}`:"";return`${rh(t)}?${gt(l).slice(1)}${d}`}function rh({config:t}){return t.emulator?Vs(t,th):`https://${t.authDomain}/${eh}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const cs="webStorageSupport";class nh{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=ji,this._completeRedirectFn=ku,this._overrideRedirectResult=Su}async _openPopup(e,s,r,i){var o;ve((o=this.eventManagers[e._key()])==null?void 0:o.manager,"_initialize() not called before _openPopup()");const a=await Yr(e,s,r,ws(),i);return Xu(e,a,Ys())}async _openRedirect(e,s,r,i){await this._originValidation(e);const a=await Yr(e,s,r,ws(),i);return ou(a),new Promise(()=>{})}_initialize(e){const s=e._key();if(this.eventManagers[s]){const{manager:i,promise:a}=this.eventManagers[s];return i?Promise.resolve(i):(ve(a,"If manager is not set, promise should be"),a)}const r=this.initAndGetManager(e);return this.eventManagers[s]={promise:r},r.catch(()=>{delete this.eventManagers[s]}),r}async initAndGetManager(e){const s=await Hu(e),r=new Eu(e);return s.register("authEvent",i=>(E(i==null?void 0:i.authEvent,e,"invalid-auth-event"),{status:r.onEvent(i.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=s,r}_isIframeWebStorageSupported(e,s){this.iframes[e._key()].send(cs,{type:cs},i=>{var o;const a=(o=i==null?void 0:i[0])==null?void 0:o[cs];a!==void 0&&s(!!a),we(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const s=e._key();return this.originValidationPromises[s]||(this.originValidationPromises[s]=Lu(e)),this.originValidationPromises[s]}get _shouldInitProactively(){return pi()||ci()||qs()}}const ih=nh;var Jr="@firebase/auth",Xr="1.13.7";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ah{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)==null?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const s=this.auth.onIdTokenChanged(r=>{e((r==null?void 0:r.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,s),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const s=this.internalListeners.get(e);s&&(this.internalListeners.delete(e),s(),this.updateProactiveRefresh())}assertAuthConfigured(){E(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function oh(t){switch(t){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function lh(t){be(new ce("auth",(e,{options:s})=>{const r=e.getProvider("app").getImmediate(),i=e.getProvider("heartbeat"),a=e.getProvider("app-check-internal"),{apiKey:o,authDomain:l}=r.options;E(o&&!o.includes(":"),"invalid-api-key",{appName:r.name});const c={apiKey:o,authDomain:l,clientPlatform:t,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:gi(t)},d=new Ud(r,i,a,c);return Hd(d,s),d},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,s,r)=>{e.getProvider("auth-internal").initialize()})),be(new ce("auth-internal",e=>{const s=Ks(e.getProvider("auth").getImmediate());return(r=>new ah(r))(s)},"PRIVATE").setInstantiationMode("EXPLICIT")),ae(Jr,Xr,oh(t)),ae(Jr,Xr,"esm2020")}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ch=300,dh=_n("authIdTokenMaxAge")||ch;let Zr=null;const uh=t=>async e=>{const s=e&&await e.getIdTokenResult(),r=s&&(new Date().getTime()-Date.parse(s.issuedAtTime))/1e3;if(r&&r>dh)return;const i=s==null?void 0:s.token;Zr!==i&&(Zr=i,await fetch(t,{method:i?"POST":"DELETE",headers:i?{Authorization:`Bearer ${i}`}:{}}))};function hh(t=Ls()){const e=Ze(t,"auth");if(e.isInitialized())return e.getImmediate();const s=Gd(t,{popupRedirectResolver:ih,persistence:[gu,nu,ji]}),r=_n("authTokenSyncURL");if(r&&typeof isSecureContext=="boolean"&&isSecureContext){const a=new URL(r,location.origin);if(location.origin===a.origin){const o=uh(a.toString());tu(s,o,()=>o(s.currentUser)),eu(s,l=>o(l))}}const i=No("auth");return i&&qd(s,`http://${i}`),s}function mh(){var t;return((t=document.getElementsByTagName("head"))==null?void 0:t[0])??document}$d({loadJS(t){return new Promise((e,s)=>{const r=document.createElement("script");r.setAttribute("src",t),r.onload=e,r.onerror=i=>{const a=oe("internal-error");a.customData=i,s(a)},r.type="text/javascript",r.charset="UTF-8",mh().appendChild(r)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});lh("Browser");const lt={apiKey:"AIzaSyCXzTor-nfQ3IGeQm_JQ2hLU6CvDxP_auE",authDomain:"fixture-planner.firebaseapp.com",projectId:"fixture-planner",storageBucket:"fixture-planner.firebasestorage.app",messagingSenderId:"591428737920",appId:"1:591428737920:web:514f6862bfc785a81f7f65",measurementId:"G-L9MH7M1FKN"},fh=!!(lt.apiKey&&lt.projectId&&lt.appId);let It,ph,gh=Promise.resolve(null);if(fh)try{It=Ol().length>0?Ls():Pn(lt),ph=hh(It),typeof window<"u"&&(gh=md().then(t=>t&&It&&lt.measurementId?ud(It):null).catch(()=>null))}catch(t){console.warn("Firebase initialization skipped or failed:",t)}da.createRoot(document.getElementById("root")).render(n.jsx(Ut.StrictMode,{children:n.jsx(mo,{})}));
