/**
 * Created by stevenbraham on 23-05-17.
 */
//Main logic engine that straps everything together
//I decided to separate all functionality by defining several classes
//My application relies heavily on recent ES6 functions such as string literals, classes and arrow functions.

'use strict';

//logic that has to be executed on page load
document.addEventListener("DOMContentLoaded", function (event) {
    //only init objects after jquery if fully available
    let displayEngine = new Display();
    let memoryEngine = new Memory();
    let errorEngine = new Error();

    //variables
    let lastAnswer = 0; //result of most recent calculation
    let lastFunction = ""; //last function that was executed eg +, -, / etc
    let previousNumber = 0; //temp variable for storing the input after a screen clear
    let newCalculation = true; //temp variable for storing if the user press = multiple times, true indicates last answer hasn't been set yet

    //display the number in memory
    displayEngine.setMemoryNumber(memoryEngine.number);

    [...document.querySelectorAll("button")].forEach((button) => {
        button.addEventListener("click", onButtonClick)
    });

    function onButtonClick() { //$("button").click is short for $("button").on('click',...
        let buttonContent = this.textContent;
        //get button type from data attribute
        let buttonType = this.getAttribute("data-type");
        switch (buttonType) {
            case "calculate":
                //actual calculation logic
                let number = displayEngine.getNumber();

                //due to the way I handle the multiple =, the order of numbers reverses

                let numberOne = newCalculation ? previousNumber : number;
                let numberTwo = newCalculation ? number : previousNumber;
                //check operation
                switch (lastFunction) {
                    case "+":
                        lastAnswer = numberOne + numberTwo;
                        break;
                    case "-":
                        lastAnswer = numberOne - numberTwo;
                        break;
                    case "/":
                        //check for divide by 0
                        if (numberTwo == 0) {
                            errorEngine.throwError("You can't divide by 0!");
                        }
                        lastAnswer = numberOne / numberTwo;
                        break;
                    case "*":
                        lastAnswer = numberOne * numberTwo;
                        break;
                    case "^":
                        lastAnswer = Math.pow(numberOne, numberTwo);
                        break;
                    case "√":
                        lastAnswer = Math.sqrt(numberOne);
                        break;
                    default:
                        errorEngine.throwUnsupportedError(lastFunction);
                        break;
                }
                //check if the user has issued a new calculation
                if (newCalculation) {
                    //previous number becomes the number, the user entered before the =
                    previousNumber = number;
                    displayEngine.setPreviousNumber(previousNumber);
                    //remove lock
                    newCalculation = false;
                }
                displayEngine.setNumber(lastAnswer);
                break;
            case "number":
                //simple number, add to display and working memory
                displayEngine.appendNumber(buttonContent);
                break;
            case "screen":
                //functions related to manipulating the display
                switch (buttonContent) {
                    case "AC":
                        //reset everything
                        displayEngine.clearAll();
                        lastAnswer, lastFunction, previousNumber = "";
                        newCalculation = true;
                        break;
                    case "+/-":
                        //flip
                        displayEngine.setNumber(-displayEngine.getNumber());
                        break;
                    default:
                        //Not supported/implemented
                        errorEngine.throwUnsupportedError(buttonContent);
                        break;
                }
                break;
            case "function":
                //store the operation, but don't do anything until the user presses =
                displayEngine.setOperation(buttonContent);
                previousNumber = displayEngine.getNumber();
                lastFunction = buttonContent;
                displayEngine.clearScreen();
                displayEngine.setPreviousNumber(previousNumber);
                //make sure the last answer is empty, because the calculation has changed
                newCalculation = true;
                break;
            case "memory":
                //memory storing and retrieving related functions
                switch (buttonContent) {
                    case "MR":
                        //retrieve and display current memory number
                        displayEngine.setNumber(memoryEngine.number);
                        break;
                    case "M+":
                        //to improve efficiency I chain the output of several functions together
                        displayEngine.setMemoryNumber(memoryEngine.addNumber(displayEngine.getNumber()));
                        break;
                    case "M-":
                        displayEngine.setMemoryNumber(memoryEngine.subtractNumber(displayEngine.getNumber()));
                        break;
                    case "MC":
                        //reset memory
                        memoryEngine.reset();
                        displayEngine.setMemoryNumber(memoryEngine.number);
                        break;
                    default:
                        //Not supported/implemented
                        errorEngine.throwUnsupportedError(buttonContent);
                        break;
                }
                break;
            default:
                //Not supported/implemented button type
                errorEngine.throwUnsupportedError(buttonContent);
                break;
        }
    }
});