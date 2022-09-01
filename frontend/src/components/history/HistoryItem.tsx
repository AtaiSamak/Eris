import React, { FC, useMemo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/rootStore";
import HistoryItemDesktopTemplate from "./HistoryItemDesktopTemplate";
import HistoryItemMobileTemplate from "./HistoryItemMobileTemplate";

type HistoryItemProps = {
	name: string | null;
	date: string;
	resourceID: string;
	isMobile: boolean;
};

const HistoryItem: FC<HistoryItemProps> = ({
	name,
	date,
	resourceID,
	isMobile,
}) => {
	const { items: resources } = useSelector(
		(state: RootState) => state.resources
	);

	const resourceDetails = useMemo(() => {
		if (!resources) return null;
		const index = resources.findIndex((value) => value.id === resourceID);
		if (index === -1) return null;
		return resources[index];
	}, [resources]);

	const detail = (
		<>
			{resourceDetails && resourceDetails.details}
			{resourceDetails &&
			resourceDetails.values &&
			resourceDetails.values.length > 0
				? `: ${resourceDetails.values.join(", ")}`
				: null}
		</>
	);

	if (isMobile) {
		return (
			<HistoryItemMobileTemplate
				name={name}
				detail={detail}
				code={resourceDetails && resourceDetails.code}
				date={date}
			/>
		);
	}

	return (
		<HistoryItemDesktopTemplate
			detail={detail}
			name={name}
			date={date}
			code={resourceDetails && resourceDetails.code}
		/>
	);
};

export default HistoryItem;
