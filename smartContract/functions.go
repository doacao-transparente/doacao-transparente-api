package main

import (
	"encoding/json"
	"errors"
	"fmt"
	"strconv"

	"github.com/hyperledger/fabric/core/chaincode/shim"
)

func (t *SimpleChaincode) createProject(stub shim.ChaincodeStubInterface, args []string) ([]byte, error) {
	//function to create projects [ONG]
	var projectRequest = args[1]
	projectToBeRegistered := &Project{}
	fmt.Println("Received create method call with parameters [" + projectRequest + "]")
	fmt.Println("Unmarshalling Project Data")
	//deserialize json para project struct
	err := json.Unmarshal([]byte(projectRequest), &projectToBeRegistered)
	if err == nil {
		fmt.Println("Error: invalid project for register")
		return nil, errors.New("Invalid Project for register")
	}
	if projectToBeRegistered == nil || projectToBeRegistered.NGO == nil {
		fmt.Println("Requests to create project must be performed by an ngo")
		return nil, errors.New("Requests to create project must be performed by an ngo")
	}
	//Busca todos os projetos no blockchain com o projectKey
	projectsAsBytes, err := stub.GetState(projectsKey)
	if err != nil {
		return nil, errors.New("Failed to get projects list")
	}
	//deserialize todos os projetos json buscados do blockchain para a lista de project (struct)
	json.Unmarshal(projectsAsBytes, &projectsList)
	fmt.Println("Projects Registered:")
	//Mensagem na tela para verificar os projetos buscados
	for x := range projectsList {
		fmt.Println("Project: " + projectsList[x].Description)
	}
	//Adiciona na lista o projeto da requisicao para a lista de projetos retornados do blockchain
	projectsList = append(projectsList, projectToBeRegistered)
	//Serializa a lista do projeto, com o projeto da requisicao incluido
	projectsAsBytes, err2 := json.Marshal(projectsList)
	if err2 != nil {
		return nil, err2
	}
	//gravando todos os projetos (json) no blockchain
	err3 := stub.PutState(projectsKey, projectsAsBytes)
	if err3 != nil {
		return nil, errors.New("Failed to put projects list")
	}
	//serializa para gravar projeto no blockchain
	projectToBeRegisteredMarshall, _ := json.Marshal(projectToBeRegistered)
	//conversao int para string
	idProjectString := strconv.Itoa(projectToBeRegistered.IdProject)
	//gravando unico projeto no blockchain
	err4 := stub.PutState(idProjectString, projectToBeRegisteredMarshall)
	if err4 != nil {
		return nil, errors.New("Failed to put projects list")
	}
	return nil, err
}

//lista
func (t *SimpleChaincode) getProjectsByRange(stub shim.ChaincodeStubInterface, args []string) ([]byte, error) {

	requesterID, err := strconv.Atoi(args[1])
	//id's greather than 4 represents ngo's
	if requesterID > 4 && err != nil {
		return nil, errors.New("Operation not authorized")
	}

	projectsAsBytes, err := stub.GetState(projectsKey)
	if err != nil {
		return nil, errors.New("Failed to get projects list")
	}

	err2 := json.Unmarshal(projectsAsBytes, &projectsList)
	if err2 != nil {
		return nil, errors.New("Failed Unmarshal projectsAsBytes &projectsList")
	}
	fmt.Println("Projects List:")
	for x := range projectsList {
		fmt.Println("Project: " + projectsList[x].Description)
	}

	return projectsAsBytes, nil
}

//1 item
func (t *SimpleChaincode) queryOverKeys(stub shim.ChaincodeStubInterface, args string) ([]byte, error) {
	//var arguments
	//var project []Project
	if len(args) > 0 {
		fmt.Println("Searching key: " + args + " from ledger...")
		projectByte, err := stub.GetState(args)
		//error := json.Unmarshal(projectByte, &project)
		if err != nil {
			jsonResp := "{\"Error\":\"Failed to get state for " + args + "\"}"
			return nil, errors.New(jsonResp)
		}
		if projectByte == nil {
			jsonResp := "Key values not found"
			return nil, errors.New(jsonResp)
		}
		return projectByte, err
	}
	return nil, nil
}

//createScenario
/* args[0] - ONGS
 * args[1] - City Hall's
 * args[2] - Projects
 */
func (t *SimpleChaincode) createScenario(stub shim.ChaincodeStubInterface) error {
	return nil
}

//alterar status
func (t *SimpleChaincode) setStatusProject(stub shim.ChaincodeStubInterface, args []string) ([]byte, error) {
	projectID, err := strconv.Atoi(args[0])
	var statusProject = args[1]

	allProjectsAsBytes, err := stub.GetState(projectsKey)
	if err != nil {
		return nil, errors.New("Failed to retrieve projects list")
	}

	json.Unmarshal(allProjectsAsBytes, &projectsList)
	for x := range projectsList {

		fmt.Println("Searching for projectID " + strconv.Itoa(projectID))
		if projectsList[x].IdProject == projectID {
			fmt.Println("Project " + strconv.Itoa(projectID) + " found")
			projectsList[x].Status = statusProject
			projectsList[x].StatusHistory = append(projectsList[x].StatusHistory, statusProject)
			fmt.Println("Currently Status: " + projectsList[x].Status)

			allProjectsAsBytes, _ = json.Marshal(projectsList)
			err = stub.PutState(projectsKey, allProjectsAsBytes)
			if err != nil {
				return nil, err
			}

			fmt.Print("Project Status Updated")
			return []byte(statusProject), nil
		}
	}

	return nil, errors.New("Project not found")
}

