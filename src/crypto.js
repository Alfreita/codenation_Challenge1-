const Crypto = require("crypto");

module.exports = {
  handleDecrypt(item, ncasas) {
    var decript = "";
    var intascii = 0;
    var tamanho = item.length;

    var i = 0;
    while (i < tamanho) {
      if (item.charCodeAt(i) === 44) {
        decript = decript + ",";
      } else if (item.charCodeAt(i) === 46) {
        decript = decript + ".";
      } else if (item.charCodeAt(i) === 32) {
        decript = decript + " ";
      } else if (item.charCodeAt(i) === 97) {
        intascii = 121;
        decript = decript + String.fromCharCode(intascii);
      } else if (item.charCodeAt(i) === 98) {
        intascii = 122;
        decript = decript + String.fromCharCode(intascii);
      } else {
        intascii = -ncasas + item.charCodeAt(i);
        decript = decript + String.fromCharCode(intascii);
      }
      i++;
    }
    return decript;
  },
  async DoTheCript(item) {
    const dadoCrypt = Crypto.createHash("sha1");
    dadoCrypt.update(item);
    return dadoCrypt.digest("hex");
  }
};
