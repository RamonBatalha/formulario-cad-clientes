
const userForm2 = document.querySelector(".user-form");
const updateForm = document.querySelector(".update-form");


userForm2.addEventListener('click', (e) => {

  let delButtonClicked = e.target.id == 'delete-cliente';
  let editButtonClicked = e.target.id == 'edit-cliente';

  let id = e.target.parentElement.dataset.id;

  if (delButtonClicked) {
    if (window.confirm('Você tem certeza que deseja deletar o cliente?')) {
      removeItem(id);
      setTimeout(() => {
        window.location.href = 'usuarios.html';
      }, "2000")

    }
  }

  if (editButtonClicked) {
    const parent = e.target.parentElement;
    let nome = parent.querySelector('.nome').textContent.split(': ')[1];
    let celular = parent.querySelector('.celular').textContent.split(': ')[1];
    let cpf = parent.querySelector('.cpf').textContent.split(': ')[1];
    let sexo = parent.querySelector('.sexo').textContent.split(': ')[1];
    let data = parent.querySelector('.data').textContent.split(': ')[1];
    let cidade = parent.querySelector('.cidade').textContent.split(': ')[1];
    let estado = parent.querySelector('.estado').textContent.split(': ')[1];
    let endereço = parent.querySelector('.endereço').textContent.split(': ')[1];

    userForm2.innerHTML = `
    <a href="usuarios.html"> Voltar </a>  
    <div class="box">
      <form onsubmit="myFunction(event, ${id})" action="">
          <fieldset>
              <legend><b>Formulário de Clientes</b></legend>
              <br>
              <div class="inputBox">
                  <input type="text" name="nome" id="nome" class="inputUser nome" value="${nome}" required>
                  <label for="nome" class="labelInput">Nome completo</label>
              </div>
              <br><br>
              <div class="inputBox">
                  <input type="text" name="nome" id="nome" class="inputUser celular" value="${celular}" required>
                  <label for="contato" class="labelInput">Celular</label>
              </div>
              <br><br>
              <div class="inputBox">
                  <input type="text" name="nome" id="nome" class="inputUser cpf" value="${cpf}" required>
                  <label for="dados" class="labelInput">CPF</label>
              </div>
              <p>Sexo:</p>
              <input type="radio" id="feminino" name="genero" value="feminino" required>
              <label for="">Feminino</label>
              <input type="radio" id="masculino" name="genero" value="masculino" required>
              <label for="">Masculino</label>
              <br><br>
                  <label for="data_nascimento"><b>Data de Nascimento:</b></label>
                  <input type="date" class="data" name="data_nascimento" id="data_nascimento" value="${data}" required>
              <br><br>
              <div class="inputBox">
                  <input type="text" name="cidade" id="nome" class="inputUser cidade" value="${cidade}" required>
                  <label for="dados" class="labelInput">Cidade</label>
              </div>
              <br><br>
              <div class="inputBox">
                  <input type="text" name="estado" id="nome" class="inputUser estado" value="${estado}" required>
                  <label for="dados" class="labelInput">Estado</label>
              </div>
              <br><br>
              <div class="inputBox">
                  <input type="text" name="endereco" id="nome" class="inputUser endereço" value="${endereço}" required>
                  <label for="dados" class="labelInput">Endereço</label>
              </div>
              <br><br>
              <input type="submit" value="Submit">
          </fieldset>
      </form>
  </div>`


  }

});

function removeItem(id) {


  fetch(`https://form-clientes.herokuapp.com/api/usuarios/${id}`, {
    method: "DELETE",
    headers: {
      'Content-type': 'application/json'
    }
  })
    .then(res => {
      if (res.ok) { console.log("HTTP request successful") }
      else { console.log("HTTP request unsuccessful") }
      return res
    })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(error => console.log(error))
}

function myFunction(e, id) {
  e.preventDefault()
  const nomeInp = document.querySelector(".nome");
  const celularInp = document.querySelector(".celular");
  const cpfInp = document.querySelector(".cpf");
  const dataInp = document.querySelector(".data");
  const cidadeInp = document.querySelector(".cidade");
  const estadoInp = document.querySelector(".estado");
  const endereçoInp = document.querySelector(".endereço");
  genero = document.querySelector('input[name="genero"]:checked').value;

  fetch(`https://form-clientes.herokuapp.com/api/usuarios`, {
    method: "PUT",
    headers: {
      'Accept': 'application/json',
      'Content-type': 'application/json',

    },
    body: JSON.stringify(
      {
        "id": id,
        "nome": nomeInp.value,
        "celular": celularInp.value,
        "cpf": cpfInp.value,
        "data": dataInp.value,
        "cidade": cidadeInp.value,
        "estado": estadoInp.value,
        "endereço": endereçoInp.value,
        "sexo": genero
      }
    )
  })
    .then(res => {
      if (res.ok) { console.log("HTTP request successful") }
      else { console.log("HTTP request unsuccessful") }
      return res
    })
    .then(res => res.json())
    .then(data => console.log(data))
    .then(setTimeout(() => {
      window.location.href = 'usuarios.html';
    }, "1000"))
    .catch(error => console.log(error))

}




