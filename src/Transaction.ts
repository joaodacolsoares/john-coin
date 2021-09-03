import { SHA256 } from "crypto-js";
import { ec } from "elliptic";

const ellipticCurve = new ec('secp256k1')

export default class Transaction {
  from: string | null
  to: string
  amount: number
  signature: string

  constructor(from: string | null, to: string, amount: number) {
    this.from = from;
    this.to = to;
    this.amount = amount;
    this.signature = '';
  }

  calculateHash() : string {
    return SHA256(this.from + this.to + this.amount).toString()  
  }

  signTransaction(signingKey : ec.KeyPair) : void{
    if(signingKey.getPublic('hex') !== this.from) {
      throw new Error("You cannot sign transactions for other wallets!");  
    }

    const transactionHash = this.calculateHash()
    const sig = signingKey.sign(transactionHash, 'base64');
    this.signature = sig.toDER('hex');
  }

  isValid() : boolean {
    if(this.from === null) return true;

    if(!this.signature || this.signature.length === 0) {
      throw new Error('No signature in this transaction');
    }

    const publicKey = ellipticCurve.keyFromPublic(this.from, 'hex');
    return publicKey.verify(this.calculateHash(), this.signature)
  }
}