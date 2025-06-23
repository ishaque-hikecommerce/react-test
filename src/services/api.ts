import axios from "axios";
import { DUMMY_DATA_URL } from "../utils/constant";

const API_URL = DUMMY_DATA_URL;

export const fetchProducts = async () => {
    try {
        return await axios.get(`${API_URL}/products?limit=20&skip=20`);
    } catch (error) {
        throw error;
    }
};