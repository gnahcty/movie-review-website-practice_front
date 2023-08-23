import{u as b,p as g,j as c,k as d,t as s,d as t,s as o,F as C,aj as O,q as $,x as u,v as W,ag as k,Q as B,aI as P,aJ as T,ak as I,aH as N,W as f,o as V,ad as x,aL as j,aM as H}from"./index.46262264.js";import{Q,a as y}from"./QItemLabel.6c94aa21.js";import{N as q,a as X,S as A}from"./grid.2cddcf28.js";import{C as E}from"./CardStack.82763964.js";import{u as R}from"./checkLogin.a13e2029.js";import"./use-quasar.ea5a7393.js";const F={class:"row items-center h100 w100"},M=s("div",{class:"col-1 relative"},[s("div",{class:"swiper-button-prev swiper-prev",id:"swiper-prev",style:{top:"auto !important"}})],-1),U={class:"col-10"},z={class:"col-8"},D=["src"],J={key:1,class:"h100 w100 bg-grey rounded15",style:{border:"5px solid grey"}},K={class:"col-auto"},G=["src"],Y={class:"text-h6 q-pl-md"},Z={class:"col flex justify-end items-center"},ss=s("div",{class:"col-1 relative"},[s("div",{class:"swiper-button-next swiper-next",id:"swiper-next",style:{top:"auto !important"}})],-1),S={__name:"ListSwiper",props:{list:{type:Array,default:()=>[]},swiperOptions:{type:Object,default:()=>({slidesPerView:1,spaceBetween:10,loop:!0,navigation:{prevEl:".swiper-prev",nextEl:".swiper-next"},modules:[q],breakpoints:{768:{slidesPerView:2,spaceBetween:20},1128:{slidesPerView:3,spaceBetween:20},1620:{slidesPerView:3,spaceBetween:30}}})},cardStackOptions:{type:Object,default:()=>({cardWidth:233,stackWidth:"100%",cardHeight:345,maxCards:4,paddingX:10})}},emits:["like"],setup(i,{emit:m}){const e=i,{loginTryCatch:n}=R(),p=b(),_=async r=>{await I.post("/lists/like",{id:r}),m("like")};return(r,l)=>{const w=g("RouterLink"),h=g("router-link");return c(),d("div",F,[M,s("div",U,[t(u(A),P(T(e.swiperOptions)),{default:o(()=>[(c(!0),d(C,null,O(e.list,a=>(c(),$(u(X),{key:a._id,class:"column"},{default:o(()=>[s("div",z,[t(w,{to:`/list/${a._id}`},{default:o(()=>[t(E,{cards:a.films,cardWidth:e.cardStackOptions.cardWidth,stackWidth:e.cardStackOptions.stackWidth,cardHeight:e.cardStackOptions.cardHeight,maxCards:e.cardStackOptions.maxCards,paddingX:e.cardStackOptions.paddingX},{card:o(({card:v})=>[v.poster?(c(),d("img",{key:0,src:`https://image.tmdb.org/t/p/w300/${v.poster}`,class:"h100 rounded15 border5"},null,8,D)):(c(),d("div",J))]),_:2},1032,["cards","cardWidth","stackWidth","cardHeight","maxCards","paddingX"])]),_:2},1032,["to"])]),t(Q,{class:"col-4 justify-around q-pl-md-md"},{default:o(()=>[t(y,{lines:"2",class:"title3 lilita"},{default:o(()=>[W(k(a.name),1)]),_:2},1024),t(y,{lines:"1",class:"row q-px-md"},{default:o(()=>[s("span",K,[t(h,{to:`/profile/${a.user.username}/recent`,class:"flex items-center"},{default:o(()=>[s("img",{src:a.user.avatar,class:"round",style:{width:"50px"}},null,8,G),s("span",Y,k(a.user.username),1)]),_:2},1032,["to"])]),s("span",Z,[t(B,{flat:"",round:"",icon:"favorite",color:a.likes.indexOf(u(p)._id)>-1?"red":"black",onClick:v=>u(n)(()=>_(a._id))},null,8,["color","onClick"]),s("span",null,k(a.likes.length),1)])]),_:2},1024)]),_:2},1024)]),_:2},1024))),128))]),_:1},16)]),ss])}}};const L=i=>(j("data-v-41911d72"),i=i(),H(),i),es={class:"section"},ts={class:"column"},as=L(()=>s("div",{class:"listTitles col-auto"},"Popular This Week",-1)),os={class:"section"},is={class:"column"},cs=L(()=>s("div",{class:"listTitles"},"Newly Added",-1)),ns={__name:"TopLists",setup(i){const m={licenseKey:"gplv3-license"},e=f([]),n=f([]),p=async()=>{const{data:l}=await x.get("/lists/pop");e.splice(0,e.length,...l.results)},_=async()=>{const{data:l}=await x.get("/lists/new");n.splice(0,n.length,...l.results)},r=()=>{p(),_()};return V(()=>{p(),_()}),(l,w)=>{const h=g("full-page");return c(),d("div",null,[t(h,{ref:"fullpage",options:m,id:"fullpage"},{default:o(()=>[s("div",es,[s("div",ts,[as,t(S,{list:e,onLike:r,class:"col"},null,8,["list"])])]),s("div",os,[s("div",is,[cs,t(S,{list:n,onLike:r,class:"col"},null,8,["list"])])])]),_:1},512)])}}};var ms=N(ns,[["__scopeId","data-v-41911d72"]]);export{ms as default};
