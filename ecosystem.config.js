module.exports = {
  apps: [
    {
      name: 'perfexcrm-api-website',
      script: 'node_modules/next/dist/bin/next',
      args: 'start',
      instances: 'max', // Use all available CPU cores
      exec_mode: 'cluster', // Enable cluster mode for load balancing
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
      // Monitoring
      max_memory_restart: '1G',
      // Logging
      error_file: './logs/pm2-error.log',
      out_file: './logs/pm2-out.log',
      log_file: './logs/pm2-combined.log',
      time: true,
      // Advanced features
      watch: false, // Don't watch files in production
      ignore_watch: ['node_modules', '.next', 'logs', 'prisma/*.db'],
      max_restarts: 10,
      min_uptime: '10s',
      // Graceful shutdown
      listen_timeout: 3000,
      kill_timeout: 5000,
      // Auto restart on file change (optional)
      // watch: ['./next.config.js'],
      // Automatic restart scheduling
      cron_restart: '0 2 * * *', // Restart daily at 2 AM
    },
  ],
};