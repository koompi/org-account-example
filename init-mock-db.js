const fs = require("fs");
const faker = require("faker");
const { internet } = require("faker");

let db = {
	users: [],
	orgs: [],
};

let select_owner = () => {
	let users_id = [""];

	for (let i = 0; i < db.users.length; i++) {
		users_id.push(db.users[i].id);
	}

	var user_id = users_id[Math.floor(Math.random() * users_id.length)];
	return user_id;
};

let find_user_id = (source, key, value) => {
	return source.findIndex((x) => x[`${key}`] === value);
};
let create_orgs = (count) => {
	let orgs = [];
	for (let i = 0; i < count; i++) {
		let owner_id = select_owner();
		let members = [];

		// randomly select members to join org
		for (let i = 0; i < Math.floor(Math.random() * db.users.length - 1); i++) {
			if (owner_id !== db.users[i].id) {
				members.push(db.users[i].id);
			}
		}

		let org = {
			id: faker.fake("{{random.uuid}}"),
			name: faker.fake("{{company.companyName}}"),
			owner_id: owner_id,
			members: members,
		};

		orgs.push(org);

		let owner_index = find_user_id(db.users, "id", owner_id);
		db.users[owner_index].owned_orgs.push(org.id);

		for (let i = 0; i < members.length; i++) {
			let member_id = find_user_id(db.users, "id", members[i]);
			db.users[member_id].joined_org.push(org.id);
		}
	}

	// for (let i = 0; i < orgs.length; i++) {
	// 	for
	// }
	return orgs;
};

const create_user = (count) => {
	let users = [];
	for (let i = 0; i < count; i++) {
		let user = {
			id: faker.fake("{{random.uuid}}"),
			userName: faker.fake("{{internet.userName}}"),
			email: faker.fake("{{internet.email}}"),
			password: faker.fake("{{internet.password}}"),
			owned_orgs: [],
			joined_org: [],
		};
		users.push(user);
	}

	return users;
};

db.users = create_user(10);
db.orgs = create_orgs(3);

fs.writeFile("db.json", JSON.stringify(db, 0, 4).toString(), function (err) {
	if (err) return console.log(err);
});
