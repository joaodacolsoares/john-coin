import { ec } from 'elliptic';

export default class KeyGenerator {
  static generateKeyPair() : ec.KeyPair {
    const ellipticCurve = new ec('secp256k1')
    return ellipticCurve.genKeyPair();
  }
}