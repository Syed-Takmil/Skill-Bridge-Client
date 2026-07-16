


import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const client = new MongoClient(process.env.MONGODB_URI as string);
const db = client.db("SkillBridge");


export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client
  }),
   user: {
        additionalFields: {
            role: {
                type: "string",
                required: false,      // Set true if every user must select a role
                defaultValue: "user", // Fallback role string
                input: true,          // CRITICAL: Allows the client to pass this field
            },
        },
    },
  emailAndPassword: { 
    enabled: true, 
  },
  allowDynamicOrigins: true,
});