export type Event = {
	appointmentId?: string;
	date: string;
	id: string;
	name: string;
	resource: string;
};

export type Resource = {
	id: string;
	details: string;
	values: [];
	code?: string;
};
