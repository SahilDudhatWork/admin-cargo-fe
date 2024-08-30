import Cookies from "js-cookie";

export default async function ({ redirect }) {
  let token = Cookies.get("token");
  
  if (!token) {
    return redirect("/login");
  }
}
