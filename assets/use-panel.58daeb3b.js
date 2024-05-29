import{a3 as F,a4 as x,X as Y,a5 as J,P as T,a6 as k,a8 as L,S as E,O as N,r as M,c as m,w as G,g as H,h as C,A as Q,aJ as Z,R as K,I as ee,aK as te}from"./index.0dc9be6b.js";import{i as ne}from"./use-timeout.b9c8c8b8.js";const B={left:!0,right:!0,up:!0,down:!0,horizontal:!0,vertical:!0},ie=Object.keys(B);B.all=!0;function $(t){const n={};for(const a of ie)t[a]===!0&&(n[a]=!0);return Object.keys(n).length===0?B:(n.horizontal===!0?n.left=n.right=!0:n.left===!0&&n.right===!0&&(n.horizontal=!0),n.vertical===!0?n.up=n.down=!0:n.up===!0&&n.down===!0&&(n.vertical=!0),n.horizontal===!0&&n.vertical===!0&&(n.all=!0),n)}const re=["INPUT","TEXTAREA"];function O(t,n){return n.event===void 0&&t.target!==void 0&&t.target.draggable!==!0&&typeof n.handler=="function"&&re.includes(t.target.nodeName.toUpperCase())===!1&&(t.qClonedBy===void 0||t.qClonedBy.indexOf(n.uid)===-1)}function oe(t){const n=[.06,6,50];return typeof t=="string"&&t.length&&t.split(":").forEach((a,d)=>{const u=parseFloat(a);u&&(n[d]=u)}),n}var ae=F({name:"touch-swipe",beforeMount(t,{value:n,arg:a,modifiers:d}){if(d.mouse!==!0&&x.has.touch!==!0)return;const u=d.mouseCapture===!0?"Capture":"",e={handler:n,sensitivity:oe(a),direction:$(d),noop:Y,mouseStart(r){O(r,e)&&J(r)&&(T(e,"temp",[[document,"mousemove","move",`notPassive${u}`],[document,"mouseup","end","notPassiveCapture"]]),e.start(r,!0))},touchStart(r){if(O(r,e)){const c=r.target;T(e,"temp",[[c,"touchmove","move","notPassiveCapture"],[c,"touchcancel","end","notPassiveCapture"],[c,"touchend","end","notPassiveCapture"]]),e.start(r)}},start(r,c){x.is.firefox===!0&&k(t,!0);const f=L(r);e.event={x:f.left,y:f.top,time:Date.now(),mouse:c===!0,dir:!1}},move(r){if(e.event===void 0)return;if(e.event.dir!==!1){E(r);return}const c=Date.now()-e.event.time;if(c===0)return;const f=L(r),h=f.left-e.event.x,l=Math.abs(h),g=f.top-e.event.y,s=Math.abs(g);if(e.event.mouse!==!0){if(l<e.sensitivity[1]&&s<e.sensitivity[1]){e.end(r);return}}else if(window.getSelection().toString()!==""){e.end(r);return}else if(l<e.sensitivity[2]&&s<e.sensitivity[2])return;const v=l/c,y=s/c;e.direction.vertical===!0&&l<s&&l<100&&y>e.sensitivity[0]&&(e.event.dir=g<0?"up":"down"),e.direction.horizontal===!0&&l>s&&s<100&&v>e.sensitivity[0]&&(e.event.dir=h<0?"left":"right"),e.direction.up===!0&&l<s&&g<0&&l<100&&y>e.sensitivity[0]&&(e.event.dir="up"),e.direction.down===!0&&l<s&&g>0&&l<100&&y>e.sensitivity[0]&&(e.event.dir="down"),e.direction.left===!0&&l>s&&h<0&&s<100&&v>e.sensitivity[0]&&(e.event.dir="left"),e.direction.right===!0&&l>s&&h>0&&s<100&&v>e.sensitivity[0]&&(e.event.dir="right"),e.event.dir!==!1?(E(r),e.event.mouse===!0&&(document.body.classList.add("no-pointer-events--children"),document.body.classList.add("non-selectable"),ne(),e.styleCleanup=w=>{e.styleCleanup=void 0,document.body.classList.remove("non-selectable");const P=()=>{document.body.classList.remove("no-pointer-events--children")};w===!0?setTimeout(P,50):P()}),e.handler({evt:r,touch:e.event.mouse!==!0,mouse:e.event.mouse,direction:e.event.dir,duration:c,distance:{x:l,y:s}})):e.end(r)},end(r){e.event!==void 0&&(N(e,"temp"),x.is.firefox===!0&&k(t,!1),e.styleCleanup!==void 0&&e.styleCleanup(!0),r!==void 0&&e.event.dir!==!1&&E(r),e.event=void 0)}};if(t.__qtouchswipe=e,d.mouse===!0){const r=d.mouseCapture===!0||d.mousecapture===!0?"Capture":"";T(e,"main",[[t,"mousedown","mouseStart",`passive${r}`]])}x.has.touch===!0&&T(e,"main",[[t,"touchstart","touchStart",`passive${d.capture===!0?"Capture":""}`],[t,"touchmove","noop","notPassiveCapture"]])},updated(t,n){const a=t.__qtouchswipe;a!==void 0&&(n.oldValue!==n.value&&(typeof n.value!="function"&&a.end(),a.handler=n.value),a.direction=$(n.modifiers))},beforeUnmount(t){const n=t.__qtouchswipe;n!==void 0&&(N(n,"main"),N(n,"temp"),x.is.firefox===!0&&k(t,!1),n.styleCleanup!==void 0&&n.styleCleanup(),delete t.__qtouchswipe)}});function ue(){const t=new Map;return{getCache:function(n,a){return t[n]===void 0?t[n]=a:t[n]},getCacheWithFn:function(n,a){return t[n]===void 0?t[n]=a():t[n]}}}const ce={name:{required:!0},disable:Boolean},X={setup(t,{slots:n}){return()=>C("div",{class:"q-panel scroll",role:"tabpanel"},K(n.default))}},de={modelValue:{required:!0},animated:Boolean,infinite:Boolean,swipeable:Boolean,vertical:Boolean,transitionPrev:String,transitionNext:String,transitionDuration:{type:[String,Number],default:300},keepAlive:Boolean,keepAliveInclude:[String,Array,RegExp],keepAliveExclude:[String,Array,RegExp],keepAliveMax:Number},pe=["update:modelValue","beforeTransition","transition"];function ve(){const{props:t,emit:n,proxy:a}=H(),{getCacheWithFn:d}=ue();let u,e;const r=M(null),c=M(null);function f(i){const o=t.vertical===!0?"up":"left";b((a.$q.lang.rtl===!0?-1:1)*(i.direction===o?1:-1))}const h=m(()=>[[ae,f,void 0,{horizontal:t.vertical!==!0,vertical:t.vertical,mouse:!0}]]),l=m(()=>t.transitionPrev||`slide-${t.vertical===!0?"down":"right"}`),g=m(()=>t.transitionNext||`slide-${t.vertical===!0?"up":"left"}`),s=m(()=>`--q-transition-duration: ${t.transitionDuration}ms`),v=m(()=>typeof t.modelValue=="string"||typeof t.modelValue=="number"?t.modelValue:String(t.modelValue)),y=m(()=>({include:t.keepAliveInclude,exclude:t.keepAliveExclude,max:t.keepAliveMax})),w=m(()=>t.keepAliveInclude!==void 0||t.keepAliveExclude!==void 0);G(()=>t.modelValue,(i,o)=>{const p=A(i)===!0?q(i):-1;e!==!0&&D(p===-1?0:p<q(o)?-1:1),r.value!==p&&(r.value=p,n("beforeTransition",i,o),ee(()=>{n("transition",i,o)}))});function P(){b(1)}function V(){b(-1)}function _(i){n("update:modelValue",i)}function A(i){return i!=null&&i!==""}function q(i){return u.findIndex(o=>o.props.name===i&&o.props.disable!==""&&o.props.disable!==!0)}function R(){return u.filter(i=>i.props.disable!==""&&i.props.disable!==!0)}function D(i){const o=i!==0&&t.animated===!0&&r.value!==-1?"q-transition--"+(i===-1?l.value:g.value):null;c.value!==o&&(c.value=o)}function b(i,o=r.value){let p=o+i;for(;p>-1&&p<u.length;){const S=u[p];if(S!==void 0&&S.props.disable!==""&&S.props.disable!==!0){D(i),e=!0,n("update:modelValue",S.props.name),setTimeout(()=>{e=!1});return}p+=i}t.infinite===!0&&u.length!==0&&o!==-1&&o!==u.length&&b(i,i===-1?u.length:-1)}function I(){const i=q(t.modelValue);return r.value!==i&&(r.value=i),!0}function z(){const i=A(t.modelValue)===!0&&I()&&u[r.value];return t.keepAlive===!0?[C(te,y.value,[C(w.value===!0?d(v.value,()=>({...X,name:v.value})):X,{key:v.value,style:s.value},()=>i)])]:[C("div",{class:"q-panel scroll",style:s.value,key:v.value,role:"tabpanel"},[i])]}function U(){if(u.length!==0)return t.animated===!0?[C(Q,{name:c.value},z)]:z()}function W(i){return u=Z(K(i.default,[])).filter(o=>o.props!==null&&o.props.slot===void 0&&A(o.props.name)===!0),u.length}function j(){return u}return Object.assign(a,{next:P,previous:V,goTo:_}),{panelIndex:r,panelDirectives:h,updatePanelsList:W,updatePanelIndex:I,getPanelContent:U,getEnabledPanels:R,getPanels:j,isValidPanelName:A,keepAliveProps:y,needsUniqueKeepAliveWrapper:w,goToPanelByOffset:b,goToPanel:_,nextPanel:P,previousPanel:V}}export{de as a,pe as b,ve as c,$ as g,O as s,ce as u};