export const join = (req, res) => res.render("join", { pageTitle });
export const remove = (req, res) =>
  res.render("delete", { pageTitle: "delete" });

export const login = (req, res) => res.render("login", { pageTitle: "login" });

export const logout = (req, res) =>
  res.render("logout", { pageTitle: "logout" });

export const see = (req, res) => res.render("see", { pageTitle: "see" });
