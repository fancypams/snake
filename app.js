document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid')

    // build div grid using javascript
    function createDiv() {
        var gridDiv = document.createElement("div")
        return gridDiv
    }

    function addToGrid() {
        myDivs = [],
            i = 0,
            numOfDivs = 100

        for (i; i < numOfDivs; i += 1) {
            myDivs.push(createDiv())
            grid.appendChild(myDivs[i]);
        }
    }
    addToGrid()

    // warn about screen size change - considered doing a page reload for every resize change but decided to make the screen resize dynamically instead
    // const warningPrompt = document.querySelector('.warning-prompt')
    // const okBtn = document.querySelector('.ok')
    // warningPrompt.setAttribute('style', 'display: none')
    // var onloadWindowSize = document.documentElement.clientWidth
    // window.addEventListener('resize', () => {
    //     if ('resize' != onloadWindowSize) {
    //         warningPrompt.setAttribute('style', 'display: block')
    //         okBtn.addEventListener('click', () => {
    //             location.reload()
    //         })
    //     }
    // })

    const squares = document.querySelectorAll('.grid div')
    const scoreDisplay = document.querySelector('span')
    const startBtn = document.querySelector('.start')

    const width = 10
    let currentIndex = 0
    let peacockIndex = 0
    let currentKenneth = [2, 1, 0] // 2 is tail, 0 is head
    let score = 0
    let speed = 0.9
    let intervalTime = 0
    let interval = 0


    // start and restart game
    function startGame() {
        currentKenneth.forEach(index => squares[index].classList.remove('kenneth'))
        squares[peacockIndex].classList.remove('peacock')
        clearInterval(interval)
        score = 0
        randomPeacock()
        direction = 1
        scoreDisplay.innerText = score
        intervalTime = 1000
        currentKenneth = [2, 1, 0]
        currentIndex = 0
        currentKenneth.forEach(index => squares[index].classList.add('kenneth'))
        interval = setInterval(moveOutcomes, intervalTime)
    }


    // possible outcomes
    function moveOutcomes() {

        // fail
        if (
            (currentKenneth[0] + width >= (width * width) && direction === width) || // hits bottom
            (currentKenneth[0] % width === width - 1 && direction === 1) || // hits right
            (currentKenneth[0] % width === 0 && direction === -1) || // hits left
            (currentKenneth[0] - width < 0 && direction === -width) || // hits top
            squares[currentKenneth[0] + direction].classList.contains('kenneth') // hits self
        ) {
            return clearInterval(interval)
        }

        const tail = currentKenneth.pop() // removes tail
        squares[tail].classList.remove('kenneth')
        currentKenneth.unshift(currentKenneth[0] + direction) // new direction

        // gets peacock
        if (squares[currentKenneth[0]].classList.contains('peacock')) {
            squares[currentKenneth[0]].classList.remove('peacock')
            squares[tail].classList.add('kenneth')
            currentKenneth.push(tail)
            randomPeacock()
            score++
            scoreDisplay.textContent = score
            clearInterval(interval)
            intervalTime = intervalTime * speed
            interval = setInterval(moveOutcomes, intervalTime)
        }
        squares[currentKenneth[0]].classList.add('kenneth')
    }


    // new peacock
    function randomPeacock() {
        do {
            peacockIndex = Math.floor(Math.random() * squares.length)
        } while (squares[peacockIndex].classList.contains('kenneth')) //making sure peacocks dont appear on the kenneth
        squares[peacockIndex].classList.add('peacock')
    }


    // arrow keyboard functions
    function control(e) {
        squares[currentIndex].classList.remove('kenneth')

        if (e.keyCode === 39) {
            direction = 1
        } else if (e.keyCode === 38) {
            direction = -width
        } else if (e.keyCode === 37) {
            direction = -1
        } else if (e.keyCode === 40) {
            direction = +width
        }
    }

    // mobile arrow button functions
    const upBtn = document.querySelector('.up')
    const downBtn = document.querySelector('.down')
    const rightBtn = document.querySelector('.right')
    const leftBtn = document.querySelector('.left')

    function moveRight() {
        squares[currentIndex].classList.remove('kenneth')
        direction = 1
    }

    function moveLeft() {
        squares[currentIndex].classList.remove('kenneth')
        direction = -1
    }

    function moveUp() {
        squares[currentIndex].classList.remove('kenneth')
        direction = -width
    }

    function moveDown() {
        squares[currentIndex].classList.remove('kenneth')
        direction = +width
    }

    upBtn.addEventListener('click', moveUp)
    downBtn.addEventListener('click', moveDown)
    leftBtn.addEventListener('click', moveLeft)
    rightBtn.addEventListener('click', moveRight)
    document.addEventListener('keyup', control)
    startBtn.addEventListener('click', startGame)
})