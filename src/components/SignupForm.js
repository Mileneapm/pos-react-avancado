import React from 'react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import '../App.css';
import { number } from 'yup/lib/locale';

const horas = new Date();
console.log( horas.getHours() );

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
    .email('Invalid email format')
    .required('Required'),
  cpf: Yup.string()
    .matches(/\d{3}\.\d{3}\.\d{3}\-\d{2}/g, "CPF 000.000.000-00")
    .required(),
  dataNascimento: Yup.date()
    .max(new Date(), "Data inválida mm/dd/yyyy")
    .required("Campo obrigatório"),
  celular: Yup.string()
    .matches(/\(\d{2}\) \d{5}\-\d{4}/g, "(00) 00000-0000")
    .required(),
  genero: Yup.number()
    .moreThan(0)
    .required(),
  description: Yup.string()
    .max(255)
    .required(),
});

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
            <Form>
              <h2 className="painel">Cadastro</h2>
              <div className="form-control-group">
                <label>Nome:</label>
                <Field type="text" name="firstName" />
                {touched.firstName && errors.firstName ? <div>{errors.firstName}</div> : null} 
                <br />
                <label>Sobrenome:</label>
                <Field type="text" name="lastName" />
                <br />
                {touched.lastName && errors.lastName ? <div>{errors.lastName}</div> : null}
              </div>
              <br />
              <br />
              <div className="form-control-group">
                <label>E-mail: </label>
                <Field type="text" name="email" />
                <br />
                {touched.email && errors.email ? <div>{errors.email}</div> : null}
                <label>Celular: </label>
                <Field type="text" name="celular" />
                <br />
                {touched.celular && errors.celular ? <div>{errors.celular}</div> : null}
              </div>
              <br />
              <div className="form-control-group">
                <label>CPF: </label>
                <Field type="text" name="cpf" />
                <br />
                {touched.cpf && errors.cpf ? <div>{errors.cpf}</div> : null}
                <label>Data Nascimento: </label>
                <Field type="text" name="dataNascimento" />
                {touched.dataNascimento && errors.dataNascimento ? <div>{errors.dataNascimento}</div> : null}
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
                {touched.genero && errors.genero ? <div>{errors.genero}</div> : null}
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