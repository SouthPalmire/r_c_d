import { defineStore } from 'pinia';

export const useAuthStore = defineStore('storeId', {
  state: () => ({
    isAuth: true,
  }),
});
