(function(){
  const form=document.getElementById('project-intelligence-form');
  if(!form) return;
  const steps=[...document.querySelectorAll('.pi-step')];
  const dots=[...document.querySelectorAll('[data-step-dot]')];
  const results=document.getElementById('pi-results');
  const summary=document.getElementById('report_summary');
  const status=document.getElementById('pi-form-status');
  let current=1;
  const value=name=>form.elements[name]?.value?.trim()||'';
  const number=name=>parseFloat(value(name))||0;
  function setStep(n){current=n;steps.forEach(s=>s.classList.toggle('active',Number(s.dataset.step)===n));dots.forEach(d=>d.classList.toggle('active',Number(d.dataset.stepDot)<=n));window.scrollTo({top:document.querySelector('.pi-section').offsetTop-80,behavior:'smooth'});}
  function validateStep(n){
    if(n===1 && !form.querySelector('input[name="project_type"]:checked')){alert('Please select a project type.');return false;}
    if(n===2){for(const name of ['country','stage','objective']){if(!value(name)){alert('Please complete the required project profile fields.');return false;}}}
    return true;
  }
  function estimate(){
    const type=form.querySelector('input[name="project_type"]:checked')?.value||'Climate project';
    const scale=number('scale'); const capex=number('capex'); const objective=value('objective');
    let reductionFactor=0.35, creditPotential='Requires project-specific assessment', mrv='Medium', tech=70;
    if(type.includes('Carbon removal')){reductionFactor=.65;creditPotential='Potential CDR / carbon-market pathway — eligibility requires assessment';mrv='High';tech=68;}
    else if(type.includes('Industrial')){reductionFactor=.45;creditPotential='Possible pathway — methodology and eligibility require assessment';mrv='Medium';tech=78;}
    else if(type.includes('Energy')){reductionFactor=.40;creditPotential='Project-dependent; carbon eligibility requires assessment';mrv='Medium';tech=82;}
    else if(type.includes('Waste')){reductionFactor=.50;creditPotential='Possible pathway — methodology and baseline require assessment';mrv='High';tech=72;}
    else if(type.includes('Transport')){reductionFactor=.40;creditPotential='Project-dependent; reduction crediting is not assumed';mrv='Medium';tech=85;}
    const estimated=Math.round(scale*reductionFactor);
    const annualSavings=capex>0?Math.round(capex*(type.includes('Transport')?.18:type.includes('Industrial')?.16:.12)):0;
    const payback=annualSavings>0?(capex/annualSavings).toFixed(1):'—';
    let carbonDisplay=estimated>0?estimated.toLocaleString()+' tCO₂e / year':'To be determined';
    let finance='Potential finance pathways to investigate';
    if(capex>=1000000) finance='Green / climate finance, equipment or project finance and blended structures may be relevant';
    else if(capex>0) finance='Equipment finance, green lending and other project finance routes may be relevant';
    const values={carbon:estimated,tech,financeScore:capex>=1000000?78:capex>0?68:55,market:type.includes('Carbon removal')?70:55};
    const profile=[['Carbon potential',Math.min(95,Math.max(35,Math.round(40+reductionFactor*70)))],['Economic potential',annualSavings?Math.min(90,Math.round(45+(annualSavings/capex)*180)):55],['Finance potential',values.financeScore],['Technology readiness',tech],['Carbon market pathway',values.market],['MRV readiness',mrv==='High'?62:72]];
    results.innerHTML=`<div class="pi-metric"><span class="metric-label">Indicative carbon impact</span><strong>${carbonDisplay}</strong><p>Screening estimate only; final emissions reduction or CDR depends on project data, methodology and verification.</p></div><div class="pi-metric"><span class="metric-label">Carbon market</span><strong>${creditPotential.split(' — ')[0]}</strong><p>${creditPotential.includes('—')?creditPotential.split(' — ')[1]:creditPotential}.</p></div><div class="pi-metric"><span class="metric-label">Indicative annual benefit</span><strong>${annualSavings?'US$ '+annualSavings.toLocaleString():'Project-specific'}</strong><p>Simple screening estimate based on the CAPEX input; not a financial forecast.</p></div><div class="pi-metric"><span class="metric-label">Indicative payback</span><strong>${payback}${payback!=='—'?' years':''}</strong><p>Simple CAPEX / estimated annual benefit screening ratio.</p></div><div class="pi-metric"><span class="metric-label">Finance pathways</span><strong>${finance.includes('Potential')?'Explore':'Assess'}</strong><p>${finance}.</p></div><div class="pi-metric"><span class="metric-label">MRV complexity</span><strong>${mrv}</strong><p>Indicative data and verification complexity for this project type.</p></div><div class="pi-profile"><h3>Project profile</h3><div class="pi-bars">${profile.map(p=>`<div class="pi-bar-row"><span>${p[0]}</span><div class="pi-bar"><b style="width:${p[1]}%"></b></div><strong>${p[1]}</strong></div>`).join('')}</div></div>`;
    const report=`Hub Carbon Project Intelligence — indicative screening\nProject type: ${type}\nCountry: ${value('country')}\nStage: ${value('stage')}\nObjective: ${objective}\nScale: ${value('scale')||'Not provided'}\nCAPEX (USD): ${value('capex')||'Not provided'}\nCurrent situation: ${value('current_situation')||'Not provided'}\nProposed solution: ${value('solution')||'Not provided'}\nIndicative carbon impact: ${carbonDisplay}\nCarbon-market pathway: ${creditPotential}\nIndicative annual benefit: ${annualSavings?'US$ '+annualSavings.toLocaleString():'Project-specific'}\nIndicative payback: ${payback}${payback!=='—'?' years':''}\nMRV complexity: ${mrv}\nTechnology readiness: ${tech}/100\nImportant: indicative screening only. Final carbon volumes, eligibility, economics, financing and regulatory requirements require detailed project-specific assessment.`;
    summary.value=report;
  }
  form.querySelectorAll('[data-next]').forEach(btn=>btn.addEventListener('click',()=>{const n=Number(btn.dataset.next);if(validateStep(current)){if(n===3) estimate();setStep(n);}}));
  form.querySelectorAll('[data-prev]').forEach(btn=>btn.addEventListener('click',()=>setStep(Number(btn.dataset.prev))));
  form.addEventListener('submit',async e=>{e.preventDefault();if(!validateStep(3)) return;status.className='form-status';status.textContent='Sending your report request…';const fd=new FormData(form);try{const r=await fetch('https://formspree.io/f/xppzgddy',{method:'POST',body:fd,headers:{Accept:'application/json'}});if(!r.ok) throw new Error('Request failed');status.className='form-status success';status.textContent='Thank you. Your Project Intelligence Report request has been received. We will follow up by email.';form.querySelector('button[type="submit"]').disabled=true;}catch(err){status.className='form-status error';status.textContent='We could not send the report request. Please email info@hubcarbon.com and we will assist you.';}});
})();
