import React, { useEffect, useMemo, useRef } from "react";
import HistoryHeader from "./HistoryHeader";
import styles from "../../styles/history/history.module.scss";
import HistoryItem from "./HistoryItem";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { historyEventsActions } from "../../store/history/historyEventsSlice";
import { Event } from "../../types/history";
import { historyResourcesActions } from "../../store/history/historyResourcesSlice";
import useScroll from "../../hooks/useScroll";
import HistoryColumns from "./HistoryColumns";
import Spinner from "../common/Spinner";

const History = () => {
	const dispatch = useDispatch();
	const { items: events } = useSelector((store: RootState) => store.events);
	const gapEnd = useSelector((store: RootState) => store.resources.itemsGap[1]);
	const footerElementRef = useRef<HTMLDivElement>(null);

	useScroll(footerElementRef, () => {
		dispatch(historyResourcesActions.fetchResources());
	});

	useEffect(() => {
		dispatch(historyEventsActions.fetchEvents());
	}, []);

	const viewItems = useMemo(
		() =>
			events &&
			events.map(({ id, name, date, resource }: Event, index, array) =>
				index < gapEnd ? (
					<HistoryItem
						id={id}
						key={id}
						name={
							index === 0 || (index > 0 && array[index - 1].name !== name)
								? name
								: null
						}
						date={date}
						resourceID={`${resource}/${id}`}
					/>
				) : null
			),
		[gapEnd]
	);

	return (
		<>
			<table className={styles.table}>
				<HistoryColumns />
				<HistoryHeader />
				<tbody>{viewItems}</tbody>
			</table>
			{events && gapEnd < events?.length ? (
				<div className={styles.spinnerWrapper} ref={footerElementRef}>
					<Spinner />
				</div>
			) : null}
		</>
	);
};

export default History;
