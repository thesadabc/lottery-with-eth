function random(hash, max) {
    if (max > 0xFFFFFF) {
        alert("抽奖最大范围不能超过16777215");
        throw new Error("抽奖最大范围不能超过16777215");
    }
    return parseInt("0x" + hash.slice(-6), 16) % max;
}

function randomList(seedHash, max, num) {
    const group = Array(max).fill().map((_, i) => i);
    const ret = [];
    for (let i = 0; i < num; i++) {
        const rawNum = random(md5(seedHash + i), max);
        ret.push(group.splice(rawNum, 1)[0] + 1);
        max -= 1;
    }
    return ret;
}
