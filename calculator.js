/**
 * Created by stevenbraham on 23-05-17.
 */
//Main logic engine that straps everything together
//I decided to separate all functionality by defining several classes
//My application relies heavily on recent ES6 functions such as string literals, classes and arrow functions.

'use strict';

$(() => {
    //only init objects after jquery if fully available
    let displayEngine = new Display();
    let memoryEngine = new Memory();
    let errorEngine = new Error();

    //variables
    let lastAnswer = 0; //result of most recent calculation
    let lastFunction = ""; //last function that was executed eg +, -, / etc
    let previousNumber = 0; //temp variable for storing the input after a screen clear

    //display the number in memory
    displayEngine.setMemoryNumber(memoryEngine.number);

    //listen to click events
    $("button").click(function () { //$("button").click is short for $("button").on('click',...
        let buttonContent = $(this).text();
        //get button type from data attribute
        let buttonType = $(this).data("type");
        switch (buttonType) {
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
                        lastFunction = "";
                        previousNumber = "";
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
    });
});
