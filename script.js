const formulario = document.querySelector("form");
const nome = document.querySelector(".nome");
const celular = document.querySelector(".celular");
const cpf = document.querySelector(".cpf");
const data = document.querySelector(".data");
const cidade = document.querySelector(".cidade");
const estado = document.querySelector(".estado");
const endereço = document.querySelector(".endereço");
const userForm = document.querySelector(".user-form")
const userInd = document.querySelector(".usuario-individual")
let genero;
let render = '';
let render2 = '';


const cadastrar = async () => {
  try {
      const response = await fetch("https://form-clientes.herokuapp.com/api/usuarios", {
       method: 'POST',
       headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json'
         },
         body: JSON.stringify({
          "nome": nome.value,
          "celular": celular.value,
          "cpf": cpf.value,
          "data": data.value,
          "cidade": cidade.value,
          "estado": estado.value,
          "endereço": endereço.value,
          "sexo": genero
           
          })
       });
       const dados = await response.json();
    
       redirect()
       
     } catch(error) {

        console.log(error)
       } 
  }


  const getUsers = async () => {
    try {
        const response = await fetch('https://form-clientes.herokuapp.com/api/usuarios');
        const data = await response.json();
  
          data.forEach(cliente => {
            render += ` 
            <div class="div-clientes" data-id=${cliente.id}>
                <p class="nome">Nome: ${cliente.nome}</p>
                <p class="celular">Celular: ${cliente.celular}</p>
                <p class="cpf">Cpf: ${cliente.cpf}</p>
                <p class="sexo">Sexo: ${cliente.sexo}</p>
                <p class="data">Data de Nascimento: ${cliente.data}</p>
                <p class="cidade">Cidade: ${cliente.cidade}</p>
                <p class="estado">Estado: ${cliente.estado}</p>
                <p class="endereço">Endereço: ${cliente.endereço}</p> 
                <button id="edit-cliente">Editar</button>
                <button id="delete-cliente">Deletar</button>
            </div>
            `;
          });

         userForm.innerHTML = render;
         console.log(data);

       } catch(error) {
    
          console.log(error)
         } 
    }


  getUsers()

 

 function redirect() {
    window.location.replace("usuarios.html");
  return false;
}


formulario.addEventListener('submit', function (e){
    e.preventDefault();

    genero = document.querySelector('input[name="genero"]:checked').value;

    cadastrar();
    
  })
  
  