export interface SlowNumbersOptions {
	speed: number;
	format: boolean;
}

function format(value: number) {
	return value.toString().replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ');
}

export class SlowNumbers {
	private readonly $element: HTMLElement;
	private timer: number;
	private stopped: boolean;
	
	constructor(
		public selector: string,
		public currentValue: number = 0,
		public options: Partial<SlowNumbersOptions> = {}
	) {
		this.$element = document.querySelector(selector);
		this.updateElementValue();
	}
	
	public stopChange() {
		clearTimeout(this.timer);
	}
	
	public changeTo(endValue: number, options: Partial<SlowNumbersOptions> = {}) {
		this.startChanging(endValue, options);
	}
	
	public add(value: number, options: Partial<SlowNumbersOptions> = {}) {
		this.startChanging(this.currentValue + value, options);
	}
	
	public subtract(value: number, options: Partial<SlowNumbersOptions> = {}) {
		this.startChanging(this.currentValue - value, options);
	}
	
	private startChanging(endValue, options: Partial<SlowNumbersOptions> = {}) {
		this.options = {
			...this.options,
			...options
		};
		
		clearTimeout(this.timer);
		
		let timeDelta = 0;
		let timeOut = 0;
		const slowSpeed = this.options.speed / 100 || 0.1;
		
		const insertValue = () => {
			this.updateElementValue();
			
			if (this.stopped) {
				clearTimeout(this.timer);
				this.stopped = false;
				
				return;
			}
			
			this.timer = setTimeout(() => {
				const diff = Math.abs(endValue - this.currentValue);
				const diffLength = diff.toString().length;
				let step = 0;
				
				if (diff !== 0) {
					timeDelta = Math.floor((1000 / diff) - timeOut);
					
					switch (diffLength) {
						case 1:
						case 2:
							step = 1;
							break;
						case 3:
							step = 11;
							break;
						case 4:
							step = 111;
							break;
						case 5:
							step = 1111;
							break;
						case 6:
							step = 11111;
							break;
						case 7:
							step = 111111;
							break;
						case 8:
							step = 1111111;
							break;
						case 9:
							step = 11111111;
							break;
						default:
							step = 111111111;
					}
					
					if (endValue > this.currentValue) {
						this.currentValue += step;
					} else {
						this.currentValue -= step;
					}
					
					timeOut += Math.floor(timeDelta * slowSpeed);
					
					insertValue();
				} else {
					clearTimeout(this.timer);
				}
			}, timeOut);
		};
		
		insertValue();
	}
	
	private updateElementValue() {
		this.$element.innerText = this.options.format ? format(this.currentValue) : this.currentValue.toString();
	}
}
