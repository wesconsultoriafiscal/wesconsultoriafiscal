const toggle=document.querySelector('.menu-toggle');const nav=document.querySelector('.nav');if(toggle&&nav){toggle.addEventListener('click',()=>nav.classList.toggle('open'));nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')))}
const leadForm=document.querySelector('.mini-form');if(leadForm){leadForm.addEventListener('submit',e=>{e.preventDefault();const data=new FormData(leadForm);const msg=`Olá, sou ${data.get('nome')||''}. Empresa: ${data.get('empresa')||''}. Interesse: ${data.get('interesse')||''}. Telefone: ${data.get('telefone')||''}.`;window.open(`https://wa.me/5511965432991?text=${encodeURIComponent(msg)}`,'_blank')})}

// W&S V4 - simulador comercial
(function(){
  const tabs=document.querySelectorAll('[data-budget-tab]');
  if(!tabs.length) return;
  const panels={outsourcing:document.getElementById('budget-outsourcing'),param:document.getElementById('budget-param')};
  tabs.forEach(tab=>tab.addEventListener('click',()=>{
    tabs.forEach(t=>t.classList.remove('active'));tab.classList.add('active');
    Object.values(panels).forEach(p=>p&&p.classList.remove('active'));
    const target=panels[tab.dataset.budgetTab];if(target)target.classList.add('active');
  }));

  const brl=v=>new Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL'}).format(v||0);
  const num=id=>Math.max(0,parseInt(document.getElementById(id)?.value||'0',10)||0);
  const txt=id=>(document.getElementById(id)?.value||'').trim();

  // Tabela comercial vigente W&S - Terceirização Fiscal.
  const TERC={sn:45,lp:65,lr:100};
  function calcTerc(){
    const sn=num('qtd-sn'),lp=num('qtd-lp'),lr=num('qtd-lr'),totalEmp=sn+lp+lr;
    const total=sn*TERC.sn+lp*TERC.lp+lr*TERC.lr;
    const price=document.getElementById('terc-price'),caption=document.getElementById('terc-caption'),summary=document.getElementById('terc-summary'),wa=document.getElementById('terc-whatsapp');
    if(price)price.textContent=brl(total);
    if(caption)caption.textContent=totalEmp?`Estimativa para ${totalEmp} empresa${totalEmp>1?'s':''} no escopo informado.`:'Informe ao menos uma empresa para calcular.';
    if(summary){const bs=summary.querySelectorAll('b');if(bs[0])bs[0].textContent=sn;if(bs[1])bs[1].textContent=lp;if(bs[2])bs[2].textContent=lr;}
    if(wa){
      if(totalEmp){
        const nome=txt('terc-nome')||'Interessado';const empresa=txt('terc-empresa')||'Não informado';
        const msg=`Olá! Fiz uma simulação de Terceirização Fiscal no site da W&S.\n\nNome: ${nome}\nEmpresa/Escritório: ${empresa}\nSimples Nacional: ${sn}\nLucro Presumido: ${lp}\nLucro Real: ${lr}\nTotal de empresas: ${totalEmp}\nEstimativa mensal: ${brl(total)}\n\nGostaria de validar o escopo e receber a proposta oficial.`;
        wa.href=`https://wa.me/5511965432991?text=${encodeURIComponent(msg)}`;wa.classList.remove('disabled');
      }else{wa.href='#';wa.classList.add('disabled');}
    }
  }
  ['qtd-sn','qtd-lp','qtd-lr','terc-nome','terc-empresa'].forEach(id=>document.getElementById(id)?.addEventListener('input',calcTerc));

  // Tabela comercial vigente W&S - Parametrização Fiscal.
  const PARAM={sn:25,lp:40,lr:70};
  function calcParam(){
    const sn=num('qtd-param-sn'),lp=num('qtd-param-lp'),lr=num('qtd-param-lr'),totalEmp=sn+lp+lr;
    const total=sn*PARAM.sn+lp*PARAM.lp+lr*PARAM.lr;
    const p=document.getElementById('param-price'),cap=document.getElementById('param-caption'),summary=document.getElementById('param-summary'),wa=document.getElementById('param-whatsapp');
    if(p)p.textContent=brl(total);
    if(cap)cap.textContent=totalEmp?`Estimativa para projeto com ${totalEmp} empresa${totalEmp>1?'s':''}.`:'Informe ao menos uma empresa para calcular.';
    if(summary){const bs=summary.querySelectorAll('b');if(bs[0])bs[0].textContent=sn;if(bs[1])bs[1].textContent=lp;if(bs[2])bs[2].textContent=lr;}
    if(wa){
      if(totalEmp){
        const nome=txt('param-nome')||'Interessado';const empresa=txt('param-empresa')||'Não informado';
        const msg=`Olá! Fiz uma simulação de Parametrização Fiscal no site da W&S.\n\nNome: ${nome}\nEmpresa/Escritório: ${empresa}\nSimples Nacional: ${sn}\nLucro Presumido: ${lp}\nLucro Real: ${lr}\nTotal de empresas: ${totalEmp}\nEstimativa do projeto: ${brl(total)}\n\nGostaria de validar o escopo e receber a proposta oficial.`;
        wa.href=`https://wa.me/5511965432991?text=${encodeURIComponent(msg)}`;wa.classList.remove('disabled');
      }else{wa.href='#';wa.classList.add('disabled');}
    }
  }
  ['qtd-param-sn','qtd-param-lp','qtd-param-lr','param-nome','param-empresa'].forEach(id=>document.getElementById(id)?.addEventListener('input',calcParam));
  calcTerc();calcParam();
})();
