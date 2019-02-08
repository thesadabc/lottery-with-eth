window.addEventListener("load", async function () {
    const lastHight = await getBlockHeight();
    document.getElementById("block-height").innerHTML = blockLink(lastHight);

    const lastBlock = await getBlockInfo(lastHight);
    document.getElementById("block-hash").innerText = lastBlock.hash;
    document.getElementById("block-time").innerText = formatTime(lastBlock.timestamp);
});
