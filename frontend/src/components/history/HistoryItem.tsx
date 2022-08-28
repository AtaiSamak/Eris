import React, { FC, useMemo } from "react";
import { useSelector } from "react-redux";
import { rootState } from "../../store/store";
import styles from "../../styles/history/historyItem.module.scss";
import DateUtils from "../../utils/date";

type HistoryItemProps = {
	id: string;
	name: string | null;
	date: string;
	resource: string;
};

const HistoryItem: FC<HistoryItemProps> = ({ id, name, date, resource }) => {
	const eventsDetail = useSelector((state: rootState) => state.resources.items);

	const detail = useMemo(() => {
		if (!eventsDetail) return;
		const index = eventsDetail.findIndex(
			(value) => value.id === `${resource}/${id}`
		);
		return eventsDetail[index];
	}, [eventsDetail]);

	return (
		<tr className={`${styles.tr} ${name ? styles.borderTop : null}`}>
			<td>{name ? <div className={styles.type}>{name}</div> : null}</td>
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
};

export default HistoryItem;
