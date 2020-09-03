import { SlowNumbers } from '../src/slow-numbers/slow-numbers';

window.onload = function () {
	const input1: HTMLElement = document.querySelector('.js-example-2');
	const stopBtn1: HTMLElement = document.querySelector('.js-stop-2');
	const numbers = new SlowNumbers('.js-result-2', 5500, {
		format: true,
		slowSpeed: 1,
	});

	input1.onchange = (ev) => {
		numbers.changeTo(Number((ev.target as HTMLInputElement).value));
	};
	
	stopBtn1.onclick = () => {
		numbers.stopChange();
	};
}
