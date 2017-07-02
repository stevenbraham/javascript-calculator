/**
 * Created by stevenbraham on 23-05-17.
 */

/**
 * The class does everything
 */
class Memory {

    constructor() {
        //on initialization, first check if a number is set in the local storage
        //localStorage can only store strings, so I also cast to a float
        let numberFromStorage = parseFloat(localStorage.getItem("memoryNumber"));
        //if the localStorage has no valid number, default to 0
        this.setNumber(isNaN(numberFromStorage) ? 0 : numberFromStorage);
    }

    /**
     * Stores the number in memory
     * @param {number} number
     * @return {number} memory number after storing
     */
    setNumber(number) {
        this.number = number;
        localStorage.setItem("memoryNumber", number);
        return this.number;
    }

    /**
     * @param {number}
     * @return {number} memory number after mutation
     */
    addNumber(number) {
        //this.number gets updated with the new number and returns itself
        return this.setNumber(this.number += number);
    }

    /**
     * @param {number}
     * @return {number} memory number after mutation
     */
    subtractNumber(number) {
        //this.number gets updated with the new number and returns itself
        return this.setNumber(this.number -= number);
    }

    /**
     * Sets the memory number to 0 and returns the current number
     * @return {number} memory number after mutation
     */
    reset() {
        return this.setNumber(0);
    }
}