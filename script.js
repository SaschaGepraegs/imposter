// --- Spielvariablen ---
const words = [
    "Lehrer", "Elefant", "Schlüssel", "Pizza", "Gitarre",
    "Polizist", "Känguru", "Brille", "Banane", "Roboter",
    "Zahnarzt", "Kaktus", "Schmetterling", "Bäcker", "Trompete",
    "Koffer", "Pinguin", "Kamera", "Schokolade", "Traktor",
    "Apfel", "Tisch", "Auto", "Hund", "Katze",
    "Buch", "Stuhl", "Lampe", "Fahrrad", "Brot",
    "Vogel", "Zebra", "Bleistift", "Telefon", "Computer",
    "Fenster", "Maus", "Kuh", "Bett", "Baum",
    "Schaf", "Gabel", "Löffel", "Teller", "Uhr",
    "Schrank", "Blume", "Sofa", "Treppe", "Kissen",
    "Küche", "Tasse", "Kanne", "Kuchen", "Fisch",
    "Schwein", "Tiger", "Löwe", "Affe", "Bär",
    "Hase", "Ente", "Gans", "Schlange", "Frosch",
    "Krokodil", "Papagei", "Eule", "Igel", "Fuchs",
    "Wolf", "Delfin", "Wal", "Hai", "Krabbe",
    "Seestern", "Qualle", "Pferd", "Esel", "Kamel",
    "Schmetterling", "Biene", "Ameise", "Marienkäfer", "Libelle",
    "Spinne", "Käfer", "Wurm", "Schnecke", "Mücke",
    "Fliege", "Adler", "Falke", "Taube", "Rabe",
    "Pfau", "Huhn", "Hahn", "Truthahn", "Gans",
    "Schwan", "Strauß", "Emu", "Kranich", "Storch",
    "Kran", "Bagger", "Bus", "Zug", "Flugzeug",
    "Schiff", "Boot", "U-Boot", "Motorrad", "Roller",
    "Traktor", "Mähdrescher", "Feuerwehr", "Polizeiauto", "Krankenwagen",
    "Taxi", "Lastwagen", "Anhänger", "Wohnmobil", "Kutsche",
    "Helikopter", "Rakete", "Satellit", "Ballon", "Drachen",
    "Schlitten", "Ski", "Snowboard", "Schlittschuh", "Rollschuh",
    "Skateboard", "Surfbrett", "Paddelboot", "Kanu", "Ruderboot",
    "Segelboot", "Yacht", "Kreuzfahrtschiff", "Fähre", "Kutter",
    "Angel", "Netz", "Korb", "Kiste", "Becher",
    "Flasche", "Dose", "Glas", "Topf", "Pfanne",
    "Backblech", "Mixer", "Toaster", "Wasserkocher", "Herd",
    "Ofen", "Mikrowelle", "Kühlschrank", "Gefrierschrank", "Spülmaschine",
    "Waschmaschine", "Trockner", "Staubsauger", "Besen", "Schaufel",
    "Eimer", "Wischmopp", "Handtuch", "Seife", "Zahnbürste",
    "Zahnpasta", "Kamm", "Bürste", "Schere", "Nagelknipser",
    "Rasierer", "Föhn", "Spiegel", "Kleiderschrank", "Kommode",
    "Regal", "Schreibtisch", "Nachttisch", "Fernseher", "Radio",
    "Lautsprecher", "Kopfhörer", "Mikrofon", "Kamera", "Drucker",
    "Scanner", "Tablet", "Smartphone", "Laptop", "Monitor",
    "Tastatur", "Mauspad", "USB-Stick", "Festplatte", "Router",
    "Modem", "Kabel", "Steckdose", "Lampe", "Kerze",
    "Taschenlampe", "Batterie", "Akku", "Wecker", "Kalender",
    "Uhr", "Brille", "Sonnenbrille", "Hut", "Mütze",
    "Schal", "Handschuh", "Jacke", "Mantel", "Hemd",
    "Bluse", "T-Shirt", "Pullover", "Hose", "Rock",
    "Kleid", "Schuhe", "Stiefel", "Sandalen", "Socken",
    "Unterhose", "BH", "Pyjama", "Badeanzug", "Bikini",
    "Handtasche", "Rucksack", "Koffer", "Geldbörse", "Portemonnaie"
];
let players = [];
let hints = [];
let votes = [];
let imposterIndex = null;
let secretWord = "";
let currentPhase = "setup";
let currentPlayerIdx = 0;
let voteSelections = [];
let voted = [];
let imposterGuess = "";

