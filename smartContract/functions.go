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
	ngo := &NGO{}

	fmt.Println("Received create method call with parameters [" + projectRequest + "]")
	fmt.Println("Unmarshalling Project Data")

	err := json.Unmarshal([]byte(projectRequest), &projectToBeRegistered)
	if err == nil {
		fmt.Println("Error: invalid project for register")
		return nil, errors.New("Invalid Project for register")
	}

	if projectToBeRegistered.NGO == ngo {
		fmt.Println("Requests to create project must be performed by an ngo")
		return nil, errors.New("Requests to create project must be performed by an ngo")
	}

	projectsAsBytes, err := stub.GetState(projectsKey)
	if err != nil {
		return nil, errors.New("Failed to get projects list")
	}

	json.Unmarshal(projectsAsBytes, &projectsList)
	fmt.Println("Projects Registered:")
	for x := range projectsList {
		fmt.Println("Project: " + projectsList[x].Description)
	}

	projectsList = append(projectsList, projectToBeRegistered)
	projectsAsBytes, _ = json.Marshal(projectsList)
	err = stub.PutState(projectsKey, projectsAsBytes)
	if err != nil {
		return nil, err
	}

	return nil, nil
}

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

	json.Unmarshal(projectsAsBytes, &projectsList)
	fmt.Println("Projects List:")
	for x := range projectsList {
		fmt.Println("Project: " + projectsList[x].Description)
	}

	return projectsAsBytes, nil
}

func (t *SimpleChaincode) queryOverKeys(stub shim.ChaincodeStubInterface, args []string) ([]byte, error) {
	var arguments, jsonResp string
	var err error

	if len(args) < 1 {
		return nil, errors.New("At least 1 argument")
	}

	arguments = args[0]
	fmt.Println("Searching key: " + arguments + " from ledger...")
	valAsbytes, err := stub.GetState(arguments) //get the var from chaincode state
	if err != nil {
		jsonResp = "{\"Error\":\"Failed to get state for " + arguments + "\"}"
		return nil, errors.New(jsonResp)
	}
	if valAsbytes == nil {
		jsonResp = "Key values not found"
		return nil, errors.New(jsonResp)
	}

	return valAsbytes, nil
}

//createScenario
/* args[0] - ONGS
 * args[1] - City Hall's
 * args[2] - Projects
 */
func (t *SimpleChaincode) createScenario(stub shim.ChaincodeStubInterface) error {
	return nil
}

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

func (t *SimpleChaincode) setAmount(stub shim.ChaincodeStubInterface, args []string) ([]byte, error) {
	projectID, err := strconv.Atoi(args[0])
	donation, err := strconv.ParseFloat(args[1], 64)
	if err != nil {
		return nil, errors.New("Error parsing donation value")
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
			projectsList[x].AmountCollected += donation
			fmt.Println("Currently AmountCollected: " + strconv.FormatFloat(projectsList[x].AmountCollected, 'f', -1, 64))

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

func (t *SimpleChaincode) getDonationsHistory(stub shim.ChaincodeStubInterface, args []string) ([]byte, error) {
	return nil, nil
}
