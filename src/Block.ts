import { SHA256 } from "crypto-js";
import BlockData from "./BlockData";

export default class Block {
  index: number;
  timestamp: Date;
  data: BlockData;
  previousHash: string;
  hash: string;
  nonce: number;


  constructor(index: number, timestamp: Date, data: BlockData, previousHash = '') {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
    this.nonce = 0;
  }

  calculateHash() : string {
    const message = this.index.toString() + this.timestamp + this.previousHash + JSON.stringify(this.data) + this.nonce;
    return SHA256(message).toString();
  }

  mineBlock(difficulty : number) : void {
    while(this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
      this.hash = this.calculateHash();
      this.nonce++;
      console.log("Block mined: ", this.hash);
    }

    console.log("HERE, We found it", this.hash)
  }
}