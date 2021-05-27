const extractXReg = /([?\+ | ?-]\s*)*([0-9]+|[0-9]+.[0-9]+)*x\^*([0-9]+)*/g;

const extractNumberReg = new RegExp("([?\\+ | ?-]\\s*)*(\\d+)", "g");

/**
 * Takes an expression written in such a way: (x^2 + 4x^4 - 12)
 * and looks for the derivative of it using additional functions such as:
 * 1. getPolynomialWithX(expression) {}
 * 2. derive()
 */

function derivativeOf(expression) {
  if (!expression.includes("x")) {
    return "0";
  }

  const derivative = derive(expression);

  return derivative;
}

function getPolynomialWithX(expression) {
  // USED FOR ALL THE EXPORTED FUNCTIONS

  cObj = { coef: [], c: 0 };
  pObj = { powers: [], p: 0 };
  sObj = { signs: [], s: 0 };

  var match;
  while ((match = extractXReg.exec(expression)) != null) {
    if (match[1] == null) {
      sObj.signs[sObj.s++] = "";
    } else sObj.signs[sObj.s++] = match[1];

    if (match[2] == null) {
      cObj.coef[cObj.c++] = 1;
    } else cObj.coef[cObj.c++] = match[2];

    if (match[3] == null) {
      pObj.powers[pObj.p++] = 1;
    } else pObj.powers[pObj.p++] = match[3];
  }

  return { cObj: cObj, pObj: pObj, sObj: sObj };
}

function derive(expression) {
  coefs = getPolynomialWithX(expression).cObj.coef;
  powers = getPolynomialWithX(expression).pObj.powers;
  signs = getPolynomialWithX(expression).sObj.signs;

  var derivedExpressionArray = [];

  for (let i = 0; i < coefs.length; i++) {
    var derivedPower = powers[i] - 1;
    var derivedCoef = coefs[i] * powers[i];

    switch (derivedPower) {
      case 0:
        derivedExpressionArray[i] = signs[i] + derivedCoef;
        break;
      case 1:
        if (derivedCoef == 1) {
          derivedExpressionArray[i] = signs[i] + "x";
        } else derivedExpressionArray[i] = signs[i] + derivedCoef + "x";
        break;
      default:
        derivedExpressionArray[i] =
          signs[i] + derivedCoef + "x^" + derivedPower;
    }
  }

  var derivedExpression = "";
  for (let i = 0; i < derivedExpressionArray.length; i++) {
    derivedExpression += derivedExpressionArray[i];
  }

  return derivedExpression.replace(/\s/g, "").replace(/^\+/m, "");
}

/**
 * Takes an expression written in such a way: (x^2 + 4x^4 - 12)
 * and looks for x's with a power and ordinary numbers through out two
 * separate functions: getPolynomialWithX and getNumbers
 */

function calculate(expression, value) {
  signsOfX = getPolynomialWithX(expression).sObj.signs; // passes no sign as ''
  coefsOfX = getPolynomialWithX(expression).cObj.coef;
  powersOfX = getPolynomialWithX(expression).pObj.powers;
  numbers = getNumbers(expression).nObj.numbers;
  signsOfNumbers = getNumbers(expression).sObj.signs; // passes no sign as ''

  var answer = 0;
  var unit = 0;
  for (let i = 0; i < coefsOfX.length; i++) {
    unit = Number(coefsOfX[i] * Math.pow(value, powersOfX[i]));
    if (signsOfX[i].toString().trim() == "+" || signsOfX[i] == "") {
      answer += unit;
    } else answer -= unit;
  }

  for (let i = 0; i < numbers.length; i++) {
    if (
      signsOfNumbers[i].toString().trim() == "+" ||
      signsOfNumbers[i].toString().trim() == ""
    ) {
      answer += Number(numbers[i].toString().trim());
    } else answer -= Number(numbers[i].toString().trim());
  }

  return answer.toString().replace(/\s/g, "");
}

function getNumbers(expression) {
  numbersInExpression = expression.replace(
    /([?\+ | ?-]\s*)*(\d+|[0-9]+.[0-9]+)*x\^*(\d+)*/g,
    ""
  );

  sObj = { signs: [], s: 0 };
  nObj = { numbers: [], n: 0 };

  var match;

  while ((match = extractNumberReg.exec(numbersInExpression)) != null) {
    if (match[1] == null) {
      sObj.signs[sObj.s++] = "";
    } else sObj.signs[sObj.s++] = match[1];

    nObj.numbers[nObj.n++] = match[2];
  }

  return { sObj: sObj, nObj: nObj };
}

function integralOf(expression) {
  coefsOfX = getPolynomialWithX(expression).cObj.coef;
  powersOfX = getPolynomialWithX(expression).pObj.powers;
  signsOfX = getPolynomialWithX(expression).sObj.signs; // passes no sign as ''
  numbers = getNumbers(expression).nObj.numbers;
  signsOfNumbers = getNumbers(expression).sObj.signs; // passes no sign as ''

  // WORKING ON X's
  var integratedExpression = "";
  var integratedPower;
  var integratedUnit;
  for (let i = 0; i < powersOfX.length; i++) {
    integratedPower = Number(powersOfX[i]) + 1;
    var integratedCoef = Number((coefsOfX[i] / integratedPower).toFixed(2));
    if (integratedCoef == 1) {
      integratedCoef = "";
    }
    integratedUnit = signsOfX[i] + integratedCoef + "x^" + integratedPower;
    integratedExpression += integratedUnit;
  }

  var answer = integratedExpression;
  // WORKING ON NUMBERS

  for (let i = 0; i < numbers.length; i++) {
    var integralOfConst = signsOfNumbers[i] + numbers[i] + "x";
    answer += integralOfConst;
  }

  return answer.toString().replace(/\s/g, "");
}

function compareDerivative(userAnswer, func) {
  const correctDer = derivativeOf(func);
  console.log("Correct Der", correctDer);

  if (userAnswer == correctDer) {
    return true;
  } else return false;
}

function compareCalculation(userAnswer, func, value) {
  const correctCalculation = calculate(func, value);
  console.log("CorrectCalc", correctCalculation);
  if (userAnswer == correctCalculation) {
    return true;
  } else return false;
}

function compareIntegrals(userAnswer, func) {
  const correctIntegral = integralOf(func);
  if (userAnswer == correctIntegral) {
    return true;
  } else return false;
}

module.exports.derivativeOf = derivativeOf;
module.exports.calculate = calculate;
module.exports.compareDerivative = compareDerivative;
module.exports.compareCalculation = compareCalculation;
module.exports.integralOf = integralOf;
module.exports.compareIntegrals = compareIntegrals;
