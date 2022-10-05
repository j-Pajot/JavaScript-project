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