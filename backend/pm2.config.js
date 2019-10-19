module.exports = {
    apps : [{
      name: "SpaceApps2019/backend",
      script: "./main.js",
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
      }
    }]
  }
  