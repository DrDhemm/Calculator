const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const calcScreen = document.querySelector(".calculator-screen");
const calcPreview = document.querySelector(".calculator-preview");
const eqSign = document.querySelector(".equal-sign");
const clrAll = document.querySelector(".all-clear");
const decimal = document.querySelector(".decimal");

let prevNumber = "",
  calcOperator = "",
  lastOperator = "",
  currNumber = "0",
  currPrev = "";

const updateScreen = (num) => {
  calcScreen.value = num;
};

const updatePreview = (prev) => {
  calcPreview.value = prev;
};

const inputNumber = (num) => {
  if (currNumber == "0") {
    currNumber = num;
  } else {
    currNumber += num;
  }
};

const inputOperator = (ope) => {
  if (calcOperator === "") {
    prevNumber = currNumber;
    calcOperator = ope;

    currPrev += ` ${currNumber} ${calcOperator}`;
    updatePreview(currPrev);

    currNumber = "";
    // updateScreen(currNumber);
    return;
  } else if (currNumber === "" || currNumber === "0") {
    return;
  } else if (currNumber !== "" && calcOperator !== "" && prevNumber !== "") {
    prevNumber = calc();
    calcOperator = ope;

    currPrev += ` ${currNumber} ${calcOperator}`;
    updatePreview(currPrev);

    currNumber = "";
    // updateScreen(currNumber);
    return;
  }
};

const inputDec = (dec) => {
  if (currNumber != "") {
    if (currNumber.includes(".")) {
      return;
    }

    currNumber += dec;
  }
  return;
};

const calc = () => {
  let result = "";
  switch (calcOperator) {
    case "+":
      result = parseFloat(prevNumber) + parseFloat(currNumber);
      break;
    case "-":
      result = parseFloat(prevNumber) - parseFloat(currNumber);
      break;
    case "*":
      result = parseFloat(prevNumber) * parseFloat(currNumber);
      break;
    case "/":
      result = parseFloat(prevNumber) / parseFloat(currNumber);
      break;
    default:
      return;
  }
  return result;
};

const clearAll = () => {
  prevNumber = "";
  calcOperator = "";
  currNumber = "0";
  currPrev = "";
};

numbers.forEach((num) => {
  num.addEventListener("click", (e) => {
    inputNumber(e.target.value);
    updateScreen(currNumber);
  });
});

operators.forEach((ope) => {
  ope.addEventListener("click", (e) => {
    inputOperator(e.target.value);
  });
});

eqSign.addEventListener("click", () => {
  if (
    calcOperator === "" &&
    prevNumber !== "" &&
    currNumber !== "" &&
    lastOperator !== ""
  ) {
    currPrev = `${prevNumber} ${lastOperator} ${currNumber} =`;
    updatePreview(currPrev);

    calcOperator = lastOperator;
    currNumber = calc();

    calcOperator = "";
    updateScreen(currNumber);
    return
  }
  currPrev += ` ${currNumber} =`;
  updatePreview(currPrev);

  currNumber = calc();
  lastOperator = calcOperator
  calcOperator = "";

  updateScreen(currNumber);
  console.log(currPrev, currNumber, prevNumber, lastOperator, calcOperator);
});

clrAll.addEventListener("click", () => {
  clearAll();
  updateScreen(currNumber);
  updatePreview(currPrev);
});

decimal.addEventListener("click", (e) => {
  inputDec(e.target.value);
  updateScreen(currNumber);
});
