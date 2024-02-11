/* eslint-disable prettier/prettier */
db.createUser(
    {
        user: "root",
        pwd: "123",
        roles: [
            {
                role: "readWrite",
                db: "chat-app"
            }
        ]
    }
);

db.users.insertOne({ "email": "user@gmail.com","name":"user", "password":"123" })