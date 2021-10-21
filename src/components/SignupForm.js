import React from 'react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import '../App.css';
import { number } from 'yup/lib/locale';
import { Alert } from 'react-bootstrap';

const SignupSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(3, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  lastName: Yup.string()
    .min(3, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  email: Yup.string()
    .string()
    .email('Invalid email format')
    .required('Required'),
  cpf: Yup.number()
    .min(11, "CPF Invalid")
    .max(11, "CPF Invalid!")
    .required("Required"),
  celular: Yup.number()
    .min(11, "(DDD)000000000")
    .max(11, "(DDD)000000000")
    .required("Required"),
});

function onBlurCep(ev, setFieldValue) {
  const { value } = ev.target;
  const cep = value?.replace(/[^0-9]/g, '')

  if (cep?.length !== 8) {
    console.log("cep inválido")
    return;
  }
}

function SignupForm() {
  return (
    <div className="menu">
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
          cpf: '',
          dataNascimento: '',
          genero: '',
          celular: '',
          description: ''
        }}
        validationSchema={SignupSchema}
        onSubmit={(values) => {
          alert("Dados enviados!");
          console.log(values);
        }}
      >
        {({ values, errors, touched }) => (
          <div>
            <Form className="menu">
              <h2 className="painel">Cadastro</h2>
              <div className="form-control-group">
                <label>Nome:</label>
                <Field type="text" name="firstName" />
                {touched.firstName && errors.firstName ? <div>{errors.firstName}</div> : null}
                <label>Sobrenome:</label>
                <Field type="text" name="lastName" />
                {touched.lastName && errors.lastName ? <div>{errors.lastName}</div> : null}
              </div>
              <br />
              <br />
              <div className="form-control-group">
                <label>E-mail: </label>
                <Field type="text" name="email" />
                {touched.email && errors.email ? <div>{errors.email}</div> : null}
                <label>Celular: </label>
                <Field type="text" name="celular" />
                {touched.celular && errors.celular ? <div>{errors.celular}</div> : null}
              </div>
              <br />
              <div className="form-control-group">
                <label>CPF: </label>
                <Field type="text" name="cpf" />
                <Alert>{touched.cpf && errors.cpf ? <div>{errors.cpf}</div> : null}</Alert>
                <label>Data Nascimento: </label>
                <Field type="text" name="dataNascimento" />
              </div>
              <br />
              <div className="form-control-group">
                <label>Genero: </label>

                <Field as="select" name="genero">
                  <option value="0">Selecione</option>
                  <option value="1">Masculino</option>
                  <option value="2">Feminino</option>
                </Field>
                <br />
                <label className="form-control-group">Descrição: </label>
                <br />
                <Field as="textarea" name="description" />
              </div>
              <br /><br />
              <button type="button" className="button-cart-solid" >Enviar</button>
            </Form>
          </div>
        )
        }
      </Formik >
    </div>

  );
}

export default SignupForm;