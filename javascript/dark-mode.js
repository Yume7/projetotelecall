function checkDarkModePreference() {
	// Verifique se a preferência do modo escuro foi definida no localStorage
	const isDarkModeEnabled = localStorage.getItem("darkModeEnabled") === "true";

	// Verifique se o body contém a classe 'dark-mode'
	const body = document.body;
	const checkboxToggle = document.getElementById("dark-mode-toggle");

	if (isDarkModeEnabled) {
		body.classList.add("dark-mode");
		checkboxToggle.checked = true;
	} else {
		body.classList.remove("dark-mode");
	}
}

// Chame a função para verificar a preferência no carregamento da página
checkDarkModePreference();
console.log("chegou", isDarkModeEnabled);

// dark-mode.js

// Função para alternar entre os modos claro e escuro
function toggleDarkMode() {
	const body = document.body;
	body.classList.toggle("dark-mode"); // Adiciona ou remove a classe 'dark-mode'

	// Salva a preferência do usuário no localStorage
	const isDarkModeEnabled = body.classList.contains("dark-mode");
	localStorage.setItem("darkModeEnabled", isDarkModeEnabled);
}

// Verifica se o usuário já havia escolhido o modo escuro anteriormente
const isDarkModePreferred = localStorage.getItem("darkModeEnabled") === "true";

// Adicione um ouvinte de eventos para o botão de alternância
const darkModeToggle = document.getElementById("dark-mode-toggle");

// Aguarde o carregamento completo da página antes de interagir com o DOM
document.addEventListener("DOMContentLoaded", function () {
	// Aplica o modo escuro, se preferido
	if (isDarkModePreferred) {
		document.body.classList.add("dark-mode");
	}

	// Adicione um ouvinte de eventos para o botão de alternância após o carregamento da página
	darkModeToggle.addEventListener("click", toggleDarkMode);
});
