import crypto from "crypto";
export function encrypt(plainText, workingKey) {
  var m = crypto.createHash("md5");
  m.update(workingKey);
  var key = m.digest("binary");
  var iv = "\x00\x01\x02\x03\x04\x05\x06\x07\x08\x09\x0a\x0b\x0c\x0d\x0e\x0f";
  var cipher = crypto.createCipheriv("aes-128-cbc", key, iv);
  var encoded = cipher.update(plainText, "utf8", "hex");
  encoded += cipher.final("hex");
  return encoded;
}

export function decrypt(encText, workingKey) {
  console.log(encText, "hiiiiiiiiii");
  console.log(typeof encText, "hiiiiiiiiii");

  var m = crypto.createHash("md5");
  //   console.log(m, "hiiiiiiiiii");
  //   console.log(workingKey, "hiiiiiiiiii");

  m.update(workingKey);
  console.log(m, "hiiiiiiiiii");

  var key = m.digest("binary");
  var iv = "\x00\x01\x02\x03\x04\x05\x06\x07\x08\x09\x0a\x0b\x0c\x0d\x0e\x0f";
  var decipher = crypto.createDecipheriv("aes-128-cbc", key, iv);
  var decoded = decipher.update(encText, "hex", "utf8");
  decoded += decipher.final("utf8");
  console.log(decoded, "decoded");

  return decoded;
}

// export function decrypt(encText, workingKey) {
//   console.log(encText, "hiiiiiiiiii");
//   console.log(typeof encText, "hiiiiiiiiii");

//   // Create MD5 hash from working key
//   var m = crypto.createHash("md5");
//   m.update(workingKey);

//   // Generate key from the MD5 hash
//   var key = m.digest(); // no need for 'binary', it will return a Buffer

//   // Initialize IV (16 bytes)
//   var iv = Buffer.from([
//     0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x0a, 0x0b,
//     0x0c, 0x0d, 0x0e, 0x0f,
//   ]);

//   // Create decipher object using AES-128-CBC, key, and IV
//   var decipher = crypto.createDecipheriv("aes-128-cbc", key, iv);

//   // Decrypt the encrypted text
//   var decoded = decipher.update(encText, "hex", "utf8");
//   decoded += decipher.final("utf8");

//   console.log(decoded, "decoded");

//   return decoded;
// }
