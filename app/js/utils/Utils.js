export default class Utils {
    static randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    static sleep(ms) {
        return new Promise((res) => setTimeout(res, ms));
    }

    static toTwoDec(num) {
        return Math.max(parseFloat(num.toFixed(2)), 0.1);
    }

	static shuffle(array) {
		let currentIndex = array.length, randomIndex;
	
		while (currentIndex !== 0) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex--;
	
		[array[currentIndex], array[randomIndex]] = [
			array[randomIndex], array[currentIndex]];
		}
	
		return array;
	}
}
