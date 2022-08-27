import React, { FC, useEffect, useState } from "react";
import styles from "../../styles/history/historyItem.module.scss";
import DateUtils from "../../utils/date";

type HistoryItemProps = {
	id: string;
	name: string;
	date: string;
	resource: string;
};

const HistoryItem: FC<HistoryItemProps> = ({ id, name, date, resource }) => {
	const [data, setData] = useState(null);

	// useEffect(() => {
	//
	// }, []);

	return (
		<tr className={`${styles.tr} ${styles.borderBottom}`}>
			<td>
				<div className={styles.type}>{name}</div>
			</td>
			<td></td>
			<td></td>
			<td>{DateUtils.formatDate(new Date(date))}</td>
		</tr>
	);
};

export default HistoryItem;
