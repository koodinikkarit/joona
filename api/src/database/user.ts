import { getConnection } from "typeorm";
import { User } from "../entities";
import { hash } from "bcrypt";

export const isAdminInitialized = async () => {
	const connection = getConnection();
	const userRepository = connection.getRepository(User);

	const count = await userRepository.count({
		where: {
			isAdmin: true
		}
	});
	return count > 0;
};

export const createUser = async (args: {
	userName: string;
	password: string;
	admin: boolean;
}) => {
	const connection = getConnection();
	const userRepository = connection.getRepository(User);

	const user = new User();
	user.userName = args.userName;
	user.passwordHash = await hash(args.password, 10);
	user.isAdmin = args.admin;

	return userRepository.save(user);
};

export const hasUserWithUsername = async (userName: string) => {
	const connection = getConnection();
	const userRepository = connection.getRepository(User);

	const count = await userRepository.count({
		where: {
			userName: userName
		}
	});

	console.log("count", count);

	return count > 0;
};
