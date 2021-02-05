import * as jwt from 'jsonwebtoken';

export const getExpTime = () => {
  try {
    const token = localStorage.getItem('token');
    const decodedToken = jwt.verify(token, process.env.REACT_APP_SECRET_KEY);
    const expTime = decodedToken.exp * 1000;
    const currentTime = Date.now();
    return expTime - currentTime;
  } catch {
    return 0;
  }
};
