import{i as e,n as t,r as n,t as r}from"./exampleSets-CfnQ-Z3E.js";e();var i=n();(!globalThis.EventTarget||!globalThis.Event)&&console.error(`
  PartySocket requires a global 'EventTarget' class to be available!
  You can polyfill this global by adding this to your code before any partysocket imports: 
  
  \`\`\`
  import 'partysocket/event-target-polyfill';
  \`\`\`
  Please file an issue at https://github.com/partykit/partykit if you're still having trouble.
`),typeof process<`u`&&process.versions?.node,typeof navigator<`u`&&navigator.product;var a=t();function o({memSet:e}){return(0,a.jsx)(`section`,{className:`select-memory`,id:`theme`,children:e.map(e=>(0,a.jsxs)(`a`,{className:`memory-set`,href:`/room/`,children:[(0,a.jsx)(`img`,{src:e.titlePicture.picture,alt:e.titlePicture.altText}),(0,a.jsx)(`p`,{children:e.name})]}))})}function s(){return(0,a.jsxs)(`article`,{className:`codeSection`,children:[(0,a.jsx)(`label`,{htmlFor:`code`,children:`Code:`}),(0,a.jsx)(`input`,{id:`code`,type:`text`,placeholder:`roomkey`,maxLength:6}),(0,a.jsx)(`button`,{id:`submitCode`,onClick:c,children:`Submit`})]})}function c(){}function l(){return(0,a.jsxs)(`main`,{children:[(0,a.jsxs)(`section`,{className:`setup`,children:[(0,a.jsxs)(`article`,{children:[(0,a.jsx)(`h2`,{children:`Please select your THEME`}),(0,a.jsx)(`p`,{children:`The themes are the indicator with which set you will be playing.`})]}),(0,a.jsx)(s,{})]}),(0,a.jsx)(o,{memSet:r})]})}(0,i.createRoot)(document.getElementById(`app`)).render((0,a.jsx)(l,{}));