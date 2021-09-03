import BlockChain from "./BlockChain";
import KeyGenerator from "./KeyGenerator";
import Transaction from "./Transaction";

const JSON_SPACE_SIZE = 2;

const myKeyPair = KeyGenerator.generateKeyPair();
const myWalletAddress = myKeyPair.getPublic('hex');

const myBlockChain = new BlockChain();

const transaction1 = new Transaction(myWalletAddress, "carteiraNicolasProkopetz", 10);
transaction1.signTransaction(myKeyPair)

myBlockChain.addTransaction(transaction1)

myBlockChain.minePendingTransactions(myWalletAddress)
console.log("address1 balance = ", myBlockChain.getBalanceOfAddress(myWalletAddress))

console.log(JSON.stringify(myBlockChain, null, JSON_SPACE_SIZE))
console.log('Block Chain is valid? ', myBlockChain.isChainValid() ? 'yes' : 'no')