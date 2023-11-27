// FUNÇÃO CEP
$("#cep").focusout(function () {
	$.ajax({
		url: "https://viacep.com.br/ws/" + $(this).val() + "/json/",
		dataType: "json",
		success: function (resposta) {
			$("#logradouro").val(resposta.logradouro);
			$("#complemento").val(resposta.complemento);
			$("#bairro").val(resposta.bairro);
			$("#cidade").val(resposta.localidade);
			$("#uf").val(resposta.uf);
			$("#numero").focus();
		},
	});
});


//FUNÇÃO MÁSCARA TELEFONE
const handlePhone = (event) => {
	let input = event.target;
	input.value = phoneMask(input.value);
};

const phoneMask = (value) => {
	if (!value) return "";
	value = value.replace(/\D/g, "");
	value = value.replace(/(\d{2})(\d)/, "($1) $2");
	value = value.replace(/(\d)(\d{4})$/, "$1-$2");
	return value;
};


//FUNÇÃO MÁSCARA CPF
function fMasc(objeto, mascara) {
	obj = objeto;
	masc = mascara;
	setTimeout("fMascEx()", 1);
}

function fMascEx() {
	obj.value = masc(obj.value);
}

function mCPF(cpf) {
	cpf = cpf.replace(/\D/g, "");
	cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
	cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
	cpf = cpf.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
	return cpf;
}


//SENHA alfabética
function validarSenha() {
	var senhaInput = document.getElementById("senha");
	var mensagemErroSenha = document.getElementById("mensagemErroSenha");

	//expressão regular para verificar se a senha contém apenas caracteres alfabéticos
	var regex = /^[a-zA-Z]+$/;

	if (!regex.test(senhaInput.value)) {
		mensagemErroSenha.textContent = "A senha deve conter exatamente 8 caracteres alfabéticos.";
		senhaInput.setCustomValidity("A senha deve conter exatamente 8 caracteres alfabéticos.");
		return false;
	} else {
		mensagemErroSenha.textContent = "";
		senhaInput.setCustomValidity("");
	}
}

//ouvinte de eventos para redefinir a mensagem de erro quando o usuário começa a digitar


//MODAL
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("registrarbotao");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// Function to open the modal
function openModal() {
	modal.style.display = "block";

	// Set a timer to close the modal after 3000 milliseconds (3 seconds)
	setTimeout(function () {
		closeModalAndRedirect();
	}, 3000); // Adjust the time as needed
}

// Function to close the modal and redirect
function closeModalAndRedirect() {
	closeModal();

	// Adicione o redirecionamento aqui
	location.href = "login.html";
}

// Function to close the modal
function closeModal() {
	modal.style.display = "none";
}

// When the user clicks the button, open the modal if the form is valid
btn.onclick = function () {
	// Substitua "validarCampos" pela sua própria função de validação
	if (validarCampos()) {
		openModal();
	}
};

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
	closeModalAndRedirect();
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
	if (event.target == modal) {
		closeModalAndRedirect();
	}
};

// função validar form
// Variável global para armazenar o status de validação do CPF
var cpfValido = false;

function ValidaCPF() {
	var CPF = document.getElementById("CPF").value.replace(/[^\d]+/g, ''); // Remove caracteres não numéricos
	const mensagemValida = document.getElementById("validacao");

	if (CPF.length !== 11 || /^(.)\1{10}$/.test(CPF)) {
		// Verifica se o CPF tem 11 dígitos e não é uma repetição de um único número
		mensagemValida.innerText = "CPF inválido. Insira um CPF válido.";
		mensagemValida.classList.remove("valido");
		mensagemValida.classList.add("invalido");
		console.log("CPF Inválido");
		cpfValido = false; // CPF inválido
		return false;
	}

	// Validação dos dígitos verificadores
	var soma = 0;
	for (var i = 0; i < 9; i++) {
		soma += parseInt(CPF.charAt(i)) * (10 - i);
	}

	var resto = (soma * 10) % 11;

	if (resto === 10 || resto === 11) {
		resto = 0;
	}

	if (resto !== parseInt(CPF.charAt(9))) {
		mensagemValida.innerText = "CPF inválido. Insira um CPF válido.";
		mensagemValida.classList.remove("valido");
		mensagemValida.classList.add("invalido");
		console.log("CPF Inválido");
		cpfValido = false; // CPF inválido
		return false;
	}

	soma = 0;
	for (var i = 0; i < 10; i++) {
		soma += parseInt(CPF.charAt(i)) * (11 - i);
	}

	resto = (soma * 10) % 11;

	if (resto === 10 || resto === 11) {
		resto = 0;
	}

	if (resto !== parseInt(CPF.charAt(10))) {
		mensagemValida.innerText = "CPF inválido. Insira um CPF válido.";
		mensagemValida.classList.remove("valido");
		mensagemValida.classList.add("invalido");
		console.log("CPF Inválido");
		cpfValido = false; // CPF inválido
		return false;
	}

	mensagemValida.innerText = "CPF válido.";
	mensagemValida.classList.remove("invalido");
	mensagemValida.classList.add("valido");
	console.log("CPF Válido");
	cpfValido = true; // CPF válido
	return true;
}
//valida campo nome
let nomeValido = false;

