const firebaseConfig = {
  apiKey: "AIzaSyDJb5oIZXUfPUfZNqpOnGglRX5-RcuhZgI",
  authDomain: "firsh-validate.firebaseapp.com",
  projectId: "firsh-validate",
  storageBucket: "firsh-validate.firebasestorage.app",
  messagingSenderId: "1019691845292",
  appId: "1:1019691845292:web:0ca29572d4df4c2b0c8109",
  measurementId: "G-9L8PC3WQ5M"
};

// Inicializa o Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// Função de Cadastro
function cadastrar() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const mensagem = document.createElement('p');
      mensagem.textContent = "Seus dados foram cadastrados com sucesso!";
      document.getElementById('dg').appendChild(mensagem);
      document.getElementById("email").value = '';
      document.getElementById("password").value = '';
    })
    .catch((error) => {
      const dgElement = document.getElementById('dg');
      let mensagem = dgElement.querySelector('p');
      if (!mensagem) {
        mensagem = document.createElement('p');
        dgElement.appendChild(mensagem);
      }

      const errorCode = error.code;
      let errorMessage = "Erro ao cadastrar: " + error.message;

      switch (errorCode) {
        case "auth/email-already-in-use":
          errorMessage = "Este email já está cadastrado. Tente usar outro ou recupere sua senha.";
          break;
        case "auth/invalid-email":
          errorMessage = "O formato do email é inválido. Verifique e tente novamente.";
          break;
        case "auth/weak-password":
          errorMessage = "A senha é muito fraca. Escolha uma senha com pelo menos 6 caracteres.";
          break;
      }

      mensagem.textContent = errorMessage;
    });
}

// Função de Login com Google
function login() {
  const loginButton = document.getElementById('google-login');
  const emailField = document.getElementById('email');
  const passwordField = document.getElementById('password');
  const loginButtonSubmit = document.getElementById('login-button'); // O botão de login

  if (!loginButton || !emailField || !passwordField || !loginButtonSubmit) {
    console.error("Elementos de login não encontrados.");
    return;
  }

  // Configurar o login com o Google
  loginButton.addEventListener('click', () => {
    const provider = new firebase.auth.GoogleAuthProvider();

    // Abrir o popup de login do Google
    firebase.auth().signInWithPopup(provider)
      .then((result) => {
        const user = result.user;
        const userEmail = user.email;  // O e-mail do usuário selecionado no Google
        const userPassword = "senha-gerada";  // Aqui você pode definir a senha gerada ou fazer algo para associar a senha

        // Preencher os campos com as informações do usuário
        emailField.value = userEmail;
        passwordField.value = userPassword; // Preencher com uma senha automática ou com algo que você defina

        // Simular o clique no botão de login
        loginButtonSubmit.click();
      })
      .catch((error) => {
        console.error("Erro ao fazer login com o Google: ", error.message);
      });
  });
}