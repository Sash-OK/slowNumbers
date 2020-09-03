declare module "src/slow-numbers/slow-numbers" {
    export interface SlowNumbersOptions {
        slowSpeed: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
        format: boolean;
    }
    export class SlowNumbers {
        selector: string;
        currentValue: number;
        options: Partial<SlowNumbersOptions>;
        private readonly $element;
        private timer;
        private stopped;
        constructor(selector: string, currentValue?: number, options?: Partial<SlowNumbersOptions>);
        stopChange(): void;
        changeTo(endValue: number, options?: Partial<SlowNumbersOptions>): void;
        private updateElementValue;
    }
}
declare module "index" { }
