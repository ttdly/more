import axios from "axios";
import { createPinia } from "pinia";
import { useStore } from "../store/user.store";
const userStore = useStore(createPinia());
export async function queryInfo(query, variables) {
  const result = await axios.post(
    "https://api.github.com/graphql",
    {
      query,
      variables,
    },
    {
      headers: {
        Accept: "application/json",
        Authorization: `bearer ${userStore.token}`,
      },
    }
  );
  return result;
}
export * from "./query";
