import { getConnection } from "typeorm";
import { User } from "../entities/User";

export const initializeAdmin = () => {
	const connection = getConnection();
	const userRepository = connection.getRepository(User);
};
