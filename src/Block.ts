import { SHA256 } from "crypto-js";
import Transaction from "./Transaction";

export default class Block {
  timestamp: Date;
  transactions: Transaction[];
  previousHash: string;
  hash: string;
  nonce: number;


  constructor(timestamp: Date, transactions: Transaction[], previousHash = '') {
    this.timestamp = timestamp;
    this.transactions = transactions;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
    this.nonce = 0;
  }

  calculateHash() : string {
    const message = this.timestamp + this.previousHash + JSON.stringify(this.transactions) + this.nonce;
    return SHA256(message).toString();
  }

  mineBlock(difficulty : number) : void {
    while(this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
      this.nonce++;
      this.hash = this.calculateHash();
    }
  }

  hasValidTransaction() {
    return this.transactions
      .every(transaction => transaction.isValid())
  }
}