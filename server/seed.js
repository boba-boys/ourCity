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
    name: "Brad's Williamsburg Apartment",
    latitude: 40.713557,
    longitude: -73.9669608,
    userId: 3,
    groupId: 1,
  },
  {
    name: "Horses and Divorces",
    latitude: 40.7140536,
    longitude: -73.9613537,
    userId: 4,
    groupId: 1,
  },
  {
    name: "The Django",
    latitude: 40.7194085,
    longitude: -74.00490929999999,
    userId: 5,
    groupId: 1,
  },
  {
    name: "Wall Street Bath & Spa 88",
    latitude: 40.7091089,
    longitude: -74.0058052,
    userId: 1,
    groupId: 2,
  },
 ];



const dummyGroups = [
  {
    name: "Boba Guys",
  },
  {
    name: "Tennis League",
  },
  {
    name: "Rugby Team",
  },
];

const dummyComments = [
  {
    tagId: 1,
    userId: 2,
    groupId: 1,
    description: "I don't go to mcdonalds",
    rating: 1,
  },
  {
    tagId: 1,
    userId: 3,
    groupId: 1,
    description: "I love the big macs here",
    rating: 5,
  },
  {
    tagId: 1,
    userId: 4,
    groupId: 1,
    description: "I love fries",
    rating: 2,
  },
  {
    tagId: 1,
    userId: 5,
    groupId: 1,
    description: "I like the fast service",
    rating: 4,
  },
  {
    tagId: 1,
    userId: 1,
    groupId: 2,
    description: "I like soda",
    rating: 2,
  },
  {
    tagId: 2,
    userId: 1,
    groupId: 2,
    description: "I like the nuggets",
    rating: 4,
  },
]

const seed = async () => {
  try {
    await db.sync({ force: true });
    console.log(`starting seeding`);

    let tags = await Promise.all(
      dummyTags.map((tag) => {
        return Tag.create(tag);
      })
    );

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
    process.exitCode = 1; // Don't know what this is...
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

runSeed();
