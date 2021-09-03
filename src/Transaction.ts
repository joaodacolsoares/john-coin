export default class Transaction {
  from: string | null
  to: string
  amount: number

  constructor(from: string | null, to: string, amount: number) {
    this.from = from;
    this.to = to;
    this.amount = amount;
  }
}