var seeder = require("mongoose-seed");
var mongoose = require("mongoose");

// environment
const dotenv = require("dotenv");
dotenv.config();

// Connect to MongoDB via Mongoose
seeder.connect(
  process.env.DB_CONNECT,
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
  },
  function () {
    // Load Mongoose models
    seeder.loadModels([
      "./models/Chat",
      "./models/Category",
      "./models/Bank",
      "./models/Service",
      "./models/Order",
      "./models/Admin",
      "./models/Freelancer",
      "./models/Service_user",
      "./models/User",
      "./models/Request",
      "./models/Request_bid",
      "./models/Review",
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
        "Chat",
        "Request",
        "RequestBid",
        "Review",
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
  // end bank

  // start user
  {
    model: "User",
    documents: [
      // admin 1
      {
        _id: mongoose.Types.ObjectId("5e96cbe292b97300fc902227"),
        // adminId: mongoose.Types.ObjectId("5e96cbe292b97300fc902226"),
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
        // adminId: mongoose.Types.ObjectId("5e96cbe292b97300fc902228"),
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
        // freelancerId: mongoose.Types.ObjectId("605b5889babfe71e8432d312"),
        name: "Adi Prasetyo",
        email: "adipras@gmail.com",
        password: "adipras123",
        level: "freelancer",
        birthdate: "2000-02-06",
        address: "Kediri",
        phone: "085854270625",
        imgUrl: "images/user/adis.jpg",
      },
      // freelancer 2
      {
        _id: mongoose.Types.ObjectId("605b5889babfe71e8432d313"),
        // freelancerId: mongoose.Types.ObjectId("605b5889babfe71e8432d314"),
        name: "Galeh Desena Ramadhian",
        email: "galdes@gmail.com",
        password: "galehdesena",
        level: "freelancer",
        birthdate: "2000-02-06",
        address: "Kediri",
        phone: "085854270625",
        imgUrl: "images/user/desenas.jpg",
      },
      // freelancer 3
      {
        _id: mongoose.Types.ObjectId("605b5889babfe71e8432d315"),
        // freelancerId: mongoose.Types.ObjectId("605b5889babfe71e8432d316"),
        name: "Alfiyan",
        email: "alfiyan@gmail.com",
        password: "alfiyan123",
        level: "freelancer",
        birthdate: "2000-02-06",
        address: "Malang",
        phone: "085854270625",
        imgUrl: "images/user/alfiyan.jpg",
      },
      // freelancer 4
      {
        _id: mongoose.Types.ObjectId("605b5889babfe71e8432d317"),
        // freelancerId: mongoose.Types.ObjectId("605b5889babfe71e8432d318"),
        name: "Rizky Zahro",
        email: "rizkyz@gmail.com",
        password: "rizky123",
        level: "freelancer",
        birthdate: "2000-02-06",
        address: "Malang",
        phone: "085854270625",
        imgUrl: "images/user/rizky.jpg",
      },
      // service user 1
      {
        _id: mongoose.Types.ObjectId("605b5889babfe71e8432d319"),
        // serviceUserId: mongoose.Types.ObjectId("605b5889babfe71e8432d320"),
        name: "Rizky Dandi",
        email: "rizkyd@gmail.com",
        password: "rizky123",
        level: "service_user",
        birthdate: "2000-02-06",
        address: "Kediri",
        phone: "085854270625",
      },
      // service user 2
      {
        _id: mongoose.Types.ObjectId("605b5889babfe71e8432d321"),
        // serviceUserId: mongoose.Types.ObjectId("605b5889babfe71e8432d322"),
        name: "Krisna Pramana",
        email: "krisnapd@gmail.com",
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
        isActive: true,
        bankName: "BNI",
        bankAccount: "425332453",
        accountHolder: "Adi Prasetyo",
        isBanned: false,
        title: "Adis Code",
        description: "Sedia Jasa Coding Mahasiswa",
        imgUrl: "images/freelancer/thumbnail-1.jpg",
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
        isActive: true,
        bankName: "BRI",
        bankAccount: "231541231",
        accountHolder: "Galeh Desena Ramadhian",
        isBanned: false,
        title: "Desenas Write & Translate",
        description:
          "Menyediakan paket2 Jasa terjemah bahasa inggris sesuai kebutuan anda",
        imgUrl: "images/freelancer/thumbnail-4.jpg",
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
        isActive: true,
        bankName: "BTN",
        bankAccount: "214215123",
        accountHolder: "Alfiyan Rohman",
        isBanned: false,
        title: "Alfis memes",
        description: "Membuat meme untuk anda",
        imgUrl: "images/freelancer/thumbnail-2.jpeg",
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
        isActive: true,
        bankName: "Mandiri",
        bankAccount: "3214123",
        accountHolder: "Rizky Aulia",
        isBanned: false,
        title: "Riss Design",
        description: "Make premium design",
        imgUrl: "images/freelancer/thumbnail-3.jpg",
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
        imgUrl: "images/service/p1-605b5889babfe71e8432d312.jpg",
      },
      {
        _id: mongoose.Types.ObjectId("605c3f698f15569950d6e563"),
        freelancerId: mongoose.Types.ObjectId("605b5889babfe71e8432d314"),
        title: "Terjemah cepat",
        description:
          "Menerjemahkan bahasa indonesia ke dalam bahasa inggris secara cepat",
        price: 100000,
        imgUrl: "images/service/p1-605b5889babfe71e8432d314.jpg",
      },
      {
        _id: mongoose.Types.ObjectId("605c3f698f15569950d6e564"),
        freelancerId: mongoose.Types.ObjectId("605b5889babfe71e8432d316"),
        title: "Paket edit video lucu",
        description: "Mengubah video yang anda kirim menjadi meme",
        price: 50000,
        imgUrl: "images/service/p1-605b5889babfe71e8432d316.jpg",
      },
      {
        _id: mongoose.Types.ObjectId("605c3f698f15569950d6e565"),
        freelancerId: mongoose.Types.ObjectId("605b5889babfe71e8432d318"),
        title: "Desain Logo Premium",
        description: "Membuat logo yang menarik dengan kualitas yang tinggi",
        price: 500000,
        imgUrl: "images/service/p1-605b5889babfe71e8432d318.jpg",
      },
      {
        _id: mongoose.Types.ObjectId("605c3f698f15569950d6e566"),
        freelancerId: mongoose.Types.ObjectId("605b5889babfe71e8432d318"),
        title: "Paket meme Premium",
        description:
          "Membuat meme segar yang menarik dengan kualitas yang tinggi",
        price: 1000000,
        imgUrl: "images/service/p1-605c3f698f15569950d6e566.jpg",
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
        freelancerId: mongoose.Types.ObjectId("605b5889babfe71e8432d312"),
        serviceUserId: mongoose.Types.ObjectId("605b5889babfe71e8432d320"),
        orderDate: "3-29-2021",
        invoice: "154334",
        serviceId: {
          _id: mongoose.Types.ObjectId("605c3f698f15569950d6e562"),
          title: "Paket Tugas Kuliah",
          price: 300000,
        },
        total: 300000,
        name: "tester",
        email: "tester@gmail.com",
        phone: "432652342",
        detailNote: "Please make this like this",
        payments: {
          proofPayment: "images/order/proof_payment/proof_default.jpeg",
          bankFrom: "BNI",
          accountHolder: "Dandi",
          status: "finished",
        },
      },
      {
        _id: mongoose.Types.ObjectId("605c3f698f15569950d6e567"),
        freelancerId: mongoose.Types.ObjectId("605b5889babfe71e8432d316"),
        serviceUserId: mongoose.Types.ObjectId("605b5889babfe71e8432d322"),
        orderDate: "4-1-2021",
        invoice: "154364",
        serviceId: {
          _id: mongoose.Types.ObjectId("605c3f698f15569950d6e564"),
          title: "Paket edit video lucu",
          price: 50000,
        },
        total: 150000,
        name: "tester",
        email: "tester@gmail.com",
        phone: "432652342",
        detailNote: "Please make this like this",
        payments: {
          proofPayment: "images/order/proof_payment/proof_default.jpeg",
          bankFrom: "BCA",
          accountHolder: "Krisna Pramana",
          status: "unpaid",
        },
      },
      {
        _id: mongoose.Types.ObjectId("605c3f698f15569950d6e568"),
        freelancerId: mongoose.Types.ObjectId("605b5889babfe71e8432d318"),
        serviceUserId: mongoose.Types.ObjectId("605b5889babfe71e8432d320"),
        orderDate: "4-5-2021",
        invoice: "154367",
        serviceId: {
          _id: mongoose.Types.ObjectId("605c3f698f15569950d6e565"),
          title: "Desain Logo Premium",
          price: 500000,
        },
        total: 500000,
        name: "tester",
        email: "tester@gmail.com",
        phone: "432652342",
        detailNote: "Please make this like this",
        payments: {
          proofPayment: "images/order/proof_payment/proof_default.jpeg",
          bankFrom: "BNI",
          accountHolder: "Dandi",
          status: "unpaid",
        },
      },
    ],
  },
  // end order

  {
    model: "Chat",
    documents: [
      {
        _id: mongoose.Types.ObjectId("6082bac5a09b4aab456a8a89"),
        freelancerUserId: mongoose.Types.ObjectId("605b5889babfe71e8432d317"),
        serviceUserId: mongoose.Types.ObjectId("605b5889babfe71e8432d319"),
        from: mongoose.Types.ObjectId("605b5889babfe71e8432d319"),
        to: mongoose.Types.ObjectId("605b5889babfe71e8432d317"),
        message: "Gan saya bisa pesen desain logo dengan estimasi....",
        isReadFreelancer: true,
        isReadServiceUser: true,
        time: "2021-05-08T13:35:16.048+00:00",
      },
      {
        _id: mongoose.Types.ObjectId("6082bac5a09b4aab456a8a90"),
        freelancerUserId: mongoose.Types.ObjectId("605b5889babfe71e8432d317"),
        serviceUserId: mongoose.Types.ObjectId("605b5889babfe71e8432d319"),
        from: mongoose.Types.ObjectId("605b5889babfe71e8432d319"),
        to: mongoose.Types.ObjectId("605b5889babfe71e8432d317"),
        message: "Gan logonya udah jadi gan keren",
        isReadFreelancer: true,
        isReadServiceUser: true,
        time: "2021-05-16T13:35:16.048+00:00",
      },
      {
        _id: mongoose.Types.ObjectId("6082bac5a09b4aab456a8a91"),
        freelancerUserId: mongoose.Types.ObjectId("605b5889babfe71e8432d317"),
        serviceUserId: mongoose.Types.ObjectId("605b5889babfe71e8432d319"),
        from: mongoose.Types.ObjectId("605b5889babfe71e8432d317"),
        to: mongoose.Types.ObjectId("605b5889babfe71e8432d319"),
        message: "Terima kasih feedbacknya",
        isReadFreelancer: true,
        isReadServiceUser: false,
        time: "2021-05-16T13:36:16.048+00:00",
      },
      {
        _id: mongoose.Types.ObjectId("6082bac5a09b4aab456a8a94"),
        freelancerUserId: mongoose.Types.ObjectId("605b5889babfe71e8432d317"),
        serviceUserId: mongoose.Types.ObjectId("605b5889babfe71e8432d321"),
        from: mongoose.Types.ObjectId("605b5889babfe71e8432d321"),
        to: mongoose.Types.ObjectId("605b5889babfe71e8432d317"),
        message: "Gan pesen logo seperti ini bisa?",
        isReadFreelancer: false,
        isReadServiceUser: true,
        time: "2021-05-16T13:35:16.048+00:00",
      },
    ],
  },

  {
    model: "Request",
    documents: [
      // Request 1
      {
        _id: mongoose.Types.ObjectId("60c1840e7936c1cccde480b7"),
        serviceUserId: mongoose.Types.ObjectId("605b5889babfe71e8432d322"),
        categoryId: mongoose.Types.ObjectId("605b580db4a8e60af44d4530"),
        requestSubject:
          "Buat aplikasi kalkulator dengan menggunakan javascript",
        requestDescription: "Nanti jalannya aplikasi akan seperti ini....",
        requestBudget: 60000,
        freelancerId: mongoose.Types.ObjectId("605b5889babfe71e8432d318"),
      },
      // Request 2
      {
        _id: mongoose.Types.ObjectId("60c1840e7936c1cccde480b8"),
        serviceUserId: mongoose.Types.ObjectId("605b5889babfe71e8432d320"),
        categoryId: mongoose.Types.ObjectId("605b580db4a8e60af44d4530"),
        requestSubject:
          "Buat aplikasi kalkulator dengan menggunakan javascript",
        requestDescription: "Nanti jalannya aplikasi akan seperti ini....",
        requestBudget: 40000,
      },
    ],
  },
  
  {
    model: "RequestBid",
    documents: [
      // Request 1
      {
        _id: mongoose.Types.ObjectId("60c1840e7936c1cccde480b8"),
        requestId: mongoose.Types.ObjectId("60c1840e7936c1cccde480b7"),
        freelancerId: mongoose.Types.ObjectId("605b5889babfe71e8432d312"),
        bid: 60000,
      },
    ],
  },
  {
    model: "Review",
    documents: [
      // Review 1
      {
        _id: mongoose.Types.ObjectId("60c0f9c37936c1cccde480b0"),
        freelancerId: mongoose.Types.ObjectId("605b5889babfe71e8432d318"),
        serviceUserId: mongoose.Types.ObjectId("605b5889babfe71e8432d320"),
        rating: 2,
        description: "Hasilnya cukup untuk memenuhi kebutuhan saya",
      },
      {
        _id: mongoose.Types.ObjectId("60c0f9c37936c1cccde480b1"),
        freelancerId: mongoose.Types.ObjectId("605b5889babfe71e8432d314"),
        serviceUserId: mongoose.Types.ObjectId("605b5889babfe71e8432d322"),
        rating: 4,
        description: "Bagus nih, saya akan pesan jika ada perlu lagi",
      },
      {
        _id: mongoose.Types.ObjectId("60c0f9c37936c1cccde480b2"),
        freelancerId: mongoose.Types.ObjectId("605b5889babfe71e8432d312"),
        serviceUserId: mongoose.Types.ObjectId("605b5889babfe71e8432d320"),
        rating: 2.5,
        description: "Hmm not bad lah",
      },
      {
        _id: mongoose.Types.ObjectId("60c0f9c37936c1cccde480b3"),
        freelancerId: mongoose.Types.ObjectId("605b5889babfe71e8432d316"),
        serviceUserId: mongoose.Types.ObjectId("605b5889babfe71e8432d320"),
        rating: 3,
        description: "Lumayan sih tugas saya jadi selesai hehe",
      },
      {
        _id: mongoose.Types.ObjectId("60c0f9c37936c1cccde480b4"),
        freelancerId: mongoose.Types.ObjectId("605b5889babfe71e8432d318"),
        serviceUserId: mongoose.Types.ObjectId("605b5889babfe71e8432d320"),
        rating: 4,
        description: "Saya suka dengan hasilnya, trusted nih",
      },
      {
        _id: mongoose.Types.ObjectId("60c0f9c37936c1cccde480b5"),
        freelancerId: mongoose.Types.ObjectId("605b5889babfe71e8432d312"),
        serviceUserId: mongoose.Types.ObjectId("605b5889babfe71e8432d322"),
        rating: 3,
        description: "Mantap gan",
      },
      {
        _id: mongoose.Types.ObjectId("60c0f9c37936c1cccde480b6"),
        freelancerId: mongoose.Types.ObjectId("605b5889babfe71e8432d318"),
        serviceUserId: mongoose.Types.ObjectId("605b5889babfe71e8432d320"),
        rating: 5,
        description: "Wah keren banget nih hasilnya, jauh lebih bagus dari ekspektasi saya ",
      },
    ],
  },
];
