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
    max: parseInt($("#max").val()),
    polyglot: window.polyglot
  };

  const eqIdentifier = chooseOne(getActiveEquations()).split('.');
  const eqCategory = equations[eqIdentifier[0]];
  const eq = eqCategory[eqIdentifier[1]];

  window.currentEq = eq(opts);
  console.log(window.currentEq);

  $("#question").html(window.currentEq.question);
}

function initPolyglot(language) {
  return new Promise((resolve, reject) => {

    $.getJSON(`./i18n-${language}.json`)
      .done((resources) => {

        const polyglot = new Polyglot();
        polyglot.extend(resources);

        resolve(polyglot);
      })
      .fail((jqxhr, textStatus, error) => {

        console.log(error);
        reject();
      });
  })
}

async function initApp() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const lang = urlParams.get('lang') ? urlParams.get('lang') : "en";

  window.polyglot = await initPolyglot(lang);

  generateOptions(equations, $("#options-table-body"), window.polyglot);
  
  $(".custom-control-input").change(handleSwitchChange);

  $("#answer").keyup(() => {
    const answer = $("#answer").val();
    if (answer == "!" || answer == window.currentEq.answer) {
      $("#answer").val("");
      setupNewQuestion();
    }
  });

  $("#next-question-btn").click(() => {
    setupNewQuestion();
  });

  $("#language-selector").val(lang);
  $("#language-selector").change(async () => {
    window.location = "index.html?lang=" + $("#language-selector").val();
  });

  $(() => {
    $('.selectpicker').selectpicker('refresh');
  });

  setupNewQuestion();
}
