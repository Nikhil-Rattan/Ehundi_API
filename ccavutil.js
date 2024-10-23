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
  console.log(m, "hiiiiiiiiii");
  console.log(workingKey, "hiiiiiiiiii");

  m.update(workingKey);
  var key = m.digest();
  var iv = "\x00\x01\x02\x03\x04\x05\x06\x07\x08\x09\x0a\x0b\x0c\x0d\x0e\x0f";
  var decipher = crypto.createDecipheriv("aes-128-cbc", key, iv);
  var decoded = decipher.update(encText, "hex", "utf8");
  decoded += decipher.final("utf8");
  console.log(decoded, "decoded");

  return decoded;
}
