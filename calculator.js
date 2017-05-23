/**
 * Created by stevenbraham on 23-05-17.
 */

//main logic engine that straps everything together

$(() => {
    //only init objects after jquery if fully available
    let displayEngine = new Display();

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
            default:
                //Not supported/implemented button type
                break;
        }
    });
});