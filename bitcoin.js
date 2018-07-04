const bitcoin = require('bitcoinjs-lib');

const createSegwitTransaction = () => {
  const testnet = bitcoin.networks.testnet;
  const keyPair = bitcoin.ECPair.fromWIF(
    'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    testnet
  );
  const pubKey = keyPair.getPublicKeyBuffer();
  const pubKeyHash = bitcoin.crypto.hash160(pubKey);

  const redeemScript = bitcoin.script.witnessPubKeyHash.output.encode(pubKeyHash);
  const redeemScriptHash = bitcoin.crypto.hash160(redeemScript);

  const scriptPubKey = bitcoin.script.scriptHash.output.encode(redeemScriptHash);
  const address = bitcoin.address.fromOutputScript(scriptPubKey, testnet);
  console.log({ address });

  const txb = new bitcoin.TransactionBuilder(testnet);
  txb.addInput(
    'bc11768a23ba472ae4715dc04ff695770c8d13a0cc57d6d1d67734a383425e44',
    0
  );
  txb.addInput(
    '86a007f6169097aa40ae11935fa5504266457ed31a51bd4b00a391e275a786f6',
    0
  );
  txb.addOutput('mmeVvNVHn2oJ7GZv4rQHhcDR8NLociAtXM', 100000);
  txb.addOutput('2NBPFSS1aLjE9uf2rdzQVWhBT9VHoDxKvyh', 1878100);

  try {
    txb.sign(0, keyPair, redeemScript, null, 10000);
    txb.sign(1, keyPair, redeemScript, null, 1990000);
    txb.build();
  } catch (e) {
    console.log(e);
  }
};

createSegwitTransaction();
