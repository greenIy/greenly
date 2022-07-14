const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "7xcmwn",
  viewportWidth: 1920,
  viewportHeight: 1080,
  video: false,
  e2e: {
    baseUrl: "http://localhost:8080"
  },
});
