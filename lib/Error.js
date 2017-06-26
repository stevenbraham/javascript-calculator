/**
 * Created by stevenbraham on 26-06-17.
 */

/**
 * Functions related to showing error
 */
class Error {

    /**
     * Throws an exception and displays an alert
     * @param {string} message
     */
    throwError(message) {
        alert(message);
        throw message;
    }

    /**
     * I use this function to reduce the amount of boilerplate code
     * @param {string} functionType
     */
    throwUnsupportedError(functionType) {
        return this.throwError(`${functionType} is an unsupported operation`);
    }


}