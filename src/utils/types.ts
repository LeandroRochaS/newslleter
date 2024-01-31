export type LoginType = {
  cpf: string;
  email: string;
  fullName: string;
  id: string;
  imgUrl: string;
  password: string;
  role: string;
  nome: string;
};

export type SectorType = {
  description: string;
  title: string;
  hour: string;
  date: string;
  image: string;
  sector: string;
  etapas: Event[];
};

export type Event = {
  data: string;
  title: string;
  person: string;
};

export type Etapa = {
  data: string;
  horario: string;
  descricao: string;
  title: string;
  person: string;
};

export type PostType = {
  id: string;
  titulo: string;
  resumo: string;
  conteudo: string;
  imgUrl: string;
  data: string;
  categoria: string;
};
