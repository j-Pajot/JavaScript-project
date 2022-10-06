// -------------------------------------- header : je suis
const target = document.getElementById('message');
let array = [
    "développeuse", "motivée", "sérieuse", "autonome", " disponible!" 
]
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
            }, 2800)
            
        }
    }, 70)
}
loop();

// ----------------------------------------  password-maker

const dataLowercase = "azertyuiopqsdfghjklmwxcvbn";
const dataUppercase = dataLowercase.toUpperCase(); // Eviter de tout réécrire
const dataNumbers = "0123456789";
const dataSymbols = ",;:!?#{[|`\^@]+-";
const rangeValue = document.getElementById('password-length');
const passwordOutput = document.getElementById('password-output');

function generatePassword() {
    let data = [];
    let password = "";

    // Si un label est chécké tu ajoutes celle-ci au tableau data
    // ... on sépare les lettres pour les récupérer plus facilement
    if (lowercase.checked) data.push(...dataLowercase)
    if (uppercase.checked) data.push(...dataUppercase)
    if (numbers.checked) data.push(...dataNumbers)
    if (symbols.checked) data.push(...dataSymbols)

    if (data.length === 0) {
        alert("Veuillez selectionner des critères");
    }

    // floor = On enlève les virgules donc 0 et 1
    // on mutliplie par data.length pour que tous les charactères puissent être choisis
    for (i = 0; i < rangeValue.value; i++){
        password += data[Math.floor(Math.random() * data.length)];
    }
    
    // Comme c'est un input, pas de innerHTML ou textcontent
    passwordOutput.value = password;

    // copier directement pour l'utilisateur
    navigator.clipboard.writeText(password);
    // ajouter un text dans le bouton
    generateButton.textContent = "Copié !"
    // remettre générer un MDP après 2s 
    setTimeout(() => {
        generateButton.textContent = "Générer un mot de passe";
    }, 2000);
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
tomorrow.setDate(tomorrow.getDate()+ 1);

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
    let diffTime = Math.abs(new Date(end_date.value) - new Date(start_date.value)
    );

    // Transformé en jour
    // 1000 -> ramène en s. /  60 en min / 60 min dans 1h / et 24 on à l'écart en jour
    let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    // Afficher jour * prix
    total.textContent = diffDays * nightPrice.textContent;
};



// évenement pour déclancher le calcul d'écart
start_date.addEventListener("change", bookingCalc);
end_date.addEventListener("change", bookingCalc);

bookingCalc();

// --------------------- API Joke ----------------

const header = document.getElementById('header');
const content = document.getElementById('content');
const app = document.querySelector('.app');



function getJoke() {
    fetch("https://api.blablagues.net/?rub=blagues")
    .then((res) => res.json())
    .then((data) => {
        const joke = data.data.content;
        header.textContent = joke.text_head;
            // On test text (si c'est vrai (?)) tu affiches text (sinon (:)) tu affiches text_hidden
            content.textContent = joke.text 
            ? joke.text 
            : joke.text_hidden;
        });
}


getJoke();

app.addEventListener('click', getJoke);