const url = "http://localhost:5000/api";

export async function userSignUpApi(newUser) {
  const request = await fetch(`${url}/users/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newUser),
  });
  const responseData = await request.json();
  if (responseData)
    return {
      status: request.status,
      id: responseData.id ? responseData.id : null,
      message: responseData.message,
    };
  else return false;
}

export async function userSignInApi(user) {
  const request = await fetch(`${url}/users/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  const responseData = await request.json();
  if (responseData)
    return {
      status: request.status,
      id: responseData.id ? responseData.id : null,
      message: responseData.message,
    };
  else return false;
}

export async function getUserDataById(id) {
  const request = await fetch(`${url}/users/data/${id}`);
  const responseData = await request.json();
  if (responseData)
    return {
      status: request.status,
      data: responseData,
      message: responseData.message ? responseData.message : null,
    };
  else return false;
}

export async function getAllPosts() {
  const request = await fetch(`${url}/allposts`);
  const responseData = await request.json();
  if (responseData)
    return {
      status: request.status,
      allPosts: responseData,
    };
  else return false;
}

export async function sendNewPost(id, newPost) {
  const request = await fetch(`${url}/users/newpost/${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newPost),
  });
  const responseData = await request.json();
  if (responseData)
    return {
      status: request.status,
      message: responseData.message,
    };
  else return false;
}

export async function getPostDetail(postId) {
  const request = await fetch(`${url}/allposts/${postId}`);
  const responseData = await request.json();
  if (responseData)
    return {
      status: request.status,
      detailPost: responseData,
    };
  else return false;
}

export async function sendUpdatedPost(id, postId, updatedPost) {
  const request = await fetch(`${url}/edit/${id}/${postId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedPost),
  });
  const responseData = await request.json();
  if (responseData)
    return {
      status: request.status,
      message: responseData.message,
    };
  else return false;
}

export async function deletePost(id, postId) {
  const request = await fetch(`${url}/delete/${id}/${postId}`, {
    method: "DELETE",
  });
  if (request.ok) return { status: request.status };
  else return false;
}
