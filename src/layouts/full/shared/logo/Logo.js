import { useSelector } from 'react-redux';
import { Link } from 'react-router';
import logoStiqr2 from 'src/assets/images/logos/logo-stiqr2.jpg';
import { styled } from '@mui/material';

const Logo = () => {
  const customizer = useSelector((state) => state.customizer);

  const LinkStyled = styled(Link)(() => ({
    height: customizer.TopbarHeight,
    width: customizer.isCollapse ? '40px' : '180px',
    overflow: 'hidden',
    display: 'block',
  }));

  return (
    <LinkStyled
      to="/"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <img
        src={logoStiqr2}
        alt="StiqrHub Logo"
        style={{
          width: '100%',
          height: 'auto',
          objectFit: 'contain',
        }}
      />
    </LinkStyled>
  );
};

export default Logo;
