const MACHINE = 'MQ_Tox_Perf';
const K = (name) => `IM_${MACHINE}_${name}`;

function load(key, fallback){ try{ return JSON.parse(localStorage.getItem(K(key))) ?? fallback }catch(e){ return fallback } }
function save(key, data){ localStorage.setItem(K(key), JSON.stringify(data)); }

export const Api = {
  getDados(){ return load('dados', { maquina:MACHINE, historico: [] }); },
  setDados(obj){ save('dados', obj); },

  getAcoes(){ return load('acoes', []); },
  addAcao(item){ const a=this.getAcoes(); a.push(item); save('acoes', a); },
  updAcoes(arr){ save('acoes', arr); },

  getAnalises(){ return load('analise', []); },
  addAnalise(item){ const x=this.getAnalises(); x.push(item); save('analise', x); },
  setAnalises(arr){ save('analise', arr); }
};

// Dados iniciais (só 1ª vez)
if(!localStorage.getItem(K('seeded'))){
  Api.setDados({maquina:MACHINE, historico:[
    {data:'2026-02-17', descricao:'Vazamento válvula V123', status:'Aberto', prazo:'2026-02-20'},
    {data:'2026-02-16', descricao:'Troca de sensor', status:'Fechado', prazo:'2026-02-16'}
  ]});
  Api.updAcoes([{acao:'Trocar válvula V123', responsavel:'João', prazo:'2026-02-20', status:'Aberto'}]);
  Api.setAnalises([]);
  localStorage.setItem(K('seeded'), '1');
}
