
function getActiveEquations() {
  const ret = [];

  $(".custom-control-input").each(function (index, elem) {
    const $elem = $(elem);
    if (!isCategory($elem) && $elem.attr("state") == "true") {
      ret.push($elem.attr('id'));
    }
  });

  return ret;
}

function handleSwitchChange() {
  const $this = $(this);
  const id = $this.attr("id");

  const oldState = $this.attr("state");
  const newState = oldState == "true" ? "false" : "true";
  $this.attr("state", newState);

  if (isCategory($this)) {

    // set the same state to all subgroups
    $(".custom-control-input").each(function (index, elem) {
      const $elem = $(elem);
      const elemId = $elem.attr("id");

      if (elemId == id)
        return;

      if (elemId.startsWith(id)) {
        $elem.attr("state", newState);
        $elem.prop("disabled", newState == "false");
        $elem.prop("checked", newState == "true");
      }
    });
  }
};

function isCategory($elem) {
  return !$elem.attr('id').includes('.');
};

function setupNewQuestion() {
  const opts = {
    min: parseInt($("#min").val()),
    max: parseInt($("#max").val())
  };

  const eqIdentifier = chooseOne(getActiveEquations()).split('.');
  const eqCategory = equations[eqIdentifier[0]];
  const eq = eqCategory[eqIdentifier[1]];

  window.currentEq = eq(opts);

  $("#question").html(window.currentEq.question);
}

function initApp() {
  setupNewQuestion();

  $(".custom-control-input").change(handleSwitchChange);

  $("#answer").keyup(function () {
    const answer = $("#answer").val();
    if (answer == "!" || answer == window.currentEq.answer) {
      $("#answer").val("");
      setupNewQuestion();
    }
  });
  
  $("#get-excel-exercise-btn").click(() => {
    buildExcelExercise1();
  });

  $("#next-question-btn").click(() => {
    setupNewQuestion();
  });

}
