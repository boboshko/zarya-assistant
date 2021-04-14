module.exports = {
  apps: [{
    name: 'bot-zarya',
    script: 'start.js',
    autorestart: true,
    watch: true,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }],
};
