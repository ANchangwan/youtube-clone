const fakeUser = {
  username: "anchangwan",
  loggedIn: true,
};

export const trending = (req, res) => {
  return res.render("home", { pageTitle: "home"});
};
export const see = (req, res) => res.render("watch", { pageTitle: "watch" });
export const search = (req, res) => res.send("search", { pageTitle: "search" });

export const edit = (req, res) => {
  res.render("edit", { pageTitle: "edit" });
};
export const upload = (req, res) => res.send("upload", { pageTitle: "upload" });
export const deleteVideo = (req, res) =>
  res.send("deleteVideo", { pageTitle: "deleteVideo" });
