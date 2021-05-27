import {
  compareDerivatives,
  derivativeOf,
  compareCalculations,
  calculate,
  integralOf,
  compareIntegrals
} from "../util/math";

import { showMessage } from "react-native-flash-message";

export const damageHealth = (health, setHealth, damage, setGameOver, isP1) => {
  const newHealth = health - Math.abs(damage);
  setHealth(newHealth);
  if (newHealth <= 0) {
    alert(isP1 ? "You Lost..." : "You Won!");
    setGameOver(true);
  }
};

export const checkAnswer = (
  type,
  num,
  funcP2,
  setFuncP2,
  funcP1,
  setFuncP1,
  healthP1,
  setHealthP1,
  healthP2,
  setHealthP2,
  isAwaitingInput,
  setIsAwaitingInput,
  isRolling,
  setIsRolling,
  setGameOver,
  answer
) => {
  switch (type) {
    case 1:
      if (compareDerivatives(answer, funcP2) == true) {
        const newFunc = derivativeOf(funcP2);
        if (newFunc == "0") {
          alert("You won by deriving the enemy!");
          setGameOver(true);
        }
        setFuncP2(newFunc);
        showMessage({
          message: "Correct Derivative!",
          backgroundColor: "#5a70e0"
        });
      } else {
        const newFunc = derivativeOf(funcP1);
        if (newFunc == "0") {
          alert("You lost by deriving incorrectly!");
          setGameOver(true);
        }
        setFuncP1(newFunc);
        showMessage({
          message: "Incorrect Derivative!",
          backgroundColor: "#a93331"
        });
        if (funcP1 == "0") {
          alert("You lost by deriving!");
          setGameOver(true);
        }
      }
      break;
    case 2:
      if (compareIntegrals(answer, funcP1) == true) {
        setFuncP1(integralOf(funcP1));
        showMessage({
          message: "Correct Integral!",
          backgroundColor: "#5a70e0"
        });
      } else {
        setFuncP2(integralOf(funcP2));
        showMessage({
          message: "Incorrect Integral!",
          backgroundColor: "#a93331"
        });
      }
      break;
    default:
      console.log("\n Correct Calc: ", calculate(funcP1, num));
      if (compareCalculations(answer, funcP1, num) == true) {
        damageHealth(
          healthP2,
          setHealthP2,
          calculate(funcP1, num),
          setGameOver,
          false
        );
        showMessage({
          message: "Correct Calculation!",
          backgroundColor: "#5a70e0"
        });
      } else {
        damageHealth(
          healthP1,
          setHealthP1,
          calculate(funcP1, num),
          setGameOver,
          true
        );
        showMessage({
          message: "Incorrect Calculation!",
          backgroundColor: "#a93331"
        });
      }
      break;
  }
  //REROLL DICE
  setIsAwaitingInput(true);
  setIsRolling(true);
};
