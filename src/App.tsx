import {ReactRunner} from "@chub-ai/stages-ts";
import {Stage} from "./Stage";
import {TestStageRunner} from "./TestRunner";
import {createTheme, Theme, ThemeProvider} from "@mui/system";

const theme: Theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: '#00000088',
          '&:hover': {
            backgroundColor: '#000000CC',
          },
        },
      },
    },
  },
});

function App() {
  const isDev = import.meta.env.MODE === 'development';
  console.info(`Running in ${import.meta.env.MODE}`);

  return <ThemeProvider theme={theme}>
      {isDev ? <TestStageRunner factory={ (data: any) => new Stage(data) }/> :
        <ReactRunner factory={(data: any) => new Stage(data)} />}
    </ThemeProvider>;
}

export default App
