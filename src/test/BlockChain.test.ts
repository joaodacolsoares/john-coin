import BlockChain from "../BlockChain"
import Transaction from "../Transaction"

test('chain should initialize with Genesis block', () => {
  const blockChain = new BlockChain()
  
  expect(blockChain.isChainValid()).toBe(true)
  expect(blockChain.chain[0].previousHash).toBe('')
  expect(blockChain.chain[0].transactions).toStrictEqual([])
})

test('add new valid transaction', () => {
  const blockChain = new BlockChain()
  expect(blockChain.pendingTransactions).toHaveLength(0)

  const transaction = new Transaction('aba', 'cate', 10);
  transaction.isValid = jest.fn(() => true)
  blockChain.addTransaction(transaction)
  
  expect(blockChain.pendingTransactions).toHaveLength(1)
  expect(blockChain.pendingTransactions[0]).toBe(transaction)
})

test('add new transaction with invalid to address', () => {
  const blockChain = new BlockChain()
  expect(blockChain.pendingTransactions).toHaveLength(0)

  const transaction = new Transaction('aba', '', 100)
  
  expect(() => blockChain.addTransaction(transaction)).toThrow(Error)
})

test('add new transaction with invalid from address', () => {
  const blockChain = new BlockChain()
  expect(blockChain.pendingTransactions).toHaveLength(0)

  const transaction = new Transaction('', 'cate', 100)
  
  
  expect(() => blockChain.addTransaction(transaction)).toThrow(Error)
})

test('add new transaction with invalid transaction', () => {
  const blockChain = new BlockChain()
  expect(blockChain.pendingTransactions).toHaveLength(0)

  const transaction = new Transaction('aba', 'cate', 100)
  transaction.isValid = jest.fn(() => false)
  
  expect(() => blockChain.addTransaction(transaction)).toThrow(Error)
})

test('get balance from some address', () => {
  const blockChain = new BlockChain()

  const transaction = new Transaction('aba', 'cate', 10);
  transaction.isValid = jest.fn(() => true)
  blockChain.addTransaction(transaction)

  blockChain.minePendingTransactions('aba')
  
  expect(blockChain.getBalanceOfAddress('aba')).toBe(blockChain.miningReward - 10)
  expect(blockChain.getBalanceOfAddress('cate')).toBe(10)
})

test('check if correct chain is valid', () => {
  const blockChain = new BlockChain()

  const transaction = new Transaction('aba', 'cate', 10);
  transaction.isValid = jest.fn(() => true)

  blockChain.addTransaction(transaction)
  blockChain.minePendingTransactions('some')
  
  expect(blockChain.isChainValid()).toBeTruthy()
})

test('check if chain with invalid transaction is invalid', () => {
  const blockChain = new BlockChain()

  const transaction = new Transaction('aba', 'cate', 10);
  transaction.isValid = jest.fn()
    .mockImplementationOnce(() => true)
    .mockImplementationOnce(() => false)

  blockChain.addTransaction(transaction)
  blockChain.minePendingTransactions('some')
  
  expect(blockChain.isChainValid()).toBeFalsy()
})

test('check if chain with invalid block hash is invalid', () => {
  const blockChain = new BlockChain()

  const transaction = new Transaction('aba', 'cate', 10);
  transaction.isValid = jest.fn(() => true)

  blockChain.addTransaction(transaction)
  blockChain.minePendingTransactions('some')
  
  blockChain.chain[1].hash = 'abacate'
  expect(blockChain.isChainValid()).toBeFalsy()
})

test('check if chain with invalid block previous hash is invalid', () => {
  const blockChain = new BlockChain()

  const transaction = new Transaction('aba', 'cate', 10);
  transaction.isValid = jest.fn(() => true)

  blockChain.addTransaction(transaction)
  blockChain.minePendingTransactions('some')
  
  blockChain.chain[1].previousHash = 'abacate'
  blockChain.chain[1].hash = blockChain.chain[1].calculateHash()

  expect(blockChain.isChainValid()).toBeFalsy()
})