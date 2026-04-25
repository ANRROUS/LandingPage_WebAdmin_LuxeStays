import { useForm } from 'react-hook-form';
import { useAuth } from '../Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import hotelBg from '../assets/images/hotel-room-bg.png';
import logo from '../assets/logo.png';
import './LoginPage.css';

function LoginPage() {
  const [activeTab, setActiveTab] = useState('login');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingText, setLoadingText] = useState('');

  // Login form
  const {
    register: registerLogin,
    handleSubmit: handleSubmitLogin,
    formState: { errors: loginErrors },
  } = useForm();

  // Register form
  const {
    register: registerSignup,
    handleSubmit: handleSubmitSignup,
    formState: { errors: signupErrors },
  } = useForm();

  const { singin, signup, errors: authErrors, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate('/tasks');
  }, [isAuthenticated]);

  // Hide spinner when auth errors come in
  useEffect(() => {
    if (authErrors.length > 0) {
      setIsLoading(false);
    }
  }, [authErrors]);

  const onLogin = handleSubmitLogin(async (data) => {
    setLoadingText('Iniciando sesión...');
    setIsLoading(true);
    await singin(data);
  });

  const onRegister = handleSubmitSignup(async (data) => {
    setLoadingText('Creando tu cuenta...');
    setIsLoading(true);
    await signup(data);
  });

  const switchTab = (tab) => {
    setActiveTab(tab);
  };

  return (
    <>
      {/* Loading Spinner Overlay */}
      {isLoading && (
        <div className="login-spinner-overlay">
          <div className="login-pulse-spinner"></div>
          <p>{loadingText}</p>
          <div className="login-progress-bar">
            <div className="login-progress-fill" key={Date.now()}></div>
          </div>
        </div>
      )}

      {/* Animated Background */}
      <div className="login-bg-wrapper">
        <img src={hotelBg} alt="Hotel de lujo" />
      </div>
      <div className="login-bg-overlay"></div>

      {/* Main Content */}
      <div className="login-page">
        <div className="login-card">
          {/* Header */}
          <div className="login-card-header">
            <img src={logo} alt="StayHub Logo" />
            <h1>Bienvenido</h1>
            <p>Gestiona tus alojamientos de forma fácil</p>
          </div>

          {/* Toggle Tabs */}
          <div className="login-toggle-container">
            <button
              type="button"
              className={`login-toggle-btn ${activeTab === 'login' ? 'active' : ''}`}
              onClick={() => switchTab('login')}
            >
              Iniciar Sesión
            </button>
            <button
              type="button"
              className={`login-toggle-btn ${activeTab === 'register' ? 'active' : ''}`}
              onClick={() => switchTab('register')}
            >
              Registrarse
            </button>
          </div>

          {/* Auth Errors */}
          {authErrors.map((error, i) => (
            <div className="login-errors" key={i}>
              {error}
            </div>
          ))}

          {/* LOGIN FORM */}
          {activeTab === 'login' && (
            <form onSubmit={onLogin}>
              <div className="login-input-group">
                <label htmlFor="login-email">Correo</label>
                <input
                  id="login-email"
                  type="email"
                  placeholder="ejemplo@correo.com"
                  {...registerLogin('email', { required: true })}
                />
                {loginErrors.email && (
                  <p className="login-field-error">El correo es requerido</p>
                )}
              </div>

              <div className="login-input-group">
                <label htmlFor="login-password">Contraseña</label>
                <input
                  id="login-password"
                  type="password"
                  placeholder="••••••••"
                  {...registerLogin('password', { required: true })}
                />
                {loginErrors.password && (
                  <p className="login-field-error">La contraseña es requerida</p>
                )}
              </div>

              <button type="submit" className="login-btn-submit" disabled={isLoading}>
                Iniciar Sesión
              </button>

              <p className="login-footer-text">
                ¿No tienes cuenta?{' '}
                <span onClick={() => switchTab('register')}>Regístrate</span>
              </p>
            </form>
          )}

          {/* REGISTER FORM */}
          {activeTab === 'register' && (
            <form onSubmit={onRegister}>
              <div className="login-input-group">
                <label htmlFor="reg-username">Usuario</label>
                <input
                  id="reg-username"
                  type="text"
                  placeholder="Tu nombre de usuario"
                  {...registerSignup('username', { required: true })}
                />
                {signupErrors.username && (
                  <p className="login-field-error">El usuario es requerido</p>
                )}
              </div>

              <div className="login-input-group">
                <label htmlFor="reg-email">Correo</label>
                <input
                  id="reg-email"
                  type="email"
                  placeholder="ejemplo@correo.com"
                  {...registerSignup('email', { required: true })}
                />
                {signupErrors.email && (
                  <p className="login-field-error">El correo es requerido</p>
                )}
              </div>

              <div className="login-input-group">
                <label htmlFor="reg-password">Contraseña</label>
                <input
                  id="reg-password"
                  type="password"
                  placeholder="••••••••"
                  {...registerSignup('password', { required: true })}
                />
                {signupErrors.password && (
                  <p className="login-field-error">La contraseña es requerida</p>
                )}
              </div>

              <button type="submit" className="login-btn-submit" disabled={isLoading}>
                Registrarse
              </button>

              <p className="login-footer-text">
                ¿Ya tienes cuenta?{' '}
                <span onClick={() => switchTab('login')}>Inicia sesión</span>
              </p>
            </form>
          )}
        </div>
      </div>
    </>
  );
}

export default LoginPage;