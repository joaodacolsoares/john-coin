import Block from "./Block";
import BlockChain from "./BlockChain";
import BlockData from "./BlockData";

const JSON_SPACE_SIZE = 2;
const myBlockChain = new BlockChain();

myBlockChain.addBlock(new Block(1, new Date('02/07/2017'), new BlockData("John Doe", 100)));
myBlockChain.addBlock(new Block(2, new Date('06/07/2017'), new BlockData("Nico Boe", 200)));

console.log(JSON.stringify(myBlockChain, null, JSON_SPACE_SIZE))
console.log('Block Chain is valid? ', myBlockChain.isChainValid() ? 'yes' : 'no')