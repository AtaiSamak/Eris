import { Event } from "../types/history";

export default class Group {
	static byAppointmentID(items: Event[]) {
		const IDs: string[] = [];
		const groupedItems: Event[][] = [];

		items.forEach((item) => {
			if (!item.appointmentId) return;
			const ID = IDs.findIndex((id) => id === item.appointmentId);
			if (ID > -1) groupedItems[ID].push(item);
			else {
				IDs.push(item.appointmentId);
				groupedItems[IDs.length - 1] = [item];
			}
		});

		return groupedItems;
	}
}
