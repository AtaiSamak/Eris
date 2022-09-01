import { RefObject, useEffect, useRef } from "react";

const useScroll = (childRef: RefObject<Element>, callback: () => void) => {
	const observer = useRef<IntersectionObserver>();

	useEffect(() => {
		if (!childRef.current) return;

		const options = {
			root: document.querySelector("#scrollArea"),
			rootMargin: "0px",
			threshold: 0.5,
		};
		observer.current = new IntersectionObserver(([target]) => {
			if (target.isIntersecting) {
				console.log("intersected");
				callback();
			}
		}, options);

		observer.current.observe(childRef.current);

		return function () {
			if (observer.current) observer.current.disconnect();
		};
	}, [callback]);
};

export default useScroll;
