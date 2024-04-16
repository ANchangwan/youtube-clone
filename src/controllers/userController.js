import User from "../models/User";
import bcrypt from "bcrypt";
import Video from "../models/Video";

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

export const logout = (req, res) => {
  req.session.destroy();
  console.log("session out");
  return res.redirect("/");
};

export const profile = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) {
    return res.status(400).render("404", { pageTitle: "User Not Found" });
  }
  const videos = await Video.find({ owner: user._id });
  
  return res
    .status(200)
    .render("users/profile", { pageTitle: user.name, videos });
};

export const getUserEdit = (req, res) => {
  return res.render("edit-profile", { pageTitle: "edit-profile" });
};

export const postUserEdit = async (req, res) => {
  const {
    session: {
      user: { _id, avatarUrl, email: sessionEmail, username: sessionUsername },
    },
  } = req;
  const {
    body: { name, email, username, location },
    file: { path },
  } = req;

  if (sessionEmail === email) {
    return res.status(400).render("edit-profile", {
      pageTitle: "edit-profile",
      sessionError: "이미 존재하는 이메일입니다.",
    });
  }

  if (sessionUsername === username) {
    return res.status(400).render("edit-profile", {
      pageTitle: "edit-profile",
      sessionError: "이미 존재하는 username입니다.",
    });
  }
  try {
    const updatedUser = await User.findByIdAndUpdate(
      _id,
      {
        avatarUrl: path ? path : avatarUrl,
        name,
        email,
        username,
        location,
      },
      { new: true }
    );
    req.session.user = updatedUser;
    return res.redirect("/users/edit");
  } catch (e) {
    return res.status(400).redirect("/users/edit");
  }
};

export const getChangePassword = (req, res) => {
  if (req.session.user.socialOnly === true) {
    return res.redirect("/");
  }
  return res.render("users/change-password", { pageTitle: "Change Password" });
};
export const postChangePassword = async (req, res) => {
  const {
    session: {
      user: { _id },
    },
    body: { oldPassword, newPassword, confirmPassword },
  } = req;
  const user = await User.findById(_id);
  const ok = await bcrypt.compare(oldPassword, user.password);
  if (!ok) {
    return res.status(400).render("users/change-password", {
      pageTitle: "Change Password",
      erroMessage: "기존 비밀번호와 일치하지 않습니다!!",
    });
  }
  if (newPassword !== confirmPassword) {
    return res.status(400).render("users/change-password", {
      pageTitle: "Change Password",
      erroMessage: "비밀번호가 일치하지 않습니다!!",
    });
  }
  user.password = newPassword;
  await user.save();
  return res.redirect("/users/logout");
};
