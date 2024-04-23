var selectedChoice;
var choices = ['rock', 'paper', 'scissors', 'lizard', 'spock'];
var winTree = {
    rock: {
        win: ['scissors', 'lizard'],
    },
    paper: {
        win: ['rock', 'spock'],
    },
    scissors: {
        win: ['paper', 'lizard'],
    },
    lizard: {
        win: ['paper', 'spock'],
    },
    spock: {
        win: ['scissors', 'rock'],
    },
}

var userWinCounts = 0;
var userLoseCounts = 0;

function onChoiceClicked(_self) {
    selectedChoice = _self.dataset.type;
    var items = document.querySelectorAll(".circle");
    if (items != null) {
        items.forEach(function(item) {
            if (item.dataset.type === selectedChoice) {
                item.classList.remove("inactive");
                item.classList.add("active");
            } else {
                item.classList.remove("active");
                item.classList.add("inactive");
            }
        });
    }

    var btn = document.querySelector('.check-button');
    if (btn != null) {
        btn.disabled = false;
    }

    clearResult();
}

function onCheckClicked() {
    var btn = document.querySelector('.check-button');
    if (btn != null && btn.disabled === false && selectedChoice != null) {
        calculateOpponentChoice();
    }
}

function calculateOpponentChoice() {
    var item = document.querySelector(".circle.unknown-icon");
    if (item != null) {
        item.children[0].className = '';

        var intervalCount = 0;
        var intervalSpeed = 100;

        var interval = setInterval(() => {
            intervalCount++;
            var choice = choices[Math.floor(Math.random()*choices.length)];
            item.children[0].className = '';
            item.children[0].className = 'icon fas fa-hand-' + choice + ' fa-4x';
            if (intervalCount > 10) {
                intervalSpeed = 200;
            }
            
            if (intervalCount > 20) {
                clearInterval(interval);
                document.getElementById('computer-choice').innerHTML = choice;
                getResult(choice);
                console.log('final choice: ' + choice);
            }
        }, intervalSpeed);
    }

}

function getResult(computerChoice) {
    // console.log('selected: ' + selectedChoice + ' computer:' + computerChoice);
    var resultContainer = document.getElementById('result');
    if (resultContainer) {
        clearResult();

        var resultIcon = document.createElement('i');
        var result = calculateResult(selectedChoice, computerChoice);
        var resultText = '';
        if (result === 1) {
            // win
            resultIcon.className = 'result-icon fas fa-thumbs-up fa-8x';
            resultText = getResultText(selectedChoice, computerChoice);
            userWinCounts++;
        } else if (result === -1) {
            // lose
            resultIcon.className = 'result-icon fas fa-thumbs-down fa-8x';
            resultText = getResultText(computerChoice, selectedChoice);
            userLoseCounts++;
        } else {
            // tie
            resultIcon.className = 'result-icon fas fa-question fa-8x';
            resultText = 'Tie! Try again...';
        }

        resultContainer.appendChild(resultIcon);
        var resultTextElement = document.createElement('h2');
        resultTextElement.classList.add('result-text');
        resultTextElement.innerHTML = resultText;
        resultContainer.appendChild(resultTextElement);

        document.getElementById('result-win-count').innerHTML = userWinCounts;
        document.getElementById('result-lose-count').innerHTML = userLoseCounts;
    }
}


/*
1 win
-1 lose
0 tie
*/
function calculateResult (selectedChoice, computerChoice) {
    if (selectedChoice === computerChoice) {
        return 0;
    }

    var winChoices = winTree[selectedChoice].win;
    if (winChoices != null && winChoices.includes(computerChoice)) {
        return 1;
    }

    return -1;
}

function clearResult () {
    var resultContainer = document.getElementById('result');
    if (resultContainer) {
        resultContainer.replaceChildren();
    }
}

function clearSelection () {
    var items = document.querySelectorAll(".circle");
    if (items != null) {
        items.forEach(function(item) {
            item.classList.remove("inactive");
            item.classList.remove("active");
        });
    }

    var btn = document.querySelector('.check-button');
    if (btn != null) {
        btn.disabled = true;
    }
}

function getResultText(selectedChoice, computerChoice) {
    switch (selectedChoice) {
        case 'rock': return computerChoice === 'lizard' ? 'Rock crushes Lizard' : 'Rock crushes Scissors';
        case 'paper': return computerChoice === 'rock' ? 'Paper covers Rock' : 'Paper disproves Spock';
        case 'scissors': return computerChoice === 'paper' ? 'Scissors cuts Paper' : 'Scissors decapitates Lizard';
        case 'lizard': return computerChoice === 'paper' ? 'Lizard eats Paper' : 'Lizard poisons Spock';
        case 'spock': return computerChoice === 'scissors' ? 'Spock smashes Scissors' : 'Spock vaporizes Scissors';
    }
}