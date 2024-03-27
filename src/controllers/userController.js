import User from "../models/User";

export const getJoin = (req, res) => {
  res.render("join", { pageTitle: "Join" });
};
export const postJoin = async (req, res) => {
  const {
    body: { name, username, email, password, location },
  } = req;
  await User.create({
    name,
    username,
    email,
    password,
    location,
  })

  return res.redirect("/login");
};
export const remove = (req, res) =>
  res.render("delete", { pageTitle: "delete" });

export const login = (req, res) => res.render("login", { pageTitle: "login" });

export const logout = (req, res) =>
  res.render("logout", { pageTitle: "logout" });

export const see = (req, res) => res.render("see", { pageTitle: "see" });
