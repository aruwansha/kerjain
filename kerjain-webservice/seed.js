var seeder = require("mongoose-seed");
var mongoose = require("mongoose");

// Connect to MongoDB via Mongoose
seeder.connect(
  "mongodb://127.0.0.1:27017/db_kerjain",
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
  },
  function () {
    // Load Mongoose models
    seeder.loadModels([
      "./models/Category",
      "./models/Bank",
      "./models/Service",
      "./models/Order",
      "./models/Admin",
      "./models/Freelancer",
      "./models/Service_user",
      "./models/User",
    ]);

    // Clear specified collections
    seeder.clearModels(
      [
        "User",
        "Admin",
        "Freelancer",
        "Service",
        "ServiceUser",
        "Order",
        "Category",
        "Bank",
      ],
      function () {
        // Callback to populate DB once collections have been cleared
        seeder.populateModels(data, function () {
          seeder.disconnect();
        });
      }
    );
  }
);

var data = [
  // start category
  {
    model: "Category",
    documents: [
      {
        _id: mongoose.Types.ObjectId("605b580db4a8e60af44d4530"),
        name: "Technology & Programming",
        freelancerId: [
          { _id: mongoose.Types.ObjectId("605b5889babfe71e8432d312") },
        ],
      },
      {
        _id: mongoose.Types.ObjectId("605b580db4a8e60af44d4531"),
        name: "Graphic & Design",
        freelancerId: [
          { _id: mongoose.Types.ObjectId("605b5889babfe71e8432d318") },
        ],
      },
      {
        _id: mongoose.Types.ObjectId("605b580db4a8e60af44d4532"),
        name: "Write & Translate",
        freelancerId: [
          { _id: mongoose.Types.ObjectId("605b5889babfe71e8432d314") },
        ],
      },
      {
        _id: mongoose.Types.ObjectId("605b580db4a8e60af44d4533"),
        name: "Video & Animation",
        freelancerId: [
          { _id: mongoose.Types.ObjectId("605b5889babfe71e8432d316") },
        ],
      },
    ],
  },
  // end category

  // start bank
  {
    model: "Bank",
    documents: [
      {
        _id: mongoose.Types.ObjectId("605b5cc2b64d4f0f7cf5b1f3"),
        bankName: "BNI",
        bankAccount: "642501010678530",
        accountHolder: "Ilham Febrian Arwansyah",
        imgUrl: "images/bank/BNI.png",
      },
      {
        _id: mongoose.Types.ObjectId("605b5cc2b64d4f0f7cf5b1f4"),
        bankName: "BRI",
        bankAccount: "8778239",
        accountHolder: "Dhimas Krisna Ahmadi",
        imgUrl: "images/bank/BRI.png",
      },
    ],
  },
  // // end bank

  // start user
  {
    model: "User",
    documents: [
      // admin 1
      {
        _id: mongoose.Types.ObjectId("5e96cbe292b97300fc902227"),
        name: "Ilham Febrian Arwansyah",
        email: "ilhamfebrianarwansyah@gmail.com",
        password: "ilham123",
        level: "admin",
        birthdate: "2000-02-06",
        address: "Kediri",
        phone: "085854270625",
      },
      // admin 2
      {
        _id: mongoose.Types.ObjectId("5e96cbe292b97300fc902229"),
        name: "Dhimas Krisna Ahmadi",
        email: "dhimaskrisna@gmail.com",
        password: "dhimas123",
        level: "admin",
        birthdate: "2000-02-06",
        address: "Nganjuk",
        phone: "085854270625",
      },
      // freelancer 1
      {
        _id: mongoose.Types.ObjectId("605b5889babfe71e8432d311"),
        name: "Adi Prasetyo",
        email: "adipras@gmail.com",
        password: "adipras123",
        level: "freelancer",
        birthdate: "2000-02-06",
        address: "Kediri",
        phone: "085854270625",
        imgUrl: "images/user/pp-605b5889babfe71e8432d311.jpg",
      },
      // freelancer 2
      {
        _id: mongoose.Types.ObjectId("605b5889babfe71e8432d313"),
        name: "Galeh Desena Ramadhian",
        email: "galdes@gmail.com",
        password: "galehdesena",
        level: "freelancer",
        birthdate: "2000-02-06",
        address: "Kediri",
        phone: "085854270625",
        imgUrl: "images/user/pp-605b5889babfe71e8432d313.jpg",
      },
      // freelancer 3
      {
        _id: mongoose.Types.ObjectId("605b5889babfe71e8432d315"),
        name: "Alfiyan",
        email: "alfiyan@gmail.com",
        password: "alfiyan123",
        level: "freelancer",
        birthdate: "2000-02-06",
        address: "Malang",
        phone: "085854270625",
        imgUrl: "images/user/pp-605b5889babfe71e8432d315.jpg",
      },
      // freelancer 4
      {
        _id: mongoose.Types.ObjectId("605b5889babfe71e8432d317"),
        name: "Rizky Zahro",
        email: "rizkyz@gmail.com",
        password: "rizky123",
        level: "freelancer",
        birthdate: "2000-02-06",
        address: "Malang",
        phone: "085854270625",
        imgUrl: "images/user/pp-605b5889babfe71e8432d317.jpg",
      },
      // service user 1
      {
        _id: mongoose.Types.ObjectId("605b5889babfe71e8432d319"),
        name: "Rizky Dandi",
        email: "rizkyD@gmail.com",
        password: "rizky123",
        level: "service_user",
        birthdate: "2000-02-06",
        address: "Kediri",
        phone: "085854270625",
      },
      // service user 2
      {
        _id: mongoose.Types.ObjectId("605b5889babfe71e8432d321"),
        name: "Krisna Pramana",
        email: "krisnaPD@gmail.com",
        password: "kris123",
        level: "service_user",
        birthdate: "2000-02-06",
        address: "Kediri",
        phone: "085854270625",
      },
    ],
  },
  // end user

  // start admin
  {
    model: "Admin",
    documents: [
      // admin 1
      {
        _id: mongoose.Types.ObjectId("5e96cbe292b97300fc902226"),
        userId: { _id: mongoose.Types.ObjectId("5e96cbe292b97300fc902227") },
      },
      // admin 2
      {
        _id: mongoose.Types.ObjectId("5e96cbe292b97300fc902228"),
        userId: { _id: mongoose.Types.ObjectId("5e96cbe292b97300fc902229") },
      },
    ],
  },
  // end admin

  // start freelancer
  {
    model: "Freelancer",
    documents: [
      // freelancer 1
      {
        _id: mongoose.Types.ObjectId("605b5889babfe71e8432d312"),
        userId: { _id: mongoose.Types.ObjectId("605b5889babfe71e8432d311") },
        categoryId: {
          _id: mongoose.Types.ObjectId("605b580db4a8e60af44d4530"),
        },
        orderId: [
          {
            _id: mongoose.Types.ObjectId("605c3f698f15569950d6e566"),
          },
        ],
        bankName: "BNI",
        bankAccount: "425332453",
        accountHolder: "Adi Prasetyo",
        isBanned: false,
        rating: 4,
        title: "Adis Code",
        description: "Sedia Jasa Coding Mahasiswa",
        imgUrl: "images/freelancer/flc-605b5889babfe71e8432d312.jpg",
        serviceId: [
          { _id: mongoose.Types.ObjectId("605c3f698f15569950d6e562") },
        ],
      },
      // freelancer 2
      {
        _id: mongoose.Types.ObjectId("605b5889babfe71e8432d314"),
        userId: { _id: mongoose.Types.ObjectId("605b5889babfe71e8432d313") },
        categoryId: {
          _id: mongoose.Types.ObjectId("605b580db4a8e60af44d4532"),
        },
        bankName: "BRI",
        bankAccount: "231541231",
        accountHolder: "Galeh Desena Ramadhian",
        isBanned: false,
        rating: 3,
        title: "Desenas Write & Translate",
        description:
          "Menyediakan paket2 Jasa terjemah bahasa inggris sesuai kebutuan anda",
        imgUrl: "images/freelancer/flc-605b5889babfe71e8432d314.jpg",
        serviceId: [
          {
            _id: mongoose.Types.ObjectId("605c3f698f15569950d6e563"),
          },
        ],
      },
      // freelancer 3
      {
        _id: mongoose.Types.ObjectId("605b5889babfe71e8432d316"),
        userId: { _id: mongoose.Types.ObjectId("605b5889babfe71e8432d315") },
        categoryId: {
          _id: mongoose.Types.ObjectId("605b580db4a8e60af44d4533"),
        },
        orderId: [
          {
            _id: mongoose.Types.ObjectId("605c3f698f15569950d6e567"),
          },
        ],
        bankName: "BTN",
        bankAccount: "214215123",
        accountHolder: "Alfiyan",
        isBanned: false,
        rating: 5,
        title: "Alfis memes",
        description: "Membuat meme untuk anda",
        imgUrl: "images/freelancer/flc-605b5889babfe71e8432d316.jpg",
        serviceId: [
          {
            _id: mongoose.Types.ObjectId("605c3f698f15569950d6e564"),
          },
        ],
      },
      // freelancer 4
      {
        _id: mongoose.Types.ObjectId("605b5889babfe71e8432d318"),
        userId: { _id: mongoose.Types.ObjectId("605b5889babfe71e8432d317") },
        categoryId: {
          _id: mongoose.Types.ObjectId("605b580db4a8e60af44d4531"),
        },
        orderId: [
          {
            _id: mongoose.Types.ObjectId("605c3f698f15569950d6e568"),
          },
        ],
        bankName: "Mandiri",
        bankAccount: "3214123",
        accountHolder: "Rizky Aulia",
        isBanned: false,
        rating: 4,
        title: "Riss Design",
        description: "Make premium design",
        imgUrl: "images/freelancer/flc-605b5889babfe71e8432d318.jpg",
        serviceId: [
          {
            _id: mongoose.Types.ObjectId("605c3f698f15569950d6e565"),
          },
        ],
      },
    ],
  },
  // end freelancer

  // start service
  {
    model: "Service",
    documents: [
      {
        _id: mongoose.Types.ObjectId("605c3f698f15569950d6e562"),
        freelancerId: mongoose.Types.ObjectId("605b5889babfe71e8432d312"),
        title: "Paket Tugas Kuliah",
        description:
          "Mengerjakan tugas-tugas seperti membuat logo aplikasi simpel dengan output hanya di dalam console",
        price: 300000,
        imgUrl: "images/service/p1=605b5889babfe71e8432d312.jpg",
      },
      {
        _id: mongoose.Types.ObjectId("605c3f698f15569950d6e563"),
        freelancerId: mongoose.Types.ObjectId("605b5889babfe71e8432d314"),
        title: "Terjemah cepat",
        description:
          "Menerjemahkan bahasa indonesia ke dalam bahasa inggris secara cepat",
        price: 100000,
        imgUrl: "images/service/p1=605b5889babfe71e8432d314.jpg",
      },
      {
        _id: mongoose.Types.ObjectId("605c3f698f15569950d6e564"),
        freelancerId: mongoose.Types.ObjectId("605b5889babfe71e8432d316"),
        title: "Paket edit video lucu",
        description: "Mengubah video yang anda kirim menjadi meme",
        price: 50000,
        imgUrl: "images/service/p1=605b5889babfe71e8432d316.jpg",
      },
      {
        _id: mongoose.Types.ObjectId("605c3f698f15569950d6e565"),
        freelancerId: mongoose.Types.ObjectId("605b5889babfe71e8432d318"),
        title: "Desain Logo Premium",
        description: "Membuat logo yang menarik dengan kualitas yang tinggi",
        price: 500000,
        imgUrl: "images/service/p1=605b5889babfe71e8432d318.jpg",
      },
      {
        _id: mongoose.Types.ObjectId("605c3f698f15569950d6e566"),
        freelancerId: mongoose.Types.ObjectId("605b5889babfe71e8432d318"),
        title: "Paket meme Premium",
        description:
          "Membuat meme segar yang menarik dengan kualitas yang tinggi",
        price: 1000000,
        imgUrl: "images/service/p1=605c3f698f15569950d6e566.jpg",
      },
    ],
  },
  // end service

  // start service user
  {
    model: "ServiceUser",
    documents: [
      // service user 1
      {
        _id: mongoose.Types.ObjectId("605b5889babfe71e8432d320"),
        userId: { _id: mongoose.Types.ObjectId("605b5889babfe71e8432d319") },
        categoryId: {
          _id: mongoose.Types.ObjectId("605b580db4a8e60af44d4533"),
        },
        orderId: [
          {
            _id: mongoose.Types.ObjectId("605c3f698f15569950d6e566"),
          },
          {
            _id: mongoose.Types.ObjectId("605c3f698f15569950d6e568"),
          },
        ],
        isBanned: false,
        rating: 4,
      },
      // service user 2
      {
        _id: mongoose.Types.ObjectId("605b5889babfe71e8432d322"),
        userId: { _id: mongoose.Types.ObjectId("605b5889babfe71e8432d321") },
        categoryId: {
          _id: mongoose.Types.ObjectId("605b580db4a8e60af44d4530"),
        },
        orderId: [
          {
            _id: mongoose.Types.ObjectId("605c3f698f15569950d6e567"),
          },
        ],
        isBanned: false,
        rating: 4,
      },
    ],
  },
  // end service user

  // start order
  {
    model: "Order",
    documents: [
      {
        _id: mongoose.Types.ObjectId("605c3f698f15569950d6e566"),
        orderDate: "3-29-2021",
        serviceUserId: mongoose.Types.ObjectId("605b5889babfe71e8432d320"),
        serviceId: [
          {
            _id: mongoose.Types.ObjectId("605c3f698f15569950d6e562"),
            title: "Paket Tugas Kuliah",
            price: 300000,
          },
        ],
        total: 300000,
        proofPayment: "images/order/p-605c3f698f15569950d6e566.jpg",
        bankFrom: "BNI",
        accountHolder: "Dandi",
        status: "finished",
      },
      {
        _id: mongoose.Types.ObjectId("605c3f698f15569950d6e567"),
        orderDate: "4-1-2021",
        serviceUserId: mongoose.Types.ObjectId("605b5889babfe71e8432d322"),
        serviceId: [
          {
            _id: mongoose.Types.ObjectId("605c3f698f15569950d6e564"),
            title: "Paket edit video lucu",
            price: 50000,
          },
          {
            _id: mongoose.Types.ObjectId("605c3f698f15569950d6e566"),
            title: "Paket meme Premium",
            price: 100000,
          },
        ],
        total: 150000,
        proofPayment: "images/order/p-605c3f698f15569950d6e567.jpg",
        bankFrom: "BCA",
        accountHolder: "Krisna Pramana",
        status: "unpaid",
      },
      {
        _id: mongoose.Types.ObjectId("605c3f698f15569950d6e568"),
        orderDate: "4-5-2021",
        serviceUserId: mongoose.Types.ObjectId("605b5889babfe71e8432d320"),
        serviceId: [
          {
            _id: mongoose.Types.ObjectId("605c3f698f15569950d6e565"),
            title: "Desain Logo Premium",
            price: 500000,
          },
        ],
        total: 500000,
        proofPayment: "images/order/p-605c3f698f15569950d6e568.jpg",
        bankFrom: "BNI",
        accountHolder: "Dandi",
        status: "unpaid",
      },
    ],
  },
  // end order
];
