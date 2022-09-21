/**
 * It will resolve promise after given time(in ms)
 * @param {number} time
 */
export function delayForGivenTime(time) {
	return new Promise((res, rej) => {
		setTimeout(() => {
			res(24);
		}, time);
	});
}
