import { Request, Response } from 'express';

const uploadTestRoute = async (req: Request, res: Response) => {
    try {
      const jsonData = req.body;
      // Send a response
      res.status(200).json({ message: `JSON data received successfully: ${jsonData}`, data: jsonData });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
export default uploadTestRoute;
