const gameBoard = document.getElementById('game');
const kittenWidth = 62.5;
let currentTurn = 0;

const updateTurn= () => {
    if (currentTurn === 0){
        currentTurn = 1;
    } else {
        currentTurn = 0;
    }
};

const checkForTriples = (positions) => {

}

const makeNewFeline = (top, left, catType = 0) => {
    const blankFeline = document.createElement('div');
    blankFeline.classList.add(`feline`);
    blankFeline.classList.add(`player-${currentTurn}`);
    blankFeline.classList.add(`${catType === 0 ? 'kitten' : 'cat'}`);
    blankFeline.style.cssText = `top: ${top * 12.5}%; left: ${left * 12.5}%;`;
    return blankFeline;
};

const boop = (x, y) => {
    const kittens = document.getElementsByClassName('feline');
    const kittyPositions = [];
    
    for (let i = 0; i < kittens.length; i++) {
        const kitten = kittens[i];
        const top = parseFloat(kitten.style.top.slice(0, -1));
        const left = parseFloat(kitten.style.left.slice(0, -1));
        kittyPositions.push([top, left]);
    }

    for (let i = 0; i < kittens.length; i++) {
        const kitten = kittens[i];
        const top = parseFloat(kitten.style.top.slice(0, -1));
        const left = parseFloat(kitten.style.left.slice(0, -1));
        if (kittyShouldBoop(top, left, x, y)) {
            let newTop = `${top}%`
            let newLeft = `${left}%`

            if ((top / 12.5) === (y + 1)) {
                newTop = `${top + 12.5}%`;    
            }
            if ((top / 12.5) === (y - 1)) {
                newTop = `${top - 12.5}%`;
            }
            if ((left / 12.5) === (x + 1)) {
                newLeft = `${left + 12.5}%`;
            }
            if ((left / 12.5) === (x - 1)) {
                newLeft = `${left - 12.5}%`;
            }

            if (spaceNotOccupied(kittyPositions, [newTop, newLeft])){
                kitten.style.top = newTop;
                kitten.style.left = newLeft;
            }
            if (newTop === '0%'|| newTop === '87.5%'|| newLeft === '0%' || newLeft === '87.5%' ) {
                setTimeout(() => {
                    kitten.remove();
                }, 1250);
            }
            setTimeout(() => {
                checkForTripples()
            }, 2500);
        }

    }

    setTimeout(() => {
        if (!kittens)return;
        checkForTriples(kittens);
    }, 1500);
}

const kittyShouldBoop = (top, left, x, y) => {
    return (((top / 12.5) === (y + 1)) || ((top / 12.5) === (y - 1)) || ((top / 12.5) === (y))) 
    && ((left / 12.5 === (x + 1) || left / 12.5 === (x - 1)) || ((left / 12.5) === (x))) 
    && !(((top / 12.5) === (y)) && ((left / 12.5) === (x)));
}
// big bugs here. 
const kittyHasNeighbours = (kitty1,kitty2) => {
    return (
            (
                ((kitty1[0] / 12.5) === (kitty2[1] / 12.5 + 1)) 
                || ((kitty1[0] / 12.5) === (kitty2[1] / 12.5 - 1)) 
                || ((kitty1[0] / 12.5) === (kitty2[1] / 12.5))
            ) 
            && 
            (
                ((kitty1[1] / 12.5) === (kitty2[0] / 12.5 + 1))
                || ((kitty1[1] / 12.5) === (kitty2[0] / 12.5 - 1)) 
                || ((kitty1[1] / 12.5) === (kitty2[0] / 12.5))
            )
        );
}

const spaceNotOccupied = (kittyPos, newPos) => !kittyPos.filter(it => `${it[0]}%` === newPos[0] && `${it[1]}%` === newPos[1]).length;

const checkForTripples = (kittens) => {
    const newKittenPositions = []
    if (!kittens)return;

    for (let i = 0; i < kittens.length; i++){
        const top = kittens[i].style.top;
        const left = kittens[i].style.left;
        const player = kittens[i].classList.contains('player-0') ? 0 : 1;
        // console.log('classlist: ', kittens[i].classList)
        newKittenPositions[`${top}${left}`] = {top, left, player};
        // console.log('kittens after', i, kittens[i])
    };

    const locations = Object.keys(newKittenPositions);
    const thing = locations.filter((a, i)=> {
        console.log('==================')
        const innerThing = locations.map((b, j) => {
            if (i === j) return 0

            const first = a.split('%')
            const second = b.split('%')

            first.pop()
            second.pop()

            
            console.log('--------------')
            console.log('a: ', first);
            console.log('b: ', second);
            const hasFriendlyKittys = kittyHasNeighbours(first, second);
            console.log('hasFriendlyKittys', hasFriendlyKittys);
        })
    })
}
gameBoard.addEventListener('click', (e) => {
    const newX = Math.floor(e.x / kittenWidth);
    const newY = Math.floor(e.y / kittenWidth);
    const newFeline = makeNewFeline(newY, newX);

    gameBoard.appendChild(newFeline);
    boop(newX, newY);
    updateTurn();
}, false)
