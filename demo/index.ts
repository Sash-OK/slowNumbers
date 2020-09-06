import { SlowNumbers } from '../src/slow-numbers/slow-numbers';

window.onload = function () {
	const exampleInput1: HTMLInputElement = document.querySelector('.js-example-1');
	const exampleInput2: HTMLInputElement = document.querySelector('.js-example-2');
	const exampleInput3: HTMLInputElement = document.querySelector('.js-example-3');
	const speedSelect1: HTMLSelectElement = document.querySelector('.js-speed-1');
	const speedSelect2: HTMLSelectElement = document.querySelector('.js-speed-2');
	const speedSelect3: HTMLSelectElement = document.querySelector('.js-speed-3');
	const stopExample1: HTMLElement = document.querySelector('.js-stop-1');
	const stopExample2: HTMLElement = document.querySelector('.js-stop-2');
	const startBtn1: HTMLElement = document.querySelector('.js-start-1');
	const example1 = new SlowNumbers('.js-result-1', 5500, {
		format: true,
		speed: Number(speedSelect1.value),
	});
	const example2 = new SlowNumbers('.js-result-2', 0, {
		format: true,
		speed: Number(speedSelect2.value),
	});
	const example3 = new SlowNumbers('.js-result-3', 5500, {
		format: true,
		speed: Number(speedSelect3.value),
	});
	
	exampleInput1.onchange = (event) => {
		example1.changeTo(Number((event.target as HTMLInputElement).value), {
			speed: Number(speedSelect1.value),
		});
	};
	
	exampleInput2.onkeyup = (event) => {
		example2.changeTo(Number((event.target as HTMLInputElement).value), {
			speed: Number(speedSelect2.value),
		});
	};
	
	exampleInput3.onchange = (event) => {
		console.log((event.target as HTMLInputElement).value, (event.target as HTMLInputElement).checked);
		if ((event.target as HTMLInputElement).checked) {
			example3.add(Number((event.target as HTMLInputElement).value), {
				speed: Number(speedSelect3.value),
			});
		} else {
			example3.subtract(Number((event.target as HTMLInputElement).value), {
				speed: Number(speedSelect3.value),
			});
		}
	};
	
	stopExample1.onclick = () => {
		example1.stopChange();
	};
	
	stopExample2.onclick = () => {
		example2.stopChange();
	};
	
	startBtn1.onclick = () => {
		example1.changeTo(Number(exampleInput1.value), {
			speed: Number(speedSelect1.value),
		});
	};
}
