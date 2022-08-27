export default class DateUtils {
	static formatDate(date: Date) {
		const shortMonthName = new Intl.DateTimeFormat("en-US", { month: "short" })
			.format;
		return `${shortMonthName(date)} ${date.getDate()}, ${date.getFullYear()}`;
	}
}
