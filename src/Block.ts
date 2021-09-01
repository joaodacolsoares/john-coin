import { SHA256 } from "crypto-js";
import BlockData from "./BlockData";

export default class Block {
  index: number;
  timestamp: Date;
  data: BlockData;
  previousHash: string;
  hash: string;


  constructor(index: number, timestamp: Date, data: BlockData, previousHash = '') {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
  }

  calculateHash() : string {
    const message = this.index.toString() + this.timestamp + this.previousHash + JSON.stringify(this.data);
    return SHA256(message).toString();
  }
}