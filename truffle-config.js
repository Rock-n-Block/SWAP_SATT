module.exports = {
    compilers: {
      solc: {
        version: "^0.5.0",
        settings: {
            optimizer: {
              enabled: true,
              runs: 999999999
            }
          }
      }
    }
  }