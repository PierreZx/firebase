const firebaseConfig = {
  apiKey: "AIzaSyDJb5oIZXUfPUfZNqpOnGglRX5-RcuhZgI",
  authDomain: "firsh-validate.firebaseapp.com",
  projectId: "firsh-validate",
  storageBucket: "firsh-validate.firebasestorage.app",
  messagingSenderId: "1019691845292",
  appId: "1:1019691845292:web:0ca29572d4df4c2b0c8109",
  measurementId: "G-9L8PC3WQ5M"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

function enviarEmailConfirmacao(email) {
  // Simula o envio do email
  fetch('https://sua-api-de-envio.com/send-confirmation-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email })
  })
  .then(response => response.json())
  .then(data => {
      if (data.success) {
          exibirAviso("Email de confirmação enviado. Verifique sua caixa de entrada!", "sucesso");
      } else {
          exibirAviso("Erro ao enviar o email de confirmação: " + data.message, "erro");
      }
  })
  .catch((error) => {
      exibirAviso("Erro ao conectar com o servidor de emails: " + error.message, "erro");
  });
}

function cadastrar() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (!email || !password) {
      exibirAviso("Preencha todos os campos!", "erro");
      return;
  }

  enviarEmailConfirmacao(email);
}

function exibirAviso(mensagem, tipo) {
    const avisos = document.getElementById('avisos');
    avisos.textContent = mensagem;

    if (tipo === 'sucesso') {
        avisos.classList.add('sucesso');
        avisos.classList.remove('erro');
    } else if (tipo === 'erro') {
        avisos.classList.add('erro');
        avisos.classList.remove('sucesso');
    }
}

function loginWithEmail() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    auth.signInWithEmailAndPassword(email, password)
        .then(() => {
            window.location.href = "dashboard.html";
        })
        .catch((error) => {
            exibirAviso("Erro ao fazer login: " + error.message, "erro");
        });
}

function loginWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider)
        .then(() => {
            window.location.href = "dashboard.html";
        })
        .catch((error) => {
            exibirAviso("Erro ao fazer login: " + error.message, "erro");
        });
}

function cadastrar() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    auth.createUserWithEmailAndPassword(email, password)
        .then(() => {
            exibirAviso("Usuário cadastrado com sucesso!", "sucesso");
            window.location.href = "dashboard.html";
        })
        .catch((error) => {
            exibirAviso("Erro ao cadastrar: " + error.message, "erro");
        });
}
