import{Q as b}from"./QTooltip.e075cabc.js";import{Q as g}from"./QImg.2b8d9ad3.js";import{b as Q,Q as y,c as w,a as k}from"./QTabPanels.e8f0b43d.js";import{u as V,r as q,o as U,p as j,j as o,k as l,t as s,d as e,s as a,ak as T,F as u,aj as p,v as f,ag as n,x as h,q as L,ac as B}from"./index.46262264.js";import"./position-engine.cf62087e.js";import"./use-timeout.ae950064.js";import"./scroll.8c111353.js";import"./uid.42677368.js";import"./QResizeObserver.f8c764b2.js";import"./rtl.b51694b1.js";import"./use-panel.6cd0d6e5.js";import"./use-dark.716b45d7.js";const N={padding:"",class:"row justify-center q-pt-xl"},C={class:"col-12 col-md-8 row"},F={class:"col-12 col-md-8 q-px-md"},I=s("div",{class:"titles"},"Watchlist",-1),P=s("div",{class:"q-mb-md"},"Your films to be watched. ",-1),R={class:"row q-col-gutter-md"},S={class:"titles"},W={class:"q-mb-md flex justify-between"},A={class:"row q-col-gutter-md"},D={class:"col-12 col-md-4 q-pa-xl"},st={__name:"UserWatchlist",setup(E){const r=V(),d=q("watchlist");return U(async()=>{try{const{data:c}=await T.get("lists/user");r.userLists&&(r.userLists=c.UserLists)}catch(c){console.log(c)}}),(c,m)=>{const v=j("RouterLink");return o(),l("div",N,[s("div",C,[s("div",F,[e(Q,{modelValue:d.value,"onUpdate:modelValue":m[0]||(m[0]=t=>d.value=t),animated:"",swipeable:"",vertical:"","transition-prev":"jump-up","transition-next":"jump-up"},{default:a(()=>[e(w,{name:"watchlist"},{default:a(()=>[I,P,s("div",R,[(o(!0),l(u,null,p(h(r).watchList,(t,i)=>(o(),l("div",{class:"col-6 col-md-4 col-lg-3",key:i},[e(v,{to:"/films/"+t.id},{default:a(()=>[e(g,{ratio:3/4,src:"https://image.tmdb.org/t/p/w300/"+t.poster,class:"rounded15 border5"},{default:a(()=>[e(b,{anchor:"center middle",self:"top middle"},{default:a(()=>[f(n(t.title),1)]),_:2},1024)]),_:2},1032,["src"])]),_:2},1032,["to"])]))),128))])]),_:1}),(o(!0),l(u,null,p(h(r).userLists,(t,i)=>(o(),L(w,{key:i,name:t.name},{default:a(()=>[s("div",S,n(t.name),1),s("div",W,[s("span",null,n(t.description||"No description"),1),s("span",null,[e(B,{name:"favorite"}),f(" "+n(t.likes.length),1)])]),s("div",A,[(o(!0),l(u,null,p(t.films,(_,x)=>(o(),l("div",{class:"col-6 col-md-4 col-lg-3",key:x},[e(v,{to:"/films/"+_.id},{default:a(()=>[e(g,{ratio:3/4,src:"https://image.tmdb.org/t/p/w300/"+_.poster,class:"rounded15 border5"},{default:a(()=>[e(b,{anchor:"center middle",self:"top middle"},{default:a(()=>[f(n(_.title),1)]),_:2},1024)]),_:2},1032,["src"])]),_:2},1032,["to"])]))),128))])]),_:2},1032,["name"]))),128))]),_:1},8,["modelValue"])]),s("div",D,[e(y,{modelValue:d.value,"onUpdate:modelValue":m[1]||(m[1]=t=>d.value=t),vertical:""},{default:a(()=>[e(k,{name:"watchlist",label:"watchlist"}),(o(!0),l(u,null,p(h(r).userLists,(t,i)=>(o(),L(k,{key:i,name:t.name,label:t.name},null,8,["name","label"]))),128))]),_:1},8,["modelValue"])])])])}}};export{st as default};
