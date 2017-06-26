/**
 * Created by stevenbraham on 23-05-17.
 */

/**
 * The class does everything
 */
class Memory {

    constructor() {
        //on initialization, set the default number in the memory to 0
        this.number = 0;
    }

    /**
     * @param {number}
     * @return {number} memory number after mutation
     */
    addNumber(number) {
        //this.number gets updated with the new number and returns itself
        return this.number += number;
    }

    /**
     * @param {number}
     * @return {number} memory number after mutation
     */
    subtractNumber(number) {
        //this.number gets updated with the new number and returns itself
        return this.number -= number;
    }
}