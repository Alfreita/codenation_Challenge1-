const Axios = require("../service/api");
const DoCrypt = require("./crypto");
const FormData = require("form-data");
const FileSystem = require("fs");
const Path = require("path");

module.exports = {
  async getMessage() {
    const ret = await Axios.get(
      "/generate-data?token=58a0d6bc2faa78747117d42f0cb8d1804174768b"
    );
    var retData = ret.data;
    const decript = DoCrypt.handleDecrypt(
      ret.data.cifrado,
      ret.data.numero_casas
    );
    retData.decifrado = decript;
    const dataCrypted = await DoCrypt.DoTheCript(retData.decifrado);
    retData.resumo_criptografico = dataCrypted;

    const JsonFile = JSON.stringify(retData);

    FileSystem.writeFile("doc.json", JsonFile, function(err) {
      if (err) throw err;
    });

    const filePath = Path.join(__dirname, "../doc.json");

    const data = new FormData();
    data.append("answer", FileSystem.createReadStream(filePath));

    const config = {
      headers: {
        "content-type": `multipart/form-data; boundary=${data._boundary}`
      }
    };
    try {
      const retPost = await Axios.post(
        "/submit-solution?token=58a0d6bc2faa78747117d42f0cb8d1804174768b",
        data,
        config
      );
      console.log(retPost);
    } catch (error) {
      console.log(error);
    }
  }
};
