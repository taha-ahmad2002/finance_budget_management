import axios from "axios";

const API = axios.create({
    baseURL: "http://127.0.0.1:8000",
    withCredentials: true, // crucial for cookies
});

export const signup = async (email, password) => {
    await API.post("/signup", { email, password });
};

export const login = async (email, password) => {
    // FastAPI expects form data (OAuth2PasswordRequestForm)
    const formData = new URLSearchParams();
    formData.append("username", email);
    formData.append("password", password);

    await API.post("/login", formData, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });
};

export const logout = async () => {
    await API.post("/logout");
};

export const getExpenses = async () => {
        const res = await API.get("/expenses/");
        return res.data;
};

export async function createExpense(expense) {
    await API.post("/expenses/", expense).then(r => r.data);
}

export async function updateExpense(expense) {
    await API.put("/expenses/", expense).then(r => r.data);
}

export async function deleteExpense(expenseId) {
   await API.delete(`/expenses/${expenseId}`);
}

export async function createIncome(income) {
    await API.post("/incomes/", income).then(r => r.data);
}
export const getIncomes = async () => {
    const res = await API.get("/incomes/", { withCredentials: true });
    return res.data;
};

export async function deleteIncome(incomeId) {
    await API.delete(`/incomes/${incomeId}`);
}
