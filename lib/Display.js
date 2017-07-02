/**
 * Created by stevenbraham on 23-05-17.
 */

/**
 * This class handles all things related to displaying numbers
 */
class Display {

    /**
     * Replaces the current on screen number with something else
     * @param {number} number
     * @return {number}
     */
    setNumber(number) {
        $("#mainNumber").text(number);
    }

    /**
     * Sets the tiny memory indicator at the bottom of the screen
     * @param number
     */
    setMemoryNumber(number) {
        $("#memoryNumber").text(number);
    }

    /**
     * Adds a digit to the number shown on screen
     * @param {number} number
     */
    appendNumber(number) {
        $("#mainNumber").append(number);
    }

    /**
     * Returns the current number shown on screen
     * formatted as a float. If this fails, it returns a 0
     * @return {number}
     */
    getNumber() {
        let number = parseFloat($("#mainNumber").text());
        console.log(number);
        return isNaN(number) ? 0 : number;
    }

    /**
     * Display's the current operation
     * @param {string} operation
     */
    setOperation(operation) {
        $("#currentOperation").text(operation);
    }

    /**
     * Makes the main number screen empty
     */
    clearScreen() {
        this.setNumber("");
    }

    /**
     * Makes the current function display empty
     */
    clearFunction() {
        this.setOperation("");
    }

    /**
     * Makes the previous number display empty
     */
    clearPreviousNumber() {
        this.setPreviousNumber("");
    }

    /**
     * clears all available number displays
     */
    clearAll() {
        this.clearFunction();
        this.clearScreen();
        this.clearPreviousNumber();
    }

    /**
     * Display's the previous number
     * @param {number} operation
     */
    setPreviousNumber(number) {
        $("#previousNumber").text(number);
    }
}
