import React, { FC } from "react";
import styles from "../../styles/history/historyColumns.module.scss";

type HistoryColumnsProps = {
	isMobile: boolean;
};

const HistoryColumns: FC<HistoryColumnsProps> = ({ isMobile }) => {
	if (isMobile)
		return (
			<colgroup>
				<col className={styles.mobileColumnOne}></col>
				<col className={styles.mobileColumnTwo}></col>
			</colgroup>
		);

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
