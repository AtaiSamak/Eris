import React, { FC, ReactNode } from "react";
import styles from "../../styles/history/historyItem.module.scss";
import { BgColours } from "../../constants/history";
import DateUtils from "../../utils/date";

type HistoryItemMobileTemplateProps = {
	name: string | null;
	date: string;
	detail: ReactNode;
	code: string | null | undefined;
};

const HistoryItemDesktopTemplate: FC<HistoryItemMobileTemplateProps> = ({
	name,
	date,
	detail,
	code,
}) => {
	return (
		<tr className={`${styles.tr} ${name ? styles.borderTop : null}`}>
			<td>
				{name ? (
					<div className={BgColours[name as keyof typeof BgColours]}>
						{name}
					</div>
				) : null}
			</td>
			<td>
				<div className={styles.onlyThreeLine}>{detail}</div>
			</td>
			<td>{code}</td>
			<td className={`${styles.noTextWrap} ${name ? "" : styles.greyDate}`}>
				{DateUtils.formatDate(new Date(date))}
			</td>
		</tr>
	);
};

export default HistoryItemDesktopTemplate;
