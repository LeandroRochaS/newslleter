export const setores = {
  sopsms: {},
  sopalso: {},
  giad: {},
  gstdenpi: {},
};

export const salvarSetoresLocalStorage = (setores) => {
  localStorage.setItem("setores", JSON.stringify(setores));
};

export const carregarSetoresLocalStorage = () => {
  const setoresSalvos = localStorage.getItem("setores");
  return setoresSalvos ? JSON.parse(setoresSalvos) : setores;
};

export const adicionarContrato = (setor, id, contrato) => {
  const novosSetores = { ...carregarSetoresLocalStorage() };
  novosSetores[setor] = { ...novosSetores[setor], [id]: contrato };
  salvarSetoresLocalStorage(novosSetores);
};

export const adicionarEtapa = (setor, idContrato, etapa, indexEtapa) => {
  const setoresCarregados = carregarSetoresLocalStorage();
  setoresCarregados[setor][idContrato].etapas[indexEtapa] = etapa;
  salvarSetoresLocalStorage(setoresCarregados); // Salvar após a modificação
};

export const apagarContrato = (setor, idContrato) => {
  const setoresCarregados = carregarSetoresLocalStorage();

  if (setoresCarregados[setor] && setoresCarregados[setor][idContrato]) {
    delete setoresCarregados[setor][idContrato];
    salvarSetoresLocalStorage(setoresCarregados);
  } else {
    console.error(`Contrato ${idContrato} no setor ${setor} não encontrado.`);
  }
};
