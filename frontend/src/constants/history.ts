import styles from "../styles/history/historyItemColours.module.scss";

export const BgColours = {
	Appointment: `${styles.box} ${styles.bgBlue}`,
	Observation: `${styles.box} ${styles.bgBrightBlue}`,
	Condition: `${styles.box} ${styles.bgYellow}`,
	AllergyIntolerance: `${styles.box} ${styles.bgRed}`,
	Diagnosis: `${styles.box} ${styles.bgOrange}`,
	CarePlan: `${styles.box} ${styles.bgViolet}`,
	MedicationStatement: `${styles.box} ${styles.bgGreen}`,
	Procedure: `${styles.box} ${styles.bgMagenta}`,
	Immunization: `${styles.box} ${styles.bgLemon}`,
};
