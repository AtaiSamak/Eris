import React, { useEffect, useMemo, useState } from "react";
import HistoryHeader from "./HistoryHeader";
import styles from "../../styles/history/history.module.scss";
import HistoryItem from "./HistoryItem";
import { useDispatch, useSelector } from "react-redux";
import { rootState } from "../../store/store";
import { historyEventsActions } from "../../store/history/historyEventsSlice";
import { Event } from "../../types/history";
import { historyResourcesActions } from "../../store/history/historyResourcesSlice";

const History = () => {
	const { items, fetching, error } = useSelector(
		(store: rootState) => store.events
	);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(historyEventsActions.fetchEvents());
	}, []);

	useEffect(() => {
		dispatch(historyResourcesActions.fetchResources());
	}, [items]);

	const viewItems = useMemo(() => {
		if (items === null) return null;
		return items.map(({ id, name, date, resource }: Event) => (
			<HistoryItem
				key={id}
				id={id}
				name={name}
				date={date}
				resource={resource}
			/>
		));
	}, [items]);

	return (
		<table className={styles.table}>
			<HistoryHeader />
			<tbody>{viewItems}</tbody>
		</table>
	);
};

// useEffect(() => {
// 	if (items === null) return;
// 	HistoryAPI.getResource([`${items[0].resource}/${items[0].id}`]).then(
// 		(response) => {
// 			console.log(response);
// 		}
// 	);
// }, [items]);

export default History;
