package main

type NGO struct {
	IdNGO    int       `json:"idNgo"`
	NGOName  string    `json:"NgoName"`
	Projects []Project `json:"projects"`
}

type Donation struct {
	IdDonation int     `json:"IdDonation"`
	Value      float64 `json:"value"`
	Donator    Donator
}

type Donator struct {
	IdDonator   int    `json:"idDonator"`
	DonatorName string `json:"donatorName"`
	//Donations   []Donation `json:"donations"`
	TypeDonator string `json:"typedonator"`
}

type CityHall struct {
	IdCityHall   int    `json:"idCityHall"`
	CityHallName string `json:"CityHallName"`
}

type CourtOfAuditors struct {
	//if false the court of auditors belongs to municipal area
	IsState   bool   `json:"isState"`
	IdCourt   int    `json:"idcourt"`
	StateName string `json:"statename"`
}

type Project struct {
	NGO              *NGO       `json:"NGO"`
	CityHall         CityHall   `json:"CityHall"`
	Title            string     `json:"title"`
	IdProject        int        `json:"idProject"`
	Description      string     `json:"description"`
	Cost             float64    `json:"cost"`
	Status           string     `json:"status"`
	StatusHistory    []string   `json:"statusHistory"`
	AmountCollected  float64    `json:"amountCollected"`
	DonationsHistory []Donation `json:"donationsHistory"`
	ValueTransfered  float64    `json:"valueTransfered"`
}
