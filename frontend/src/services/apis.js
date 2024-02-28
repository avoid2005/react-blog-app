const url = "http://localhost:5000/api";

export const userSignUpApi = async (newUser) => {
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
};

export const userSignInApi = async (user) => {
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
};

export const getUserDataById = async (id) => {
  const request = await fetch(`${url}/users/data/${id}`);
  const responseData = await request.json();
  if (responseData)
    return {
      status: request.status,
      data: responseData,
      message: responseData.message ? responseData.message : null,
    };
  else return false;
};

export const getAllPosts = async () => {
  const request = await fetch(`${url}/allposts`);
  const responseData = await request.json();
  if (responseData)
    return {
      status: request.status,
      allPosts: responseData,
    };
  else return false;
};

export const sendNewPost = async (id, newPost) => {
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
};

export const getPostDetail = async (postId) => {
  const request = await fetch(`${url}/allposts/${postId}`);
  const responseData = await request.json();
  if (responseData)
    return {
      status: request.status,
      detailPost: responseData,
    };
  else return false;
};

export const sendUpdatedPost = async (id, postId, updatedPost) => {
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
};

export const deletePost = async (id, postId) => {
  const request = await fetch(`${url}/delete/${id}/${postId}`, {
    method: "DELETE",
  });
  if (request.ok) return { status: request.status };
  else return false;
};
