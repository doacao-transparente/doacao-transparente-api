package main

import (
	"github.com/0.6/fabric/core/chaincode/shim"
    "errors"
	"fmt"
)

func (t *SimpleChaincode) create_project(stub shim.ChaincodeStubInterface, args []string) ([]byte, error) {
	//function to create projects [ONG]
var projectRequest = args[1]
var projectToBeRegistered Project
var projectsAsBytes []byte

projectAsJson = json.Unmarshal([]byte(projectRequest,&projectToBeRegistered))
projectAsJson == nil {
 fmt.Println("Error unmarshalling json request " + projectAsJson)
 return nil, errors.New("Error unmarshalling json request")
}

if projectAsJson.idOng == nil {
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

projectsList = append(projectsList,projectAsJson)
projectsAsBytes, _ := json.Marshal(projectsList)
	err = stub.PutState(projectsKey, projectsAsBytes)
	if err != nil {
		return nil, err	
	}

   return nil,nil
}

func (t *SimpleChaincode) list_projects(stub shim.ChaincodeStubInterface, args []string) ([]byte, error) {

    var requesterId = strconv.Atoi(args[1])
	//id's greather than 4 represents ngo's
    if requesterId > 4 {
		return nil,error.New("Operation not authorized")
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

	return projectsAsBytes,nil
}

func (t *SimpleChaincode) update_project(stub shim.ChaincodeStubInterface, args []string) ([]byte, error) {
    return nil,nil
}

func (t *SimpleChaincode) send_donation(stub shim.ChaincodeStubInterface, args []string) ([]byte, error) {
    return nil,nil
}

func (t *SimpleChaincode) transferDonation(stub shim.ChaincodeStubInterface, args []string) ([]byte, error) {
    return nil,nil
}
