import Block from "../Block"
import BlockChain from "../BlockChain"
import BlockData from "../BlockData"


test('chain with Genesis block', () => {
  const blockChain = new BlockChain()
  expect(blockChain.isChainValid()).toBe(true)
})

test('chain with one valid block', () => {
  const blockChain = new BlockChain()
  blockChain.addBlock(new Block(1, new Date('02/07/2017'), new BlockData("John Doe", 100)));

  expect(blockChain.chain[1].previousHash).toStrictEqual(blockChain.chain[0].hash)
  expect(blockChain.isChainValid()).toBe(true)
})

test('chain with amount changes in existing block', () => {
  const blockChain = new BlockChain()
  blockChain.addBlock(new Block(1, new Date('02/07/2017'), new BlockData("John Doe", 100)));
  blockChain.addBlock(new Block(2, new Date('06/07/2017'), new BlockData("Nico Boe", 200)));
  blockChain.chain[1].data.amount = 500;

  expect(blockChain.chain[1].previousHash).toStrictEqual(blockChain.chain[0].hash)
  expect(blockChain.chain[2].previousHash).toStrictEqual(blockChain.chain[1].hash)
  expect(blockChain.isChainValid()).toBe(false)
})

test('chain with previousHash changes in existing block', () => {
  const blockChain = new BlockChain()
  blockChain.addBlock(new Block(1, new Date('02/07/2017'), new BlockData("John Doe", 100)));
  blockChain.addBlock(new Block(2, new Date('06/07/2017'), new BlockData("Nico Boe", 200)));
  
  blockChain.chain[2].previousHash = blockChain.chain[0].hash
  blockChain.chain[2].hash = blockChain.chain[2].calculateHash()
  
  expect(blockChain.chain[1].previousHash).toStrictEqual(blockChain.chain[0].hash)
  expect(blockChain.chain[2].previousHash).not.toStrictEqual(blockChain.chain[1].hash)
  expect(blockChain.isChainValid()).toBe(false)
})