import React from "react";
import styles from "../../styles/history/historyHeader.module.scss";

const HistoryHeader = () => {
	return (
		<thead>
			<tr className={styles.tr}>
				<th>Event type</th>
				<th>Details</th>
				<th>Code</th>
				<th>Date</th>
			</tr>
		</thead>
	);
};

export default HistoryHeader;
