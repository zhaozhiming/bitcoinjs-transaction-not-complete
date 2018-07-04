const bitcoin = require('bitcoinjs-lib');

const createSegwitTransaction = () => {
  var testnet = bitcoin.networks.testnet;
  var keyPair = bitcoin.ECPair.fromWIF(
    'cPJb8Hm2FyoKe8imdeMFSa8MkyfZKAm35PrYJB4b4oJHudx7WqJU',
    testnet
  );
  var pubKey = keyPair.getPublicKeyBuffer();
  var pubKeyHash = bitcoin.crypto.hash160(pubKey);

  var redeemScript = bitcoin.script.witnessPubKeyHash.output.encode(pubKeyHash);
  var redeemScriptHash = bitcoin.crypto.hash160(redeemScript);

  var scriptPubKey = bitcoin.script.scriptHash.output.encode(redeemScriptHash);
  var address = bitcoin.address.fromOutputScript(scriptPubKey, testnet);
  console.log({ address });

  var txb = new bitcoin.TransactionBuilder(testnet);
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
    txb.sign(0, keyPair, redeemScript, null, 1990000);
    txb.build();
  } catch (e) {
    console.log(e);
  }
};

createSegwitTransaction();
