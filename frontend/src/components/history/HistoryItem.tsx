import React, { FC, forwardRef, useMemo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import styles from "../../styles/history/historyItem.module.scss";
import DateUtils from "../../utils/date";
import Spinner from "../common/Spinner";
import { BgColours } from "../../constants/history";

type HistoryItemProps = {
	id: string;
	name: string | null;
	date: string;
	resource: string;
};

const HistoryItem = forwardRef<HTMLTableRowElement, HistoryItemProps>(
	({ id, name, date, resource }, ref) => {
		const { items: eventsDetail } = useSelector(
			(state: RootState) => state.resources
		);

		const detail = useMemo(() => {
			if (!eventsDetail) return;
			const index = eventsDetail.findIndex(
				(value) => value.id === `${resource}/${id}`
			);
			if (index === -1) return null;
			return eventsDetail[index];
		}, [eventsDetail]);

		return (
			<tr
				ref={ref}
				className={`${styles.tr} ${name ? styles.borderTop : null}`}
			>
				<td>
					{name ? (
						<div className={BgColours[name as keyof typeof BgColours]}>
							{name}
						</div>
					) : null}
				</td>
				<td>
					<div className={styles.onlyThreeLine}>
						{!detail ? <Spinner /> : null}
						{detail && detail.details}
						{detail && detail.values && detail.values.length > 0
							? `: ${detail.values.join(", ")}`
							: null}
					</div>
				</td>
				<td>{detail && detail.code}</td>
				<td className={`${styles.noTextWrap} ${name ? "" : styles.greyDate}`}>
					{DateUtils.formatDate(new Date(date))}
				</td>
			</tr>
		);
	}
);

export default HistoryItem;
