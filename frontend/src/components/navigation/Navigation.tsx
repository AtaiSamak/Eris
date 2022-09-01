import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "../../styles/navigation/navigation.module.scss";
import Path from "../../constants/path";
import { useDispatch } from "react-redux";
import { rootActions } from "../../store/rootReducer";

const Navigation = () => {
	const { pathname } = useLocation();
	const dispatch = useDispatch();

	useEffect(() => {
		if (pathname !== Path.HISTORY) dispatch(rootActions.reset());
	}, [pathname]);

	return (
		<div className={styles.wrapper}>
			<nav>
				<ul className={styles.list}>
					<li>
						<Link
							to={Path.HOME}
							className={`${styles.link} ${
								pathname === Path.HOME ? styles.activeLink : ""
							}`}
						>
							Home
						</Link>
					</li>
					<li>
						<Link
							to={Path.HISTORY}
							className={`${styles.link} ${
								pathname === Path.HISTORY ? styles.activeLink : ""
							}`}
						>
							History
						</Link>
					</li>
				</ul>
			</nav>
		</div>
	);
};

export default Navigation;
