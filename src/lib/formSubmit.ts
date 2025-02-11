export const formSubmit = (form: HTMLFormElement) => {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        const data = Object.fromEntries(formData);

        try {
            const response = await fetch(form.action, {
                method: "POST",
                body: JSON.stringify(data),
            });
            if (!response.ok) {
                const { error } = await response.json();
                throw new Error(error.code);
            }
            form.reset();
            window.location.reload();
        } catch (error) {
            if (error instanceof Error) {
                console.log(error);
                return alert(error.message);
            }
            return alert("An unknown error occurred");
        }
    })
}