import { Event } from "../types/history";
import Group from "./group";

class Utils {
	static getWithoutAppointmentID = (items: Event[]) =>
		items.filter((item) => !item.appointmentId);
	static getWithAppointmentID = (items: Event[]) =>
		items.filter((item) => item.appointmentId);
	static getCombinedAppointmentsAndEvents = (
		appointments: Event[],
		groupedEvents: Event[][]
	) => {
		const result: Event[] = [];

		appointments.forEach((appointment) => {
			const appropriateGroupID = groupedEvents.findIndex(
				(group) => group[0].appointmentId === appointment.id
			);
			result.push(appointment);
			if (appropriateGroupID == -1) return;
			result.push(...groupedEvents[appropriateGroupID]);
		});

		return result;
	};
}

export default class Sort {
	private static byDate(items: Event[]) {
		return items.sort(
			(a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
		);
	}

	static byAppointments(items: Event[]) {
		const appointments = Sort.byDate(Utils.getWithoutAppointmentID(items));
		const events = Utils.getWithAppointmentID(items);
		const groupedEvents = Group.byAppointmentID(events).map((group) =>
			Sort.byDate(group)
		);
		return Utils.getCombinedAppointmentsAndEvents(appointments, groupedEvents);
	}
}
