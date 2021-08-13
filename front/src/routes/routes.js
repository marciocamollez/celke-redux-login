import React from 'react';
import { BrowserRouter, Router, Switch, Route } from 'react-router-dom';

import { Provider } from 'react-redux';
import store from '../store/store'

import { history } from '../history';

import Login from '../pages/Login';
import CadUserLogin from '../pages/CadUserLogin';
import RecuperarSenhaLogin from '../pages/RecuperarSenhaLogin';
import AtualizarSenhaLogin from '../pages/AtualizarSenhaLogin';

import Dashboard from '../pages/Dashboard';
import Perfil from '../pages/Perfil';
import User from '../pages/User';
import Viewuser from '../pages/Viewuser';
import CadUser from '../pages/CadUser';
import UpdateUser from '../pages/UpdateUser';
import UpdateUserSenha from '../pages/UpdateUserSenha';
import UpdatePerfil from '../pages/UpdatePerfil';
import UpdatePerfilSenha from '../pages/UpdatePerfilSenha';
import UpdatePerfilFoto from '../pages/UpdatePerfilFoto';

import baseLogin from '../containers/login';
import baseDashboard from '../containers/dashboard';

export default function Routes() {
    return (
        <Provider store={store}>
            <Router history={history}>
            <BrowserRouter>
                <Switch>
                    <Route path="/" exact component={baseLogin(Login)} />
                    <Route path="/cad-user-login" exact component={baseLogin(CadUserLogin)} />
                    <Route path="/recuperar-senha-login" exact component={baseLogin(RecuperarSenhaLogin)} />
                    <Route path="/atualizar-senha-login/:chave" exact component={baseLogin(AtualizarSenhaLogin)} />

                    <Route path="/dashboard" exact component={baseDashboard(Dashboard)} />
                    <Route path="/perfil" exact component={baseDashboard(Perfil)} />
                    <Route path="/user" exact component={baseDashboard(User)} />
                    <Route path="/view-user/:id" exact component={baseDashboard(Viewuser)} />
                    <Route path="/cad-user" exact component={baseDashboard(CadUser)} />
                    <Route path="/update-user/:id" exact component={baseDashboard(UpdateUser)} />
                    <Route path="/update-user-senha/:id" exact component={baseDashboard(UpdateUserSenha)} />
                    <Route path="/update-perfil" exact component={baseDashboard(UpdatePerfil)} />
                    <Route path="/update-perfil-senha" exact component={baseDashboard(UpdatePerfilSenha)} />
                    <Route path="/update-perfil-foto" exact component={baseDashboard(UpdatePerfilFoto)} />
                </Switch>
            </BrowserRouter>
            </Router>
        </Provider>
    );
}