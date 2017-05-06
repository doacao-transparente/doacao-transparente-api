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

func (t *SimpleChaincode) updateProject(stub shim.ChaincodeStubInterface, args []string) ([]byte, error) {
	return nil, nil
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

	return valAsbytes, nil //send it onward
}

func (t *SimpleChaincode) sendDonation(stub shim.ChaincodeStubInterface, args []string) ([]byte, error) {
	return nil, nil
}

func (t *SimpleChaincode) getDonationsHistory(stub shim.ChaincodeStubInterface, args []string) ([]byte, error) {
	return nil, nil
}

func (t *SimpleChaincode) transferDonation(stub shim.ChaincodeStubInterface, args []string) ([]byte, error) {
	return nil, nil
}
