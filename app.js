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
  DoProfitMargin,
  DoPercentage7,
  DoPercentage8
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
    updateStateFn("#customSwitch17", state);
    updateStateFn("#customSwitch18", state);
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

$("#get-excel-exercise-btn").click(() => {
  buildExcelExercise1();
});

moveNext();
