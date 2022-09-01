import React, { FC } from "react";
import styles from "../../styles/history/historyHeader.module.scss";

type HistoryHeaderProps = {
	isMobile: boolean;
};

const HistoryHeader: FC<HistoryHeaderProps> = ({ isMobile }) => {
	if (isMobile) return null;

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
