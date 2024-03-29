import User from "../models/User";
import bcrypt from "bcrypt";

export const getJoin = (req, res) => {
  res.render("join", { pageTitle: "Join" });
};
export const postJoin = async (req, res) => {
  const {
    body: { name, username, email, password, password2, location },
  } = req;
  const pageTitle = "Join";
  const exist = await User.exists({ $or: [{ username }, { email }] });
  if (password !== password2) {
    return res.status(400).render("join", {
      pageTitle: pageTitle,
      erroMessage: "패스워드가 맞지 않습니다.",
    });
  }
  if (exist) {
    return res.status(400).render("join", {
      pageTitle: pageTitle,
      erroMessage: "존재하는 유저입니다!",
    });
  }
  try {
    await User.create({
      name,
      username,
      email,
      password,
      location,
    });

    return res.redirect("/login");
  } catch (error) {
    return res.status(400).render("join", {
      pageTitle: "Join",
      errorMessage: error._message,
    });
  }
};
export const remove = (req, res) =>
  res.render("delete", { pageTitle: "delete" });

export const getLogin = (req, res) =>
  res.render("login", { pageTitle: "login", pageTitle: "login" });

export const postLogin = async (req, res) => {
  const {
    body: { username, password },
  } = req;
  const pageTitle = "Login";
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(400).render("login", {
      pageTitle,
      errorMessage: "존재하지 않는 유저입니다.",
    });
  }
  req.session.loggedIn = true;
  req.session.user = user;
  const ok = await bcrypt.compare(password, user.password);

  if (!ok) {
    return res.status(400).render("login", {
      pageTitle,
      errorMessage: "패스워드가 잘못되었습니다!",
    });
  }

  res.redirect("/");
};

export const logout = (req, res) =>
  res.render("logout", { pageTitle: "logout" });

export const see = (req, res) => res.render("see", { pageTitle: "see" });
