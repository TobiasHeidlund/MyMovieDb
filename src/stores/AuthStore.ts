import { create } from 'zustand';

type AuthStore = {
    username: string,
    setUsername: (username: string) => void,
    clearUsername: () => void
}

const useAuthStore = create<AuthStore>((set) => ({
    username: loadUsername(),
    setUsername: username => {
        setCookie(username)
        set({ username: username })
    },
    clearUsername: () => {
        clearCookie()
        set({ username: "" })
    }

}
))

function setCookie(username: string) {
    window.sessionStorage.setItem("username",username)
}

function clearCookie() {
    window.sessionStorage.removeItem("username")
    console.log("CLEARING")
}

function loadUsername(): string {
    console.log("LOADING USERNAME")
    let username = window.sessionStorage.getItem("username")
    return username? username:""
}

export default useAuthStore;
