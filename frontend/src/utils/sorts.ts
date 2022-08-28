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
		const result = [];
		for (let start = 0, end = 0; end < sortedByDate.length; end++) {
			if (
				new Date(sortedByDate[start].date).toDateString() !==
				new Date(sortedByDate[end].date).toDateString()
			) {
				result.push(...Sort.byName(sortedByDate.slice(start, end)));
				start = end;
			}
		}
		return result;
	}
}
