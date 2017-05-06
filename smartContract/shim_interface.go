package main

import (
	"errors"
	"fmt"
	"strconv"

	"github.com/hyperledger/fabric/core/chaincode/shim"
)

var projectsKey = "_projects"
var projectsList []Project
var ngoKey = "_ngo"
var ngoList []NGO
var donatorsKey = "_donators"
var donatorsList []Donator
var donationsKey = "_donations"
var donationsList []Donation

// SimpleChaincode example simple Chaincode implementation
type SimpleChaincode struct {
}

func main() {
	err := shim.Start(new(SimpleChaincode))
	if err != nil {
		fmt.Printf("Error starting charity chaincode - %s", err)
	}
}

//Init - makes go lang happy :)
func (t *SimpleChaincode) Init(stub shim.ChaincodeStubInterface, function string, args []string) ([]byte, error) {
	fmt.Println("[Init]Chaincode Is Starting Up")

	if len(args) != 1 {
		return nil, errors.New("Incorrect number of arguments. Expecting 1")
	}

	// convert numeric string to integer
	Aval, err := strconv.Atoi(args[0])
	if err != nil {
		return nil, errors.New("Expecting a numeric string argument to Init")
	}

	err = stub.PutState("chaincodeVersion", []byte("1.0.0"))
	if err != nil {
		return nil, errors.New("Error writing chaincode version")
	}

	err = stub.PutState("initialValue", []byte(strconv.Itoa(Aval)))
	if err != nil {
		return nil, errors.New("Error writing initialValue - aborting...")
	}

	fmt.Println(" - ready for action")
	return nil, nil
}

//Invoke - makes go lang happy :)
func (t *SimpleChaincode) Invoke(stub shim.ChaincodeStubInterface, function string, args []string) ([]byte, error) {
	fmt.Println("starting invoke, for - " + function)

	if function == "init" {
		return t.Init(stub, function, args)
	} else if function == "createProject" {
		return t.createProject(stub, args)
	} else if function == "updateProject" {
		return t.updateProject(stub, args)
	} else if function == "sendDonation" {
		return t.sendDonation(stub, args)
	} else if function == "transferDonation" {
		return t.transferDonation(stub, args)
	}

	fmt.Println("Received unknown invoke function name - " + function)
	return nil, errors.New("Received unknown invoke function name - '" + function + "'")
}

//Query - makes go lang happy :)
func (t *SimpleChaincode) Query(stub shim.ChaincodeStubInterface, function string, args []string) ([]byte, error) {
	fmt.Println("starting query, for - " + function)

	if function == "getDonationsHistory" {
		return t.getDonationsHistory(stub, args)
	} else if function == "getProjectsByRange" {
		return t.getProjectsByRange(stub, args)
	}

	return nil, errors.New("Query function not found")
}
