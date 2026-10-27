const menuToggle=document.querySelector('.menu-toggle');
const nav=document.querySelector('.nav');
if(menuToggle&&nav){menuToggle.addEventListener('click',()=>nav.classList.toggle('open'))}

const leadForm=document.querySelector('.mini-form');
if(leadForm){leadForm.addEventListener('submit',e=>{e.preventDefault();const data=new FormData(leadForm);const msg=`Olá, sou ${data.get('nome')||''}. Empresa: ${data.get('empresa')||''}. Interesse: ${data.get('interesse')||''}. Telefone: ${data.get('telefone')||''}.`;window.open(`https://wa.me/5511965432991?text=${encodeURIComponent(msg)}`,'_blank')})}

const proposalForm=document.getElementById('proposal-form');
if(proposalForm){
  const serviceLabels=[...proposalForm.querySelectorAll('.lead-tabs .budget-tab')];
  serviceLabels.forEach(label=>{
    const radio=label.querySelector('input[type="radio"]');
    radio.addEventListener('change',()=>{
      serviceLabels.forEach(l=>l.classList.remove('active'));
      if(radio.checked) label.classList.add('active');
    });
  });
  proposalForm.addEventListener('submit',e=>{
    e.preventDefault();
    const data=new FormData(proposalForm);
    const sn=Number(data.get('sn')||0), lp=Number(data.get('lp')||0), lr=Number(data.get('lr')||0);
    const total=sn+lp+lr;
    if(total<=0){alert('Informe ao menos uma empresa na carteira.');return;}
    const msg=`Olá! Gostaria de solicitar uma proposta comercial da W&S.\n\nServiço: ${data.get('servico')}\nNome: ${data.get('nome')}\nEmpresa/Escritório: ${data.get('empresa')}\nWhatsApp: ${data.get('telefone')}\nE-mail: ${data.get('email')}\n\nComposição da carteira:\n- Simples Nacional: ${sn}\n- Lucro Presumido: ${lp}\n- Lucro Real: ${lr}\n- Total de empresas: ${total}\n\nObservações: ${data.get('observacoes')||'Não informado'}\n\nGostaria de receber uma proposta personalizada.`;
    window.open(`https://wa.me/5511965432991?text=${encodeURIComponent(msg)}`,'_blank');
  });
}
