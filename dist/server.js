"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const env_1 = __importDefault(require("./config/env"));
const dbconnect_1 = __importDefault(require("./config/dbconnect"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: ['http://localhost:3000'],
    methods: ["POST", "GET", "PATCH", "DELETE", "OPTIONS"]
}));
const PORT = env_1.default.port;
app.listen(PORT, () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, dbconnect_1.default)();
        console.log(`Server is Running on Port ${PORT}`);
    }
    catch (error) {
        console.log('Error in server running', error);
    }
}));
