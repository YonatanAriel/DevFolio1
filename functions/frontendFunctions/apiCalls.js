import { notFound } from "next/navigation";
import { createFormData } from "./formData";

export const sendSignUpData = async (data) => {
  const formData = createFormData(data);
  let response = "";
  await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}api/users/signUp`, {
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
  return await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}api/users/signIn`, {
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
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}api/users`, {
    next: { revalidate: 20 },
  });
  return await res.json();
};

export const getUser = async (id) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}api/users/?id=${id}`,
    {
      next: { revalidate: 20 },
    }
  );
  if (!res.ok) notFound();
  return await res.json();
};

export const getUserByToken = async (token) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}api/users/profile`,
    {
      next: { revalidate: 0 },
      headers,
    }
  );
  return await res.json();
};

export const getAllProjects = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}api/projects`, {
    cache: "no-store",
  });
  return await res.json();
};

export const addProject = async (projectData, token) => {
  const formData = createFormData(projectData);
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  let res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}api/projects/addProject`,
    {
      method: "POST",
      headers,
      body: formData,
    }
  );
  res = await res.json();
  if (res === "success") return "success";
  else return "error";
};

export const getUserProjects = async (id) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}api/projects/user?id=${id}`
  ).then((res) => res.json());
  // if (!res.ok) notFound();
  return res;
};

export const search = async (text) => {
  return await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}api/search`, {
    method: "POST",
    body: JSON.stringify(text),
  }).then((res) => res.json());
};

export const updateDetails = async (details) => {
  const formData = createFormData(details);
  return await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}api/users/updateDetails`,
    {
      method: "POST",
      body: JSON.stringify(formData),
    }
  )
    .then((res) => res.json())
    .catch((error) => {
      console.error("Error:", error);
    });
};
