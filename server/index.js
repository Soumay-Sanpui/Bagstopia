import express from "express";
import cors from "cors";
import userRouter from "./routes/user.route.js";
import ctdb from "./utils/db.util.js";

const PORT = 5000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/user", userRouter);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

// Start server
ctdb().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is live at : http://localhost:${PORT}`);
    });
}).catch(err => {
    console.error('Database connection failed:', err);
    process.exit(1);
});