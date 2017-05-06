package main

type NGO struct {
	IdNGO    int32     `json:"idNgo"`
	NGOName  string    `json:"NgoName"`
	Projects []Project `json:"projects"`
}

type Donation struct {
	IdDonation int32   `json:"IdDonation"`
	Donator    int32   `json:"idDonator"`
	Value      float64 `json:"value"`
}

type Donator struct {
	IdDonator   int32      `json:"idDonator"`
	DonatorName string     `json:"donatorName"`
	Donations   []Donation `json:"donations"`
}

type Prefecture struct {
	IdPrefecture   int32  `json:"idPrefecture"`
	PrefectureName string `json:"prefectureName"`
}

type CourtOfAuditors struct {
	//if false the court of auditors belongs to municipal area
	IsState   bool   `json:"isState"`
	IdCourt   int32  `json:"idcourt"`
	StateName string `json:"statename"`
}

type Project struct {
	NGO              NGO        `json:"NGO"`
	Prefecture       Prefecture `json:"prefecture"`
	Title            string     `json:"title"`
	IdProject        int32      `json:"idProject"`
	Description      string     `json:"description"`
	Cost             float64    `json:"cost"`
	Status           bool       `json:"status"`
	StatusHistory    []string   `json:"statusHistory"`
	AmountCollected  float64    `json:"amountCollected"`
	DonationsHistory []Donation `json:"donationsHistory"`
	ValueTransfered  float64    `json:"valueTransfered"`
}
