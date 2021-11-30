const { db,
  models: {// Somehow this is connected to ./db/index.js ...weird stuff
    Tag, Group, User, Comment
  }
} = require("./db");


const dummyUsers = [
  {
    email: "nonadmin@gmail.com",
    password: '123',
  },
  {
    email: "brad@gmail.com",
    password: '123',
    isAdmin: true,
  },
  {
    email: "chase@gmail.com",
    password: '123',
    isAdmin: true,
  },
  {
    email: "scott@gmail.com",
    password: '123',
    isAdmin: true,
  },
  {
    email: "hector@gmail.com",
    password: '123',
    isAdmin: true,
  },
]

const dummyTags = [ // The name of the tag has to be the name of the place
  {
    name: "Wilfie & Nell",
    latitude: 40.7340642,
    longitude: -74.00307049999999,
    userId: 2,
    groupId: 1,
  },
  {
    name: "TEST!",
    latitude: 37.7882,
    longitude: -122.43,
    userId: 3,
    groupId: 1,
  },
  {
    name: "TEST!",
    latitude: 37.783,
    longitude: -122.44,
    userId: 4,
    groupId: 1,
  },
  {
    name: "TEST!",
    latitude: 37.788,
    longitude: -122.42,
    userId: 5,
    groupId: 1,
  },
  {
    name: "TEST!",
    latitude: 37.7882,
    longitude: -122.43,
    userId: 1,
    groupId: 2,
  },
];

const dummyGroups = [
  {
    name: "group 1",
  },
  {
    name: "group 2",
  },
];

const dummyComments = [
  {
    description: "I don't go to mcdonalds",
    tagId: 1,
  },
  {
    description: "I love the big macs here",
    tagId: 2,
  },
  {
    description: "I love fries",
    tagId: 3,
  },
  {
    description: "I like soda",
    tagId: 4,
  },
]

const seed = async () => {
  try {
    await db.sync({ force: true });
    console.log(`starting seeding`);

    let users = await Promise.all(
      dummyUsers.map((user) => {
        return User.create(user);
      })
    )

    let groups = await Promise.all(
      dummyGroups.map((group) => {
        return Group.create(group);
      })
    );

    let tags = await Promise.all(
      dummyTags.map((tag) => {
        return Tag.create(tag);
      })
    );

    let comments = await Promise.all(
      dummyComments.map((comment) => {
        return Comment.create(comment);
      })
    );

    console.log("Database synced!");
    console.log(`seeded successfully`);
    return {
      users,
      groups,
      tags,
      comments,
    }
  } catch (err) {
    console.error("Something went wrong inside: seed()! :S");
    console.error(err);
  }
};

// We isolate the 'seed' function to easily track where errors could be coming from
async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1; // Don't know this does
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

runSeed();
