!function(){var e=function(e,t){return new Promise((function(n,o){setTimeout((function(){Math.random()>.3?n({position:e,delay:t}):o({position:e,delay:t})}),t)}))},t={form:document.querySelector(".form"),firstDelay:document.querySelector('input[name$="delay"]'),step:document.querySelector('input[name$="step"]'),amount:document.querySelector('input[name$="amount"]')};t.form.addEventListener("submit",(function(n){n.preventDefault();for(var o=Number(t.amount.value),u=Number(t.step.value),r=Number(t.firstDelay.value),a=1;a<=o;a++)e(a,r).then((function(e){var t=e.position,n=e.delay;console.log("✅ Fulfilled promise ".concat(t," in ").concat(n,"ms"))})).catch((function(e){var t=e.position,n=e.delay;console.log("❌ Rejected promise ".concat(t," in ").concat(n,"ms"))})),r+=u;n.target.reset()}))}();
//# sourceMappingURL=03-promises.e154e3fb.js.map
