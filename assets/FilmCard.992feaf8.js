import{h as y,H as O,aT as se,aU as ne,r as w,c as H,w as D,ab as oe,aa as re,K as le,o as ue,V as ce,R as de,Y as fe,I as K,aV as G,a9 as me,g as ve,A as ge,m as pe,q as ye,j as S,k as A,d as u,t as v,y as M,s as $,Q as N,aW as J,ai as R,F as X,ao as he,v as P,am as Z,B as U,D as be,x as we,ap as I}from"./index.0dc9be6b.js";import{e as q,a as F,s as W,g as Le}from"./scroll.2583b80e.js";import{Q as j}from"./QItem.cc23ec7f.js";import{Q as _e,a as xe}from"./QMenu.12906604.js";import{b as ke,Q as Qe}from"./QList.4f2f3307.js";import{Q as Se}from"./QTooltip.e1859b02.js";import{Q as Ce}from"./QImg.c521133c.js";import{C as z,Q as ee}from"./ClosePopup.59c6d83e.js";import{Q as te}from"./QCard.a71f91d8.js";import{Q as ae}from"./QInput.b9966d6f.js";import{Q as Te}from"./QCardSection.2187735b.js";import{u as Ne}from"./use-quasar.5d4d05ef.js";import{u as Ve}from"./checkLogin.cb56bad6.js";const Ee=[y("circle",{cx:"15",cy:"15",r:"15"},[y("animate",{attributeName:"r",from:"15",to:"15",begin:"0s",dur:"0.8s",values:"15;9;15",calcMode:"linear",repeatCount:"indefinite"}),y("animate",{attributeName:"fill-opacity",from:"1",to:"1",begin:"0s",dur:"0.8s",values:"1;.5;1",calcMode:"linear",repeatCount:"indefinite"})]),y("circle",{cx:"60",cy:"15",r:"9","fill-opacity":".3"},[y("animate",{attributeName:"r",from:"9",to:"9",begin:"0s",dur:"0.8s",values:"9;15;9",calcMode:"linear",repeatCount:"indefinite"}),y("animate",{attributeName:"fill-opacity",from:".5",to:".5",begin:"0s",dur:"0.8s",values:".5;1;.5",calcMode:"linear",repeatCount:"indefinite"})]),y("circle",{cx:"105",cy:"15",r:"15"},[y("animate",{attributeName:"r",from:"15",to:"15",begin:"0s",dur:"0.8s",values:"15;9;15",calcMode:"linear",repeatCount:"indefinite"}),y("animate",{attributeName:"fill-opacity",from:"1",to:"1",begin:"0s",dur:"0.8s",values:"1;.5;1",calcMode:"linear",repeatCount:"indefinite"})])];var Je=O({name:"QSpinnerDots",props:se,setup(l){const{cSize:i,classes:k}=ne(l);return()=>y("svg",{class:k.value,fill:"currentColor",width:i.value,height:i.value,viewBox:"0 0 120 30",xmlns:"http://www.w3.org/2000/svg"},Ee)}});const{passive:C}=fe;var Xe=O({name:"QInfiniteScroll",props:{offset:{type:Number,default:500},debounce:{type:[String,Number],default:100},scrollTarget:{default:void 0},initialIndex:Number,disable:Boolean,reverse:Boolean},emits:["load"],setup(l,{slots:i,emit:k}){const n=w(!1),o=w(!0),p=w(null),d=w(null);let f=l.initialIndex||0,e,c;const L=H(()=>"q-infinite-scroll__loading"+(n.value===!0?"":" invisible"));function h(){if(l.disable===!0||n.value===!0||o.value===!1)return;const r=q(e),s=F(e),x=G(e);l.reverse===!1?Math.round(s+x+l.offset)>=Math.round(r)&&Q():Math.round(s)<=l.offset&&Q()}function Q(){if(l.disable===!0||n.value===!0||o.value===!1)return;f++,n.value=!0;const r=q(e);k("load",f,s=>{o.value===!0&&(n.value=!1,K(()=>{if(l.reverse===!0){const x=q(e),Y=F(e),ie=x-r;W(e,Y+ie)}s===!0?t():p.value&&p.value.closest("body")&&c()}))})}function V(){f=0}function T(){o.value===!1&&(o.value=!0,e.addEventListener("scroll",c,C)),h()}function t(){o.value===!0&&(o.value=!1,n.value=!1,e.removeEventListener("scroll",c,C),c!==void 0&&c.cancel!==void 0&&c.cancel())}function g(){if(e&&o.value===!0&&e.removeEventListener("scroll",c,C),e=Le(p.value,l.scrollTarget),o.value===!0){if(e.addEventListener("scroll",c,C),l.reverse===!0){const r=q(e),s=G(e);W(e,r-s)}h()}}function _(r){f=r}function b(r){r=parseInt(r,10);const s=c;c=r<=0?h:me(h,isNaN(r)===!0?100:r),e&&o.value===!0&&(s!==void 0&&e.removeEventListener("scroll",s,C),e.addEventListener("scroll",c,C))}function E(r){if(B.value===!0){if(d.value===null){r!==!0&&K(()=>{E(!0)});return}const s=`${n.value===!0?"un":""}pauseAnimations`;Array.from(d.value.getElementsByTagName("svg")).forEach(x=>{x[s]()})}}const B=H(()=>l.disable!==!0&&o.value===!0);D([n,B],()=>{E()}),D(()=>l.disable,r=>{r===!0?t():T()}),D(()=>l.reverse,()=>{n.value===!1&&o.value===!0&&h()}),D(()=>l.scrollTarget,g),D(()=>l.debounce,b);let m=!1;oe(()=>{m!==!1&&e&&W(e,m)}),re(()=>{m=e?F(e):!1}),le(()=>{o.value===!0&&e.removeEventListener("scroll",c,C)}),ue(()=>{b(l.debounce),g(),n.value===!1&&E()});const a=ve();return Object.assign(a.proxy,{poll:()=>{c!==void 0&&c()},trigger:Q,stop:t,reset:V,resume:T,setIndex:_}),()=>{const r=ce(i.default,[]);return B.value===!0&&r[l.reverse===!1?"push":"unshift"](y("div",{ref:d,class:L.value},de(i.loading))),y("div",{class:"q-infinite-scroll",ref:p},r)}}}),Be=O({name:"QSlideTransition",props:{appear:Boolean,duration:{type:Number,default:300}},emits:["show","hide"],setup(l,{slots:i,emit:k}){let n=!1,o,p,d=null,f=null,e,c;function L(){o&&o(),o=null,n=!1,d!==null&&(clearTimeout(d),d=null),f!==null&&(clearTimeout(f),f=null),p!==void 0&&p.removeEventListener("transitionend",e),e=null}function h(t,g,_){g!==void 0&&(t.style.height=`${g}px`),t.style.transition=`height ${l.duration}ms cubic-bezier(.25, .8, .50, 1)`,n=!0,o=_}function Q(t,g){t.style.overflowY=null,t.style.height=null,t.style.transition=null,L(),g!==c&&k(g)}function V(t,g){let _=0;p=t,n===!0?(L(),_=t.offsetHeight===t.scrollHeight?0:void 0):(c="hide",t.style.overflowY="hidden"),h(t,_,g),d=setTimeout(()=>{d=null,t.style.height=`${t.scrollHeight}px`,e=b=>{f=null,(Object(b)!==b||b.target===t)&&Q(t,"show")},t.addEventListener("transitionend",e),f=setTimeout(e,l.duration*1.1)},100)}function T(t,g){let _;p=t,n===!0?L():(c="show",t.style.overflowY="hidden",_=t.scrollHeight),h(t,_,g),d=setTimeout(()=>{d=null,t.style.height=0,e=b=>{f=null,(Object(b)!==b||b.target===t)&&Q(t,"hide")},t.addEventListener("transitionend",e),f=setTimeout(e,l.duration*1.1)},100)}return le(()=>{n===!0&&L()}),()=>y(ge,{css:!1,appear:l.appear,onEnter:V,onLeave:T},i.default)}});const De=P("div",{class:"text-left"}," WatchList",-1),Ie={class:"text-left"},Me=P("div",{class:"text-left"}," create a list",-1),$e={key:1,style:{width:"100%",height:"58px"}},qe={class:"relative"},Ze={__name:"FilmCard",props:{id:{type:Number,default:()=>0},title:{type:String,default:()=>""},poster_path:{type:String,default:()=>""},watched:{type:Boolean,default:()=>!1},like:{type:Boolean,default:()=>!1},comments:{type:String,default:()=>""},adult:{},backdrop_path:{},genre_ids:{},original_language:{},original_title:{},overview:{},popularity:{},release_date:{},video:{},vote_average:{},vote_count:{},ratings:{}},setup(l){const i=l,{loginTryCatch:k}=Ve(),n=pe(),o=Ne(),p=w(!1),d=w(""),f=w(""),e=w(i.watched),c=w(i.comments!==""),L=w(i.like),h=w(!1),Q=w(null),V=H(function(){return m=>n.userLists[m].films.some(a=>a.id===i.id.toString())?"text-blue":"text-grey"}),T=H(()=>n.watchList.some(m=>m.id===i.id.toString())?"text-blue":"text-grey"),t=async()=>{e.value=!e.value,await I.post("/reviews/",{filmID:i.id,watched:e.value})},g=async()=>{L.value=!L.value,await I.post("/reviews/",{filmID:i.id,like:L.value})},_=()=>{d.value="",f.value=""},b=async()=>{if(d.value==="")o.notify({type:"warnings",message:"Please Enter a Title"});else try{const m={id:i.id,title:i.title,poster:i.poster_path},{data:a}=await I.post("lists/create",{name:d.value,description:f.value,films:[m]});n.userLists.push(a.newList),o.notify({type:"success",message:"Success!"})}catch{o.notify({type:"warnings",message:"something went wrong"})}},E=async m=>{try{const a={id:i.id,title:i.title,poster:i.poster_path},{data:r}=await I.post("lists/update",{_id:n.userLists[m]._id,film:a});n.userLists[m]=r.list}catch{o.notify({type:"warnings",message:"something went wrong"})}},B=async()=>{try{const m={filmID:i.id,title:i.title,poster:i.poster_path},{data:a}=await I.post("/users/watchlist",m);n.watchList=a.result}catch{o.notify({type:"warnings",message:"something went wrong"})}};return(m,a)=>{const r=ye("RouterLink");return S(),A(X,null,[u(te,{class:"my-card",flat:"",bordered:"",style:{width:"80%"},onMouseleave:a[4]||(a[4]=s=>p.value=!1)},{default:v(()=>[M(n).isLogin?(S(),$(N,{key:0,flat:"",round:"",color:"grey",icon:"add",id:"add",class:"absolute-top-right",style:{"z-index":"2"}},{default:v(()=>[u(_e,null,{default:v(()=>[u(ke,{style:{"min-width":"150px"}},{default:v(()=>[u(j,{clickable:"",class:J(["row","items-center",T.value]),onClick:B},{default:v(()=>[u(R,{name:"more_time",class:"col-2 q-pr-sm"}),De]),_:1},8,["class"]),(S(!0),A(X,null,he(M(n).userLists,(s,x)=>(S(),$(j,{key:x,clickable:"",class:J(["row","items-center",V.value(x)]),onClick:Y=>E(x)},{default:v(()=>[u(R,{name:"segment",class:"col-2 q-pr-sm"}),P("div",Ie,Z(s.name),1)]),_:2},1032,["class","onClick"]))),128)),u(xe,{inset:""}),U((S(),$(j,{clickable:"",class:"row items-center",onClick:a[0]||(a[0]=s=>h.value=!0)},{default:v(()=>[u(R,{name:"add",class:"col-2 q-pr-sm"}),Me]),_:1})),[[z]])]),_:1})]),_:1})]),_:1})):be("",!0),u(r,{to:"/films/"+i.id},{default:v(()=>[u(Ce,{src:"https://image.tmdb.org/t/p/w300/"+i.poster_path,class:"ratio border5 rounded15",onMouseenter:a[1]||(a[1]=s=>p.value=!0),ref_key:"imgRef",ref:Q},{default:v(()=>[u(Se,{anchor:"center middle",self:"top middle"},{default:v(()=>[we(Z(l.title),1)]),_:1})]),_:1},8,["src"])]),_:1},8,["to"]),p.value?(S(),$(Be,{key:2},{default:v(()=>[P("div",qe,[u(ee,{align:"center"},{default:v(()=>[u(N,{flat:"",round:"",color:e.value?"green":"grey",icon:"visibility",onClick:a[2]||(a[2]=s=>M(k)(t))},null,8,["color"]),u(N,{flat:"",round:"",color:c.value?"yellow":"grey",icon:"segment"},null,8,["color"]),u(N,{flat:"",round:"",color:L.value?"red":"grey",icon:"favorite",onClick:a[3]||(a[3]=s=>M(k)(g))},null,8,["color"])]),_:1})])]),_:1})):(S(),A("div",$e))]),_:1}),u(Qe,{modelValue:h.value,"onUpdate:modelValue":a[7]||(a[7]=s=>h.value=s)},{default:v(()=>[u(te,{style:{"min-width":"450px"}},{default:v(()=>[u(Te,null,{default:v(()=>[u(ae,{rounded:"",outlined:"",modelValue:d.value,"onUpdate:modelValue":a[5]||(a[5]=s=>d.value=s),type:"text",label:"List Title",class:"q-mb-lg",rules:[s=>!!s||"List Title is Required"]},null,8,["modelValue","rules"]),u(ae,{rounded:"",filled:"",modelValue:f.value,"onUpdate:modelValue":a[6]||(a[6]=s=>f.value=s),type:"textarea",label:"list Description"},null,8,["modelValue"])]),_:1}),u(ee,{align:"center"},{default:v(()=>[U(u(N,{flat:"",label:"Cancel",type:"reset",color:"primary",onClick:_},null,512),[[z]]),U(u(N,{flat:"",label:"Submit",type:"submit",color:"primary",onClick:b},null,512),[[z]])]),_:1})]),_:1})]),_:1},8,["modelValue"])],64)}}};export{Xe as Q,Ze as _,Je as a};
