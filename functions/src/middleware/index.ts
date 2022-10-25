// import rateLimit from "express-rate-limit";
// import helmet from "helmet";
import cors from "cors";

const middleware = () => {
  return [
    // rateLimit({
    //   windowMs: 15 * 60 * 1000, // 15 minutes
    //   max: 100, // limit each IP to 100 requests per windowMs
    // }),
    // helmet(),
    cors({origin: ["http://frid.ge", "http://localhost:3000", "http://localhost"], credentials: true},),
  ];
};

export default middleware;
