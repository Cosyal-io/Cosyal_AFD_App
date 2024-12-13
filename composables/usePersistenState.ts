import { watch, onMounted } from "vue";

export function usePersistentState(key: string, defaultValue: any) {
  const state = useState(key, () => defaultValue);

  // Sync state with localStorage only on the client
  onMounted(() => {
    const saved = localStorage.getItem(key);
    if (saved !== null) {
      state.value = JSON.parse(saved);
    }

    watch(
      state,
      (newValue) => {
        localStorage.setItem(key, JSON.stringify(newValue));
      },
      { deep: true } // Deep watch for objects or arrays
    );
  });

  return state;
}
