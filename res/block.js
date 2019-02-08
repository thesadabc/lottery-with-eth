function sleep(sec) {
    return new Promise(resolve => setTimeout(resolve, sec * 1000));
}
function blockLink(height) {
    return height.toString().link(`https://etherscan.io/block/${height}`);
}

async function getBlockHeight() {
    const url = "https://api.etherscan.io/api?module=proxy&action=eth_blockNumber&apikey=YourApiKeyToken";
    const resp = await fetch(url);
    const {result} = await resp.json();
    return parseInt(result, 16);
}

async function getBlockInfoOnce(height) {
    const heightHex = "0x" + height.toString(16);
    const url = `https://api.etherscan.io/api?module=proxy&action=eth_getBlockByNumber&tag=${heightHex}&boolean=true&apikey=YourApiKeyToken`;
    const resp = await fetch(url);
    const data = await resp.json();
    const result = data.result;
    if (!result) return null;
    return {
        "hash": result.hash,
        height,
        "timestamp": parseInt(result.timestamp, 16) * 1000,
        "link": `https://etherscan.io/block/${height}`,
    };
}

async function getBlockInfo(height) {
    let retry = 1;
    while (1) {
        console.log(`区块${height}第${retry}次请求`);
        const result = await getBlockInfoOnce(height);
        if (result) return result;
        retry += 1;
        await sleep(3);
    }
}
