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
	var projectToBeRegistered Project
	ngo := &NGO{}

	err := json.Unmarshal([]byte(projectRequest), &projectToBeRegistered)
	if err != nil {
		fmt.Println("Error invalid person")
		return nil, errors.New("Invalid Person register")
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

func (t *SimpleChaincode) sendDonation(stub shim.ChaincodeStubInterface, args []string) ([]byte, error) {
	return nil, nil
}

func (t *SimpleChaincode) getDonationsHistory(stub shim.ChaincodeStubInterface, args []string) ([]byte, error) {
	return nil, nil
}

func (t *SimpleChaincode) transferDonation(stub shim.ChaincodeStubInterface, args []string) ([]byte, error) {
	return nil, nil
}
