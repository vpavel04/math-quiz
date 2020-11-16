function chooseOne(arr) {
  let idx = Math.floor(Math.random() * arr.length);
  return arr[idx];
}

function chooseInt(min, max, notZero = false) {
  const ret = Math.floor(Math.random() * (max - min + 1)) + min;
  return (notZero == true && ret == 0) ? 1 : ret;
}

let minimum = null;
let maximum = null;

function DoSum() {
  const int1 = chooseInt(maximum, minimum);
  const int2 = chooseInt(maximum, minimum);

  return {
    question: `${int1} + ${int2}`,
    answer: int1 + int2
  }
}

function DoMult() {
  const int1 = chooseInt(maximum, minimum);
  const int2 = chooseInt(maximum, minimum);

  return {
    question: `${int1} * ${int2}`,
    answer: int1 * int2
  }
}

function DoDiv() {
  const int1 = chooseInt(maximum, minimum);
  const int2 = chooseInt(maximum, minimum, true);

  return {
    question: `${int1 * int2} / ${int2}`,
    answer: int1
  }
}

function DoSub() {
  const int1 = chooseInt(maximum, minimum);
  const int2 = chooseInt(maximum, minimum);

  return {
    question: `${int1} - ${int2}`,
    answer: int1 - int2
  }
}

function DoTreeNumberOp() {
  let int1 = chooseInt(maximum, minimum);
  let int2 = chooseInt(maximum, minimum, true);
  let int3 = chooseInt(maximum, minimum, true);

  const operators = ['+', '-', '*', '/'];
  const op1 = chooseOne(operators);
  const op2 = chooseOne(operators.filter(op => op != op1));

  if (op1 == '/') {
    int1 = int2 * int1;
  }

  if (op2 == '/') {
    int2 = int2 * int3;
  }

  const question = `${int1} ${op1} ${int2} ${op2} ${int3}`;
  return {
    question: question,
    answer: eval(question)
  }
}

function DoFourNumberOp() {
  let int1 = chooseInt(maximum, minimum);
  let int2 = chooseInt(maximum, minimum, true);
  let int3 = chooseInt(maximum, minimum, true);
  let int4 = chooseInt(maximum, minimum, true);

  const operators = ['+', '-', '*', '/'];
  const op1 = chooseOne(operators);
  const op2 = chooseOne(operators.filter(op => op != op1));
  const op3 = chooseOne(operators.filter(op => op != op1 && op != op2));

  if (op1 == '/') {
    int1 = int2 * int1;
  }

  if (op2 == '/') {
    int2 = int2 * int3;
  }

  if (op3 == '/') {
    int3 = int3 * int4;
  }

  const question = `${int1} ${op1} ${int2} ${op2} ${int3} ${op3} ${int4}`;
  return {
    question: question,
    answer: eval(question)
  }
}

function DoMoveCommaByTens() {
  const int1 = chooseInt(0, 100);
  const val = chooseOne([10, 100, 1000]);
  const operator = chooseOne(['*', '/']);

  if (operator == '*') {
    return {
      question: `${int1 / val} * ${val}`,
      answer: int1
    }
  } else {
    return {
      question: `${int1} / ${val}`,
      answer: int1 / val
    }
  }
}

function getDivisors(number) {
  const divs = [];
  for (let i = 1; i <= number; i++) {
    if (number % i == 0)
      divs.push(i);
  }
  return divs;
}

function RoundDecimalsIfNeeded(n) {
  return Math.round(n * 1000) / 1000;
}

function DoPercentage1() {
  const percentages = [0.25];
  for (let i = 0; i <= 10; i++) {
    percentages.push(RoundDecimalsIfNeeded(i / 10.0));
  }

  const percentage = chooseOne(percentages);
  const int1 = chooseInt(1, 11);

  return {
    question: `Cat reprezinta ${RoundDecimalsIfNeeded(percentage * int1 * 10)} din ${int1 * 10} in procente`,
    answer: (percentage * 100) + "%"
  }
}

function DoPercentageConversion1() {

  const maxNumber = chooseOne([10, 100, 1000]);
  const int1 = chooseInt(0, maxNumber);

  return {
    question: `Cat este ${int1 / 100.0} in procente`,
    answer: int1 + "%"
  }
}

function DoPercentageConversion2() {
  const maxNumber = chooseOne([10, 100, 1000]);
  const int1 = chooseInt(0, maxNumber);

  return {
    question: `Cat este ${int1}% in zecimal`,
    answer: int1 / 100
  }
}

function DoPercentage2() {
  const int1 = chooseInt(maximum, minimum, true);
  const int2 = chooseOne(getDivisors(100 * int1));
  const int3 = 100 * int1 / int2;

  return {
    question: `${int2}% * ${int3}`,
    answer: int1
  }
}

