/* eslint-disable @typescript-eslint/no-explicit-any */
import http from "./http";

// const BASE_URL = "/auth/v1";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL + "/auth";

export async function login(username: string, password: string) {
  try {
    return await http.post(BASE_URL + "/login", { username, password });
  } catch (error) {
    console.error("Error in login function:", error); // הדפסת השגיאה במקרה של כשל
    throw error; // לזרוק את השגיאה לטיפול נוסף, אם יש צורך
  }
}

export async function register(
  username: string,
  password: string,
  email: string
) {
  return await http.post(BASE_URL + "/register", { username, password, email });
}

export async function register1(email: string) {
  return await http.post(BASE_URL + "/register1", { email });
}

export async function register2(
  password: string,
  token: string,
  firstname: string,
  lastname: string
) {
  return await http.post(BASE_URL + "/register2", {
    password,
    token,
    firstname,
    lastname,
  });
}

// export async function registerCandidate1(
//   email: string,
//   first_name: string,
//   last_name: string,
//   phone: string,
//   area: number[],
//   categories: number[],
//   message: string,
//   file: File,
//   job_to_add_job_candidate_user?: string | number,
//   living_city?: number[]
// ) {
//   const formData = new FormData();
//   formData.append("email", email);
//   formData.append("first_name", first_name);
//   formData.append("last_name", last_name);
//   formData.append("phone", phone);
//   formData.append("location", JSON.stringify(area));
//   if (living_city) formData.append("living_city", JSON.stringify(living_city));
//   formData.append("categories", JSON.stringify(categories));
//   job_to_add_job_candidate_user &&
//     formData.append(
//       "job_to_add_job_candidate_user",
//       job_to_add_job_candidate_user.toString()
//     );
//   message && formData.append("message", message);
//   file && formData.append("file", file);

//   return await http.post(BASE_URL + "/register-candidate1", formData);
// }

// export async function registerQuick(
//   email: string,
//   first_name: string,
//   last_name: string,
//   phone: string,
//   area: number[],
//   categories: number[],
//   message: string,
//   file: File | null,
//   job_to_add_job_candidate_user?: string | number,
//   living_city?: number[]
// ) {
//   const formData = new FormData();
//   formData.append("email", email);
//   formData.append("first_name", first_name);
//   formData.append("last_name", last_name);
//   formData.append("phone", phone);
//   formData.append("location", JSON.stringify(area));
//   if (living_city) formData.append("living_city", JSON.stringify(living_city));
//   formData.append("categories", JSON.stringify(categories));
//   job_to_add_job_candidate_user &&
//     formData.append(
//       "job_to_add_job_candidate_user",
//       job_to_add_job_candidate_user.toString()
//     );
//   message && formData.append("message", message);
//   file && formData.append("file", file);

//   return await http.post(BASE_URL + "/quick-register", formData);
// }

export async function registerCandidate2(password: string, token: string) {
  return await http.post(BASE_URL + "/register-candidate2", {
    password,
    token,
  });
}

export async function verifyEmail(token: string) {
  return await http.get(BASE_URL + "/verify-email", { token });
}

export async function isExsistEmail(email: string) {
  return await http.get(BASE_URL + "/is-exsist", { email });
}

export async function resetPassword(
  lastPassword: string,
  newPassword: string,
  confirmPassword: string
) {
  if (newPassword !== confirmPassword) {
    throw new Error("Passwords do not match");
  }
  return await http.post(BASE_URL + "/reset-password", {
    old_password: lastPassword,
    new_password: newPassword,
    confirm_password: confirmPassword,
  });
}

export async function forgotPassword(email: string) {
  return await http.post(BASE_URL + "/forgot-password", { email });
}

export async function updateUserDetails(userDetails: any) {
  return await http.post(`/wp/v2/users/${userDetails.id}`, userDetails);
}
