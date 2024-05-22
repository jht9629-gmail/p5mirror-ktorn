/*
*  Tezos key_hash to tz1 address converter
*  by @ktorn
*  31.01.2024
*/

function hexToBigInt(hex) {
    // Ensure the '0x' prefix is present for BigInt parsing
    if (!hex.startsWith('0x')) {
        hex = '0x' + hex;
    }
    return BigInt(hex);
}

function bigIntToByteArray(bigint) {
    // The byte array we will push each byte to
    const bytes = [];
    // A BigInt could be any size, but we want to pad it to 32 bytes
    const size = 32;
    for (let i = 0; i < size; i++) {
        // Push the current least significant byte onto the array
        bytes.unshift(Number(bigint & 0xFFn));
        // Shift the bigint to the right by one byte
        bigint >>= 8n;
    }
    // Remove leading 0 bytes
    while (bytes[0] === 0) {
        bytes.shift();
    }
    return new Uint8Array(bytes);
}


function hexToBytes(hex) {
  return bigIntToByteArray(hexToBigInt(hex))
}

  
function sha256(buffer) {
    // Convert the Uint8Array to a WordArray for CryptoJS
    const wordArray = CryptoJS.lib.WordArray.create(buffer);
    // Hash the WordArray and return a Hex string
    const hash = CryptoJS.SHA256(wordArray).toString(CryptoJS.enc.Hex);
    // Convert the Hex string back to a Uint8Array
    return hexToBytes(hash);
}

function tezosAddressFromPublicKeyHash(hexKeyHash) {
  
    // Convert the hex key hash to bytes
    const keyHashBytes = hexToBytes(hexKeyHash);
  
    // Prefix for tz1 addresses (Ed25519 public key hash)
    const tz1Prefix = new Uint8Array([6, 161, 159]);

    // Combine the prefix with the public key hash bytes
    const dataWithPrefix = new Uint8Array(tz1Prefix.length + keyHashBytes.length);
    dataWithPrefix.set(tz1Prefix);
    dataWithPrefix.set(keyHashBytes, tz1Prefix.length);
  

       
    // Calculate the checksum
    const checksumBytes = sha256(sha256(dataWithPrefix));
  
    const checksum = checksumBytes.slice(0, 4);


    // Combine all parts
    const dataWithChecksum = new Uint8Array(dataWithPrefix.length + checksum.length);
    dataWithChecksum.set(dataWithPrefix);
    dataWithChecksum.set(checksum, dataWithPrefix.length);

    // Encode to Base58
    const address = encode(dataWithChecksum);

    return address;
}

function setup() {

    // Example usage:
  
    const hexKeyHash = '0x0050e0462f27c0436ba6c3ce13a06e573f36cb28b0';
    // const hexKeyHash = '0x0046a2c00eb115343242347fa1cd672a2bc1dcc609';
    const address = tezosAddressFromPublicKeyHash(hexKeyHash);
    console.log(`Tezos Address: ${address}`);
  
}

document.getElementById('convertButton').addEventListener('click', function() {
    const keyHash = document.getElementById('keyHashInput').value;
    const address = tezosAddressFromPublicKeyHash(keyHash); // Assuming the function is defined
    document.getElementById('resultOutput').value = address;
});

