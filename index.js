// -------------------------------------- header : je suis
const target = document.getElementById("message");
let array = ["développeuse", "motivée", "sérieuse", "autonome", " disponible!"];
let wordIndex = 0;
let letterIndex = 0;

const createLetter = () => {
  const letter = document.createElement("span");
  target.appendChild(letter);

  letter.textContent = array[wordIndex][letterIndex];

  setTimeout(() => {
    letter.remove();
  }, 2800);
};

const loop = () => {
  setTimeout(() => {
    // 1-si on doit pas revenir à 0
    if (wordIndex >= array.length) {
      wordIndex = 0;
      letterIndex = 0;
      loop();
    } else if (letterIndex < array[0].length) {
      // 2-Alors tu me sors une nouvelle lettre
      // 3-Si on doit pas sortir une nouvelle lettre alors
      // si il n'y a plus de lettre, je veux que tu avances d'un mot
      createLetter();
      letterIndex++;
      loop();
    } else {
      // 4- c'est qu'on doit changer de mot
      wordIndex++;
      letterIndex = 0;
      setTimeout(() => {
        loop();
      }, 2800);
    }
  }, 70);
};
loop();

// ----------------------------------------  password-maker

const dataLowercase = "azertyuiopqsdfghjklmwxcvbn";
const dataUppercase = dataLowercase.toUpperCase(); // Eviter de tout réécrire
const dataNumbers = "0123456789";
const dataSymbols = ",;:!?#{[|`^@]+-";
const rangeValue = document.getElementById("password-length");
const passwordOutput = document.getElementById("password-output");

function generatePassword() {
  let data = [];
  let password = "";

  // Si un label est chécké tu ajoutes celle-ci au tableau data
  // ... on sépare les lettres pour les récupérer plus facilement
  if (lowercase.checked) data.push(...dataLowercase);
  if (uppercase.checked) data.push(...dataUppercase);
  if (numbers.checked) data.push(...dataNumbers);
  if (symbols.checked) data.push(...dataSymbols);

  if (data.length === 0) {
    alert("Veuillez selectionner des critères");
  }

  // floor = On enlève les virgules donc 0 et 1
  // on mutliplie par data.length pour que tous les charactères puissent être choisis
  for (i = 0; i < rangeValue.value; i++) {
    password += data[Math.floor(Math.random() * data.length)];
  }

  // Comme c'est un input, pas de innerHTML ou textcontent
  passwordOutput.value = password;

  // copier directement pour l'utilisateur
  navigator.clipboard.writeText(password);
  // ajouter un text dans le bouton
  generateButton.textContent = "Copié !";
  // remettre générer un MDP après 2s
  setTimeout(() => {
    generateButton.textContent = "Générer un mot de passe";
  }, 3000);
}

generateButton.addEventListener("click", generatePassword);

/* ---------------------------------- Date calculator --------------------------------*/

//----- 1 convertir la date du jour dans un format input---------

//new Date() = Thu Oct 06 2022 10:59:46 GMT+0200 -> ne rentre pas dans un input
//new Date().toISOString() = 2022-10-06T09:01:20.795Z -> il faut casser le T
//new Date().toISOString().split("T") = ['2022-10-06', '09:02:39.255Z'] -> créé un tableau
const today = new Date().toISOString().split("T")[0]; // on ne prend que le 1er élément du tableau (la date)
start_date.value = today;

// Empécher de prendre une date en arrière de celle du jour
start_date.min = today;

//----- 2 calcul de la date du lendemain------------
let tomorrow = new Date();

// getDate permet de passer au lundemain
tomorrow.setDate(tomorrow.getDate() + 1);

// convertir au format input
let tomorrowFormat = tomorrow.toISOString().split("T")[0];
end_date.value = tomorrowFormat;

// Empécher de prendre une date en arrière de celle du jour
end_date.min = tomorrowFormat;

// Toujours avoir le start avant le end et inversement
start_date.addEventListener("change", (e) => {
  let day = new Date(e.target.value);

  // si la date de fin est + petite que la date de debut, tu rajoutes 1
  if (end_date.value < start_date.value) {
    day.setDate(day.getDate() + 1);
    end_date.value = day.toISOString().split("T")[0];
  }
});

end_date.addEventListener("change", (e) => {
  let day = new Date(e.target.value);

  // si la date de début est + grande que la date de fin, tu enlèves 1
  if (end_date.value < start_date.value) {
    day.setDate(day.getDate() - 1);
    start_date.value = day.toISOString().split("T")[0];
  }
});

//----- 3 calcul du prix selon la date () ------------

// Calcul écart en jout
const bookingCalc = () => {
  // Math.abs = valeur absolue des 2 dates = 86400000
  let diffTime = Math.abs(
    new Date(end_date.value) - new Date(start_date.value)
  );

  // Transformé en jour
  // 1000 -> ramène en s. /  60 en min / 60 min dans 1h / et 24 on à l'écart en jour
  let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  // Afficher jour * prix
  total.textContent = diffDays * nightPrice.textContent;
};

