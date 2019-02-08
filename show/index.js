window.addEventListener("load", async function () {
    const queryStr = location.search.slice(1);
    if (!queryStr) return;

    const query = queryStr.split("&").reduce((o, kv) => {
        const [k, v] = kv.split("=");
        o[k] = +v;
        if (!o[k]) {
            alert(`参数${k}错误`);
            throw new Error(`参数${k}错误`);
        }
        return o;
    }, {});
    if (query.height > 0 && query.max > 0 || query.num > 0) {
        $(".lottery-info").height.value = query.height;
        $(".lottery-info").max.value = query.max;
        $(".lottery-info").num.value = query.num;
        $(".winning-info").style.display = "block";

        const lastBlock = await getBlockInfoOnce(query.height);
        if (!lastBlock) {
            alert(`区块${query.height}不存在`);
            throw new Error(`区块${query.height}不存在`);
        }
        const ht = lastBlock.height;
        const tm = formatTime(lastBlock.timestamp);
        const hs = lastBlock.hash;
        const rd = randomList(hs, query.max, query.num).join(", ");

        $("#block-height").innerHTML = blockLink(ht);
        $("#block-hash").innerText = hs;
        $("#block-time").innerText = tm;
        $("#open-winning").innerText = rd;
    }
});
