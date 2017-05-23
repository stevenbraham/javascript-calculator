/**
 * Created by stevenbraham on 23-05-17.
 */

//this class handles all things related to displaying numbers

class Display {

    /**
     * @param {number} number
     */
    setNumber(number) {
        $("#mainNumber").text(number);
    }

    /**
     * @param {number} number
     */
    appendNumber(number) {
        $("#mainNumber").append(number);
    }
}