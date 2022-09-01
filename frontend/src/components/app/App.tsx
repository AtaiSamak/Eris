import React from "react";
import { Route, Routes } from "react-router-dom";
import Path from "../../constants/path";
import styles from "../../styles/app/app.module.scss";
import History from "../history/History";
import Home from "../home";
import Navigation from "../navigation";

const App = () => (
	<div className={styles.container}>
		<div className={styles.app}>
			<header>
				<Navigation />
			</header>
			<main>
				<Routes>
					<Route index element={<Home />}></Route>
					<Route path={Path.HISTORY} element={<History />}></Route>
				</Routes>
			</main>
		</div>
	</div>
);

export default App;
