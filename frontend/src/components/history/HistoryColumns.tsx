import React from "react";
import styles from "../../styles/history/historyColumns.module.scss";

const HistoryColumns = () => {
	return (
		<colgroup>
			<col className={styles.columnOne} />
			<col className={styles.columnTwo} />
			<col className={styles.columnThree} />
			<col className={styles.columnFour} />
		</colgroup>
	);
};

export default HistoryColumns;
