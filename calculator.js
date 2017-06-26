/**
 * Created by stevenbraham on 23-05-17.
 */
//main logic engine that straps everything together

'use strict';


$(() => {
    //only init objects after jquery if fully available
    let displayEngine = new Display();
    let memoryEngine = new Memory();
    let errorEngine = new Error();
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
                    case "C":
                        //clear screen
                        displayEngine.setNumber("");
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
                        memoryEngine.number = 0;
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