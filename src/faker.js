import { faker } from '@faker-js/faker';
import Job from './models/Job.js';
import connect from './config/connect.js';
import User from './models/User.js';
import dotenv from 'dotenv';
dotenv.config();
const start = async () => {
    try {
        await connect(process.env.MONGO_URL);
        await Job.deleteMany({});
        // const names =  await User.find({}).select('name'); name and id 
        // console.log(ID);
        const users = await User.find({})
        const  ID = users.map(user => user._id);
        let arr = [];
        for (let i = 0 ; i < users.length;i++){  
                    let data = {};
                    data.position = faker.name.jobTitle();
                    data.status = faker.helpers.arrayElement(['interview', 'declined', 'pending', 'hired']);
                    data.company = faker.company.companyName();
                    data.createdBy = ID[i];
                    arr.push(data);
            }
        await Job.create(arr);
        console.log(' old one deleted and fake products was created');
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}
//thanks to @faker-js/faker for the amazing library
start();