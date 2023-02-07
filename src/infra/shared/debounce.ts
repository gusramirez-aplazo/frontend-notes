// eslint-disable-next-line @typescript-eslint/ban-types
export const debounce = (fn: (s: any) => void | any, delay: number) => {
	let timer: number;
	return (...args: any[]) => {
		clearTimeout(timer);
		// @ts-expect-error: This is a valid use case for the returned value
		timer = setTimeout(() => {
			// @ts-expect-error: This is a valid use case for the returned value
			fn(...args);
		}, delay);
	};
};
