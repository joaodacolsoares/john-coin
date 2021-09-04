import KeyGenerator from "../KeyGenerator"

test('generateKeyPair generates a valid KeyPair', () => {
  const keyPair = KeyGenerator.generateKeyPair()
  
  expect(keyPair.getPrivate('hex')).not.toBeNaN()
  expect(keyPair.getPrivate('hex')).not.toBeFalsy()
  expect(keyPair.getPrivate('hex')).toBeDefined()
  expect(keyPair.getPublic('hex')).not.toBeNaN()
  expect(keyPair.getPublic('hex')).not.toBeFalsy()
  expect(keyPair.getPublic('hex')).toBeDefined()
})