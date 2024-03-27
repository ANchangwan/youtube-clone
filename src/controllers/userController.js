import User from "../models/User";

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
    return res.render("join", {
      pageTitle: pageTitle,
      erroMessage: "패스워드가 맞지 않습니다.",
    });
  }
  if (exist) {
    return res.render("join", {
      pageTitle: pageTitle,
      erroMessage: "존재하는 유저입니다!",
    });
  }

  await User.create({
    name,
    username,
    email,
    password,
    location,
  });

  return res.redirect("/login");
};
export const remove = (req, res) =>
  res.render("delete", { pageTitle: "delete" });

export const login = (req, res) => res.render("login", { pageTitle: "login" });

export const logout = (req, res) =>
  res.render("logout", { pageTitle: "logout" });

export const see = (req, res) => res.render("see", { pageTitle: "see" });
