import { SHA256 } from "crypto-js";
import Block from "../Block"
import Transaction from "../Transaction";

test('block is generating hash with correct base fields', () => {
  const block = new Block(new Date(), [], 'prev hash');
  const hash = block.calculateHash()
  
  const message = block.timestamp + block.previousHash + JSON.stringify(block.transactions) + block.nonce;
  expect(hash).toBe(SHA256(message).toString())
})

test('block with valid transactions', () => {
  const transaction = new Transaction(null, 'cate', 10);
  transaction.isValid = () => true
  const block = new Block(new Date(), [transaction], 'prev hash');
  
  expect(block.hasValidTransaction()).toBeTruthy()
})

test('block with invalid transactions', () => {
  const transaction = new Transaction('', 'cate', 10);
  transaction.isValid = () => false
  const block = new Block(new Date(), [transaction], 'prev hash');
  
  expect(block.hasValidTransaction()).toBeFalsy()
})

test('mine block with determined difficulty', () => {
  const block = new Block(new Date(), [], 'prev hash');
  block.mineBlock(1)
  
  expect(block.hash[0]).toBe('0')
})