//setar valor doado
func (t *SimpleChaincode) setAmount(stub shim.ChaincodeStubInterface, args []string) ([]byte, error) {
	var projectAmounted Project
	//projectAmounted.IdProject, _ = strconv.Atoi(args[0])
	projectToDonation := args[0]
	var donation Donation
	donation.IdDonation, _ = strconv.Atoi(args[1])
	donation.Value, _ = strconv.ParseFloat(args[2], 64)
	donation.Donator.IdDonator, _ = strconv.Atoi(args[3])
	donation.Donator.DonatorName = args[4]
	donation.Donator.TypeDonator = args[5]

	fmt.Println("Searching for projectID " + projectToDonation)
	projectsAsBytes, err := stub.GetState(projectToDonation)
	json.Unmarshal(projectsAsBytes, &projectAmounted)
	if err != nil {
		return nil, errors.New("Failed to retrieve projects list")
	}
	fmt.Println("Project " + strconv.Itoa(projectAmounted.IdProject) + " found")

	//lista de doacoes atual
	donationsHistory := projectAmounted.DonationsHistory
	//adicionando a nova doacao
	donationsChain := append(donationsHistory, donation)
	//subtituindo a lista para com o novo valor
	projectAmounted.DonationsHistory = donationsChain

	projectAmounted.AmountCollected += donation.Value
	fmt.Println("Currently AmountCollected: " + strconv.FormatFloat(projectAmounted.AmountCollected, 'f', -1, 64))

	//serializa para gravar projeto no blockchain
	projectAmountedMarshall, _ := json.Marshal(projectAmounted)
	err2 := stub.PutState(strconv.Itoa(projectAmounted.IdProject), projectAmountedMarshall)
	if err2 != nil {
		return nil, errors.New("Error Receiveing Donation")
	}
	fmt.Print("Donation Received Succesfully")
	return nil, nil
}

//setar repasse da prefeitura para a ong
func (t *SimpleChaincode) setValueTransfered(stub shim.ChaincodeStubInterface, args []string) ([]byte, error) {

	projectID, err := strconv.Atoi(args[0])
	if err != nil {
		return nil, errors.New("Error project ID")
	}

	allProjectsAsBytes, err := stub.GetState(projectsKey)
	if err != nil {
		return nil, errors.New("Failed to retrieve projects list")
	}

	json.Unmarshal(allProjectsAsBytes, &projectsList)
	for x := range projectsList {

		fmt.Println("Searching for projectID " + strconv.Itoa(projectID))
		if projectsList[x].IdProject == projectID {
			fmt.Println("Project " + strconv.Itoa(projectID) + " found")
			projectsList[x].ValueTransfered += projectsList[x].AmountCollected
			fmt.Println("Currently AmountCollected: " + strconv.FormatFloat(projectsList[x].ValueTransfered, 'f', -1, 64))

			allProjectsAsBytes, _ = json.Marshal(projectsList)
			err = stub.PutState(projectsKey, allProjectsAsBytes)
			if err != nil {
				return nil, err
			}

			fmt.Print("Donation Received Succesfully")
			return nil, nil
		}
	}

	return nil, errors.New("Error Receiveing Donation")
}

func (t *SimpleChaincode) getDonationsHistory(stub shim.ChaincodeStubInterface, args string) ([]byte, error) {
	idProjectHistory := args
	projectAsByte, err := stub.GetState(idProjectHistory)
	var projectHistory Project
	err2 := json.Unmarshal(projectAsByte, &projectHistory)
	if err2 == nil {
		return nil, errors.New("Failed to retrieve projects list History")
	}

	respondDonations, err3 := json.Marshal(projectHistory.DonationsHistory)
	if err3 == nil {
		return nil, errors.New("Failed create a json donations")
	}
	return respondDonations, nil
}

func (t *SimpleChaincode) getDonatorsHistory(stub shim.ChaincodeStubInterface, args string) ([]byte, error) {
	donatorID := args
	projectAsByte, err := stub.GetState(projectsKey)
	var listProject []Project
	err2 := json.Unmarshal(projectAsByte, &,,,,,,,,00)
	if err2 == nil {
		return nil, errors.New("Failed to retrieve projects list project")
	}
	var donationsListByDonator []Donation
	donatorIDInt, _ := strconv.Atoi(donatorID)
	for _, itemPr := range listProject {
		for _, itemDonation := range itemPr.DonationsHistory {
			if itemDonation.Donator.IdDonator == donatorIDInt {
				donationsListByDonator := append(donationsListByDonator, itemDonation)
			}
		}
	}
	respondDonationsByDonator, err3 := json.Marshal(donationsListByDonator)
	if err3 == nil {
		return nil, errors.New("Failed create a json donations")
	}
	return respondDonationsByDonator, nil
}
