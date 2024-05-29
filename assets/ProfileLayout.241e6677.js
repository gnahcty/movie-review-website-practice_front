import{H as C,aH as I,aI as P,c as p,w as D,_ as V,m as q,n as j,a1 as B,r as H,o as N,q as b,j as w,s as y,t as s,z as U,aj as A,d as t,Q as g,v as e,x as F,am as i,y as z,D as E,ap as M,E as O,G}from"./index.0dc9be6b.js";import{Q as J}from"./QToolbar.06c8e10e.js";import{Q as K,a as W,b as X}from"./QLayout.ba0f4678.js";import{Q as Y,_ as Z,a as ee,b as te}from"./SideBar.1dbf225c.js";import{Q as x,a as k}from"./QItemLabel.34f69f68.js";import{Q as oe}from"./QItem.cc23ec7f.js";import{u as se,d as ae,e as le,Q as re}from"./QTabPanels.60b0bf75.js";import"./QResizeObserver.c4c5ce48.js";import"./scroll.2583b80e.js";import"./use-dark.7513bcde.js";import"./format.a33550d6.js";import"./QList.4f2f3307.js";import"./use-timeout.b9c8c8b8.js";import"./use-panel.58daeb3b.js";import"./QInput.b9966d6f.js";import"./use-key-composition.7f9a1d91.js";import"./uid.42677368.js";import"./use-form.fb4c7786.js";import"./QCard.a71f91d8.js";import"./use-quasar.5d4d05ef.js";import"./rtl.b51694b1.js";var Q=C({name:"QRouteTab",props:{...I,...se},emits:ae,setup(a,{slots:n,emit:u}){const o=P({useDisableForRouterLinkProps:!1}),{renderTab:l,$tabs:_}=le(a,n,u,{exact:p(()=>a.exact),...o});return D(()=>`${a.name} | ${a.exact} | ${(o.resolvedLink.value||{}).href}`,()=>{_.verifyRouteModel()}),()=>l(o.linkTag.value,o.linkAttrs.value)}});const m=a=>(O("data-v-58ed3064"),a=a(),G(),a),ne={class:"row col-8 justify-center"},ce={class:"col-md-8 col-12 row items-center",id:"profile"},ie={class:"col-12 col-sm-6"},ue=["src"],de={class:"col-12 col-sm-6 row q-xs-pb-lg"},me={class:"col column text-center"},_e={class:"text-bold text-h6"},pe=m(()=>e("span",null,"films",-1)),fe={class:"col column text-center"},ve={class:"text-bold text-h6"},he=m(()=>e("span",null,"reviews",-1)),be={class:"col column text-center"},we={class:"text-bold text-h6"},ye=m(()=>e("span",null,"followers",-1)),ge={class:"col column text-center"},xe={class:"text-bold text-h6"},ke=m(()=>e("span",null,"following",-1)),Qe={class:"col row justify-center"},Le={class:"col-md-8 col-12 row items-center"},Te={__name:"ProfileLayout",setup(a){const n=q(),u=j(),o=B({}),l=H(!1),_=()=>{l.value=!l.value},L=p(()=>`background-color: ${u.meta.bg}`),T=[{to:"/",label:"Home",icon:"home"},{to:"/lists",label:"Lists",icon:"format_list_bulleted"},{to:"/users",label:"Popular User",icon:"fa-solid fa-ranking-star"},{to:"/films",label:"Films",icon:"fa-solid fa-film"},{to:"/watchlist",label:"watchlist",icon:"more_time"},{to:`/profile/${n.username}/likes`,label:"Likes",icon:"favorite"}],f=p(()=>{var c;return(c=o.followers)==null?void 0:c.some(r=>r._id===n._id)}),$=async()=>{await M.post("users/follow",{username:o.username}),v()},v=async()=>{const{data:c}=await A.get("/profile/recent/"+u.params.username);Object.assign(o,c.result.profile)};return N(()=>{v()}),(c,r)=>{const R=b("router-link"),S=b("router-view");return w(),y(K,{view:"lhh lpR fFf",style:U(L.value)},{default:s(()=>[t(W,{class:"column text-black",id:"header",style:{background:"transparent"}},{default:s(()=>[t(J,{class:"col-2"},{default:s(()=>[t(g,{dense:"",flat:"",round:"",icon:"menu",onClick:_})]),_:1})]),_:1}),t(ee,{modelValue:l.value,"onUpdate:modelValue":r[0]||(r[0]=d=>l.value=d),side:"left",overlay:"",behavior:"mobile"},{default:s(()=>[t(Y,{class:"fit"},{default:s(()=>[t(Z,{menuList:T})]),_:1})]),_:1},8,["modelValue"]),t(X,null,{default:s(()=>{var d,h;return[e("div",ne,[e("div",ce,[e("div",ie,[t(oe,{class:"row"},{default:s(()=>[t(x,{avatar:"",class:"col-5"},{default:s(()=>[t(R,{to:`/profile/${o.username}/recent`},{default:s(()=>[e("img",{class:"round q-pa-lg",style:{width:"100%"},src:o.avatar},null,8,ue)]),_:1},8,["to"])]),_:1}),t(x,null,{default:s(()=>[t(k,{style:{"font-weight":"800"},class:"title2 text-bold"},{default:s(()=>[F(i(o.username),1)]),_:1}),z(n).username!==o.username?(w(),y(k,{key:0,style:{"margin-top":"10px !important"}},{default:s(()=>[t(g,{unelevated:"",class:"text-black",label:f.value?"followed":"follow",color:f.value?"light-green-14":"white",onClick:r[1]||(r[1]=$e=>$())},null,8,["label","color"])]),_:1})):E("",!0)]),_:1})]),_:1})]),e("div",de,[e("div",me,[e("span",_e,i(o.watched),1),pe]),e("div",fe,[e("span",ve,i(o.reviewed),1),he]),e("div",be,[e("span",we,i((d=o.followers)==null?void 0:d.length),1),ye]),e("div",ge,[e("span",xe,i((h=o.following)==null?void 0:h.length),1),ke])])])]),e("div",Qe,[e("div",Le,[t(re,{align:"left","indicator-color":"transparent",class:"q-mt-md col-2 row window-width"},{default:s(()=>[t(Q,{to:"recent",label:"recent",class:"col-sm col-md-3 q-py-sm",style:{"background-color":"#ffe500",opacity:"1"}}),t(Q,{to:"likes",label:"favorites",class:"col-sm col-md-3 q-py-sm",style:{"background-color":"#00e0ff",opacity:"1"}})]),_:1})])]),t(S)]}),_:1}),t(te)]),_:1},8,["style"])}}};var Ke=V(Te,[["__scopeId","data-v-58ed3064"]]);export{Ke as default};