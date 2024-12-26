const resetForm = document.getElementById('password-reset');
const loginForm = document.getElementById('login-form');

const login = () => {
    // get form data and process
    console.log("logging in...")
}

const unhidePasswordReset = () => {
    resetForm.classList.remove('hidden');
    loginForm.classList.add('hidden');
    
};



