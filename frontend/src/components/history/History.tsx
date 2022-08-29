import React, {
	Fragment,
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react";
import HistoryHeader from "./HistoryHeader";
import styles from "../../styles/history/history.module.scss";
import HistoryItem from "./HistoryItem";
import { useDispatch, useSelector } from "react-redux";
import store, { RootState } from "../../store/store";
import { historyEventsActions } from "../../store/history/historyEventsSlice";
import { Event } from "../../types/history";
import { historyResourcesActions } from "../../store/history/historyResourcesSlice";
import useScroll from "../../hooks/useScroll";

const History = () => {
	const { items } = useSelector((store: RootState) => store.events);
	const dispatch = useDispatch();
	const observeRowID = useSelector(
		(store: RootState) => store.resources.itemsInterval[1]
	);
	const tableRowRef = useRef<HTMLTableRowElement>(null);

	useScroll(tableRowRef, () => {
		dispatch(historyResourcesActions.fetchResources());
	});

	useEffect(() => {
		dispatch(historyEventsActions.fetchEvents());
	}, []);

	const viewItems = useMemo(() => {
		if (items === null) return null;
		return items.map(({ id, name, date, resource }: Event, index, array) => {
			return (
				<HistoryItem
					id={id}
					name={
						index === 0 || (index > 0 && array[index - 1].name !== name)
							? name
							: null
					}
					date={date}
					resource={resource}
					ref={index === observeRowID ? tableRowRef : null}
					key={id}
				/>
			);
		});
	}, [items, observeRowID]);

	return (
		<table className={styles.table}>
			<HistoryHeader />
			<tbody>{viewItems}</tbody>
		</table>
	);
};

export default History;
