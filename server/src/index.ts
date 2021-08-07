import http from 'http';
import express from 'express';

const app = express();

const server = http.createServer(app);

const PORT = process.env.PORT || 5001;
server.listen(PORT, () => {
  console.log('\n🚀 Server is running & up...🚀');
});
