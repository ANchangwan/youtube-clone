import { async } from "regenerator-runtime";

const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");
const videoId = videoContainer.dataset.id;
const videoComments = document.querySelector(".video__comments ul");
const addComment = (text, id) => {
  const videoComments = document.querySelector(".video__comments ul");
  const newComment = document.createElement("li");
  newComment.dataset.id = id;
  newComment.className = "video__comments";
  const icon = document.createElement("i");
  icon.className = "fas.fa-comment";
  const span = document.createElement("span");
  span.innerText = `${text}`;
  const deletebtn = document.createElement("span");
  deletebtn.innerText = "❌";
  deletebtn.className = "commentDeleteBtn";
  span.className = "video__comment";
  newComment.appendChild(icon);
  newComment.appendChild(span);
  newComment.appendChild(deletebtn);
  videoComments.prepend(newComment);
};

const handleSubmit = async (event) => {
  event.preventDefault();
  const textarea = form.querySelector("textarea");
  const text = textarea.value;
  const videoId = videoContainer.dataset.id;

  if (text === "") {
    return;
  }
  const response = await fetch(`/api/videos/${videoId}/comment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  });
  console.log(response, "this");
  if (response.status === 201) {
    textarea.value = "";
    const { newCommentId } = await response.json();
    addComment(text, newCommentId);
  }
};
const handledeleteComment = async (event) => {
  
  event.preventDefault();
  if (event.target.className !== "commentDeleteBtn") {
    return;
  }
  const li = event.target.closest("li");
  const commentId = li.dataset.id;

  const { status } = await fetch(
    `/api/videos/${videoId}/comment/${commentId}`,
    {
      method: "DELETE",
    }
  );
  videoComments.removeChild(li);
  // alert("댓글을 제거할 수 없습니다.");
};

videoComments.addEventListener("click", handledeleteComment);

console.log(form);

if (form) {
  form.addEventListener("submit", handleSubmit);
}
