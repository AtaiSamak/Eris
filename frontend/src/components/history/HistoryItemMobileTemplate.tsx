import React, { FC, ReactNode } from "react";
import { BgColours } from "../../constants/history";
import DateUtils from "../../utils/date";
import styles from "../../styles/history/historyItem.module.scss";

type HistoryItemMobileTemplateProps = {
	name: string | null;
	detail: ReactNode;
	date: string;
	code: string | null | undefined;
};

const HistoryItemMobileTemplate: FC<HistoryItemMobileTemplateProps> = ({
	name,
	detail,
	date,
	code,
}) => {
	const appointmentName = () => {
		if (!name) return null;
		return (
			<tr className={`${styles.tr} ${styles.borderTop}`}>
				<td>
					<div className={BgColours[name as keyof typeof BgColours]}>
						{name}
					</div>
				</td>
				<td className={styles.textAlignEnd}>
					{DateUtils.formatDate(new Date(date))}
				</td>
			</tr>
		);
	};

	return (
		<>
			{appointmentName()}
			<tr className={styles.tr}>
				<td>
					<div className={styles.onlyThreeLine}>{detail}</div>
				</td>
				<td className={`${styles.noTextWrap} ${name ? "" : styles.greyDate}`}>
					{code}
				</td>
			</tr>
		</>
	);
};

export default HistoryItemMobileTemplate;
