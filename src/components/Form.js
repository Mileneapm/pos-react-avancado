import React from 'react';
import { Formik, Field, Form } from 'formik';
import schema from '../schema';
import './App.css';

function App() {

  function onSubmit(values, actions) {
    console.log('SUBMIT', values);
  }

  function onBlurCep(ev, setFieldValue) {
    const { value } = ev.target;
    const cep = value?.replace(/[^0-9]/g, '')

    if (cep?.length !== 8) {
      console.log("cep inválido")
      return;
    }

    fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then((res) => res.json())
      .then((data) => {
        setFieldValue("logradouro", data.logradouro);
        setFieldValue("bairro", data.bairro);
        setFieldValue("cidade", data.localidade);
        setFieldValue("uf", data.uf);
      });
  }

  async function validaCpf(e) {
    const cpf = e.target;
    console.log(e.target)

    const response = await fetch(`https://robsonalves-net-br-document-generator-srvapp.azurewebsites.net/api/CPF/isvalid/${cpf}`);
    const valido = await response.json()

    if (valido !== true) {
      console.log("invalido")
    }
  }

  return (
    <div className="App">
      <Formik
        validationSchema={schema}
        onSubmit={onSubmit}
        validateOnMount
        initialValues={{
          name: ''
        }}
        render={({ isValid, setFieldValue }) => (
          <div>
            <Form className="menu">
              <h2 className="painel">Cadastro Cliente</h2>
              <div className="form-control-group">
                <label>Nome</label>
                <Field name="nome" type="text" />
              </div>
              <div className="form-control-group">
                <label>CPF</label>
                <Field name="cpf" type="text" onBlur={(e) => validaCpf(e)} />
              </div>
              <div className="form-control-group">
                <label>Cep</label>
                <Field name="cep" type="text" onBlur={(ev) => onBlurCep(ev, setFieldValue)} />
              </div>
              <div className="form-control-group">
                <label>Logradouro</label>
                <Field name="logradouro" type="text" />
              </div>
              <div className="form-control-group">
                <label>Número</label>
                <Field name="numero" type="text" />
              </div>
              <div className="form-control-group">
                <label>Complemento</label>
                <Field name="complemento" type="text" />
              </div>
              <div className="form-control-group">
                <label>Bairro</label>
                <Field name="bairro" type="text" />
              </div>
              <div className="form-control-group">
                <label>Cidade</label>
                <Field name="cidade" type="text" />
              </div>
              <div className="form-control-group">
                <label>UF</label>
                <Field name="uf" type="text" />
              </div>
              <br></br>
              <h3 className="painel">Tipo de pagamento</h3>
              <div className="form-control-group">
                <label>Valor Total</label>
                <Field name="total" type="text" />
              </div>
              <div className="form-control-group">
                <label>Parcela: </label>
                
              </div>
              <br></br>
              <button type="button" className="button-cart-solid" >Finalizar compra</button>
            </Form>
          </div>
        )}
      />
    </div>
  );
}

export default App;