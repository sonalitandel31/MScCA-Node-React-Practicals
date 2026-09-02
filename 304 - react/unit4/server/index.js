const express = require("express");
const cors = require("cors");
const { graphqlHTTP } = require("express-graphql");

const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLFloat,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLList,
  GraphQLNonNull,
} = require("graphql");

const app = express();

app.use(cors());

// PRACTICAL 1 - BOOK DATA
const books = [
  {
    id: "1",
    title: "The Alchemist",
    author: "Paulo Coelho",
    price: 399,
  },
  {
    id: "2",
    title: "Atomic Habits",
    author: "James Clear",
    price: 499,
  },
  {
    id: "3",
    title: "Rich Dad Poor Dad",
    author: "Robert Kiyosaki",
    price: 350,
  },
  {
    id: "4",
    title: "Clean Code",
    author: "Robert C. Martin",
    price: 699,
  },
];

const BookType = new GraphQLObjectType({
  name: "Book",

  fields: {
    id: {
      type: GraphQLID,
    },

    title: {
      type: GraphQLString,
    },

    author: {
      type: GraphQLString,
    },

    price: {
      type: GraphQLFloat,
    },
  },
});


// PRACTICAL 2 - STUDENT DATA
const students = [
  {
    id: "1",
    name: "Rahul Patel",
    course: "MSc Computer Application",
    semester: 3,
  },
  {
    id: "2",
    name: "Priya Shah",
    course: "MSc Computer Application",
    semester: 3,
  },
  {
    id: "3",
    name: "Amit Desai",
    course: "MCA",
    semester: 2,
  },
  {
    id: "4",
    name: "Neha Mehta",
    course: "MSc IT",
    semester: 4,
  },
];

const StudentType = new GraphQLObjectType({
  name: "Student",

  fields: {
    id: {
      type: GraphQLID,
    },

    name: {
      type: GraphQLString,
    },

    course: {
      type: GraphQLString,
    },

    semester: {
      type: GraphQLInt,
    },
  },
});

// PRACTICAL 3 - PRODUCT DATA
let products = [
  {
    id: "1",
    name: "Laptop",
    price: 65000,
  },
  {
    id: "2",
    name: "Keyboard",
    price: 1500,
  },
  {
    id: "3",
    name: "Mouse",
    price: 800,
  },
];

const ProductType = new GraphQLObjectType({
  name: "Product",

  fields: {
    id: {
      type: GraphQLID,
    },

    name: {
      type: GraphQLString,
    },

    price: {
      type: GraphQLFloat,
    },
  },
});

// PRACTICAL 4 - SPACE LAUNCH DATA
const launches = [
  {
    id: "1",
    missionName: "FalconSat",
    rocketName: "Falcon 1",
    launchDate: "2006-03-24",
    launchSite: "Kwajalein Atoll",
    success: false,
  },
  {
    id: "2",
    missionName: "DemoSat",
    rocketName: "Falcon 1",
    launchDate: "2007-03-21",
    launchSite: "Kwajalein Atoll",
    success: false,
  },
  {
    id: "3",
    missionName: "Trailblazer",
    rocketName: "Falcon 1",
    launchDate: "2008-08-03",
    launchSite: "Kwajalein Atoll",
    success: false,
  },
  {
    id: "4",
    missionName: "RatSat",
    rocketName: "Falcon 1",
    launchDate: "2008-09-28",
    launchSite: "Kwajalein Atoll",
    success: true,
  },
  {
    id: "5",
    missionName: "CRS-20",
    rocketName: "Falcon 9",
    launchDate: "2020-03-07",
    launchSite: "Cape Canaveral",
    success: true,
  },
];

const LaunchType = new GraphQLObjectType({
  name: "Launch",

  fields: {
    id: {
      type: GraphQLID,
    },

    missionName: {
      type: GraphQLString,
    },

    rocketName: {
      type: GraphQLString,
    },

    launchDate: {
      type: GraphQLString,
    },

    launchSite: {
      type: GraphQLString,
    },

    success: {
      type: GraphQLBoolean,
    },
  },
});

// ROOT QUERY
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",

  fields: {
    // Practical 1
    books: {
      type: new GraphQLList(BookType),

      resolve() {
        return books;
      },
    },

    // Practical 2
    students: {
      type: new GraphQLList(StudentType),

      resolve() {
        return students;
      },
    },

    student: {
      type: StudentType,

      args: {
        id: {
          type: new GraphQLNonNull(GraphQLID),
        },
      },

      resolve(parent, args) {
        return students.find(
          (student) => student.id === args.id
        );
      },
    },

    // Practical 3 + Practical 5
    products: {
      type: new GraphQLList(ProductType),

      resolve() {
        return products;
      },
    },

    // Practical 4
    launches: {
      type: new GraphQLList(LaunchType),

      resolve() {
        return launches;
      },
    },
  },
});

// MUTATIONS - PRACTICAL 3 + PRACTICAL 5
const Mutation = new GraphQLObjectType({
  name: "Mutation",

  fields: {
    addProduct: {
      type: ProductType,

      args: {
        name: {
          type: new GraphQLNonNull(GraphQLString),
        },

        price: {
          type: new GraphQLNonNull(GraphQLFloat),
        },
      },

      resolve(parent, args) {
        const product = {
          id: Date.now().toString(),
          name: args.name,
          price: args.price,
        };

        products.push(product);

        return product;
      },
    },

    updateProduct: {
      type: ProductType,

      args: {
        id: {
          type: new GraphQLNonNull(GraphQLID),
        },

        name: {
          type: GraphQLString,
        },

        price: {
          type: GraphQLFloat,
        },
      },

      resolve(parent, args) {
        const product = products.find(
          (product) => product.id === args.id
        );

        if (!product) {
          return null;
        }

        if (args.name !== undefined) {
          product.name = args.name;
        }

        if (args.price !== undefined) {
          product.price = args.price;
        }

        return product;
      },
    },

    deleteProduct: {
      type: GraphQLBoolean,

      args: {
        id: {
          type: new GraphQLNonNull(GraphQLID),
        },
      },

      resolve(parent, args) {
        const index = products.findIndex(
          (product) => product.id === args.id
        );

        if (index === -1) {
          return false;
        }

        products.splice(index, 1);

        return true;
      },
    },
  },
});

// GRAPHQL SCHEMA
const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});

// GRAPHQL MIDDLEWARE
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);

// HOME ROUTE
app.get("/", (req, res) => {
  res.send("GraphQL Practical Server is Running");
});

// START SERVER
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(`GraphiQL running at http://localhost:${PORT}/graphql`);
});