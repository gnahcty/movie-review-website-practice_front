import{C as R,aE as P,aF as I,c as f,w as V,aJ as q,m as D,n as j,Z as N,r as B,o as F,q as h,j as w,s as g,t as s,z as U,af as A,d as t,Q as y,v as e,x as O,ai as i,y as z,aj as E,am as H,aN as M,aO as J}from"./index.41ebcf44.js";import{Q as Z}from"./QToolbar.c8c652de.js";import{Q as G,a as K,b as W}from"./QLayout.f9ff37a2.js";import{Q as X,_ as Y,a as ee,b as te}from"./SideBar.838b5c18.js";import{Q as x,a as k}from"./QItemLabel.28cb7de0.js";import{Q as oe}from"./QItem.7fd5a40a.js";import{u as se,d as ae,e as le,Q as re}from"./QTabPanels.4088ba1e.js";import"./QResizeObserver.c37c1aa4.js";import"./scroll.a7a5ba3b.js";import"./use-dark.bb245855.js";import"./format.a33550d6.js";import"./QList.6b0a790d.js";import"./use-timeout.d53a31c9.js";import"./use-panel.10d9b90e.js";import"./QInput.7eda67a5.js";import"./use-key-composition.befea7ca.js";import"./uid.42677368.js";import"./use-form.a2dd561e.js";import"./QCard.0e8d47b1.js";import"./use-quasar.66b5834f.js";import"./rtl.b51694b1.js";var Q=R({name:"QRouteTab",props:{...P,...se},emits:ae,setup(a,{slots:n,emit:u}){const o=I({useDisableForRouterLinkProps:!1}),{renderTab:l,$tabs:_}=le(a,n,u,{exact:f(()=>a.exact),...o});return V(()=>`${a.name} | ${a.exact} | ${(o.resolvedLink.value||{}).href}`,()=>{_.verifyRouteModel()}),()=>l(o.linkTag.value,o.linkAttrs.value)}});const m=a=>(M("data-v-ba1a4d08"),a=a(),J(),a),ne={class:"row col-8 justify-center"},ce={class:"col-md-8 col-12 row items-center",id:"profile"},ie={class:"col-12 col-sm-6"},ue=["src"],de={class:"col-12 col-sm-6 row q-xs-pb-lg"},me={class:"col column text-center"},_e={class:"text-bold text-h6"},fe=m(()=>e("span",null,"films",-1)),pe={class:"col column text-center"},ve={class:"text-bold text-h6"},be=m(()=>e("span",null,"reviews",-1)),he={class:"col column text-center"},we={class:"text-bold text-h6"},ge=m(()=>e("span",null,"followers",-1)),ye={class:"col column text-center"},xe={class:"text-bold text-h6"},ke=m(()=>e("span",null,"following",-1)),Qe={class:"col row justify-center"},Le={class:"col-md-8 col-12 row items-center"},Se={__name:"ProfileLayout",setup(a){const n=D(),u=j(),o=N({}),l=B(!1),_=()=>{l.value=!l.value},L=f(()=>`background-color: ${u.meta.bg}`),S=[{to:"/",label:"Home",icon:"home"},{to:"/lists",label:"Lists",icon:"format_list_bulleted"},{to:"/users",label:"Popular User",icon:"fa-solid fa-ranking-star"},{to:"/films",label:"Films",icon:"fa-solid fa-film"},{to:"/watchlist",label:"watchlist",icon:"more_time"},{to:`/profile/${n.username}/likes`,label:"Likes",icon:"favorite"},{to:"/settings",label:"Settings",icon:"settings"}],p=f(()=>{var c;return(c=o.followers)==null?void 0:c.some(r=>r._id===n._id)}),T=async()=>{await H.post("users/follow",{username:o.username}),v()},v=async()=>{const{data:c}=await A.get("/profile/recent/"+u.params.username);Object.assign(o,c.result.profile)};return F(()=>{v()}),(c,r)=>{const $=h("router-link"),C=h("router-view");return w(),g(G,{view:"lhh lpR fFf",style:U(L.value)},{default:s(()=>[t(K,{class:"column text-black",id:"header",style:{background:"transparent"}},{default:s(()=>[t(Z,{class:"col-2"},{default:s(()=>[t(y,{dense:"",flat:"",round:"",icon:"menu",onClick:_})]),_:1})]),_:1}),t(ee,{modelValue:l.value,"onUpdate:modelValue":r[0]||(r[0]=d=>l.value=d),side:"left",overlay:"",behavior:"mobile"},{default:s(()=>[t(X,{class:"fit"},{default:s(()=>[t(Y,{menuList:S})]),_:1})]),_:1},8,["modelValue"]),t(W,null,{default:s(()=>{var d,b;return[e("div",ne,[e("div",ce,[e("div",ie,[t(oe,{class:"row"},{default:s(()=>[t(x,{avatar:"",class:"col-5"},{default:s(()=>[t($,{to:`/profile/${o.username}/recent`},{default:s(()=>[e("img",{class:"round q-pa-lg",style:{width:"100%"},src:o.avatar},null,8,ue)]),_:1},8,["to"])]),_:1}),t(x,null,{default:s(()=>[t(k,{style:{"font-weight":"800"},class:"title2 text-bold"},{default:s(()=>[O(i(o.username),1)]),_:1}),z(n).username!==o.username?(w(),g(k,{key:0,style:{"margin-top":"10px !important"}},{default:s(()=>[t(y,{unelevated:"",class:"text-black",label:p.value?"followed":"follow",color:p.value?"light-green-14":"white",onClick:r[1]||(r[1]=Te=>T())},null,8,["label","color"])]),_:1})):E("",!0)]),_:1})]),_:1})]),e("div",de,[e("div",me,[e("span",_e,i(o.watched),1),fe]),e("div",pe,[e("span",ve,i(o.reviewed),1),be]),e("div",he,[e("span",we,i((d=o.followers)==null?void 0:d.length),1),ge]),e("div",ye,[e("span",xe,i((b=o.following)==null?void 0:b.length),1),ke])])])]),e("div",Qe,[e("div",Le,[t(re,{align:"left","indicator-color":"transparent",class:"q-mt-md col-2 row window-width"},{default:s(()=>[t(Q,{to:"recent",label:"recent",class:"col-sm col-md-3 q-py-sm",style:{"background-color":"#ffe500",opacity:"1"}}),t(Q,{to:"likes",label:"favorites",class:"col-sm col-md-3 q-py-sm",style:{"background-color":"#00e0ff",opacity:"1"}})]),_:1})])]),t(C)]}),_:1}),t(te)]),_:1},8,["style"])}}};var Ge=q(Se,[["__scopeId","data-v-ba1a4d08"]]);export{Ge as default};
