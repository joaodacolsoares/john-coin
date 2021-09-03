import Block from "./Block";
import BlockChain from "./BlockChain";
import Transaction from "./Transaction";

const JSON_SPACE_SIZE = 2;
const myBlockChain = new BlockChain();

myBlockChain.createTransaction(new Transaction("address1", "address2", 100))
myBlockChain.createTransaction(new Transaction("address2", "address1", 50))

myBlockChain.minePendingTransactions("address3")

console.log("address1 balance = ", myBlockChain.getBalanceOfAddress("address1"))
console.log("address2 balance = ", myBlockChain.getBalanceOfAddress("address2"))
console.log("address3 balance = ", myBlockChain.getBalanceOfAddress("address3"))

myBlockChain.minePendingTransactions("address3")
console.log(JSON.stringify(myBlockChain, null, JSON_SPACE_SIZE))
console.log('Block Chain is valid? ', myBlockChain.isChainValid() ? 'yes' : 'no')