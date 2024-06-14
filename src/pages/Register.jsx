import axios from 'axios';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { LOGIN } from '../redux/actions';

const Register = () => {
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const updateInputValue = (ev) => {
        setFormData((oldFormData) => ({
            ...oldFormData,
            [ev.target.name]: ev.target.value,
        }));
    };

    const submitLogin = (ev) => {
        ev.preventDefault();
        // gli indirizzi relativi, con il proxy attivo fanno la richiesta a http://localhost:8000/login mascherandolo come indirizzo nello stesso host di react (che nel nostro caso è http://localhost:3000/login)
        axios
            .get('/sanctum/csrf-cookie')
            .then(() => axios.post('/register', formData))
            .then(() => axios.get('/api/user'))
            .then(() => axios.get('/api/answers'))
            .then((res) => {
                // salvare i dati dello user nel Redux state
                dispatch({
                    type: LOGIN,
                    payload: res.data,
                });
            });
    };

    return (
        <form onSubmit={(ev) => submitLogin(ev)} noValidate>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">
                    Name
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    onChange={(ev) => updateInputValue(ev)}
                    value={formData.name}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">
                    Email address
                </label>
                <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    onChange={(ev) => updateInputValue(ev)}
                    value={formData.email}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">
                    Password
                </label>
                <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    onChange={(ev) => updateInputValue(ev)}
                    value={formData.password}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="password_confirmation" className="form-label">
                    Conferma password
                </label>
                <input
                    type="password"
                    className="form-control"
                    id="password_confirmation"
                    name="password_confirmation"
                    onChange={(ev) => updateInputValue(ev)}
                    value={formData.password_confirmation}
                />
            </div>
            <button type="submit" className="btn btn-primary">
                Register
            </button>
        </form>
    );
};

export default Register;
