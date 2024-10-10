import express, { Express } from 'express';
import userRoutes from './user/user.routes';
import { sequelize } from '../config/sequilize';
import cors from 'cors';

const app: Express = express(); 
app.use(cors());
app.use(express.json());
app.use(userRoutes);

sequelize.sync({ alter: true });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
