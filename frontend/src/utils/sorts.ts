import { Event } from "../types/history";

export default class Sort {
	private static byDate(items: Event[]) {
		return items.sort(
			(a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
		);
	}

	private static byName(items: Event[]) {
		return items.sort((a, b) => a.name.localeCompare(b.name));
	}

	static byDateAndName(items: Event[]) {
		const sortedByDate = Sort.byDate(items);
		return sortedByDate;
	}
}
