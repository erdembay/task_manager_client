import { useUserStore } from "@/stores/UserStore";
const userStore = useUserStore();
export const tokenFunc = async () => {
  const response = await userStore.getToken;
  return `Bearer ${response}`;
};
//Bu servis token kontrolü için yapılmıştır yapılacak api isteklerine gönderilecek token buradan alınacaktır.
