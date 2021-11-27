const { db } = require("./db");
const { green, red } = require("chalk");

const Tag = require("./db/models/Tag");
const Group = require("./db/models/Group");

// here's some sample candies to get you started
// feel free to edit these or add your own!
const tags = [
  {
    name: "group 1",
    latitude: 37.78824,
    longitude: -122.42,
    groupId: 1,
  },
  {
    name: "group 2",
    latitude: 37.7882,
    longitude: -122.43,
    groupId: 2,
  },
  {
    name: "group 1 and 2",
    latitude: 37.7881,
    longitude: -122.432,
    groupId: 1,
  },
];

const groups = [
  {
    name: "group 1",
  },
  {
    name: "group 2",
  },
];

const seed = async () => {
  try {
    await db.sync({ force: true });

    await Promise.all(
      tags.map((tag) => {
        return Tag.create(tag);
      })
    );

    console.log(green("Seeding success!"));
    db.close();
  } catch (err) {
    console.error(red("Oh noes! Something went wrong!"));
    console.error(err);
    db.close();
  }
};

seed();
