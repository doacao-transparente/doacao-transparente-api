package main

type ONG struct {
	IdOng    int32     `json:"idOng"`
	OngNome  string    `json:"ongNome"`
	Projetos []Projeto `json:"projetos"`
}

type Doacao struct {
	IdDoacao int32   `json:"idDoacao"`
	Doador   int32   `json:"idDoador"`
	Valor    float64 `json:"valor"`
}

type Doador struct {
	IdDoador int32    `json:"idDoador"`
	DoadorId string   `json:"doadorId"`
	Doacoes  []Doacao `json:"doacoes"`
}

type Prefeitura struct {
	idPrefeitura   int32  `json:"idPrefeitura"`
	PrefeituraNome string `json:"nomePrefeitura"`
}

type Projeto struct {
	Ong              ONG        `json:"ong"`
	Prefeitura       Prefeitura `json:"prefeitura"`
	Titulo           string     `json:titulo`
	IdProjeto        int32      `json:idProjeto`
	Descricao        string     `json:"descricao"`
	Custo            float64    `json:"custo"`
	Status           bool       `json:"status"`
	StatusHistorico  []string   `json:"statusHostorico"`
	ValorArrecadado  float64    `json:"valorArrecadado"`
	DoacoesHistorico []Doacao   `json:"historicoDoacoes"`
	ValorRepassado   float64    `json:valorRepassado`
}
