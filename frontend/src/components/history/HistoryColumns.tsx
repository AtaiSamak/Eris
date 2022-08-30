import React from "react";
import styles from "../../styles/history/historyColumns.module.scss";

const HistoryColumns = () => {
	return (
		<>
			<col className={styles.columnOne} />
			<col className={styles.columnTwo} />
			<col className={styles.columnThree} />
			<col className={styles.columnFour} />
		</>
	);
};

export default HistoryColumns;
