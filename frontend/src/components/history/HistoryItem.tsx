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
	resourceID: string;
};

const HistoryItem: FC<HistoryItemProps> = ({ id, name, date, resourceID }) => {
	const { items: resources } = useSelector(
		(state: RootState) => state.resources
	);

	const resourceDetails = useMemo(() => {
		if (!resources) return;
		const index = resources.findIndex((value) => value.id === resourceID);
		if (index === -1) return null;
		return resources[index];
	}, [resources]);

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
				<div className={styles.onlyThreeLine}>
					{resourceDetails && resourceDetails.details}
					{resourceDetails &&
					resourceDetails.values &&
					resourceDetails.values.length > 0
						? `: ${resourceDetails.values.join(", ")}`
						: null}
				</div>
			</td>
			<td>{resourceDetails && resourceDetails.code}</td>
			<td className={`${styles.noTextWrap} ${name ? "" : styles.greyDate}`}>
				{DateUtils.formatDate(new Date(date))}
			</td>
		</tr>
	);
};

export default HistoryItem;
