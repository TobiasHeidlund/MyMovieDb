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
    document.cookie = JSON.stringify({ username: username })
}

function clearCookie() {
    document.cookie = ""
    console.log("CLEARING")
}

function loadUsername(): string {
    console.log("LOADING USERNAME")
    var cookie = document.cookie
    if (cookie != "") {
        try {
            var parsed = JSON.parse(cookie)
            if (parsed != null) {
                if (parsed.username != undefined) {
                    console.log(parsed.username)
                    return parsed.username
                }
            }
        } catch (e) { }
    }
    return ""
}

export default useAuthStore;
