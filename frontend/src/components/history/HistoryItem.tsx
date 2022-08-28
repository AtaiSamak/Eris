import React, { FC, useEffect, useState } from "react";
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
	const [detail, setDetail] = useState<null | string>(null);
	const details = useSelector((state: rootState) => state.resources.items);

	useEffect(() => {
		const detailID = details.findIndex(
			(detail) => detail.id === `${resource}/${id}`
		);
		if (detailID > -1) {
			setDetail(details[detailID].details);
		}
	}, [details]);

	return (
		<tr className={`${styles.tr} ${name ? styles.borderTop : null}`}>
			<td>{name ? <div className={styles.type}>{name}</div> : null}</td>
			<td>{detail}</td>
			<td></td>
			<td>{DateUtils.formatDate(new Date(date))}</td>
		</tr>
	);
};

export default HistoryItem;
