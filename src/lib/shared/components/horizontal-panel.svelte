<script lang="ts">
	let resizer: HTMLDivElement;
	let leftPanel: HTMLDivElement;
	let rightPanel: HTMLDivElement;

	let leftWidth = 0;
	let x = 0;
	let y = 0;

	let hasTouchScreen = false;

	function onPointerDown(event: any) {
		if ('maxTouchPoints' in navigator) {
			hasTouchScreen = navigator.maxTouchPoints > 0;
		} else {
			const mQ = matchMedia?.('(pointer:coarse)');
			if (mQ?.media === '(pointer:coarse)') {
				hasTouchScreen = !!mQ.matches;
			} else if ('orientation' in window) {
				hasTouchScreen = true; // deprecated, but good fallback
			} else {
				// Only as a last resort, fall back to user agent sniffing
				const UA = globalThis.navigator.userAgent;
				hasTouchScreen =
					/\b(BlackBerry|webOS|iPhone|IEMobile)\b/i.test(UA) ||
					/\b(Android|Windows Phone|iPad|iPod)\b/i.test(UA);
			}
		}

		if (hasTouchScreen) {
			document.addEventListener('touchmove', onPointerMove);
			document.addEventListener('touchend', onPointerUp);
			x = event.touches[0].clientX;
			y = event.touches[0].clientY;
		} else {
			x = event.clientX;
			y = event.clientY;
			document.addEventListener('mousemove', onPointerMove);
			document.addEventListener('mouseup', onPointerUp);
		}
		leftWidth = leftPanel.getBoundingClientRect().width;
	}

	function onPointerMove(event: any) {
		if (!resizer.parentElement) {
			return;
		}
		resizer.style.cursor = 'col-resize';
		resizer.parentElement.style.cursor = 'col-resize';
		resizer.style.userSelect = 'none';

		leftPanel.style.userSelect = 'none';
		rightPanel.style.userSelect = 'none';
		leftPanel.style.pointerEvents = 'none';
		rightPanel.style.pointerEvents = 'none';

		let deltaX = 0;
		if (hasTouchScreen) {
			deltaX = event.touches[0].clientX - x;
		} else {
			deltaX = event.clientX - x;
		}
		const newLeftWidth =
			((leftWidth + deltaX) * 100) /
			resizer.parentElement.getBoundingClientRect().width;

		leftPanel.style.width = `${
			newLeftWidth <= 20 ? 20 : newLeftWidth >= 80 ? 80 : newLeftWidth
		}%`;
	}

	function onPointerUp() {
		resizer.style.removeProperty('cursor');
		resizer.parentElement?.style.removeProperty('cursor');
		resizer.style.removeProperty('user-select');

		leftPanel.style.removeProperty('user-select');
		rightPanel.style.removeProperty('user-select');
		leftPanel.style.removeProperty('pointer-events');
		rightPanel.style.removeProperty('pointer-events');

		if (hasTouchScreen) {
			document.removeEventListener('touchmove', onPointerMove);
			document.removeEventListener('touchend', onPointerUp);
		} else {
			document.removeEventListener('mousemove', onPointerMove);
			document.removeEventListener('mouseup', onPointerUp);
		}
	}
</script>

<article class="container flex w-full">
	<div class="panel-left w-28" bind:this={leftPanel}>
		<slot name="left" />
	</div>

	<div
		class="
		resizer mx-1 relative w-0.5 h-full bg-slate-800 dark:bg-slate-50"
		bind:this={resizer}
		on:mousedown={onPointerDown}
		on:touchstart={onPointerDown}
	/>

	<div class="panel-rigth flex-1" bind:this={rightPanel}>
		<slot name="right" />
	</div>
</article>

<style>
	.resizer:hover::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(144, 240, 19, 0.9);
		cursor: ew-resize;
	}
</style>
