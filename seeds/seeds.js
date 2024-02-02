const connection = require('../config/connection');
const { User, Thought } = require('../models');

connection.on('error', (err) => err);

// Seed userSelect:    
const users = [
    {
        username: `user_1`,
        email: `user.one@example.com`
    },
    {
        username: `user_2`,
        email: `user.two@example.com`
    },
    {
        username: `user_3`,
        email: `user.three@example.com`
    },
    {
        username: `user_4`,
        email: `user.four@example.com`
    },
    {
        username: `user_5`,
        email: `user.five@example.com`
    }
];

// Seed Thoughts
const thoughts = [
    {
        thoughtText: `thought example #1`,
        username: `user_1`,
    },
    {
        thoughtText: `thought example #2`,
        username: `user_2`,
    },
    {
        thoughtText: `thought example #3`,
        username: `user_3`,
    },
    {
        thoughtText: `thought example #4`,
        username: `user_4`,
    },
    {
        thoughtText: `thought example #5`,
        username: `user_5`,
    }
];

// const reactions = [
//     {
//         reactionBody: `test-reaction`
//     }
// ]

connection.once(`open`, async () => {
    console.log(`conected`);

    // Delete the collections if they exist
    let thoughtCheck = await connection.db.listCollections({ name: 'thoughts' }).toArray();
    if (thoughtCheck.length) {
        await connection.dropCollection('thoughts');
    };
    
    let userCheck = await connection.db.listCollections({ name: 'users' }).toArray();
    if (userCheck.length) {
        await connection.dropCollection('users');
    };

    await User.insertMany(users);
    await Thought.insertMany(thoughts);

    console.info('Seeding complete! 🌱');
})