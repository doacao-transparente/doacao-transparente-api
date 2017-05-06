package main

import (
	"fmt"
	"strconv"

	"github.com/vNext/fabric/core/chaincode/shim"
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

func (t *SimpleChaincode) Init(stub shim.ChaincodeStubInterface, function string, args []string) ([]byte, error) {
	fmt.Println("[Init]Chaincode Is Starting Up")
	_, args := stub.GetFunctionAndParameters()
	var Aval int
	var err error

	if len(args) != 1 {
		return shim.Error("Incorrect number of arguments. Expecting 1")
	}

	// convert numeric string to integer
	Aval, err = strconv.Atoi(args[0])
	if err != nil {
		return err.Error("Expecting a numeric string argument to Init()")
	}

	err = stub.PutState("chaincodeVersion", []byte("1.0.0"))
	if err != nil {
		return err.Error("Error writing chaincode version")
	}

	err = stub.PutState("initialValue", []byte(strconv.Itoa(Aval)))
	if err != nil {
		return err.Error("Error writing initialValue - aborting...")
	}

	fmt.Println(" - ready for action")
	return nil, nil
}

func (t *SimpleChaincode) Invoke(stub shim.ChaincodeStubInterface, function string, args []string) ([]byte, error) {
	fmt.Println("starting invoke, for - " + function)

	if function == "init" {
		return t.Init(stub)
	} else if function == "write" {
		return write(stub, args)
	} else if function == "create_project" {
		return create_project(stub, args)
	} else if function == "update_project" {
		return update_project(stub, args)
	} else if function == "send_donation" {
		return send_donation(stub, args)
	} else if function == "transferDonation" {
		return transferDonation(stub, args)
	}

	fmt.Println("Received unknown invoke function name - " + function)
	return err.Error("Received unknown invoke function name - '" + function + "'")
}

func (t *SimpleChaincode) Query(stub shim.ChaincodeStubInterface, function string, args []string) ([]byte, error) {
	fmt.Println("starting query, for - " + function)

	if function == "read" {
		return read(stub, args)
	} else if function == "getDonationsHistory" {
		return getDonationsHistory(stub, args)
	} else if function == "getProjectsByRange" {
		return getProjectsByRange(stub, args)
	}
}
