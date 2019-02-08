function formatTime(date, format = "yyyy-MM-dd hh:mm:ss") {
    date = new Date(date);
    const map = {"M": date.getMonth() + 1, "d": date.getDate(), "h": date.getHours(), "m": date.getMinutes(), "s": date.getSeconds(), "q": Math.floor((date.getMonth() + 3) / 3), "S": date.getMilliseconds(), "y": date.getFullYear()};
    return format.replace(/([yMdhmsqS])+/g, (all, t) => (map[t] + "").padStart(all.length, "0").slice(-all.length));
}

function $(s) {
    return document.querySelector(s);
}
