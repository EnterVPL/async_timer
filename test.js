var test = {
    currentPoints: 0,
    maxPoint: 0
};

test.maxPoint++;
AsyncTimer.timer1.onstart = async (timer) => {
    test.currentPoints++;
    console.log(timer.id + " is start!");
}

test.maxPoint++;
AsyncTimer.timer1.onpause = async (timer) => {
    test.currentPoints++;
    console.log(timer.id + " is pasue!");
}

test.maxPoint++;
AsyncTimer.timer1.onstop = async (timer) => {
    test.currentPoints++;
    console.log(timer.id + " is stop!");
}

test.maxPoint++;
AsyncTimer.timer1.onrestart = async (timer) => {
    test.currentPoints++;
    console.log(timer.id + " is stop!");
}

test.maxPoint++;
AsyncTimer.timer1.onresume = async (timer) => {
    test.currentPoints++;
    console.log(timer.id + " is resuming!");
}

test.maxPoint++;
var isPointset = false;
AsyncTimer.timer1.ononceinawhile("2s", async (timer) => {
    if (!isPointset) {
        isPointset = true;
        test.currentPoints++;
        console.log(test);
    }
    console.log(timer.id + " is ononceinawhile (2s)!");
});

AsyncTimer.timer1.start();
AsyncTimer.timer1.stop();
AsyncTimer.timer1.pause();
AsyncTimer.timer1.resume();
AsyncTimer.timer1.restart();

AsyncTimer.timer2.start();
AsyncTimer.timer2.stop();
AsyncTimer.timer2.pause();
AsyncTimer.timer2.resume();
AsyncTimer.timer2.restart();


console.log(test);