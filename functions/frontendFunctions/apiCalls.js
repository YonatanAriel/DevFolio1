import { notFound } from "next/navigation";
import { createFormData } from "./formData";

export const sendSignUpData = async (data) => {
  const formData = createFormData(data);
  let response = "";
  // ${process.env.NEXT_PUBLIC_BASE_URL}
  await fetch(`/api/users/signUp`, {
    method: "POST",
    body: formData,
  })
    .then((res) => res.json())
    .then((data) => {
      response = data;
      console.error(data);
    })
    .catch((error) => {
      response = data;
      console.error("Error:", error);
    });
  return response;
};

export const sendSignInData = async (data) => {
  // ${process.env.NEXT_PUBLIC_BASE_URL}
  return await fetch(`/api/users/signIn`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => {
      if (!res.ok) {
        return Promise.reject(res);
      }
      return res.json();
    })
    .then((data) => {
      return data;
    });
};

export const getAllUsers = async () => {
  // ${process.env.NEXT_PUBLIC_BASE_URL}
  const res = await fetch(`/api/users`, {
    next: { revalidate: 20 },
  });
  return await res.json();
};

export const getUser = async (id) => {
  // ${process.env.NEXT_PUBLIC_BASE_URL}
  const res = await fetch(`/api/users/?id=${id}`, {
    next: { revalidate: 20 },
  });
  if (!res.ok) notFound();
  return await res.json();
};

export const getUserByToken = async (token) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  // ${process.env.NEXT_PUBLIC_BASE_URL}
  const res = await fetch(`/api/users/profile`, {
    next: { revalidate: 0 },
    headers,
  });
  return await res.json();
};

export const getAllProjects = async () => {
  // ${process.env.NEXT_PUBLIC_BASE_URL}
  const res = await fetch(`/api/projects`, {
    cache: "no-store",
  });
  return await res.json();
};

export const addProject = async (projectData, token) => {
  const formData = createFormData(projectData);
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  // ${process.env.NEXT_PUBLIC_BASE_URL}
  let res = await fetch(`/api/projects/addProject`, {
    method: "POST",
    headers,
    body: formData,
  });
  res = await res.json();
  if (res === "success") return "success";
  else return "error";
};

export const getUserProjects = async (id) => {
  // ${process.env.NEXT_PUBLIC_BASE_URL}
  const res = await fetch(`/api/projects/user?id=${id}`).then((res) =>
    res.json()
  );
  // if (!res.ok) notFound();
  return res;
};

export const search = async (text) => {
  // ${process.env.NEXT_PUBLIC_BASE_URL}
  return await fetch(`/api/search`, {
    method: "POST",
    body: JSON.stringify(text),
  }).then((res) => res.json());
};

export const updateDetails = async (details, token) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const formData = createFormData(details);
  // ${process.env.NEXT_PUBLIC_BASE_URL}
  return await fetch(`/api/users/updateDetails`, {
    method: "POST",
    body: formData,
    headers,
  })
    .then((res) => res.json())
    .catch((error) => {
      console.error("Error:", error);
    });
};
