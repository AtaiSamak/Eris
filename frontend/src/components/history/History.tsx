import React, { useEffect, useMemo, useRef } from "react";
import HistoryHeader from "./HistoryHeader";
import styles from "../../styles/history/history.module.scss";
import HistoryItem from "./HistoryItem";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/rootStore";
import { historyEventsActions } from "../../store/history/historyEventsSlice";
import { Event } from "../../types/history";
import { historyResourcesActions } from "../../store/history/historyResourcesSlice";
import useScroll from "../../hooks/useScroll";
import HistoryColumns from "./HistoryColumns";
import Spinner from "../common/Spinner";
import useMobile from "../../hooks/useMobile";

const NoticesUI = {
	Error: () => <div className={styles.error}>Something goes wrong</div>,
	Loading: () => (
		<div className={styles.spinnerWrapper}>
			<Spinner />
		</div>
	),
};

const History = () => {
	const dispatch = useDispatch();
	const {
		items: events,
		error,
		fetching,
	} = useSelector((store: RootState) => store.events);
	const gapEnd = useSelector((store: RootState) => store.resources.itemsGap[1]);
	const footerElementRef = useRef<HTMLDivElement>(null);
	const isMobile = useMobile();

	useScroll(footerElementRef, () => {
		dispatch(historyResourcesActions.fetchResources());
	});

	useEffect(() => {
		dispatch(historyEventsActions.fetchEvents());
	}, []);

	const viewItems = useMemo(
		() =>
			events &&
			events
				.slice(0, gapEnd)
				.map(({ id, name, date, resource }: Event, index, array) => (
					<HistoryItem
						key={id}
						name={
							index === 0 || (index > 0 && array[index - 1].name !== name)
								? name
								: null
						}
						date={date}
						resourceID={`${resource}/${id}`}
						isMobile={isMobile}
					/>
				)),
		[gapEnd, isMobile]
	);

	if (fetching || error) {
		return error ? NoticesUI.Error() : NoticesUI.Loading();
	}

	return (
		<>
			<table className={styles.table}>
				<HistoryColumns isMobile={isMobile} />
				<HistoryHeader isMobile={isMobile} />
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
