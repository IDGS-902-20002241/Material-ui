import React from 'react';
import { createRoot } from 'react-dom/client';
import { Box, Container, CssBaseline, Grid, Paper, ThemeProvider, Typography, createTheme } from '@mui/material';

const rows = [
  { size: 3, color: '#f7e6dc', items: [
    ['Curiosidad', 'Me gusta hacer preguntas y entender cómo funcionan las cosas.'],
    ['Creatividad', 'Busco formas diferentes de resolver un problema.'],
    ['Paciencia', 'Me doy tiempo para entender lo que me cuesta.'],
  ] },
  { size: 4, color: '#e4ebfa', items: [
    ['Responsabilidad', 'Cumplo mis compromisos y aviso si surge un imprevisto.'],
    ['Perseverancia', 'Si algo falla, reviso lo que hice y vuelvo a intentarlo.'],
    ['Adaptabilidad', 'Puedo cambiar de plan cuando las circunstancias lo requieren.'],
  ] },
  { size: 6, color: '#e1efea', items: [
    ['Empatía', 'Escucho con atención y trato de entender cómo se sienten los demás.'],
    ['Colaboración', 'Comparto lo que sé y valoro las ideas que aporta mi equipo.'],
  ] },
  { size: 12, color: '#212c50', items: [
    ['Ganas de aprender', 'Me entusiasma adquirir nuevas habilidades y ponerlas en práctica en mis proyectos.'],
  ] },
];

const theme = createTheme({
  palette: {
    background: { default: '#f8f7f3' },
    text: { primary: '#212c50' },
  },
  typography: { fontFamily: 'system-ui, sans-serif' },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container component="main" maxWidth="lg" sx={{ py: { xs: 5, md: 8 } }}>
        <Box component="header" sx={{ mb: { xs: 4, md: 5 } }}>
          <Typography component="h1" sx={{ fontSize: 'clamp(2.75rem, 8vw, 5rem)', fontWeight: 800, lineHeight: 1.02, letterSpacing: '-0.065em' }}>
            Mis cualidades
          </Typography>
          <Typography sx={{ mt: 2, fontSize: '1.125rem' }}>
            Nueve rasgos que describen cómo aprendo, trabajo y convivo.
          </Typography>
        </Box>
        <Box sx={{ display: 'grid', gap: 2 }}>
          {rows.map(({ size, color, items }) => (
            <Grid container columns={12} spacing={2} key={size}>
              {items.map(([title, description]) => (
                <Grid size={{ xs: 12, md: size }} key={title} sx={{ display: 'flex' }}>
                  <Paper component="section" elevation={0} sx={{
                    bgcolor: color, color: size === 12 ? '#fff' : 'inherit',
                    width: '100%', borderRadius: 4, p: 3, minHeight: 135,
                  }}>
                    <Typography component="h2" variant="h6" sx={{ fontWeight: 750, mb: 0.75 }}>
                      {title}
                    </Typography>
                    <Typography>{description}</Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          ))}
        </Box>
      </Container>
    </ThemeProvider>
  );
}

createRoot(document.getElementById('root')).render(<App />);
if (import.meta.env.PROD && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(console.error);
  });
}
