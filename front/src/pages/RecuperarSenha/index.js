import React from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';


export default function RecuperarSenha(){
    return(
        <div className="container-login">
            <div className="login card shadow">
                <Form className="form-signin text-center">
                    <img className="mb-4" src="images/logo_celke.png" alt="Celke" width="72" height="72" />
                    <h1 className="h3 mb-3 font-weight-normal">Recuperar Senha</h1>

                    <FormGroup>
                        <Label for="email">Usuário</Label>
                        <Input type="email" name="email" id="email" placeholder="E-mail do usuário" />
                    </FormGroup>

                    

                    <Button color="primary btn-block mt-2">Acessar</Button>
                    <p className="text-center mt-2">Esqueceu a senha?</p>

                </Form>
            </div>
        </div>
    ); 
}
