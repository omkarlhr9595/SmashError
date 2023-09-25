import dotenv from "dotenv";

dotenv.config();

const PORT: string = process.env.PORT;
const MONGODB_URI: string = process.env.MONGODB_URI;
const SECRET: string = process.env.SECRET;
const OPENAI_KEY: string = process.env.OPENAI_API_KEY;

export { PORT, MONGODB_URI, SECRET, OPENAI_KEY };
