import React from "react";
import styles from "../../styles/app/app.module.scss";
import History from "../history/History";

const App = () => (
	<div className={styles.container}>
		<div className={styles.app}>
			<History />
		</div>
	</div>
);

export default App;
