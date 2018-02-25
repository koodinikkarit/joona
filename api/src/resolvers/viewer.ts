import { getConnection } from "typeorm";
import { User } from "../entities/User";
import { isAdminInitialized } from "../database/user";

export const Query = {
	viewer: () => {
		return {
			id: "asd"
		};
	}
};

export const Viewer = {
	adminInitialized: async () => {
		return isAdminInitialized();
	}
};
