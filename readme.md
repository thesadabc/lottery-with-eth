# lottery-with-eth

一个基于ETH区块hash的抽奖简单demo, [live demo](https://thesadabc.github.io/lottery-with-eth/start)

## 原理

随机数使用未来某区块hash值作为随机数种子, 进行二次计算得到最终结果. [算法详细](./res/random.js)

区块信息相关数据来自[etherscan](https://etherscan.io)
