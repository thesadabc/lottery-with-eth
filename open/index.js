window.addEventListener("load", async function () {
    const blockInfoTbody = document.querySelector("#tb-block-info tbody");
    let blockInfoLoading = document.querySelector("#tb-block-info .loading");

    const query = location.search.slice(1).split("&")
        .reduce((o, kv) => {
            const [k, v] = kv.split("=");
            o[k] = +v;
            if (!o[k]) {
                alert(`参数${k}错误`);
                blockInfoLoading.remove();
                blockInfoLoading = null;
                throw new Error(`参数${k}错误`);
            }
            return o;
        }, {});
    const lastHight = await getBlockHeight();
    document.querySelector("#cblock-height").innerHTML = blockLink(lastHight);

    for (let i = 0; i < query.opennum + 1; i++) {
        const lastBlock = await getBlockInfo(lastHight + i);
        const ht = lastBlock.height;
        const tm = formatTime(lastBlock.timestamp);
        const hs = lastBlock.hash;
        const rd = randomList(hs, query.max, query.num).join(", ");
        const tdElStr = `<td><span>${blockLink(ht)}</span></td><td><span>${tm}</span></td><td><span>${hs}</span></td><td><span>${rd}</span></td>`;
        if (i === 0) {
            blockInfoLoading.insertAdjacentHTML("afterEnd", `<tr>${tdElStr}</tr>`);
            document.querySelector("#cblock-height").innerHTML = blockLink(ht);
            document.querySelector("#cblock-hash").innerText = hs;
            document.querySelector("#cblock-time").innerText = tm;
            document.querySelector("#open-height").innerHTML = blockLink(ht + query.opennum);
            document.querySelector("#open-max").innerText = query.max;
            document.querySelector("#open-num").innerText = query.num;
        } else if (query.opennum !== i) {
            blockInfoLoading.insertAdjacentHTML("afterEnd", `<tr>${tdElStr}</tr>`);
        } else {
            blockInfoLoading.insertAdjacentHTML("afterEnd", `<tr class="final">${tdElStr}</tr>`);
        }
    }
    blockInfoLoading.remove();
    blockInfoLoading = null;
});
