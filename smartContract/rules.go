package main

type ONG struct {
 
IdOng int32 `json:"idOng"`
OngNome string `json:"ongNome"`
Projetos Projeto[] `json:"projetos"`

}

type Doador struct {
	
	idDoador
	DoadorId
    Doacoes[]

}


type Prefeitura struct {

  idPrefeitura
  PrefeituraNome

}

type Projeto struct {

 OngNome 
  Prefeitura 
  Titulo
  IdProjeto
Descricao
Custo
Status
StatusHistorico
ValorArrecadado
DoacoesHistorico
ValorRepassado

}