// évenement pour déclancher le calcul d'écart
start_date.addEventListener("change", bookingCalc);
end_date.addEventListener("change", bookingCalc);

bookingCalc();

// --------------------- API Joke ----------------

const header = document.getElementById("header");
const content = document.getElementById("content");
const app = document.querySelector(".app");

function getJoke() {
  fetch("https://api.blablagues.net/?rub=blagues")
    .then((res) => res.json())
    .then((data) => {
      const joke = data.data.content;
      header.textContent = joke.text_head;
      content.textContent = joke.text ? joke.text : joke.text_hidden;
    });
}

getJoke();

app.addEventListener("click", getJoke);

// --------------------- Quizz ----------------

// class de l'objet Question
class Question {
  constructor(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
  }
  // Fonction pour déterminer si l'user a bon
  isCorrectAnswer(choice) {
    return choice === this.answer;
  }
}

const questions = [
  new Question(
    "Quelle méthode Javascript permet de filtrer les éléments d'un tableau?",
    ["indexOf()", "map()", "filter()", "reduce()"],
    "filter()"
  ),
  new Question(
    "Quelle méthode Javascript permet de vérifier si un élément figure dans un tableau?",
    ["isNaN()", "includes()", "findIndex()", "isOdd()"],
    "includes()"
  ),
  new Question(
    "Quelle méthode transforme du JSON en un objet Javascript ?",
    ["JSON.parse()", "JSON.stringify()", "JSON.object()", "JSON.toJS"],
    "JSON.parse()"
  ),
  new Question(
    "Quel objet Javascript permet d'arrondir à l'entier le plus proche?",
    ["Math.ceil()", "Math.floor()", "Math.round()", "Math.random()"],
    "Math.round()"
  ),
  new Question(
    "Quel était la couleur du cheval blanc d'Henry IV?",
    ["Gris", "Marron", "Noir", "Blanc"],
    "Blanc"
  ),
  new Question(
    "Avez vous besoin de moi dans votre entreprise?",
    ["Oui", "Oui", "Oui", "Oui"],
    "Oui"
  ),
];

class Quizz {
  // donnée du quizz
  constructor(questions) {
    this.score = 0;
    this.questions = questions;
    this.currentQuestionIndex = 0; // index des questions (1ere, 2eme ...)
  }
  // Méthode pour savoir sur qu'elle question on est
  getCurrentQuestion() {
    return this.questions[this.currentQuestionIndex];
  }
  guess(answer) {
    // si la question est correct, on ajt 1 pt (isCorrectAnswer) et fait la prochaine question(currentQuestionIndex)
    if (this.getCurrentQuestion().isCorrectAnswer(answer)) {
      this.score++;
    }
    this.currentQuestionIndex++;
  }
  // Méthode pour retourner true quand l'index des questions est sup ou égale au nombre de question -> donc c'est finis
  hasEnded() {
    return this.currentQuestionIndex >= this.questions.length;
  }
}

// Affichage du quizz
const display = {
  elementShown: function (id, text) {
    // on pointe les id
    let element = document.getElementById(id);
    element.innerHTML = text;
  },
  question: function () {
    this.elementShown("question", quizz.getCurrentQuestion().text);
  },
  choices: function () {
    let choices = quizz.getCurrentQuestion().choices;
    guessHandler = (id, guess) => {
      // onClick car on est dans un objet ( pas d'eventListener)
      // qd on click on déclanche la fonction guess puis quizzApp
      document.getElementById(id).onclick = function () {
        quizz.guess(guess);
        quizzApp();
      };
    };
    // Afficher choix + prise en compte du choix
    for (let i = 0; i < choices.length; i++) {
      this.elementShown("choice" + i, choices[i]);
      // Guess (id des btn) + choix de l'user
      guessHandler("guess" + i, choices[i]);
    }
  },
  // Progression de l'user
  // +1 car l'index commence à 0
  progress: function () {
    this.elementShown(
      "progress",
      `Question ${quizz.currentQuestionIndex + 1} sur ${quizz.questions.length}`
    );
  },
  endQuiz: function () {
    let endQuizzHTML = `
        <h1>Quizz terminé !</h1>
        <h3>Votre score est de : ${quizz.score} / ${quizz.questions.length}</h3>
      `;
    this.elementShown("quiz", endQuizzHTML);
  },
};

// logique du jeu
quizzApp = () => {
  // si le quizz est terminé
  if (quizz.hasEnded()) {
    // écran de fin
    display.endQuiz();
  } else {
    // Afficher questions, choix, progression si le quizz est pas finis
    display.question();
    display.choices();
    display.progress();
  }
};

// Créer le jeu
let quizz = new Quizz(questions);
quizzApp();
