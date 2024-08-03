import{i as a,S as h}from"./assets/vendor-8c59ed88.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const i of e)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function s(e){const i={};return e.integrity&&(i.integrity=e.integrity),e.referrerPolicy&&(i.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?i.credentials="include":e.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function n(e){if(e.ep)return;e.ep=!0;const i=s(e);fetch(e.href,i)}})();const u="https://pixabay.com/api/";function f(t){const r=new URLSearchParams({key:"45131353-6378824e083214db07911a1d4",q:`${t}`,image_type:"photo",orientation:"horizontal",safesearch:"true"});return fetch(`${u}?${r}`).then(s=>{if(!s.ok)throw new Error(s.status);return s.json()})}const m={renderImg:y,onFetchError:x},g=document.querySelector(".img-container-list"),d=document.querySelector(".loader");function y(t){if(d.style.display="none",!t.hits.length){a.show({title:"Error",titleColor:"#FAFAFB",titleSize:"16px",titleLineHeight:"24px",position:"topRight",maxWidth:"432px",message:"Sorry, there are no images matching your search query. Please try again!",messageColor:"#FAFAFB",messageSize:"16px",messageLineHeight:" 24px",backgroundColor:"#EF4040"});return}g.innerHTML=F(t.hits),new h(".wrap-img-item a",{captions:!0,captionsData:"alt",captionDelay:250}).refresh()}function F(t){return t.map(({webformatURL:r,largeImageURL:s,tags:n,likes:e,views:i,comments:o,downloads:p})=>`<li class="img-container-item">
        <div class="wrap-img-item">
            <a href="${s}"><img class="img-item" src="${r}" alt="${n}"/></a>
        </div>
        <div class="wrap-img-discr">
            <ul class="img-discr-list">
                <li class="img-discr-item">
                    <h2 class="img-discr-item-header">Likes</h2>
                    <p class="img-discr-item-text">${e}</p>
                </li>
                <li class="img-discr-item">
                    <h2 class="img-discr-item-header">Views</h2>
                    <p class="img-discr-item-text">${i}</p>
                </li>
                <li class="img-discr-item">
                    <h2 class="img-discr-item-header">Comments</h2>
                    <p class="img-discr-item-text">${o}</p>
                </li><li class="img-discr-item">
                    <h2 class="img-discr-item-header">Downloads</h2>
                    <p class="img-discr-item-text">${p}</p>
                </li>
            </ul>
        </div>
    </li>`).join("")}function x(t){g.innerHTML="",d.style.display="none",console.log(t),t.name==="TypeError"&&t.message==="Failed to fetch"?a.show({title:"Error",titleColor:"#FAFAFB",titleSize:"16px",titleLineHeight:"24px",position:"topRight",maxWidth:"432px",message:"No internet connection",messageColor:"#FAFAFB",messageSize:"16px",messageLineHeight:" 24px",backgroundColor:"#EF4040"}):a.show({title:"Error",titleColor:"#FAFAFB",titleSize:"16px",titleLineHeight:"24px",position:"topRight",maxWidth:"432px",message:`An error occurred: ${t.message}`,messageColor:"#FAFAFB",messageSize:"16px",messageLineHeight:" 24px",backgroundColor:"#EF4040"})}const l=document.querySelector(".search-img-form"),c=document.querySelector(".loader"),L=document.querySelector(".img-container-list");l.addEventListener("submit",A);c.style.display="none";function A(t){t.preventDefault(),c.style.display="block",L.innerHTML="";const r=t.currentTarget.elements.name.value.trim().toLowerCase();if(!r){a.show({title:"Caution",titleColor:"#FAFAFB",titleSize:"16px",titleLineHeight:"24px",position:"topRight",maxWidth:"432px",message:"Ops.. You forgot to write the keyword!",messageColor:"#FAFAFB",messageSize:"16px",messageLineHeight:" 24px",backgroundColor:"#FFA000"}),c.style.display="none",l.reset();return}f(r).then(m.renderImg).catch(m.onFetchError).finally(()=>l.reset())}
//# sourceMappingURL=commonHelpers.js.map
