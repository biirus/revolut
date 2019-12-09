/**
 * silly way to check is device mobile or not
 */
export default function isMobile() {
	if ("maxTouchPoints" in navigator) {
		return navigator.maxTouchPoints > 0;
	}

	return false;
}