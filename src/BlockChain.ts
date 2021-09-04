import Block from "./Block";
import Transaction from "./Transaction";

const FIRST_INDEX_IN_ARRAY = 0;
const IS_VALID_BLOCK = true;
const IS_INVALID_BLOCK = false;

export default class BlockChain {
  chain: Block[];
  difficulty: number
  pendingTransactions : Transaction[];
  miningReward: number;

  constructor() {
    this.chain = [this.createGenesisBlock()];
    this.difficulty = 2
    this.pendingTransactions = [];
    this.miningReward = 100;
  }

  private createGenesisBlock() : Block {
    return new Block(new Date("01/01/2000"), []);
  }

  minePendingTransactions(miningRewardAddress: string) {
    const rewardTransaction = new Transaction(null, miningRewardAddress, this.miningReward)
    this.pendingTransactions.push(rewardTransaction);

    let block = new Block(new Date(Date.now()), this.pendingTransactions, this.getLatestBlock().hash)
    block.mineBlock(this.difficulty)

    this.chain.push(block);
    this.pendingTransactions = []
  }

  private getLatestBlock() : Block {
    return this.chain[this.chain.length - 1];
  }

  addTransaction(transaction: Transaction) {
    if(!transaction.from || !transaction.to) {
      throw new Error("Transactions must include from and to address");
    }

    if(!transaction.isValid()) {
      throw new Error("Cannot add invalid transaction to the chain");
    }

    this.pendingTransactions.push(transaction)
  }

  getBalanceOfAddress(address: string) {
    return this.chain
      .flatMap(block => block.transactions)
      .reduce((previous, current) => {
        if(current.to == address) previous += current.amount
        else if(current.from == address) previous -= current.amount
        return previous
      }, 0);
  }

  isChainValid() : boolean {
    return this.chain
      .map(this.toIsValidBlock)
      .every(this.isBlockValid)
  }

  private toIsValidBlock(currentBlock: Block, i: number, chain: Block[]) : boolean {
    if(i === FIRST_INDEX_IN_ARRAY) return IS_VALID_BLOCK;
    
    const previousBlock =  chain[i - 1];

    if(!currentBlock.hasValidTransaction()) return IS_INVALID_BLOCK
    if(currentBlock.hash !== currentBlock.calculateHash()) return IS_INVALID_BLOCK;
    if(currentBlock.previousHash !== previousBlock?.hash) return IS_INVALID_BLOCK;

    return IS_VALID_BLOCK;
  }

  private isBlockValid(value: boolean) : boolean {
    return value == IS_VALID_BLOCK;
  }
}