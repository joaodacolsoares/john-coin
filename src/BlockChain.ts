import Block from "./Block";
import BlockData from "./BlockData";

const FIRST_BLOCK_IN_ARRAY = 0;
const IS_VALID_BLOCK = true;
const IS_INVALID_BLOCK = false;

export default class BlockChain {
  chain: Block[];

  constructor() {
    this.chain = [this.createGenesisBlock()];
  }

  createGenesisBlock() : Block {
    return new Block(0, new Date("05/04/2005"), new BlockData("Genesis Block", 0), "");
  }

  getLatestBlock() : Block {
    return this.chain[this.chain.length - 1];
  }

  addBlock(newBlock : Block) : void {
    newBlock.previousHash = this.getLatestBlock().hash;
    newBlock.hash = newBlock.calculateHash();
    this.chain.push(newBlock);
  }

  isChainValid() : boolean {
    return this.chain
      .map(this.toValidBlocks)
      .every(this.isValid)
  }

  private toValidBlocks(currentBlock: Block, i: number, chain: Block[]) : boolean {
    if(i === FIRST_BLOCK_IN_ARRAY) return IS_VALID_BLOCK;
    
    const previousBlock =  chain[i - 1];
    if(currentBlock.hash !== currentBlock.calculateHash()) return IS_INVALID_BLOCK;
    if(currentBlock.previousHash !== previousBlock?.hash) return IS_INVALID_BLOCK;

    return IS_VALID_BLOCK;
  }

  private isValid(value: boolean) : boolean {
    return value == IS_VALID_BLOCK;
  }
}