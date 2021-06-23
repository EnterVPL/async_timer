const AsyncTimerProtos = function () {
    const timers = document.querySelectorAll("async_timer");
    for (let timer of timers) {
        timer.timeouts = {};
        this.addTimerFeatures(timer);
        this[timer.id] = timer;
    }
}

AsyncTimerProtos.prototype = {
    get timeMultipler() {
        return {
            "s": 1000,
            "m": 60000,
            "h": 3600000
        }
    }
}

AsyncTimerProtos.prototype.addTimer = async function (elemid) {

}

AsyncTimerProtos.prototype.addTimerFeatures = async function (timer) {
    await this.createEmptyEvents(timer);

    timer.clearTimeouts = async () => {
        for (let timeoutid in timer.timeouts) {
            clearTimeout(timer.timeouts[timeoutid].timeout);
        }
    }

    timer.resumeTimeouts = async () => {
        for (let timeoutid in timer.timeouts) {
            timer.timeouts[timeoutid].startWhile();
        }
    }

    timer.deleteTimeouts = async () => {
        await timer.clearTimeouts();
        for (let timeoutid in timer.timeouts) {
            delete timer.timeouts[timeoutid];
        }
    }

    timer.start = async () => {
        timer.onstart(timer);
    }

    timer.stop = async () => {
        timer.clearTimeouts();
        timer.onstop(timer);
    }

    timer.restart = async () => {
        timer.onrestart(timer);
    }

    timer.pause = async () => {
        timer.clearTimeouts();
        timer.onpause(timer);
    }

    timer.resume = async () => {
        timer.resumeTimeouts();
        timer.onresume(timer);
    }

}

AsyncTimerProtos.prototype.createEmptyEvents = async function (timer) {
    const that = this;
    timer.onstart = async function (timer) { };
    timer.onstop = async function (timer) { };
    timer.onrestart = async function (timer) { };
    timer.onpause = async function (timer) { };
    timer.onresume = async function (timer) { };
    timer.ononceinawhile = async function (delay, handler) {
        const nDelay = parseInt(delay) * that.timeMultipler[delay[delay.length - 1]];
        const tIndex = "timeout" + delay + new Date().getTime();
        timer.timeouts[tIndex] = {
            startWhile: async function () {
                timer.timeouts[tIndex].timeout = setTimeout(function () {
                    handler(timer);
                    timer.timeouts[tIndex].startWhile();
                }, nDelay);
            }
        }
        timer.timeouts[tIndex].startWhile();
    };

    timer.onend = async function (timer) {
        timer.clearTimeouts();
    };
}

const AsyncTimer = new AsyncTimerProtos();