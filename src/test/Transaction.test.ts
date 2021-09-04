import { SHA256 } from "crypto-js";
import KeyGenerator from "../KeyGenerator";
import Transaction from "../Transaction"

test('transaction is generating hash with correct base fields', () => {
  const transaction = new Transaction('aba', 'cate', 10);

  const hash = transaction.calculateHash()
  expect(hash).toBe(SHA256(transaction.from + transaction.to + transaction.amount).toString())
})

test('transaction with null from is valid', () => {
  const transaction = new Transaction(null, 'cate', 10);

  expect(transaction.isValid()).toBeTruthy()
})

test('transaction with null signature is invalid', () => {
  const transaction = new Transaction('aba', 'cate', 10);
  transaction.signature = null;

  expect(() => transaction.isValid()).toThrow(Error)
})

test('transaction with empty signature is invalid', () => {
  const transaction = new Transaction('aba', 'cate', 10);
  transaction.signature = '';

  expect(() => transaction.isValid()).toThrow(Error)
})

test('transaction with correct signature is valid', () => {
  const keyPair = KeyGenerator.generateKeyPair()
  
  const transaction = new Transaction(keyPair.getPublic('hex'), 'cate', 10);
  transaction.signTransaction(keyPair)

  expect(transaction.isValid()).toBeTruthy()
})

test('transation sign with incorrect key pair throws error', () => {
  const keyPair = KeyGenerator.generateKeyPair()
  
  const transaction = new Transaction('wrong address', 'cate', 10);
  expect(() => transaction.signTransaction(keyPair)).toThrow(Error)
})