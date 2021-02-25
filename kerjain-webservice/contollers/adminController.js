const Category = require("../models/category");
const Bank = require("../models/bank");

module.exports = {
  viewDashboard: (req, res) => {
    const title = "Dashboard | Admin Kerjain";
    res.render("admin/dashboard/view_dashboard", { title });
  },

  viewCategory: async (req, res) => {
    const title = "View Category | Admin Kerjain";
    const category = await Category.find();
    res.render("admin/category/view_category", { title, category });
  },

  addCategory: async (req, res) => {
    const { name } = req.body;

    await Category.create({ name });
    res.redirect("category");
  },

  editCategory: async (req, res) => {
    const { id, name } = req.body;
    const category = await Category.findOne({ _id: id });
    category.name = name;
    await category.save();
    res.redirect("category");
  },

  deleteCategory: async (req, res) => {
    const { id } = req.body;
    const category = await Category.findOne({ _id: id });
    console.log(category);
    await category.remove();
    res.redirect("category");
  },

  viewBank: async (req, res) => {
    const title = "View Bank | Admin Kerjain";
    const bank = await Bank.find();
    res.render("admin/bank/view_bank", { title, bank });
  },

  addBank: async (req, res) => {
    const { bankName, bankAccount, accountHolder } = req.body;
    await Bank.create({ bankName, bankAccount, accountHolder });
    res.redirect("bank");
  },

  editBank: async (req, res) => {
    const { id, bankName, bankAccount, accountHolder } = req.body;
    const bank = await Bank.findOne({ _id: id });
    bank.bankName = bankName;
    bank.bankAccount = bankAccount;
    bank.accountHolder = accountHolder;
    await bank.save();
    res.redirect("bank");
  },

  deleteBank: async (req, res) => {
    const { id } = req.body;
    const bank = await Bank.findOne({ _id: id });
    await bank.remove();
    res.redirect("bank");
  },

  viewFreelancer: (req, res) => {
    const title = "View Freelancer | Admin Kerjain";
    res.render("admin/freelancer/view_freelancer", { title });
  },
  viewServiceUser: (req, res) => {
    const title = "View Service User | Admin Kerjain";
    res.render("admin/service_user/view_service_user", { title });
  },
  viewOrder: (req, res) => {
    const title = "View Order | Admin Kerjain";
    res.render("admin/order/view_order", { title });
  },
};