// --- DOM-Elemente ---
const sections = {
    setup: document.getElementById("setup"),
    wordReveal: document.getElementById("wordReveal"),
    hintPhase: document.getElementById("hintPhase"),
    votePhase: document.getElementById("votePhase"),
    imposterGuessPhase: document.getElementById("imposterGuessPhase"),
    resultPhase: document.getElementById("resultPhase")
};
const playerForm = document.getElementById("playerForm");
const playerCountInput = document.getElementById("playerCount");
const nameInputsDiv = document.getElementById("nameInputs");
const startGameBtn = document.getElementById("startGameBtn");
const revealTitle = document.getElementById("revealTitle");
const revealContent = document.getElementById("revealContent");
const nextPlayerBtn = document.getElementById("nextPlayerBtn");
const hintPlayerName = document.getElementById("hintPlayerName");
const hintInput = document.getElementById("hintInput");
const submitHintBtn = document.getElementById("submitHintBtn");
const hintsList = document.getElementById("hintsList");
const votePlayers = document.getElementById("votePlayers");
const submitVotesBtn = document.getElementById("submitVotesBtn");
const imposterGuessInput = document.getElementById("imposterGuessInput");
const submitImposterGuessBtn = document.getElementById("submitImposterGuessBtn");
const resultTitle = document.getElementById("resultTitle");
const resultDetails = document.getElementById("resultDetails");
const restartBtn = document.getElementById("restartBtn");

// --- Hilfsfunktionen ---
function showSection(name) {
    Object.keys(sections).forEach(key => {
        sections[key].classList.toggle("active", key === name);
    });
    currentPhase = name;
}
function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
}
function resetGameVars() {
    players = [];
    hints = [];
    votes = [];
    imposterIndex = null;
    secretWord = "";
    currentPlayerIdx = 0;
    voteSelections = [];
    voted = [];
    imposterGuess = "";
}

// --- Spieler-Setup ---
function updateNameInputs() {
    nameInputsDiv.innerHTML = "";
    const count = parseInt(playerCountInput.value, 10);
    for (let i = 0; i < count; i++) {
        const input = document.createElement("input");
        input.type = "text";
        input.placeholder = `Name Spieler ${i + 1}`;
        input.required = true;
        input.maxLength = 16;
        input.id = `playerName${i}`;
        nameInputsDiv.appendChild(input);
    }
    // Autofokus auf erstes Feld (mobilefreundlich)
    if (count > 0) {
        setTimeout(() => {
            const firstInput = document.getElementById("playerName0");
            if (firstInput) firstInput.focus();
        }, 100);
    }
}
playerCountInput.addEventListener("input", updateNameInputs);
updateNameInputs();

playerForm.addEventListener("submit", function(e) {
    e.preventDefault();
    // Namen sammeln
    players = [];
    for (let i = 0; i < parseInt(playerCountInput.value, 10); i++) {
        const name = document.getElementById(`playerName${i}`).value.trim();
        if (!name) return;
        players.push({ name });
    }
    if (players.length < 4) return;
    startGame();
});

// --- Spielstart ---
function startGame() {
    // Variablen zurücksetzen
    hints = [];
    votes = [];
    voteSelections = [];
    voted = [];
    imposterGuess = "";
    // Spieler übernehmen
    players = players.map(p => ({ name: p.name }));
    // Wort und Imposter bestimmen
    secretWord = words[Math.floor(Math.random() * words.length)];
    // 10% Chance: alle sind Imposter
    if (Math.random() < 0.1) {
        imposterIndex = -1; // -1 signalisiert: alle sind Imposter
    } else {
        imposterIndex = Math.floor(Math.random() * players.length);
    }
    currentPlayerIdx = 0;
    voteSelections = Array(players.length).fill(null);
    voted = [];
    showWordReveal();
}

// --- Wortanzeige für Spieler ---
function showWordReveal() {
    showSection("wordReveal");
    revealTitle.textContent = `Spieler: ${players[currentPlayerIdx].name}`;
    revealContent.innerHTML = `<span style="color:#94a3b8;">Bitte nur <b>${players[currentPlayerIdx].name}</b> schaut jetzt auf den Bildschirm.</span>`;
    document.getElementById("showWordBtn").style.display = "";
    document.getElementById("nextPlayerBtn").style.display = "none";
    document.getElementById("showWordBtn").onclick = () => {
        // Prüfe auf "alle sind Imposter"
        if (imposterIndex === -1 || currentPlayerIdx === imposterIndex) {
            revealContent.innerHTML = `<span style="color:#f87171;font-weight:600;">Du bist der Imposter!</span>`;
        } else {
            revealContent.innerHTML = `<span style="color:#34d399;font-weight:600;">Geheimes Wort:</span> <span style="font-size:1.2em;">${secretWord}</span>`;
        }
        document.getElementById("showWordBtn").style.display = "none";
        document.getElementById("nextPlayerBtn").style.display = "";
        document.getElementById("nextPlayerBtn").focus();
    };
    document.getElementById("nextPlayerBtn").onclick = () => {
        currentPlayerIdx++;
        if (currentPlayerIdx < players.length) {
            showWordReveal();
        } else {
            currentPlayerIdx = 0;
            setTimeout(showHintPhase, 200);
        }
    };
    document.getElementById("showWordBtn").focus();
}

// --- Hinweiseingabe (nur Info, kein Eingabefeld) ---
function showHintPhase() {
    showSection("hintPhase");
    document.getElementById("hintNextBtn").focus();
}
document.getElementById("hintNextBtn").onclick = () => {
    setTimeout(showVotePhase, 200);
};

