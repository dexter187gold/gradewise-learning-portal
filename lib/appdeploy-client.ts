// Temporary browser-only adapter for Cloudflare UI testing.
// Replace this with a real auth/API provider before production.
type User = { email: string; name: string; userId: string };
const KEY = "gradewise-test-user";
export const auth = {
  async signIn(_options?: unknown) {
    if (typeof window === "undefined") throw new Error("Sign-in is only available in a browser.");
    const entered = window.prompt("Testing mode: enter an email address to continue", "learner@example.com");
    if (!entered || !entered.includes("@")) throw Object.assign(new Error("Sign-in cancelled"), { code: "popup_closed" });
    const email = entered.trim().toLowerCase();
    const user: User = { email, name: email.split("@")[0], userId: email };
    window.localStorage.setItem(KEY, JSON.stringify(user));
    return user;
  },
  async getUser(): Promise<User | null> {
    if (typeof window === "undefined") return null;
    try { const raw = window.localStorage.getItem(KEY); return raw ? JSON.parse(raw) as User : null; } catch { return null; }
  },
  async signOut() { if (typeof window !== "undefined") window.localStorage.removeItem(KEY); }
};
export const api = {
  async post(path: string, payload: any) {
    if (path === "/api/tutor") return { data: { answer: `Testing-mode Sage response for Grade ${payload.grade}: Let's work through ${payload.topic || "your question"} step by step. First, identify what you already know, then try one small example. What part would you like to explore first?`, grade: payload.grade, subject: payload.subject, topic: payload.topic } };
    if (path === "/api/quiz") {
      const questions = Array.from({length: Math.min(8, Math.max(5, Number(payload.count) || 5))}, (_, i) => ({ question: `Practice question ${i + 1}: which option best matches ${payload.topic || "this topic"}?`, options: ["Option A", "Option B", "Option C", "Option D"], correctIndex: 0, explanation: "This is placeholder quiz content for deployment testing. Connect the real AI quiz service before launch." }));
      return { data: { title: `${payload.subject || "Learning"} practice — ${payload.topic || "test"}`, instructions: "Testing mode: choose an answer for each placeholder question.", questions } };
    }
    throw new Error("This test endpoint is not configured.");
  }
};
