package main

import (
	"fmt"
	"strconv"

	"github.com/vNext/fabric/core/chaincode/shim"
)

// SimpleChaincode example simple Chaincode implementation
type SimpleChaincode struct {
}

func main() {
	err := shim.Start(new(SimpleChaincode))
	if err != nil {
		fmt.Printf("Error starting Simple chaincode - %s", err)
	}
}

func (t *SimpleChaincode) Init(stub shim.ChaincodeStubInterface) {
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
		return shim.Error("Expecting a numeric string argument to Init()")
	}

	// store compaitible marbles application version
	err = stub.PutState("chaincodeVersion", []byte("1.0.0"))
	if err != nil {
		return shim.Error(err.Error())
	}

	// this is a very simple dumb test.  let's write to the ledger and error on any errors
	err = stub.PutState("initialValue", []byte(strconv.Itoa(Aval))) //making a test var "selftest", its handy to read this right away to test the network
	if err != nil {
		return shim.Error(err.Error()) //self-test fail
	}

	fmt.Println(" - ready for action") //self-test pass
	return shim.Success(nil)
}

func (t *SimpleChaincode) Invoke(stub shim.ChaincodeStubInterface) {
	function, args := stub.GetFunctionAndParameters()
	fmt.Println(" ")
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
	return shim.Error("Received unknown invoke function name - '" + function + "'")
}

func (t *SimpleChaincode) Query(stub shim.ChaincodeStubInterface) {
	function, args := stub.GetFunctionAndParameters()
	fmt.Println(" ")
	fmt.Println("starting query, for - " + function)

	if function == "read" {
		return read(stub, args)
	} else if function == "getDonationsHistory" {
		return getDonationsHistory(stub, args)
	} else if function == "getProjectsByRange" {
		return getProjectsByRange(stub, args)
	}
}
