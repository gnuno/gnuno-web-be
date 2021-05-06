module.exports = {
  mongodbMemoryServerOptions: {
    instance: {
      dbName: "jest",
    },
    binary: {
      version: "4.4.5",
      skipMD5: true,
    },
    autoStart: false,
  },
};
