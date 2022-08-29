import React, { FC, forwardRef, useMemo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import styles from "../../styles/history/historyItem.module.scss";
import DateUtils from "../../utils/date";

const BgColours = {
	Appointment: `${styles.type} ${styles.bgBlue}`,
	Observation: `${styles.type} ${styles.bgBrightBlue}`,
	Condition: `${styles.type} ${styles.bgYellow}`,
	AllergyIntolerance: `${styles.type} ${styles.bgRed}`,
	Diagnosis: `${styles.type} ${styles.bgOrange}`,
	CarePlan: `${styles.type} ${styles.bgViolet}`,
	MedicationStatement: `${styles.type} ${styles.bgGreen}`,
};

type HistoryItemProps = {
	id: string;
	name: string | null;
	date: string;
	resource: string;
};

const HistoryItem = forwardRef<HTMLTableRowElement, HistoryItemProps>(
	({ id, name, date, resource }, ref) => {
		const eventsDetail = useSelector(
			(state: RootState) => state.resources.items
		);

		const detail = useMemo(() => {
			if (!eventsDetail) return;
			const index = eventsDetail.findIndex(
				(value) => value.id === `${resource}/${id}`
			);
			return eventsDetail[index];
		}, [eventsDetail]);

		return (
			<tr
				ref={ref}
				className={`${styles.tr} ${name ? styles.borderTop : null}`}
			>
				<td>
					{name ? (
						<div className={BgColours[name as keyof typeof BgColours]}>
							{name}
						</div>
					) : null}
				</td>
				<td>
					{detail && detail.details}
					{detail && detail.values && detail.values.length > 0
						? `: ${detail.values.join(", ")}`
						: null}
				</td>
				<td>{detail && detail.code}</td>
				<td className={name ? "" : styles.greyDate}>
					{DateUtils.formatDate(new Date(date))}
				</td>
			</tr>
		);
	}
);

export default HistoryItem;
