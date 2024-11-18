import styles from "./app.module.css";
import { useState } from "react";

export const App = () => {
	const [operand1, setOperand1] = useState("");
	const [operator, setOperator] = useState("");
	const [operand2, setOperand2] = useState("");
	const [result, setResult] = useState("");

	const NUMS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

	const onButtonClick = (value) => {
		if (operator === "") {
			setOperand1((prevOperand) => prevOperand + value);
		} else {
			setOperand2((prevOperand) => prevOperand + value);
		}
	};

	const clearDisplay = () => {
		setOperand1("");
		setOperator("");
		setOperand2("");
		setResult("");
	};

	const getOperator = (value) => {
		if ((operand1 !== "" || result !== "") && operand2 === "") {
			setOperator(value);
		}

		if (result !== "") {
			setOperand1(result);
			setResult("");
		}
	};

	const getResult = () => {
		if (operand1 !== "" && operator !== "" && operand2 !== "") {
			const num1 = parseFloat(operand1);
			const num2 = parseFloat(operand2);

			let calculationResult;

			switch (operator) {
				case "+":
					calculationResult = num1 + num2;
					break;
				case "-":
					calculationResult = num1 - num2;
					break;
				default:
					calculationResult = "";
					break;
			}

			clearDisplay();
			setResult(calculationResult);
		}
	};

	return (
		<div className={styles.container}>
			<div className={styles["block-display"]}>
				<span className={styles["display-value"] + " " + (result !== "" ? styles["display-value_result"] : "")}>
					{result !== "" ? result : operand1 + operator + operand2}
				</span>
			</div>
			<div className={styles["block-buttons"]}>
				<div className={styles["block-numbers"]}>
					{NUMS.map((number) => {
						return (
							<button
								className={styles.number}
								key={number}
								onClick={() => {
									onButtonClick(number);
								}}
							>
								{number}
							</button>
						);
					})}
				</div>
				<div className={styles.actions}>
					<button
						className={styles["actions__button"]}
						onClick={() => {
							getOperator("+");
						}}
					>
						+
					</button>
					<button
						className={styles["actions__button"]}
						onClick={() => {
							getOperator("-");
						}}
					>
						-
					</button>
					<button className={styles["actions__button"]} onClick={getResult}>
						=
					</button>
					<button className={styles["actions__button"]} onClick={clearDisplay}>
						C
					</button>
				</div>
			</div>
		</div>
	);
};