// --- Abstimmungsrunde ---
function showVotePhase() {
    showSection("votePhase");
    votePlayers.innerHTML = "";
    voted = [];
    voteSelections = Array(players.length).fill(null);
    votingPlayerIdx = 0;
    showVotingPlayer();
    submitVotesBtn.disabled = false;
}
let votingPlayerIdx = 0;
function showVotingPlayer() {
    // Zeige, welcher Spieler gerade abstimmt
    votePlayers.innerHTML = "";
    const info = document.createElement("div");
    info.style.marginBottom = "8px";
    info.style.fontWeight = "600";
    info.style.color = "#60a5fa";
    info.textContent = `Abstimmung für: ${players[votingPlayerIdx].name}`;
    votePlayers.appendChild(info);

    players.forEach((p, idx) => {
        const btn = document.createElement("div");
        btn.className = "vote-option";
        btn.textContent = `${p.name}`;
        btn.onclick = () => selectVote(idx, btn);
        votePlayers.appendChild(btn);
    });
}
function selectVote(idx, btn) {
    // Nur eine Auswahl pro Spieler
    Array.from(votePlayers.children).forEach(child => child.classList.remove("selected"));
    btn.classList.add("selected");
    voteSelections[votingPlayerIdx] = idx;
}
submitVotesBtn.onclick = () => {
    if (voteSelections[votingPlayerIdx] === null) return;
    voted.push(voteSelections[votingPlayerIdx]);
    votingPlayerIdx++;
    if (votingPlayerIdx < players.length) {
        showVotingPlayer();
    } else {
        votingPlayerIdx = 0;
        setTimeout(evaluateVotes, 400);
    }
};

// --- Abstimmung auswerten ---
function evaluateVotes() {
    // Wer hat die meisten Stimmen?
    const counts = Array(players.length).fill(0);
    voted.forEach(idx => counts[idx]++);
    const maxVotes = Math.max(...counts);
    const suspects = [];
    counts.forEach((c, idx) => { if (c === maxVotes) suspects.push(idx); });
    // Bei Gleichstand: zufällig einen wählen
    const accusedIdx = suspects[Math.floor(Math.random() * suspects.length)];
    // Wenn alle Imposter sind, gewinnt automatisch die Imposter-Seite
    if (imposterIndex === -1) {
        showResultPhase(true, accusedIdx, "allImposters");
    } else if (accusedIdx === imposterIndex) {
        showImposterGuessPhase();
    } else {
        showResultPhase(false, accusedIdx);
    }
}

// --- Imposter darf raten ---
function showImposterGuessPhase() {
    showSection("imposterGuessPhase");
    imposterGuessInput.value = "";
    submitImposterGuessBtn.disabled = false;
    imposterGuessInput.disabled = false;
    setTimeout(() => imposterGuessInput.focus(), 100);
}
submitImposterGuessBtn.onclick = () => {
    imposterGuess = imposterGuessInput.value.trim();
    if (!imposterGuess) return;
    const win = imposterGuess.toLowerCase() === secretWord.toLowerCase();
    showResultPhase(win, imposterIndex, true);
};

// --- Ergebnisanzeige ---
function showResultPhase(imposterWin, accusedIdx, special = null) {
    showSection("resultPhase");
    if (special === "allImposters") {
        resultTitle.textContent = "Alle waren Imposter!";
        resultDetails.innerHTML = `Niemand kann das Wort wissen.<br><span style="color:#34d399;font-weight:600;">Das geheime Wort wäre gewesen: "${secretWord}"</span>`;
    } else if (imposterWin && arguments.length === 3) {
        resultTitle.textContent = "Imposter gewinnt!";
        resultDetails.innerHTML = `Der Imposter <b>${players[imposterIndex].name}</b> hat das geheime Wort <span style="color:#34d399;font-weight:600;">"${secretWord}"</span> richtig erraten.`;
    } else if (!imposterWin && arguments.length === 3) {
        resultTitle.textContent = "Crew gewinnt!";
        resultDetails.innerHTML = `Der Imposter <b>${players[imposterIndex].name}</b> hat das Wort nicht erraten.<br>Das geheime Wort war <span style="color:#34d399;font-weight:600;">"${secretWord}"</span>.`;
    } else {
        resultTitle.textContent = "Imposter gewinnt!";
        resultDetails.innerHTML = `Der Spieler <b>${players[accusedIdx].name}</b> wurde fälschlich gewählt.<br>Der Imposter war <b>${players[imposterIndex].name}</b>.<br>Das geheime Wort war <span style="color:#34d399;font-weight:600;">"${secretWord}"</span>.`;
    }
}

// --- Neustart ---
restartBtn.onclick = () => {
    resetGameVars();
    updateNameInputs();
    showSection("setup");
    setTimeout(() => {
        const firstInput = document.getElementById("playerName0");
        if (firstInput) firstInput.focus();
    }, 100);
};

// --- Initialisierung ---
showSection("setup");
