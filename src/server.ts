
import app from './app';
import { config } from './config/env';
import db from './config/database';

const PORT = config.port;


db.raw('SELECT 1')
  .then(() => {
    console.log('✅ Database connection established');
    
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📝 Environment: ${config.env}`);
      console.log(`🏥 Health check: http://localhost:${PORT}/health`);
    });
  })
  .catch((error) => {
    console.error('❌ Database connection failed:', error);
    process.exit(1);
  });


process.on('SIGINT', async () => {
  console.log('\n🛑 Shutting down gracefully...');
  await db.destroy();
  process.exit(0);
});