import { LoginMutationArgs, RegisterUserMutationArgs } from "../schemadef";
import {
	isAdminInitialized,
	createUser,
	hasUserWithUsername
} from "../database/user";

export const Mutation = {
	login: (root, args: LoginMutationArgs) => {},
	registerUser: async (root, args: RegisterUserMutationArgs) => {
		console.log("registerUser", args);
		try {
			if (args.admin) {
				if (await isAdminInitialized()) {
					console.log("isAdmininitialized");
					return {
						success: false
					};
				}

				if (await hasUserWithUsername(args.userName)) {
					console.log("hasUSername", args.userName);
					return {
						success: false,
						userNameAlreadyInUse: false
					};
				}

				console.log("createuser");

				await createUser({
					userName: args.userName,
					password: args.password,
					admin: args.admin
				});

				return {
					success: true
				};
			}

			if (await hasUserWithUsername(args.userName)) {
				return {
					success: false,
					userNameAlreadyInUse: false
				};
			}

			await createUser({
				userName: args.userName,
				password: args.password,
				admin: false
			});

			return {
				success: true
			};
		} catch (e) {
			return {
				success: false
			};
		}
	}
};
