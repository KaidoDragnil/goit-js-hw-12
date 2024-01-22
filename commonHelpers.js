import{a as w,S as k,i as y}from"./assets/vendor-89feecc5.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const l of t.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&a(l)}).observe(document,{childList:!0,subtree:!0});function n(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?t.credentials="include":e.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function a(e){if(e.ep)return;e.ep=!0;const t=n(e);fetch(e.href,t)}})();const d=document.querySelector(".image-search-form"),q=document.querySelector(".image-search-name"),h=document.querySelector(".loader-container"),p=document.querySelector(".gallery"),c=document.querySelector(".more-button");function S(){h.style.display="block"}function m(){h.style.display="none"}let i=1;const g=40;let u="";async function b(s,r){u=s;const n={key:"41964053-c955e63b08cf707b650cdfd9b",q:u,image_type:"photo",orientation:"horizontal",safesearch:!0,page:r,per_page:g},a=new URLSearchParams(n);S();try{const e=await w.get(`https://pixabay.com/api/?${a}`);m();const t=new k(".gallery a",{captionDelay:250,captionsData:"alt",close:!0});t.refresh();const{hits:l,totalHits:L}=e.data;r===1&&(p.innerHTML="");const v=l.reduce((f,o)=>f+`<a class="gallery-link" href="${o.largeImageURL}">
            <img
                class="gallery-image"
                src="${o.webformatURL}"
                alt="${o.tags}"
            />
           <ul class="gallery-info-list">
              <li class="gallery-info-item">
                  <p class="gallery-info-title">Likes</p>
                  <p class="gallery-info-value">${o.likes}</p>
              </li>
              <li class="gallery-info-item">
                  <p class="gallery-info-title">Views</p>
                  <p class="gallery-info-value">${o.views}</p>
              </li>
              <li class="gallery-info-item">
                  <p class="gallery-info-title">Comments</p>
                  <p class="gallery-info-value">${o.comments}</p>
              </li>
              <li class="gallery-info-item">
                  <p class="gallery-info-title">Downloads</p>
                  <p class="gallery-info-value">${o.downloads}</p>
              </li>
            </ul>
        </a>`,"");if(p.insertAdjacentHTML("beforeend",v),t.refresh(),L<=r*g)c.style.display="none",y.error({title:"Error",message:"We're sorry, but you've reached the end of search results.",position:"topRight"});else{c.style.display="block";const o=document.querySelector(".gallery-link").getBoundingClientRect().height;window.scrollBy({top:o*2,behavior:"smooth"})}}catch(e){m(),y.error({title:"Error",message:e.message,position:"topRight"})}}d.addEventListener("submit",s=>{s.preventDefault();const r=q.value.trim();i=1,b(r,i),d.reset()});c.addEventListener("click",()=>{i+=1,b(u,i)});
//# sourceMappingURL=commonHelpers.js.map
