import { Box, Button, Container, Typography } from "@mui/material";
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Masonry from '@mui/lab/Masonry';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';

import { Line, Pie, Bar } from 'react-chartjs-2';

import { dataBar, dataLine, dataPie } from "./Dashboard";
import { useTheme } from "../../../hooks/useTheme";
import { StyledPaper } from "../../common/Surfaces/Papers/Paper";

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const optionsLine = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Postulaciones en el tiempo',
    },
  },
};

export const optionsBar = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Relación Revisadas/Ignoradas',
    },
  },
};


export const DashboardView = () => {

  const heights = [150, 110, 150, 130, 80, 50, 90, 100, 150, 50, 80];
  const contain = [
    {
      height: 300,
      children: <Pie data={dataPie} />
    },
    {
      height: 300,
      children: <Pie data={dataPie} />
    },
    {
      height: 300,
      children: <Pie data={dataPie} />
    },

  ];

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1.2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  const { toggleThemeMode } = useTheme()

  return (
    <Box sx={{ padding: '2rem' }}>
      <Box>
        <Typography variant="h3" sx={{ color: 'background.default', mb: 0.8 }}>Dashboard</Typography>
        <Container>
          <Masonry columns={{ xs: 2, sm: 2 }} height='100%' spacing={2}>
            {/* {heights.map((height, index) => (
              <Item key={index} sx={{ height }}>
              {index + 1}
              </Item>
            ))} */}
            {/* {contain.map(({height, children}, index) =>
            <Item key={index} sx={{ height }}>
            {children}
          </Item>)} */}
            <StyledPaper>
              <Typography variant="h5">Estatus de Respuestas</Typography>
              <Pie data={dataPie} />
            </StyledPaper>
            <StyledPaper >
              <Line options={optionsLine} data={dataLine} />
            </StyledPaper>

            <StyledPaper >
              <Bar options={optionsBar} data={dataBar} />
            </StyledPaper>



          </Masonry>

        </Container>

      <Button onClick={(e) => {
        toggleThemeMode()
      }}>theme toggle</Button>
      </Box>
    </Box>
  )
}