function validarNome() {
	var nome = document.getElementById("nome").value;
	var mensagemErroNome = document.getElementById("mensagemErroNome");

	// Validação de nome com caracteres alfabéticos e espaços
	var nomeAlfabeticoRegex = /^[a-zA-Z\s]+$/;

	if (!nome.match(nomeAlfabeticoRegex)) {
		mensagemErroNome.innerText = "O nome deve conter somente caracteres alfabéticos e espaços.";
		mensagemErroNome.classList.add("invalido");
		nomeValido = false;
	} else {
		mensagemErroNome.innerText = "";
		mensagemErroNome.classList.remove("invalido");
		nomeValido = true;
	}
}


function validarCampos() {
	// Verifica se o CPF é válido antes de prosseguir
	if (!cpfValido) {
		console.log('cpf não está valido, return false...');
		return false;
	}

	validarNome();
	// Restante do código para validar os campos
	var campoNome = document.getElementById("nome");
	var nome = document.getElementById("nome").value;
	var nomeMae = document.getElementById("nome_mae").value;
	var cpf = document.getElementById("CPF").value;
	var diaNascimento = document.getElementById("diaa").value;
	var cep = document.getElementById("cep").value;
	var logradouro = document.getElementById("logradouro").value;
	var bairro = document.getElementById("bairro").value;
	var uf = document.getElementById("uf").value;
	var celular = document.getElementById("number").value;


	if (!nomeValido) {
		campoNome.focus();
		return false;

	}

	if (
		nome.trim() === "" ||
		nomeMae.trim() === "" ||
		cpf.trim() === "" ||
		cpf.length < 14 ||
		diaNascimento.trim() === "" ||
		cep.trim() === "" ||
		logradouro.trim() === "" ||
		bairro.trim() === "" ||
		uf.trim() === "" ||
		celular.trim() === ""
	) {
		return false;
	} else {
		var nomeUsuario = document.getElementById("login").value;
		var senha = document.getElementById("senha").value;
		var confirmacaoSenha = document.getElementById("confirmacaoSenha").value;
		var senhaMatch = document.getElementById("senhaMatch");
		var mensagemErroSenha = document.getElementById("mensagemErroSenha");

		// Validação de senha com caracteres alfabéticos
		var senhaAlfabeticaRegex = /^[a-zA-Z]+$/;
		if (!senha.match(senhaAlfabeticaRegex)) {
			mensagemErroSenha.innerText = "A senha deve conter exatamente 8 caracteres alfabéticos.";
			mensagemErroSenha.classList.add("invalido");
			return false;
		} else {
			mensagemErroSenha.innerText = "";
			mensagemErroSenha.classList.remove("invalido");
		}

		if (senha !== confirmacaoSenha || senha == "" || senha == undefined) {
			senhaMatch.innerText = "As senhas não coincidem. Por favor, insira senhas iguais nos dois campos.";
			senhaMatch.classList.add("invalido");
			return false;
		}
		else if (senha.length !== 8) {
			senhaMatch.innerText = "A senha deve ter exatamente 8 caracteres alfabéticos";
			senhaMatch.classList.add("invalido");
		}
		else {
			senhaMatch.innerText = "";
			senhaMatch.classList.remove("invalido");

			const usuario = {
				login: nomeUsuario,
				nome: nome,
				cpf: cpf,
				diaNascimento: diaNascimento,
				celular: celular,
				cep: cep,
				logradouro: logradouro,
				bairro: bairro,
				uf: uf,
				nomeMae: nomeMae,
				senha: senha,
				isLogged: false,
			};
			const objetoString = JSON.stringify(usuario);

			localStorage.setItem(nomeUsuario.toLowerCase(), objetoString);

			return true;
		}
	}
}

