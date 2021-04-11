let DEFAULT_QUESTION = 'O prato que você pensou é Bolo de Chocolate?';
let CATEGORIES = [];
let FOODS = [];

const SECTION_FOOD = 'food';
const SECTION_CATEGORY = 'category';

let isNullOrEmpty = data => data === null || data === ''
let makeQuestion = question => window.confirm(question)

function playGame() {
  CATEGORIES = ['massa']
  FOODS = {
    'massa': ['Lasanha'],
  }

  let quitGame = false
  while (quitGame === false) {
    let game = new Game();
    quitGame = game.play();
  }

  if (quitGame) {
    window.alert('Acertei de novo');
  }
}

class Game {
  constructor() {
    this.indexQuestion = 0;
    this.category = null;
    this.question = null;
    this.section = SECTION_CATEGORY;
    this.lastQuestion = false;
    this.answer = null;
    this.done = false;
    this.quit = false;
    this.lastFood = 'Bolo de Chocolate';
    this.sectionQuestions = {
      [SECTION_CATEGORY]: 'doQuestionCategory',
      [SECTION_FOOD]: 'doQuestionFood'
    };
  }

  play() {
    window.alert('Pense em um prato que goste');
    while (true) {
      this.processQuestions();
      this.processAnswer();

      if (this.done === true) {
        break;
      }
    }

    return this.quit;
  }

  processQuestions() {
    let func = this.sectionQuestions[this.section];
    this[func]();
  }

  processAnswer() {
    if (this.lastQuestion === true) {
      if (this.answer === false) {
        this.registerNewCategoryAndFood();
      }

      this.quit = this.answer;
      this.done = true;
      return;
    }

    if (this.answer === false) {
      return;
    }

    if (this.section === SECTION_CATEGORY) {
      this.indexQuestion = 0;
      this.section = SECTION_FOOD;
    }
  }

  registerNewCategoryAndFood() {
    let food;
    let category = this.category;

    do {
      food = window.prompt('Qual prato você pensou?');
    } while (isNullOrEmpty(food))

    if (this.section === SECTION_CATEGORY) {
      do {
        category = window.prompt(`${food} é _____ mas ${this.lastFood} não`);
      } while (isNullOrEmpty(category))
    }

    if (CATEGORIES.includes(category) === false) {
      CATEGORIES.push(category);
      Object.assign(FOODS, { [category]: [food] });
    } else {
      FOODS[category].push(food);
    }
  }

  doQuestionCategory() {
    if (this.indexQuestion > CATEGORIES.length) {
      return
    }

    let category = CATEGORIES[this.indexQuestion];
    if (category === undefined) {
      this.question = DEFAULT_QUESTION;
      this.lastQuestion = true;
    } else {
      this.question = `O prato que você pensou é ${category}?`;
      this.indexQuestion++;
      this.category = category;
    }

    this.answer = makeQuestion(this.question)
  }

  doQuestionFood() {
    let actualFood = FOODS[this.category][this.indexQuestion];
    if (actualFood === undefined) {
      this.lastQuestion = true;
      return
    }

    this.question = `O prato que você pensou é ${actualFood}?`;

    this.lastFood = actualFood;
    this.indexQuestion++;
    this.answer = makeQuestion(this.question)
  }
}