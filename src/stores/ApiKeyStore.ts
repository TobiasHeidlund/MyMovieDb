import { create } from 'zustand';

type ApiKeyStore = {
    apiKey: string,
    setApiKey: (apiKey: string) => void,
    clearApiKey: () => void
}

const useApiKeyStore = create<ApiKeyStore>((set) => ({
    apiKey: "",
    setApiKey: apiKey => {
        set({ apiKey: apiKey })
    },
    clearApiKey: () => {
        set({ apiKey: "" })
    }
}
))

export default useApiKeyStore;