function DoPercentage3() {
  const int1 = chooseInt(maximum, minimum, true);
  const int2 = chooseOne(getDivisors(100 * int1));
  const int3 = 100 * int1 / int2;

  return {
    question: `${int2}% * ? = ${int1}`,
    answer: int3
  }
}

function DoPercentage4() {
  const percentages = [0.25];
  for (let i = 0; i <= 10; i++) {
    percentages.push(RoundDecimalsIfNeeded(i / 10.0));
    percentages.push(RoundDecimalsIfNeeded(i / 100.0));
  }

  const percentage = chooseOne(percentages);
  const int1 = chooseInt(1, 11);

  return {
    question: `Cat reprezinta ${RoundDecimalsIfNeeded(percentage * int1 * 10)} din ${int1 * 10} in procente`,
    answer: (percentage * 100) + "%"
  }
}
function GenerateGrowth() {
  const int1 = chooseInt(maximum, minimum, true);
  const int2 = chooseOne(getDivisors(100));
  const multiplier = chooseInt(1, 5);
  const int3 = int1 * 100 / int2;
  return {
    from: int3,
    to: int3 + int3 * int2 * multiplier / 100,
    p: int2 * multiplier
  }
}
function DoPercentage5() {
  const res = GenerateGrowth();

  return {
    question: `Cat e cresterea procentuala de la ${res.from} la ${res.to}`,
    answer: res.p + "%"
  }
}

function DoPercentage6() {
  const int1 = chooseInt(maximum, minimum, true);
  const int2 = chooseOne(getDivisors(100));
  const multiplier = chooseInt(1, 5);
  const int3 = int1 * 100 / int2;

  return {
    question: `${int3} dupa o crestere de  ${int2 * multiplier}% este`,
    answer: int3 + int3 * int2 * multiplier / 100
  }
}

function DoProfitMargin() {
  const res = GenerateGrowth();

  return {
    question: `Cat e profitul % pentru un bussiness care incaseaza ${res.to}$ si cheltuie ${res.from}$`,
    answer: res.p + "%"
  }
}

const operations = [
  DoSum,
  DoSub,
  DoMult,
  DoDiv,
  DoTreeNumberOp,
  DoFourNumberOp,
  DoPercentage1,
  DoPercentageConversion1,
  DoPercentageConversion2,
  DoPercentage2,
  DoPercentage3,
  DoPercentage4,
  DoPercentage5,
  DoPercentage6,
  DoMoveCommaByTens,
  DoProfitMargin
];

$(".custom-control-input").change(function () {
  const thisCtrl = $(this);

  if (thisCtrl.attr("state") == "true")
    thisCtrl.attr("state", "false");
  else
    thisCtrl.attr("state", "true");

  const updateStateFn = (id, state) => {
    $(id).attr("state", state);
    $(id).prop("disabled", state == "false");
    $(id).prop("checked", state == "true")
  };

  if (thisCtrl.attr('id') == "basics") {

    const state = thisCtrl.attr("state");
    updateStateFn("#customSwitch1", state);
    updateStateFn("#customSwitch2", state);
    updateStateFn("#customSwitch3", state);
    updateStateFn("#customSwitch4", state);
    updateStateFn("#customSwitch5", state);
    updateStateFn("#customSwitch6", state);
    updateStateFn("#customSwitch15", state);
  }

  if (thisCtrl.attr('id') == "percentages") {

    const state = thisCtrl.attr("state");
    updateStateFn("#customSwitch7", state);
    updateStateFn("#customSwitch8", state);
    updateStateFn("#customSwitch9", state);
    updateStateFn("#customSwitch10", state);
    updateStateFn("#customSwitch11", state);
    updateStateFn("#customSwitch12", state);
    updateStateFn("#customSwitch13", state);
    updateStateFn("#customSwitch14", state);
  }

  if (thisCtrl.attr('id') == "bussiness") {

    const state = thisCtrl.attr("state");
    updateStateFn("#customSwitch16", state);
  }
});

function operationIsActive(opCode) {
  return $(`#customSwitch${opCode + 1}`).attr("state") == "true";
}

function getActiveOperations() {
  const activeOps = [];
  for (let i = 0; i < operations.length; i++) {
    if (operationIsActive(i))
      activeOps.push(i);
  }

  return activeOps;
}

let currentQestion = null;
function moveNext() {

  minimum = parseInt($("#min").val());
  maximum = parseInt($("#max").val());

  const activeOps = getActiveOperations();
  const choosedOp = Math.floor(Math.random() * activeOps.length);
  currentQestion = operations[activeOps[choosedOp]]();
  $("#question").html(currentQestion.question);
}


$("#answer").keyup(function () {

  const answer = $("#answer").val();
  if (answer == "!" || answer == currentQestion.answer) {
    $("#answer").val("");
    moveNext();
  }
});


moveNext();


