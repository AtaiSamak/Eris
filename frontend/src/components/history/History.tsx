import React, { useEffect, useMemo, useState } from "react";
import HistoryHeader from "./HistoryHeader";
import styles from "../../styles/history/history.module.scss";
import HistoryItem from "./HistoryItem";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { historyEventsActions } from "../../store/history/historyEventsSlice";
import { Event } from "../../types/history";
import { historyResourcesActions } from "../../store/history/historyResourcesSlice";

const History = () => {
	const { items } = useSelector((store: RootState) => store.events);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(historyEventsActions.fetchEvents());
	}, []);

	useEffect(() => {
		if (!items) return;
		dispatch(historyResourcesActions.fetchResources());
	}, [items]);

	const viewItems = useMemo(() => {
		if (items === null) return null;
		return items.map(({ id, name, date, resource }: Event, index, array) => {
			return (
				<HistoryItem
					key={id}
					id={id}
					name={
						index === 0 || (index > 0 && array[index - 1].name !== name)
							? name
							: null
					}
					date={date}
					resource={resource}
				/>
			);
		});
	}, [items]);

	return (
		<table className={styles.table}>
			<HistoryHeader />
			<tbody>{viewItems}</tbody>
		</table>
	);
};

export default History;
