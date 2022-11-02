import{useContext as t,useId as e,useEffect as n,useRef as r,createElement as o}from"react";import{p as s,q as a,t as i,u,v as l,w as c,x as d,y as p,z as f,P as m,A as h,B as v,C as g,D as y,E as b,F as w,G as A,r as V,d as S,H as M,m as x,c as C,i as E,f as T,b as O,l as P,a as I,I as F,J as k,o as R,g as j,K as D,L as B,M as U,s as L,h as N,n as H,j as z}from"./size-rollup-dom-animation-assets.js";const q=(t,e)=>n=>Boolean(s(n)&&a.test(n)&&n.startsWith(t)||e&&Object.prototype.hasOwnProperty.call(n,e)),W=(t,e,n)=>r=>{if(!s(r))return r;const[o,a,u,l]=r.match(i);return{[t]:parseFloat(o),[e]:parseFloat(a),[n]:parseFloat(u),alpha:void 0!==l?parseFloat(l):1}},$={test:q("hsl","hue"),parse:W("hue","saturation","lightness"),transform:({hue:t,saturation:e,lightness:n,alpha:r=1})=>"hsla("+Math.round(t)+", "+u.transform(l(e))+", "+u.transform(l(n))+", "+l(c.transform(r))+")"},K=p(0,255),Y=Object.assign(Object.assign({},d),{transform:t=>Math.round(K(t))}),X={test:q("rgb","red"),parse:W("red","green","blue"),transform:({red:t,green:e,blue:n,alpha:r=1})=>"rgba("+Y.transform(t)+", "+Y.transform(e)+", "+Y.transform(n)+", "+l(c.transform(r))+")"};const G={test:q("#"),parse:function(t){let e="",n="",r="",o="";return t.length>5?(e=t.substr(1,2),n=t.substr(3,2),r=t.substr(5,2),o=t.substr(7,2)):(e=t.substr(1,1),n=t.substr(2,1),r=t.substr(3,1),o=t.substr(4,1),e+=e,n+=n,r+=r,o+=o),{red:parseInt(e,16),green:parseInt(n,16),blue:parseInt(r,16),alpha:o?parseInt(o,16)/255:1}},transform:X.transform},Z={test:t=>X.test(t)||G.test(t)||$.test(t),parse:t=>X.test(t)?X.parse(t):$.test(t)?$.parse(t):G.parse(t),transform:t=>s(t)?t:t.hasOwnProperty("red")?X.transform(t):$.transform(t)};function J(t){"number"==typeof t&&(t=""+t);const e=[];let n=0;const r=t.match(f);r&&(n=r.length,t=t.replace(f,"${c}"),e.push(...r.map(Z.parse)));const o=t.match(i);return o&&(t=t.replace(i,"${n}"),e.push(...o.map(d.parse))),{values:e,numColors:n,tokenised:t}}function _(t){return J(t).values}function Q(t){const{values:e,numColors:n,tokenised:r}=J(t),o=e.length;return t=>{let e=r;for(let r=0;r<o;r++)e=e.replace(r<n?"${c}":"${n}",r<n?Z.transform(t[r]):l(t[r]));return e}}const tt=t=>"number"==typeof t?0:t;const et={test:function(t){var e,n,r,o;return isNaN(t)&&s(t)&&(null!==(n=null===(e=t.match(i))||void 0===e?void 0:e.length)&&void 0!==n?n:0)+(null!==(o=null===(r=t.match(f))||void 0===r?void 0:r.length)&&void 0!==o?o:0)>0},parse:_,createTransformer:Q,getAnimatableNone:function(t){const e=_(t);return Q(t)(e.map(tt))}},nt=new Set(["brightness","contrast","saturate","opacity"]);function rt(t){let[e,n]=t.slice(0,-1).split("(");if("drop-shadow"===e)return t;const[r]=n.match(i)||[];if(!r)return t;const o=n.replace(r,"");let s=nt.has(e)?1:0;return r!==n&&(s*=100),e+"("+s+o+")"}const ot=/([a-z-]*)\(.*?\)/g,st=Object.assign(Object.assign({},et),{getAnimatableNone:t=>{const e=t.match(ot);return e?e.map(rt).join(" "):t}});function at(t,e){if(!Array.isArray(e))return!1;const n=e.length;if(n!==t.length)return!1;for(let r=0;r<n;r++)if(e[r]!==t[r])return!1;return!0}function it(t,e){var n={};for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&e.indexOf(r)<0&&(n[r]=t[r]);if(null!=t&&"function"==typeof Object.getOwnPropertySymbols){var o=0;for(r=Object.getOwnPropertySymbols(t);o<r.length;o++)e.indexOf(r[o])<0&&Object.prototype.propertyIsEnumerable.call(t,r[o])&&(n[r[o]]=t[r[o]])}return n}const ut=(t,e,n)=>Math.min(Math.max(n,t),e);function lt({duration:t=800,bounce:e=.25,velocity:n=0,mass:r=1}){let o,s,a=1-e;a=ut(.05,1,a),t=ut(.01,10,t/1e3),a<1?(o=e=>{const r=e*a,o=r*t;return.001-(r-n)/ct(e,a)*Math.exp(-o)},s=e=>{const r=e*a*t,s=r*n+n,i=Math.pow(a,2)*Math.pow(e,2)*t,u=Math.exp(-r),l=ct(Math.pow(e,2),a);return(.001-o(e)>0?-1:1)*((s-i)*u)/l}):(o=e=>Math.exp(-e*t)*((e-n)*t+1)-.001,s=e=>Math.exp(-e*t)*(t*t*(n-e)));const i=function(t,e,n){let r=n;for(let n=1;n<12;n++)r-=t(r)/e(r);return r}(o,s,5/t);if(t*=1e3,isNaN(i))return{stiffness:100,damping:10,duration:t};{const e=Math.pow(i,2)*r;return{stiffness:e,damping:2*a*Math.sqrt(r*e),duration:t}}}function ct(t,e){return t*Math.sqrt(1-e*e)}const dt=["duration","bounce"],pt=["stiffness","damping","mass"];function ft(t,e){return e.some(e=>void 0!==t[e])}function mt(t){var{from:e=0,to:n=1,restSpeed:r=2,restDelta:o}=t,s=it(t,["from","to","restSpeed","restDelta"]);const a={done:!1,value:e};let{stiffness:i,damping:u,mass:l,velocity:c,duration:d,isResolvedFromDuration:p}=function(t){let e=Object.assign({velocity:0,stiffness:100,damping:10,mass:1,isResolvedFromDuration:!1},t);if(!ft(t,pt)&&ft(t,dt)){const n=lt(t);e=Object.assign(Object.assign(Object.assign({},e),n),{velocity:0,mass:1}),e.isResolvedFromDuration=!0}return e}(s),f=ht,m=ht;function h(){const t=c?-c/1e3:0,r=n-e,s=u/(2*Math.sqrt(i*l)),a=Math.sqrt(i/l)/1e3;if(void 0===o&&(o=Math.min(Math.abs(n-e)/100,.4)),s<1){const e=ct(a,s);f=o=>{const i=Math.exp(-s*a*o);return n-i*((t+s*a*r)/e*Math.sin(e*o)+r*Math.cos(e*o))},m=n=>{const o=Math.exp(-s*a*n);return s*a*o*(Math.sin(e*n)*(t+s*a*r)/e+r*Math.cos(e*n))-o*(Math.cos(e*n)*(t+s*a*r)-e*r*Math.sin(e*n))}}else if(1===s)f=e=>n-Math.exp(-a*e)*(r+(t+a*r)*e);else{const e=a*Math.sqrt(s*s-1);f=o=>{const i=Math.exp(-s*a*o),u=Math.min(e*o,300);return n-i*((t+s*a*r)*Math.sinh(u)+e*r*Math.cosh(u))/e}}}return h(),{next:t=>{const e=f(t);if(p)a.done=t>=d;else{const s=1e3*m(t),i=Math.abs(s)<=r,u=Math.abs(n-e)<=o;a.done=i&&u}return a.value=a.done?n:e,a},flipTarget:()=>{c=-c,[e,n]=[n,e],h()}}}mt.needsInterpolation=(t,e)=>"string"==typeof t||"string"==typeof e;const ht=t=>0,vt=(t,e,n)=>{const r=e-t;return 0===r?1:(n-t)/r},gt=(t,e,n)=>-n*t+n*e+t;function yt(t,e,n){return n<0&&(n+=1),n>1&&(n-=1),n<1/6?t+6*(e-t)*n:n<.5?e:n<2/3?t+(e-t)*(2/3-n)*6:t}function bt({hue:t,saturation:e,lightness:n,alpha:r}){t/=360,n/=100;let o=0,s=0,a=0;if(e/=100){const r=n<.5?n*(1+e):n+e-n*e,i=2*n-r;o=yt(i,r,t+1/3),s=yt(i,r,t),a=yt(i,r,t-1/3)}else o=s=a=n;return{red:Math.round(255*o),green:Math.round(255*s),blue:Math.round(255*a),alpha:r}}const wt=(t,e,n)=>{const r=t*t,o=e*e;return Math.sqrt(Math.max(0,n*(o-r)+r))},At=[G,X,$],Vt=t=>At.find(e=>e.test(t)),St=(t,e)=>{let n=Vt(t),r=Vt(e),o=n.parse(t),s=r.parse(e);n===$&&(o=bt(o),n=X),r===$&&(s=bt(s),r=X);const a=Object.assign({},o);return t=>{for(const e in a)"alpha"!==e&&(a[e]=wt(o[e],s[e],t));return a.alpha=gt(o.alpha,s.alpha,t),n.transform(a)}},Mt=(t,e)=>n=>e(t(n)),xt=(...t)=>t.reduce(Mt);function Ct(t,e){return"number"==typeof t?n=>gt(t,e,n):Z.test(t)?St(t,e):Pt(t,e)}const Et=(t,e)=>{const n=[...t],r=n.length,o=t.map((t,n)=>Ct(t,e[n]));return t=>{for(let e=0;e<r;e++)n[e]=o[e](t);return n}},Tt=(t,e)=>{const n=Object.assign(Object.assign({},t),e),r={};for(const o in n)void 0!==t[o]&&void 0!==e[o]&&(r[o]=Ct(t[o],e[o]));return t=>{for(const e in r)n[e]=r[e](t);return n}};function Ot(t){const e=et.parse(t),n=e.length;let r=0,o=0,s=0;for(let t=0;t<n;t++)r||"number"==typeof e[t]?r++:void 0!==e[t].hue?s++:o++;return{parsed:e,numNumbers:r,numRGB:o,numHSL:s}}const Pt=(t,e)=>{const n=et.createTransformer(e),r=Ot(t),o=Ot(e);return r.numHSL===o.numHSL&&r.numRGB===o.numRGB&&r.numNumbers>=o.numNumbers?xt(Et(r.parsed,o.parsed),n):n=>""+(n>0?e:t)},It=(t,e)=>n=>gt(t,e,n);function Ft(t,e,n){const r=[],o=n||("number"==typeof(s=t[0])?It:"string"==typeof s?Z.test(s)?St:Pt:Array.isArray(s)?Et:"object"==typeof s?Tt:void 0);var s;const a=t.length-1;for(let n=0;n<a;n++){let s=o(t[n],t[n+1]);if(e){const t=Array.isArray(e)?e[n]:e;s=xt(t,s)}r.push(s)}return r}function kt(t,e,{clamp:n=!0,ease:r,mixer:o}={}){const s=t.length;e.length,!r||!Array.isArray(r)||r.length,t[0]>t[s-1]&&(t=[].concat(t),e=[].concat(e),t.reverse(),e.reverse());const a=Ft(e,r,o),i=2===s?function([t,e],[n]){return r=>n(vt(t,e,r))}(t,a):function(t,e){const n=t.length,r=n-1;return o=>{let s=0,a=!1;if(o<=t[0]?a=!0:o>=t[r]&&(s=r-1,a=!0),!a){let e=1;for(;e<n&&!(t[e]>o||e===r);e++);s=e-1}const i=vt(t[s],t[s+1],o);return e[s](i)}}(t,a);return n?e=>i(ut(t[0],t[s-1],e)):i}const Rt=t=>e=>1-t(1-e),jt=t=>e=>e<=.5?t(2*e)/2:(2-t(2*(1-e)))/2,Dt=t=>e=>e*e*((t+1)*e-t),Bt=t=>t,Ut=(Lt=2,t=>Math.pow(t,Lt));var Lt;const Nt=Rt(Ut),Ht=jt(Ut),zt=t=>1-Math.sin(Math.acos(t)),qt=Rt(zt),Wt=jt(qt),$t=Dt(1.525),Kt=Rt($t),Yt=jt($t),Xt=(t=>{const e=Dt(t);return t=>(t*=2)<1?.5*e(t):.5*(2-Math.pow(2,-10*(t-1)))})(1.525),Gt=t=>{if(1===t||0===t)return t;const e=t*t;return t<4/11?7.5625*e:t<8/11?9.075*e-9.9*t+3.4:t<.9?4356/361*e-35442/1805*t+16061/1805:10.8*t*t-20.52*t+10.72},Zt=Rt(Gt);function Jt(t,e){return t.map(()=>e||Ht).splice(0,t.length-1)}function _t({from:t=0,to:e=1,ease:n,offset:r,duration:o=300}){const s={done:!1,value:t},a=Array.isArray(e)?e:[t,e],i=function(t,e){return t.map(t=>t*e)}(r&&r.length===a.length?r:function(t){const e=t.length;return t.map((t,n)=>0!==n?n/(e-1):0)}(a),o);function u(){return kt(i,a,{ease:Array.isArray(n)?n:Jt(a,n)})}let l=u();return{next:t=>(s.value=l(t),s.done=t>=o,s),flipTarget:()=>{a.reverse(),l=u()}}}const Qt={keyframes:_t,spring:mt,decay:function({velocity:t=0,from:e=0,power:n=.8,timeConstant:r=350,restDelta:o=.5,modifyTarget:s}){const a={done:!1,value:e};let i=n*t;const u=e+i,l=void 0===s?u:s(u);return l!==u&&(i=l-e),{next:t=>{const e=-i*Math.exp(-t/r);return a.done=!(e>o||e<-o),a.value=a.done?l:l+e,a},flipTarget:()=>{}}}};const te="undefined"!=typeof performance?()=>performance.now():()=>Date.now(),ee="undefined"!=typeof window?t=>window.requestAnimationFrame(t):t=>setTimeout(()=>t(te()),1/60*1e3);let ne=!0,re=!1,oe=!1;const se={delta:0,timestamp:0},ae=["read","update","preRender","render","postRender"],ie=ae.reduce((t,e)=>(t[e]=function(t){let e=[],n=[],r=0,o=!1,s=!1;const a=new WeakSet,i={schedule:(t,s=!1,i=!1)=>{const u=i&&o,l=u?e:n;return s&&a.add(t),-1===l.indexOf(t)&&(l.push(t),u&&o&&(r=e.length)),t},cancel:t=>{const e=n.indexOf(t);-1!==e&&n.splice(e,1),a.delete(t)},process:u=>{if(o)s=!0;else{if(o=!0,[e,n]=[n,e],n.length=0,r=e.length,r)for(let n=0;n<r;n++){const r=e[n];r(u),a.has(r)&&(i.schedule(r),t())}o=!1,s&&(s=!1,i.process(u))}}};return i}(()=>re=!0),t),{}),ue=ae.reduce((t,e)=>{const n=ie[e];return t[e]=(t,e=!1,r=!1)=>(re||pe(),n.schedule(t,e,r)),t},{}),le=ae.reduce((t,e)=>(t[e]=ie[e].cancel,t),{});ae.reduce((t,e)=>(t[e]=()=>ie[e].process(se),t),{});const ce=t=>ie[t].process(se),de=t=>{re=!1,se.delta=ne?1/60*1e3:Math.max(Math.min(t-se.timestamp,40),1),se.timestamp=t,oe=!0,ae.forEach(ce),oe=!1,re&&(ne=!1,ee(de))},pe=()=>{re=!0,ne=!0,oe||ee(de)},fe=()=>se;function me(t,e,n=0){return t-e-n}const he=t=>{const e=({delta:e})=>t(e);return{start:()=>ue.update(e,!0),stop:()=>le.update(e)}};function ve(t){var e,n,{from:r,autoplay:o=!0,driver:s=he,elapsed:a=0,repeat:i=0,repeatType:u="loop",repeatDelay:l=0,onPlay:c,onStop:d,onComplete:p,onRepeat:f,onUpdate:m}=t,h=it(t,["from","autoplay","driver","elapsed","repeat","repeatType","repeatDelay","onPlay","onStop","onComplete","onRepeat","onUpdate"]);let v,g,y,{to:b}=h,w=0,A=h.duration,V=!1,S=!0;const M=function(t){if(Array.isArray(t.to))return _t;if(Qt[t.type])return Qt[t.type];const e=new Set(Object.keys(t));return e.has("ease")||e.has("duration")&&!e.has("dampingRatio")?_t:e.has("dampingRatio")||e.has("stiffness")||e.has("mass")||e.has("damping")||e.has("restSpeed")||e.has("restDelta")?mt:_t}(h);(null===(n=(e=M).needsInterpolation)||void 0===n?void 0:n.call(e,r,b))&&(y=kt([0,100],[r,b],{clamp:!1}),r=0,b=100);const x=M(Object.assign(Object.assign({},h),{from:r,to:b}));function C(){w++,"reverse"===u?(S=w%2==0,a=function(t,e,n=0,r=!0){return r?me(e+-t,e,n):e-(t-e)+n}(a,A,l,S)):(a=me(a,A,l),"mirror"===u&&x.flipTarget()),V=!1,f&&f()}function E(t){if(S||(t=-t),a+=t,!V){const t=x.next(Math.max(0,a));g=t.value,y&&(g=y(g)),V=S?t.done:a<=0}null==m||m(g),V&&(0===w&&(null!=A||(A=a)),w<i?function(t,e,n,r){return r?t>=e+n:t<=-n}(a,A,l,S)&&C():(v.stop(),p&&p()))}return o&&(null==c||c(),v=s(E),v.start()),{stop:()=>{null==d||d(),v.stop()}}}function ge(t,e){return e?t*(1e3/e):0}const ye=(t,e)=>1-3*e+3*t,be=(t,e)=>3*e-6*t,we=t=>3*t,Ae=(t,e,n)=>((ye(e,n)*t+be(e,n))*t+we(e))*t,Ve=(t,e,n)=>3*ye(e,n)*t*t+2*be(e,n)*t+we(e);function Se(t,e,n,r){if(t===e&&n===r)return Bt;const o=new Float32Array(11);for(let e=0;e<11;++e)o[e]=Ae(.1*e,t,n);function s(e){let r=0,s=1;for(;10!==s&&o[s]<=e;++s)r+=.1;--s;const a=r+.1*((e-o[s])/(o[s+1]-o[s])),i=Ve(a,t,n);return i>=.001?function(t,e,n,r){for(let o=0;o<8;++o){const o=Ve(e,n,r);if(0===o)return e;e-=(Ae(e,n,r)-t)/o}return e}(e,a,t,n):0===i?a:function(t,e,n,r,o){let s,a,i=0;do{a=e+(n-e)/2,s=Ae(a,r,o)-t,s>0?n=a:e=a}while(Math.abs(s)>1e-7&&++i<10);return a}(e,r,r+.1,t,n)}return t=>0===t||1===t?t:Ae(s(t),e,r)}const Me=t=>1e3*t,xe={linear:Bt,easeIn:Ut,easeInOut:Ht,easeOut:Nt,circIn:zt,circInOut:Wt,circOut:qt,backIn:$t,backInOut:Yt,backOut:Kt,anticipate:Xt,bounceIn:Zt,bounceInOut:t=>t<.5?.5*(1-Gt(1-2*t)):.5*Gt(2*t-1)+.5,bounceOut:Gt},Ce=t=>{if(Array.isArray(t)){t.length;const[e,n,r,o]=t;return Se(e,n,r,o)}return"string"==typeof t?xe[t]:t},Ee=(t,e)=>"zIndex"!==t&&(!("number"!=typeof e&&!Array.isArray(e))||!("string"!=typeof e||!et.test(e)||e.startsWith("url("))),Te=()=>({type:"spring",stiffness:500,damping:25,restSpeed:10}),Oe=t=>({type:"spring",stiffness:550,damping:0===t?2*Math.sqrt(550):30,restSpeed:10}),Pe=()=>({type:"keyframes",ease:"linear",duration:.3}),Ie=t=>({type:"keyframes",duration:.8,values:t}),Fe={x:Te,y:Te,z:Te,rotate:Te,rotateX:Te,rotateY:Te,rotateZ:Te,scaleX:Oe,scaleY:Oe,scale:Oe,opacity:Pe,backgroundColor:Pe,color:Pe,default:Oe},ke=(t,e)=>{let n;return n=h(e)?Ie:Fe[t]||Fe.default,{to:e,...n(e)}},Re={...v,color:Z,backgroundColor:Z,outlineColor:Z,fill:Z,stroke:Z,borderColor:Z,borderTopColor:Z,borderRightColor:Z,borderBottomColor:Z,borderLeftColor:Z,filter:st,WebkitFilter:st},je=t=>Re[t];function De(t,e){var n;let r=je(t);return r!==st&&(r=et),null===(n=r.getAnimatableNone)||void 0===n?void 0:n.call(r,e)}const Be=!1;function Ue({ease:t,times:e,yoyo:n,flip:r,loop:o,...s}){const a={...s};return e&&(a.offset=e),s.duration&&(a.duration=Me(s.duration)),s.repeatDelay&&(a.repeatDelay=Me(s.repeatDelay)),t&&(a.ease=(t=>Array.isArray(t)&&"number"!=typeof t[0])(t)?t.map(Ce):Ce(t)),"tween"===s.type&&(a.type="keyframes"),(n||o||r)&&(n?a.repeatType="reverse":o?a.repeatType="loop":r&&(a.repeatType="mirror"),a.repeat=o||n||r||s.repeat),"spring"!==s.type&&(a.type="keyframes"),a}function Le(t,e,n){return Array.isArray(e.to)&&void 0===t.duration&&(t.duration=.8),function(t){Array.isArray(t.to)&&null===t.to[0]&&(t.to=[...t.to],t.to[0]=t.from)}(e),function({when:t,delay:e,delayChildren:n,staggerChildren:r,staggerDirection:o,repeat:s,repeatType:a,repeatDelay:i,from:u,...l}){return!!Object.keys(l).length}(t)||(t={...t,...ke(n,e.to)}),{...e,...Ue(t)}}function Ne(t,e,n,r,o){const s=qe(r,t)||{};let a=void 0!==s.from?s.from:e.get();const i=Ee(t,n);"none"===a&&i&&"string"==typeof n?a=De(t,n):He(a)&&"string"==typeof n?a=ze(n):!Array.isArray(n)&&He(n)&&"string"==typeof a&&(n=ze(a));return Ee(t,a)&&i&&!1!==s.type?function(){const r={from:a,to:n,velocity:e.getVelocity(),onComplete:o,onUpdate:t=>e.set(t)};return"inertia"===s.type||"decay"===s.type?function({from:t=0,velocity:e=0,min:n,max:r,power:o=.8,timeConstant:s=750,bounceStiffness:a=500,bounceDamping:i=10,restDelta:u=1,modifyTarget:l,driver:c,onUpdate:d,onComplete:p,onStop:f}){let m;function h(t){return void 0!==n&&t<n||void 0!==r&&t>r}function v(t){return void 0===n?r:void 0===r||Math.abs(n-t)<Math.abs(r-t)?n:r}function g(t){null==m||m.stop(),m=ve(Object.assign(Object.assign({},t),{driver:c,onUpdate:e=>{var n;null==d||d(e),null===(n=t.onUpdate)||void 0===n||n.call(t,e)},onComplete:p,onStop:f}))}function y(t){g(Object.assign({type:"spring",stiffness:a,damping:i,restDelta:u},t))}if(h(t))y({from:t,velocity:e,to:v(t)});else{let r=o*e+t;void 0!==l&&(r=l(r));const a=v(r),i=a===n?-1:1;let c,d;const p=t=>{c=d,d=t,e=ge(t-c,fe().delta),(1===i&&t>a||-1===i&&t<a)&&y({from:t,to:a,velocity:e})};g({type:"decay",from:t,velocity:e,timeConstant:s,power:o,restDelta:u,modifyTarget:l,onUpdate:h(r)?p:void 0})}return{stop:()=>null==m?void 0:m.stop()}}({...r,...s}):ve({...Le(s,r,t),onUpdate:t=>{r.onUpdate(t),s.onUpdate&&s.onUpdate(t)},onComplete:()=>{r.onComplete(),s.onComplete&&s.onComplete()}})}:function(){const t=g(n);return e.set(t),o(),s.onUpdate&&s.onUpdate(t),s.onComplete&&s.onComplete(),{stop:()=>{}}}}function He(t){return 0===t||"string"==typeof t&&0===parseFloat(t)&&-1===t.indexOf(" ")}function ze(t){return"number"==typeof t?0:De("",t)}function qe(t,e){return t[e]||t.default||t}function We(t,e,n,r={}){return Be&&(r={type:!1}),e.start(o=>{let s;const a=Ne(t,e,n,r,o),i=function(t,e){var n,r;return null!==(r=null!==(n=(qe(t,e)||{}).delay)&&void 0!==n?n:t.delay)&&void 0!==r?r:0}(r,t),u=()=>s=a();let l;return i?l=function(t,e){const n=performance.now(),r=({timestamp:o})=>{const s=o-n;s>=e&&(le.read(r),t(s-e))};return ue.read(r,!0),()=>le.read(r)}(u,Me(i)):u(),()=>{l&&l(),s&&s.stop()}})}const $e=t=>/^0[^.\s]+$/.test(t);class Ke{constructor(){this.subscriptions=[]}add(t){var e,n;return e=this.subscriptions,n=t,-1===e.indexOf(n)&&e.push(n),()=>function(t,e){const n=t.indexOf(e);n>-1&&t.splice(n,1)}(this.subscriptions,t)}notify(t,e,n){const r=this.subscriptions.length;if(r)if(1===r)this.subscriptions[0](t,e,n);else for(let o=0;o<r;o++){const r=this.subscriptions[o];r&&r(t,e,n)}}getSize(){return this.subscriptions.length}clear(){this.subscriptions.length=0}}class Ye{constructor(t){var e;this.version="7.6.1",this.timeDelta=0,this.lastUpdated=0,this.updateSubscribers=new Ke,this.velocityUpdateSubscribers=new Ke,this.renderSubscribers=new Ke,this.canTrackVelocity=!1,this.updateAndNotify=(t,e=!0)=>{this.prev=this.current,this.current=t;const{delta:n,timestamp:r}=fe();this.lastUpdated!==r&&(this.timeDelta=n,this.lastUpdated=r,ue.postRender(this.scheduleVelocityCheck)),this.prev!==this.current&&this.updateSubscribers.notify(this.current),this.velocityUpdateSubscribers.getSize()&&this.velocityUpdateSubscribers.notify(this.getVelocity()),e&&this.renderSubscribers.notify(this.current)},this.scheduleVelocityCheck=()=>ue.postRender(this.velocityCheck),this.velocityCheck=({timestamp:t})=>{t!==this.lastUpdated&&(this.prev=this.current,this.velocityUpdateSubscribers.notify(this.getVelocity()))},this.hasAnimated=!1,this.prev=this.current=t,this.canTrackVelocity=(e=this.current,!isNaN(parseFloat(e)))}onChange(t){return this.updateSubscribers.add(t)}clearListeners(){this.updateSubscribers.clear()}onRenderRequest(t){return t(this.get()),this.renderSubscribers.add(t)}attach(t){this.passiveEffect=t}set(t,e=!0){e&&this.passiveEffect?this.passiveEffect(t,this.updateAndNotify):this.updateAndNotify(t,e)}get(){return this.current}getPrevious(){return this.prev}getVelocity(){return this.canTrackVelocity?ge(parseFloat(this.current)-parseFloat(this.prev),this.timeDelta):0}start(t){return this.stop(),new Promise(e=>{this.hasAnimated=!0,this.stopAnimation=t(e)}).then(()=>this.clearAnimation())}stop(){this.stopAnimation&&this.stopAnimation(),this.clearAnimation()}isAnimating(){return!!this.stopAnimation}clearAnimation(){this.stopAnimation=null}destroy(){this.updateSubscribers.clear(),this.renderSubscribers.clear(),this.stop()}}function Xe(t){return new Ye(t)}const Ge=t=>e=>e.test(t),Ze=[d,y,u,b,w,A,{test:t=>"auto"===t,parse:t=>t}],Je=t=>Ze.find(Ge(t)),_e=[...Ze,Z,et],Qe=t=>_e.find(Ge(t));function tn(t,e,n){const r=t.getProps();return V(r,e,void 0!==n?n:r.custom,function(t){const e={};return t.forEachValue((t,n)=>e[n]=t.get()),e}(t),function(t){const e={};return t.forEachValue((t,n)=>e[n]=t.getVelocity()),e}(t))}function en(t,e,n){t.hasValue(e)?t.getValue(e).set(n):t.addValue(e,Xe(n))}function nn(t,e){if(!e)return;return(e[t]||e.default||e).from}function rn(t){return Boolean(S(t)&&t.add)}function on(t,e,n={}){var r;const o=tn(t,e,n.custom);let{transition:s=t.getDefaultTransition()||{}}=o||{};n.transitionOverride&&(s=n.transitionOverride);const a=o?()=>sn(t,o,n):()=>Promise.resolve(),i=(null===(r=t.variantChildren)||void 0===r?void 0:r.size)?(r=0)=>{const{delayChildren:o=0,staggerChildren:a,staggerDirection:i}=s;return function(t,e,n=0,r=0,o=1,s){const a=[],i=(t.variantChildren.size-1)*r,u=1===o?(t=0)=>t*r:(t=0)=>i-t*r;return Array.from(t.variantChildren).sort(an).forEach((t,r)=>{a.push(on(t,e,{...s,delay:n+u(r)}).then(()=>t.notifyAnimationComplete(e)))}),Promise.all(a)}(t,e,o+r,a,i,n)}:()=>Promise.resolve(),{when:u}=s;if(u){const[t,e]="beforeChildren"===u?[a,i]:[i,a];return t().then(e)}return Promise.all([a(),i(n.delay)])}function sn(t,e,{delay:n=0,transitionOverride:r,type:o}={}){var s;let{transition:a=t.getDefaultTransition(),transitionEnd:i,...u}=t.makeTargetAnimatable(e);const l=t.getValue("willChange");r&&(a=r);const c=[],d=o&&(null===(s=t.animationState)||void 0===s?void 0:s.getState()[o]);for(const e in u){const r=t.getValue(e),o=u[e];if(!r||void 0===o||d&&un(d,e))continue;let s={delay:n,...a};t.shouldReduceMotion&&M.has(e)&&(s={...s,type:!1,delay:0});let i=We(e,r,o,s);rn(l)&&(l.add(e),i=i.then(()=>l.remove(e))),c.push(i)}return Promise.all(c).then(()=>{i&&function(t,e){const n=tn(t,e);let{transitionEnd:r={},transition:o={},...s}=n?t.makeTargetAnimatable(n,!1):{};s={...s,...r};for(const e in s){en(t,e,g(s[e]))}}(t,i)})}function an(t,e){return t.sortNodePosition(e)}function un({protectedKeys:t,needsAnimating:e},n){const r=t.hasOwnProperty(n)&&!0!==e[n];return e[n]=!1,r}var ln;!function(t){t.Animate="animate",t.Hover="whileHover",t.Tap="whileTap",t.Drag="whileDrag",t.Focus="whileFocus",t.InView="whileInView",t.Exit="exit"}(ln||(ln={}));const cn=[ln.Animate,ln.InView,ln.Focus,ln.Hover,ln.Tap,ln.Drag,ln.Exit],dn=[...cn].reverse(),pn=cn.length;function fn(t){return e=>Promise.all(e.map(({animation:e,options:n})=>function(t,e,n={}){let r;if(t.notifyAnimationStart(e),Array.isArray(e)){const o=e.map(e=>on(t,e,n));r=Promise.all(o)}else if("string"==typeof e)r=on(t,e,n);else{const o="function"==typeof e?tn(t,e,n.custom):e;r=sn(t,o,n)}return r.then(()=>t.notifyAnimationComplete(e))}(t,e,n)))}function mn(t){let e=fn(t);const n={[ln.Animate]:vn(!0),[ln.InView]:vn(),[ln.Hover]:vn(),[ln.Tap]:vn(),[ln.Drag]:vn(),[ln.Focus]:vn(),[ln.Exit]:vn()};let r=!0;const o=(e,n)=>{const r=tn(t,n);if(r){const{transition:t,transitionEnd:n,...o}=r;e={...e,...o,...n}}return e};function s(s,a){var i;const u=t.getProps(),l=t.getVariantContext(!0)||{},c=[],d=new Set;let p={},f=1/0;for(let e=0;e<pn;e++){const m=dn[e],v=n[m],g=null!==(i=u[m])&&void 0!==i?i:l[m],y=C(g),b=m===a?v.isActive:null;!1===b&&(f=e);let w=g===l[m]&&g!==u[m]&&y;if(w&&r&&t.manuallyAnimateOnMount&&(w=!1),v.protectedKeys={...p},!v.isActive&&null===b||!g&&!v.prevProp||x(g)||"boolean"==typeof g)continue;const A=hn(v.prevProp,g);let V=A||m===a&&v.isActive&&!w&&y||e>f&&y;const S=Array.isArray(g)?g:[g];let M=S.reduce(o,{});!1===b&&(M={});const{prevResolvedValues:E={}}=v,T={...E,...M},O=t=>{V=!0,d.delete(t),v.needsAnimating[t]=!0};for(const t in T){const e=M[t],n=E[t];p.hasOwnProperty(t)||(e!==n?h(e)&&h(n)?!at(e,n)||A?O(t):v.protectedKeys[t]=!0:void 0!==e?O(t):d.add(t):void 0!==e&&d.has(t)?O(t):v.protectedKeys[t]=!0)}v.prevProp=g,v.prevResolvedValues=M,v.isActive&&(p={...p,...M}),r&&t.blockInitialAnimation&&(V=!1),V&&!w&&c.push(...S.map(t=>({animation:t,options:{type:m,...s}})))}if(d.size){const e={};d.forEach(n=>{const r=t.getBaseTarget(n);void 0!==r&&(e[n]=r)}),c.push({animation:e})}let m=Boolean(c.length);return r&&!1===u.initial&&!t.manuallyAnimateOnMount&&(m=!1),r=!1,m?e(c):Promise.resolve()}return{animateChanges:s,setActive:function(e,r,o){var a;if(n[e].isActive===r)return Promise.resolve();null===(a=t.variantChildren)||void 0===a||a.forEach(t=>{var n;return null===(n=t.animationState)||void 0===n?void 0:n.setActive(e,r)}),n[e].isActive=r;const i=s(o,e);for(const t in n)n[t].protectedKeys={};return i},setAnimateFunction:function(n){e=n(t)},getState:()=>n}}function hn(t,e){return"string"==typeof e?e!==t:!!Array.isArray(e)&&!at(e,t)}function vn(t=!1){return{isActive:t,protectedKeys:{},needsAnimating:{},prevResolvedValues:{}}}const gn=t=>e=>(t(e),null),yn={animation:gn(({visualElement:t,animate:e})=>{t.animationState||(t.animationState=mn(t)),x(e)&&n(()=>e.subscribe(t),[e])}),exit:gn(r=>{const{custom:o,visualElement:s}=r,[a,i]=function(){const r=t(m);if(null===r)return[!0,null];const{isPresent:o,onExitComplete:s,register:a}=r,i=e();return n(()=>a(i),[]),!o&&s?[!1,()=>s&&s(i)]:[!0]}(),u=t(m);n(()=>{s.isPresent=a;const t=s.animationState&&s.animationState.setActive(ln.Exit,!a,{custom:u&&u.custom||o});t&&!a&&t.then(i)},[a])})};function bn(t,e,n,r={passive:!0}){return t.addEventListener(e,n,r),()=>t.removeEventListener(e,n)}function wn(t,e,r,o){n(()=>{const n=t.current;if(r&&n)return bn(n,e,r,o)},[t,e,r,o])}function An(t){return!!t.touches}const Vn={pageX:0,pageY:0};function Sn(t,e="page"){const n=t.touches[0]||t.changedTouches[0]||Vn;return{x:n[e+"X"],y:n[e+"Y"]}}function Mn(t,e="page"){return{x:t[e+"X"],y:t[e+"Y"]}}const xn=(t,e=!1)=>{const n=e=>t(e,function(t,e="page"){return{point:An(t)?Sn(t,e):Mn(t,e)}}(e));return e?(r=n,t=>{const e=t instanceof MouseEvent;(!e||e&&0===t.button)&&r(t)}):n;var r},Cn={pointerdown:"mousedown",pointermove:"mousemove",pointerup:"mouseup",pointercancel:"mousecancel",pointerover:"mouseover",pointerout:"mouseout",pointerenter:"mouseenter",pointerleave:"mouseleave"},En={pointerdown:"touchstart",pointermove:"touchmove",pointerup:"touchend",pointercancel:"touchcancel"};function Tn(t){return E&&null===window.onpointerdown?t:E&&null===window.ontouchstart?En[t]:E&&null===window.onmousedown?Cn[t]:t}function On(t,e,n,r){return bn(t,Tn(e),xn(n,"pointerdown"===e),r)}function Pn(t,e,n,r){return wn(t,Tn(e),n&&xn(n,"pointerdown"===e),r)}function In(t){let e=null;return()=>{const n=()=>{e=null};return null===e&&(e=t,n)}}const Fn=In("dragHorizontal"),kn=In("dragVertical");function Rn(){const t=function(t){let e=!1;if("y"===t)e=kn();else if("x"===t)e=Fn();else{const t=Fn(),n=kn();t&&n?e=()=>{t(),n()}:(t&&t(),n&&n())}return e}(!0);return!t||(t(),!1)}function jn(t,e,n){return(r,o)=>{(function(t){return"undefined"!=typeof PointerEvent&&t instanceof PointerEvent?!("mouse"!==t.pointerType):t instanceof MouseEvent})(r)&&!Rn()&&(t.animationState&&t.animationState.setActive(ln.Hover,e),n&&n(r,o))}}const Dn=(t,e)=>!!e&&(t===e||Dn(t,e.parentElement));const Bn=("undefined"==typeof process||process.env,"production"),Un=new Set;const Ln=new WeakMap,Nn=new WeakMap,Hn=t=>{const e=Ln.get(t.target);e&&e(t)},zn=t=>{t.forEach(Hn)};function qn(t,e,n){const r=function({root:t,...e}){const n=t||document;Nn.has(n)||Nn.set(n,{});const r=Nn.get(n),o=JSON.stringify(e);return r[o]||(r[o]=new IntersectionObserver(zn,{root:t,...e})),r[o]}(e);return Ln.set(t,n),r.observe(t),()=>{Ln.delete(t),r.unobserve(t)}}const Wn={some:0,all:1};function $n(t,e,r,{root:o,margin:s,amount:a="some",once:i}){n(()=>{if(!t)return;const n={root:null==o?void 0:o.current,rootMargin:s,threshold:"number"==typeof a?a:Wn[a]};return qn(r.getInstance(),n,t=>{const{isIntersecting:n}=t;if(e.isInView===n)return;if(e.isInView=n,i&&!n&&e.hasEnteredView)return;n&&(e.hasEnteredView=!0),r.animationState&&r.animationState.setActive(ln.InView,n);const o=r.getProps(),s=n?o.onViewportEnter:o.onViewportLeave;s&&s(t)})},[t,o,s,a])}function Kn(t,e,r,{fallback:o=!0}){n(()=>{var n,s;t&&o&&("production"!==Bn&&(n="IntersectionObserver not available on this device. whileInView animations will trigger on mount.",!1||Un.has(n)||(console.warn(n),s&&console.warn(s),Un.add(n))),requestAnimationFrame(()=>{e.hasEnteredView=!0;const{onViewportEnter:t}=r.getProps();t&&t(null),r.animationState&&r.animationState.setActive(ln.InView,!0)}))},[t])}const Yn={inView:gn((function({visualElement:t,whileInView:e,onViewportEnter:n,onViewportLeave:o,viewport:s={}}){const a=r({hasEnteredView:!1,isInView:!1});let i=Boolean(e||n||o);s.once&&a.current.hasEnteredView&&(i=!1),("undefined"==typeof IntersectionObserver?Kn:$n)(i,a.current,t,s)})),tap:gn((function({onTap:t,onTapStart:e,onTapCancel:o,whileTap:s,visualElement:a}){const i=t||e||o||s,u=r(!1),l=r(null),c={passive:!(e||t||o||h)};function d(){l.current&&l.current(),l.current=null}function p(){return d(),u.current=!1,a.animationState&&a.animationState.setActive(ln.Tap,!1),!Rn()}function f(e,n){p()&&(Dn(a.getInstance(),e.target)?t&&t(e,n):o&&o(e,n))}function m(t,e){p()&&o&&o(t,e)}function h(t,n){d(),u.current||(u.current=!0,l.current=xt(On(window,"pointerup",f,c),On(window,"pointercancel",m,c)),a.animationState&&a.animationState.setActive(ln.Tap,!0),e&&e(t,n))}var v;Pn(a,"pointerdown",i?h:void 0,c),v=d,n(()=>()=>v(),[])})),focus:gn((function({whileFocus:t,visualElement:e}){const{animationState:n}=e;wn(e,"focus",t?()=>{n&&n.setActive(ln.Focus,!0)}:void 0),wn(e,"blur",t?()=>{n&&n.setActive(ln.Focus,!1)}:void 0)})),hover:gn((function({onHoverStart:t,onHoverEnd:e,whileHover:n,visualElement:r}){Pn(r,"pointerenter",t||n?jn(r,!0,t):void 0,{passive:!t}),Pn(r,"pointerleave",e||n?jn(r,!1,e):void 0,{passive:!e})}))},Xn={current:null},Gn={current:!1};const Zn=["LayoutMeasure","BeforeLayoutMeasure","LayoutUpdate","ViewportBoxUpdate","Update","Render","AnimationComplete","LayoutAnimationComplete","AnimationStart","LayoutAnimationStart","SetAxisTarget","Unmount"];const Jn=Object.keys(T),_n=Jn.length,Qn=({treeType:t="",build:e,getBaseTarget:n,makeTargetAnimatable:r,measureViewportBox:s,render:a,readValueFromInstance:i,removeValueFromRenderState:u,sortNodePosition:l,scrapeMotionValuesFromProps:c})=>({parent:d,props:p,presenceId:f,blockInitialAnimation:m,visualState:h,reducedMotionConfig:v},g={})=>{let y=!1;const{latestValues:b,renderState:w}=h;let A;const M=function(){const t=Zn.map(()=>new Ke),e={},n={clearAllListeners:()=>t.forEach(t=>t.clear()),updatePropListeners:t=>{Zn.forEach(r=>{var o;const s="on"+r,a=t[s];null===(o=e[r])||void 0===o||o.call(e),a&&(e[r]=n[s](a))})}};return t.forEach((t,e)=>{n["on"+Zn[e]]=e=>t.add(e),n["notify"+Zn[e]]=(...e)=>t.notify(...e)}),n}(),x=new Map,F=new Map;let k={};const R={...b},j=p.initial?{...b}:{};let D;function B(){A&&y&&(U(),a(A,w,p.style,$.projection))}function U(){e($,w,b,g,p)}function L(){M.notifyUpdate(b)}function N(t,e){const n=e.onChange(e=>{b[t]=e,p.onUpdate&&ue.update(L,!1,!0)}),r=e.onRenderRequest($.scheduleRender);F.set(t,()=>{n(),r()})}const{willChange:H,...z}=c(p);for(const t in z){const e=z[t];void 0!==b[t]&&S(e)&&(e.set(b[t],!1),rn(H)&&H.add(t))}if(p.values)for(const t in p.values){const e=p.values[t];void 0!==b[t]&&S(e)&&e.set(b[t])}const q=O(p),W=P(p),$={treeType:t,current:null,depth:d?d.depth+1:0,parent:d,children:new Set,presenceId:f,shouldReduceMotion:null,variantChildren:W?new Set:void 0,isVisible:void 0,manuallyAnimateOnMount:Boolean(null==d?void 0:d.isMounted()),blockInitialAnimation:m,isMounted:()=>Boolean(A),mount(t){y=!0,A=$.current=t,$.projection&&$.projection.mount(t),W&&d&&!q&&(D=null==d?void 0:d.addVariantChild($)),x.forEach((t,e)=>N(e,t)),Gn.current||function(){if(Gn.current=!0,E)if(window.matchMedia){const t=window.matchMedia("(prefers-reduced-motion)"),e=()=>Xn.current=t.matches;t.addListener(e),e()}else Xn.current=!1}(),$.shouldReduceMotion="never"!==v&&("always"===v||Xn.current),null==d||d.children.add($),$.setProps(p)},unmount(){var t;null===(t=$.projection)||void 0===t||t.unmount(),le.update(L),le.render(B),F.forEach(t=>t()),null==D||D(),null==d||d.children.delete($),M.clearAllListeners(),A=void 0,y=!1},loadFeatures(t,e,n,r,s,a){const i=[];for(let e=0;e<_n;e++){const n=Jn[e],{isEnabled:r,Component:s}=T[n];r(t)&&s&&i.push(o(s,{key:n,...t,visualElement:$}))}if(!$.projection&&s){$.projection=new s(r,$.getLatestValues(),d&&d.projection);const{layoutId:e,layout:n,drag:o,dragConstraints:i,layoutScroll:u}=t;$.projection.setOptions({layoutId:e,layout:n,alwaysMeasureLayout:Boolean(o)||i&&I(i),visualElement:$,scheduleRender:()=>$.scheduleRender(),animationType:"string"==typeof n?n:"both",initialPromotionConfig:a,layoutScroll:u})}return i},addVariantChild(t){var e;const n=$.getClosestVariantNode();if(n)return null===(e=n.variantChildren)||void 0===e||e.add(t),()=>n.variantChildren.delete(t)},sortNodePosition:e=>l&&t===e.treeType?l($.getInstance(),e.getInstance()):0,getClosestVariantNode:()=>W?$:null==d?void 0:d.getClosestVariantNode(),getLayoutId:()=>p.layoutId,getInstance:()=>A,getStaticValue:t=>b[t],setStaticValue:(t,e)=>b[t]=e,getLatestValues:()=>b,setVisibility(t){$.isVisible!==t&&($.isVisible=t,$.scheduleRender())},makeTargetAnimatable:(t,e=!0)=>r($,t,p,e),measureViewportBox:()=>s(A,p),addValue(t,e){$.hasValue(t)&&$.removeValue(t),x.set(t,e),b[t]=e.get(),N(t,e)},removeValue(t){var e;x.delete(t),null===(e=F.get(t))||void 0===e||e(),F.delete(t),delete b[t],u(t,w)},hasValue:t=>x.has(t),getValue(t,e){if(p.values&&p.values[t])return p.values[t];let n=x.get(t);return void 0===n&&void 0!==e&&(n=Xe(e),$.addValue(t,n)),n},forEachValue:t=>x.forEach(t),readValue:t=>void 0!==b[t]?b[t]:i(A,t,g),setBaseTarget(t,e){R[t]=e},getBaseTarget(t){var e;const{initial:r}=p,o="string"==typeof r||"object"==typeof r?null===(e=V(p,r))||void 0===e?void 0:e[t]:void 0;if(r&&void 0!==o)return o;if(n){const e=n(p,t);if(void 0!==e&&!S(e))return e}return void 0!==j[t]&&void 0===o?void 0:R[t]},...M,build:()=>(U(),w),scheduleRender(){ue.render(B,!1,!0)},syncRender:B,setProps(t){(t.transformTemplate||p.transformTemplate)&&$.scheduleRender(),p=t,M.updatePropListeners(t),k=function(t,e,n){const{willChange:r}=e;for(const o in e){const s=e[o],a=n[o];if(S(s))t.addValue(o,s),rn(r)&&r.add(o);else if(S(a))t.addValue(o,Xe(s)),rn(r)&&r.remove(o);else if(a!==s)if(t.hasValue(o)){const e=t.getValue(o);!e.hasAnimated&&e.set(s)}else{const e=t.getStaticValue(o);t.addValue(o,Xe(void 0!==e?e:s))}}for(const r in n)void 0===e[r]&&t.removeValue(r);return e}($,c(p),k)},getProps:()=>p,getVariant:t=>{var e;return null===(e=p.variants)||void 0===e?void 0:e[t]},getDefaultTransition:()=>p.transition,getTransformPagePoint:()=>p.transformPagePoint,getVariantContext(t=!1){if(t)return null==d?void 0:d.getVariantContext();if(!q){const t=(null==d?void 0:d.getVariantContext())||{};return void 0!==p.initial&&(t.initial=p.initial),t}const e={};for(let t=0;t<er;t++){const n=tr[t],r=p[n];(C(r)||!1===r)&&(e[n]=r)}return e}};return $},tr=["initial",...cn],er=tr.length;function nr(t){return"string"==typeof t&&t.startsWith("var(--")}const rr=/var\((--[a-zA-Z0-9-_]+),? ?([a-zA-Z0-9 ()%#.,-]+)?\)/;function or(t,e,n=1){const[r,o]=function(t){const e=rr.exec(t);if(!e)return[,];const[,n,r]=e;return[n,r]}(t);if(!r)return;const s=window.getComputedStyle(e).getPropertyValue(r);return s?s.trim():nr(o)?or(o,e,n+1):o}const sr=new Set(["width","height","top","left","right","bottom","x","y"]),ar=t=>sr.has(t),ir=(t,e)=>{t.set(e,!1),t.set(e)},ur=t=>t===d||t===y;var lr;!function(t){t.width="width",t.height="height",t.left="left",t.right="right",t.top="top",t.bottom="bottom"}(lr||(lr={}));const cr=(t,e)=>parseFloat(t.split(", ")[e]),dr=(t,e)=>(n,{transform:r})=>{if("none"===r||!r)return 0;const o=r.match(/^matrix3d\((.+)\)$/);if(o)return cr(o[1],e);{const e=r.match(/^matrix\((.+)\)$/);return e?cr(e[1],t):0}},pr=new Set(["x","y","z"]),fr=F.filter(t=>!pr.has(t));const mr={width:({x:t},{paddingLeft:e="0",paddingRight:n="0"})=>t.max-t.min-parseFloat(e)-parseFloat(n),height:({y:t},{paddingTop:e="0",paddingBottom:n="0"})=>t.max-t.min-parseFloat(e)-parseFloat(n),top:(t,{top:e})=>parseFloat(e),left:(t,{left:e})=>parseFloat(e),bottom:({y:t},{top:e})=>parseFloat(e)+(t.max-t.min),right:({x:t},{left:e})=>parseFloat(e)+(t.max-t.min),x:dr(4,13),y:dr(5,14)},hr=(t,e,n={},r={})=>{e={...e},r={...r};const o=Object.keys(e).filter(ar);let s=[],a=!1;const i=[];if(o.forEach(o=>{const u=t.getValue(o);if(!t.hasValue(o))return;let l=n[o],c=Je(l);const d=e[o];let p;if(h(d)){const t=d.length,e=null===d[0]?1:0;l=d[e],c=Je(l);for(let n=e;n<t;n++)p?Je(d[n]):p=Je(d[n])}else p=Je(d);if(c!==p)if(ur(c)&&ur(p)){const t=u.get();"string"==typeof t&&u.set(parseFloat(t)),"string"==typeof d?e[o]=parseFloat(d):Array.isArray(d)&&p===y&&(e[o]=d.map(parseFloat))}else(null==c?void 0:c.transform)&&(null==p?void 0:p.transform)&&(0===l||0===d)?0===l?u.set(p.transform(l)):e[o]=c.transform(d):(a||(s=function(t){const e=[];return fr.forEach(n=>{const r=t.getValue(n);void 0!==r&&(e.push([n,r.get()]),r.set(n.startsWith("scale")?1:0))}),e.length&&t.syncRender(),e}(t),a=!0),i.push(o),r[o]=void 0!==r[o]?r[o]:e[o],ir(u,d))}),i.length){const n=i.indexOf("height")>=0?window.pageYOffset:null,o=((t,e,n)=>{const r=e.measureViewportBox(),o=e.getInstance(),s=getComputedStyle(o),{display:a}=s,i={};"none"===a&&e.setStaticValue("display",t.display||"block"),n.forEach(t=>{i[t]=mr[t](r,s)}),e.syncRender();const u=e.measureViewportBox();return n.forEach(n=>{const r=e.getValue(n);ir(r,i[n]),t[n]=mr[n](u,s)}),t})(e,t,i);return s.length&&s.forEach(([e,n])=>{t.getValue(e).set(n)}),t.syncRender(),E&&null!==n&&window.scrollTo({top:n}),{target:o,transitionEnd:r}}return{target:e,transitionEnd:r}};function vr(t,e,n,r){return(t=>Object.keys(t).some(ar))(e)?hr(t,e,n,r):{target:e,transitionEnd:r}}const gr=(t,e,n,r)=>{const o=function(t,{...e},n){const r=t.getInstance();if(!(r instanceof Element))return{target:e,transitionEnd:n};n&&(n={...n}),t.forEachValue(t=>{const e=t.get();if(!nr(e))return;const n=or(e,r);n&&t.set(n)});for(const t in e){const o=e[t];if(!nr(o))continue;const s=or(o,r);s&&(e[t]=s,n&&void 0===n[t]&&(n[t]=o))}return{target:e,transitionEnd:n}}(t,e,r);return vr(t,e=o.target,n,r=o.transitionEnd)};const yr={treeType:"dom",readValueFromInstance(t,e){if(M.has(e)){const t=je(e);return t&&t.default||0}{const r=(n=t,window.getComputedStyle(n)),o=(k(e)?r.getPropertyValue(e):r[e])||0;return"string"==typeof o?o.trim():o}var n},sortNodePosition:(t,e)=>2&t.compareDocumentPosition(e)?1:-1,getBaseTarget(t,e){var n;return null===(n=t.style)||void 0===n?void 0:n[e]},measureViewportBox(t,{transformPagePoint:e}){return n=e,function({top:t,left:e,right:n,bottom:r}){return{x:{min:e,max:n},y:{min:t,max:r}}}(function(t,e){if(!e)return t;const n=e({x:t.left,y:t.top}),r=e({x:t.right,y:t.bottom});return{top:n.y,left:n.x,bottom:r.y,right:r.x}}(t.getBoundingClientRect(),n));var n},resetTransform(t,e,n){const{transformTemplate:r}=n;e.style.transform=r?r({},""):"none",t.scheduleRender()},restoreTransform(t,e){t.style.transform=e.style.transform},removeValueFromRenderState(t,{vars:e,style:n}){delete e[t],delete n[t]},makeTargetAnimatable(t,{transition:e,transitionEnd:n,...r},{transformValues:o},s=!0){let a=function(t,e,n){var r;const o={};for(const s in t){const t=nn(s,e);o[s]=void 0!==t?t:null===(r=n.getValue(s))||void 0===r?void 0:r.get()}return o}(r,e||{},t);if(o&&(n&&(n=o(n)),r&&(r=o(r)),a&&(a=o(a))),s){!function(t,e,n){var r,o;const s=Object.keys(e).filter(e=>!t.hasValue(e)),a=s.length;if(a)for(let i=0;i<a;i++){const a=s[i],u=e[a];let l=null;Array.isArray(u)&&(l=u[0]),null===l&&(l=null!==(o=null!==(r=n[a])&&void 0!==r?r:t.readValue(a))&&void 0!==o?o:e[a]),null!=l&&("string"==typeof l&&(/^\-?\d*\.?\d+$/.test(l)||$e(l))?l=parseFloat(l):!Qe(l)&&et.test(u)&&(l=De(a,u)),t.addValue(a,Xe(l)),void 0===n[a]&&(n[a]=l),t.setBaseTarget(a,l))}}(t,r,a);const e=gr(t,r,a,n);n=e.transitionEnd,r=e.target}return{transition:e,transitionEnd:n,...r}},scrapeMotionValuesFromProps:R,build(t,e,n,r,o){void 0!==t.isVisible&&(e.style.visibility=t.isVisible?"visible":"hidden"),j(e,n,r,o.transformTemplate)},render:D},br=Qn(yr),wr=Qn({...yr,getBaseTarget:(t,e)=>t[e],readValueFromInstance(t,e){var n;return M.has(e)?(null===(n=je(e))||void 0===n?void 0:n.default)||0:(e=B.has(e)?e:U(e),t.getAttribute(e))},scrapeMotionValuesFromProps:L,build(t,e,n,r,o){N(e,n,r,o.transformTemplate)},render:H}),Ar={renderer:(t,e)=>z(t)?wr(e,{enableHardwareAcceleration:!1}):br(e,{enableHardwareAcceleration:!0}),...yn,...Yn};export{Ar as domAnimation};