// Suporte multi-máquina via ?m=1|2|3
const params = new URLSearchParams(location.search);
export const MACHINE_ID = params.get('m') || '1';
const K = (name) => `IM_M${MACHINE_ID}_${name}`;

export const machineLabel = () => `Máquina ${MACHINE_ID}`;
export const withM = (path) => `${path}?m=${MACHINE_ID}`;

function load(key, fallback){ try{ return JSON.parse(localStorage.getItem(K(key))) ?? fallback }catch(e){ return fallback } }
function save(key, data){ localStorage.setItem(K(key), JSON.stringify(data)); }

export const Api = {
  getDados(){ return load('dados', { maquina: machineLabel(), historico: [] }); },
  setDados(obj){ save('dados', obj); },

  getAcoes(){ return load('acoes', []); },
  updAcoes(arr){ save('acoes', arr); },

  getAnalises(){ return load('analise', []); },
  setAnalises(arr){ save('analise', arr); }
};

// Seed por máquina (apenas 1ª vez dessa máquina)
if(!localStorage.getItem(K('seeded'))){
  const hoje = new Date();
  const d = (offset) => new Date(hoje.getTime()+offset*86400000).toISOString().slice(0,10);
  Api.setDados({
    maquina: machineLabel(),
    historico: [
      {data:d(-3), descricao:'Ocorrência registrada', status:'Aberto', prazo:d(1)},
      {data:d(-5), descricao:'Troca preventiva de sensor', status:'Fechado', prazo:d(-5)}
    ]
  });
  Api.updAcoes([{acao:'Verificar válvulas', responsavel:'Equipe', prazo:d(2), status:'Aberto'}]);
  Api.setAnalises([]);
  localStorage.setItem(K('seeded'),'1');
}
