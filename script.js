const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const calcScreen = document.querySelector(".calculator-screen");
const calcPreview = document.querySelector(".calculator-preview");
const eqSign = document.querySelector(".equal-sign");
const clrAll = document.querySelector(".all-clear");
const clrOne = document.querySelector(".once-clear");
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

const debug = () => {
  console.log(
    "currPrev",
    currPrev,
    "currNumber",
    currNumber,
    "prevNumber",
    prevNumber,
    "lastOperator",
    lastOperator,
    "calcOperator",
    calcOperator
  );
};

const inputNumber = (num) => {
  if (currNumber == "0") {
    if (currPrev.slice(-1) == "-") {
      currNumber = `-${num}`;
      currPrev = ""
      updatePreview(currPrev)
      return
    }
    currNumber = num;
  } else {
    currNumber += num;
  }
  console.log(
    "currPrev",
    currPrev,
    "currNumber",
    currNumber,
    "prevNumber",
    prevNumber,
    "lastOperator",
    lastOperator,
    "calcOperator",
    calcOperator
  );
};

const inputOperator = (ope) => {
  if (prevNumber && currNumber.length == 0) {
    // User had input 1st operand but not yet 2nd operand
    // Change operator on preview and calcOperator
    currPrev = currPrev.slice(0, -1);
    lastOperator = calcOperator;
    calcOperator = ope;
    currPrev += ope == "*" ? "x" : ope;
    updatePreview(currPrev);
    console.log(
      "currPrev",
      currPrev,
      "currNumber",
      currNumber,
      "prevNumber",
      prevNumber,
      "lastOperator",
      lastOperator,
      "calcOperator",
      calcOperator
    );
    return;
  } else if (currNumber && calcOperator && prevNumber) {
    // User already input operand 1, 2, and operator
    // calculate available data then move to prevNumber
    prevNumber = calc();
    currPrev += ` ${currNumber} ${ope == "*" ? "x" : ope}`;
    updatePreview(currPrev);
    lastOperator = calcOperator;
    calcOperator = ope;
    currNumber = "";
    console.log(
      "currPrev",
      currPrev,
      "currNumber",
      currNumber,
      "prevNumber",
      prevNumber,
      "lastOperator",
      lastOperator,
      "calcOperator",
      calcOperator
    );
    return;
  }

  if (currNumber == "" || currNumber == "0" || currNumber == "0.") {
    // User not input any operand
    // Maybe they want do negative numbers?
    if (ope == "-" && currPrev.length == 0) {
      currPrev += ` ${ope}`;
      updatePreview(currPrev);
    }
    console.log(
      "currPrev",
      currPrev,
      "currNumber",
      currNumber,
      "prevNumber",
      prevNumber,
      "lastOperator",
      lastOperator,
      "calcOperator",
      calcOperator
    );
    return;
  }

  // Normal action
  lastOperator = calcOperator;
  calcOperator = ope;

  currPrev += ` ${currNumber} ${calcOperator == "*" ? "x" : calcOperator}`;
  updatePreview(currPrev);

  prevNumber = currNumber;
  currNumber = "";
  console.log(
    "currPrev",
    currPrev,
    "currNumber",
    currNumber,
    "prevNumber",
    prevNumber,
    "lastOperator",
    lastOperator,
    "calcOperator",
    calcOperator
  );
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

const clearOne = () => {
  currNumber = `${currNumber}`; // Seems dangerous
  currNumber = currNumber.slice(0, -1);
  if (currNumber.length < 1) {
    currNumber = "0";
  }
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
  if (currNumber && calcOperator && prevNumber) {
    // User already input operand 1, 2, and operator
    // Update screen and preview
    currPrev += ` ${currNumber} =`;
    updatePreview(currPrev);
    currNumber = calc();
    updateScreen(currNumber);
    // Clear operator and clone to lastOperator
    lastOperator = calcOperator;
    calcOperator = "";
    console.log(
      "currPrev",
      currPrev,
      "currNumber",
      currNumber,
      "prevNumber",
      prevNumber,
      "lastOperator",
      lastOperator,
      "calcOperator",
      calcOperator
    );
    return;
  } else if (
    currNumber &&
    calcOperator.length == 0 &&
    prevNumber &&
    lastOperator
  ) {
    // User keep hitting equal wihtout input any new operand 2 or operator
    calcOperator = lastOperator;
    // Update preview
    currPrev += ` ${currNumber} ${calcOperator} ${prevNumber} =`;
    updatePreview(currPrev);
    currNumber = calc();
    updateScreen(currNumber);
    calcOperator = "";
  }
});

clrAll.addEventListener("click", () => {
  clearAll();
  updateScreen(currNumber);
  updatePreview(currPrev);
});

clrOne.addEventListener("click", () => {
  clearOne();
  updateScreen(currNumber);
});

decimal.addEventListener("click", (e) => {
  inputDec(e.target.value);
  updateScreen(currNumber);
});
