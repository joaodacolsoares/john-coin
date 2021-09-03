import { ec } from "elliptic";
import Block from "./Block";
import BlockChain from "./BlockChain";
import Transaction from "./Transaction";

const JSON_SPACE_SIZE = 2;

const ellipticCurve = new ec('secp256k1')

const myKey = ellipticCurve.keyFromPrivate('cc206dbb99ff2c8749a070e057255a82cf1a322ee470defe9e721afa9c2a4541');
const myWalletAddress = myKey.getPublic('hex');

const myBlockChain = new BlockChain();

const transaction1 = new Transaction(myWalletAddress, "address2", 10);
transaction1.signTransaction(myKey)
myBlockChain.addTransaction(transaction1)

myBlockChain.minePendingTransactions(myWalletAddress)
console.log("address1 balance = ", myBlockChain.getBalanceOfAddress(myWalletAddress))

console.log(JSON.stringify(myBlockChain, null, JSON_SPACE_SIZE))
console.log('Block Chain is valid? ', myBlockChain.isChainValid() ? 'yes' : 'no')