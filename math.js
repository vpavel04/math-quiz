
function chooseOne(arr) {
  let idx = Math.floor(Math.random() * arr.length);
  return arr[idx];
}

function chooseInt(min, max, notZero = false) {
  const ret = Math.floor(Math.random() * (max - min + 1)) + min;
  return (notZero == true && ret == 0) ? 1 : ret;
}

function getDivisors(number) {
  const divs = [];
  for (let i = 1; i <= number / 2; i++) {
    if (number % i == 0)
      divs.push(i);
  }

  divs.push(number);

  return divs;
}

function GenerateGrowth(opts) {
  const int1 = chooseInt(opts.min, opts.max, true);
  const int2 = chooseOne(getDivisors(100));
  const multiplier = chooseInt(1, 5);
  const int3 = int1 * 100 / int2;
  return {
    from: int3,
    to: int3 + int3 * int2 * multiplier / 100,
    p: int2 * multiplier
  }
}

function GenerateDecrease(opts) {
  const int1 = chooseInt(opts.min, opts.max, true);
  const int2 = chooseOne(getDivisors(100));
  const multiplier = int2 < 20 ? chooseInt(1, 5) : 1;
  const int3 = int1 * 100 / int2;
  return {
    from: int3,
    to: int3 - int3 * int2 * multiplier / 100,
    p: int2 * multiplier
  }
}

const equations = {
  basics: {

    sum: (opts) => {
      const int1 = chooseInt(opts.min, opts.max);
      const int2 = chooseInt(opts.min, opts.max);

      return {
        question: `${int1} + ${int2} = ?`,
        answer: int1 + int2
      }
    },

    mult: (opts) => {
      const int1 = chooseInt(opts.min, opts.max);
      const int2 = chooseInt(opts.min, opts.max);

      return {
        question: `${int1} * ${int2} = ?`,
        answer: int1 * int2
      }
    },

    div: (opts) => {
      const int1 = chooseInt(opts.min, opts.max);
      const int2 = chooseInt(opts.min, opts.max, true);

      return {
        question: `${int1 * int2} / ${int2} = ?`,
        answer: int1
      }
    },

    sub: (opts) => {
      const int1 = chooseInt(opts.min, opts.max);
      const int2 = chooseInt(opts.min, opts.max);

      return {
        question: `${int1} - ${int2} = ?`,
        answer: int1 - int2
      }
    },

    treeNumbersEq: (opts) => {
      let int1 = chooseInt(opts.min, opts.max);
      let int2 = chooseInt(opts.min, opts.max, true);
      let int3 = chooseInt(opts.min, opts.max, true);

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
        question: question + " = ?",
        answer: eval(question)
      }
    },

    fourNumbersEq: (opts) => {
      let int1 = chooseInt(opts.min, opts.max);
      let int2 = chooseInt(opts.min, opts.max, true);
      let int3 = chooseInt(opts.min, opts.max, true);
      let int4 = chooseInt(opts.min, opts.max, true);

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
        question: question + " = ?",
        answer: eval(question)
      }
    },

    multiplyOrDivideByTen: (opts) => {
      const int1 = chooseInt(0, 100);
      const val = chooseOne([10, 100, 1000]);
      const operator = chooseOne(['*', '/']);

      if (operator == '*') {
        return {
          question: `${int1 / val} * ${val} = ?`,
          answer: int1
        }
      } else {
        return {
          question: `${int1} / ${val} = ?`,
          answer: int1 / val
        }
      }
    },

  },

  percentages: {

    convertNumberToPercentage: (opts) => {
      const maxNumber = chooseOne([10, 100, 1000]);
      const int1 = chooseInt(0, maxNumber);

      return {
        question: opts.polyglot.t('quiz.math.percentages.convertNumberToPercentage.text', { x: int1 / 100 }),
        answer: int1 + "%"
      }
    },

    convertPercentageToNumber: (opts) => {
      const maxNumber = chooseOne([10, 100, 1000]);
      const int1 = chooseInt(0, maxNumber);

      return {
        question: opts.polyglot.t('quiz.math.percentages.convertPercentageToNumber.text', { x: int1 }),
        answer: int1 / 100
      }
    },

    equation1: (opts) => {
      const percentages = [25];
      for (let i = 0; i <= 10; i++) {
        percentages.push(i);
        percentages.push(i * 10);
      }

      const percentage = chooseOne(percentages);
      const int1 = chooseInt(opts.min, opts.max, true) * 100;

      return {
        question: opts.polyglot.t('quiz.math.percentages.equation1.text', { x: int1 * percentage / 100, y: int1 }),
        answer: percentage + "%"
      }
    },

    equation2: (opts) => {
      const int1 = chooseInt(opts.min, opts.max, true);
      const int2 = chooseOne(getDivisors(100 * int1));
      const int3 = 100 * int1 / int2;

      return {
        question: `${int2}% * ${int3} = ?`,
        answer: int1
      }
    },

    equation3: (opts) => {
      const int1 = chooseInt(opts.min, opts.max, true);
      const int2 = chooseOne(getDivisors(100 * int1));
      const int3 = 100 * int1 / int2;

      return {
        question: `${int2}% * ? = ${int1}`,
        answer: int3
      }
    },
    equation4: (opts) => {
      const int1 = chooseInt(opts.min, opts.max, true) * chooseOne([1, 10]);
      const int2 = chooseInt(opts.min, opts.max, true) * chooseOne([1, 10]);

      return {
        question: opts.polyglot.t('quiz.math.percentages.equation4.text', { x: int1, y: int2 }),
        answer: int1 * int2 / 100
      }
    },

    equation5: (opts) => {
      const res = GenerateGrowth(opts);

      return {
        question: opts.polyglot.t('quiz.math.percentages.equation5.text', { x: res.from, y: res.to }),
        answer: res.p + "%"
      }
    },

    equation6: (opts) => {
      const int1 = chooseInt(opts.min, opts.max, true);
      const int2 = chooseOne(getDivisors(100));
      const multiplier = chooseInt(1, 5);
      const int3 = int1 * 100 / int2;

      return {
        question: opts.polyglot.t('quiz.math.percentages.equation6.text', { x: int3, y: int2 * multiplier }),
        answer: int3 + int3 * int2 * multiplier / 100
      }
    },

    equation7: (opts) => {
      const res = GenerateDecrease(opts);

      return {
        question: opts.polyglot.t('quiz.math.percentages.equation7.text', { x: res.from, y: res.to }),
        answer: res.p + "%"
      }
    },

    equation8: (opts) => {
      const int1 = chooseInt(opts.min, opts.max, true);
      const int2 = chooseOne(getDivisors(100));
      const multiplier = int2 < 20 ? chooseInt(1, 5) : 1;
      const int3 = int1 * 100 / int2;

      return {
        question: opts.polyglot.t('quiz.math.percentages.equation8.text', { x: int3, y: int2 * multiplier }),
        answer: int3 - int3 * int2 * multiplier / 100
      }
    }
  },

  bussiness: {

    profitMargin: (opts) => {
      const res = GenerateGrowth(opts);

      return {

        question: opts.polyglot.t('quiz.math.bussiness.profitMargin.text', { x: res.from, y: res.to }),
        answer: res.p + "%"
      }
    }
  }
}
