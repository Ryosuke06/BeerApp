import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Card } from "@mui/material";
import CardContent from '@mui/material/CardContent';



interface Beer {
    id: string;
    name: string;
    brewery: string;
    type: string;
    alcohol_content: number;
    ibu: number;
    description: string;
    price: number;
    country: string;
    volume_ml: number;
}

const drawerWidth = 240;
const navItems = ["Home", "About", "Contact"];


const TopPage = () => {
    const [mobileOpen, setMobileOpen] = React.useState<boolean>(false);
    const [BeerData, setBeerData] = React.useState<Beer[] | null>(null);


    const handleDrawerToggle = () => {
      setMobileOpen((prevState) => !prevState);
    };


async function fetchData() {
  const ALLBeerUrl = import.meta.env.VITE_API_URL; //githubにpushしたくないからこうしている

  try {
    const response = await fetch(ALLBeerUrl);
    if (!response.ok) {
      throw new Error(`レスポンスステータス: ${response.status}`);
    }
    const data = await response.json();
    // const dataJSON = JSON.stringify(data);
    setBeerData(data.body.beers);
    console.log();
  } catch (error) {
    console.error("データの取得に失敗しました:", error);
  }
};

const AllBeer = (data: Beer[] | null) => {
    if (!data || data.length === 0) {
        return <Typography>No data available</Typography>;
    }
    return (
        <>
        {data.map((beer: Beer) => (
            <Card sx={{ minWidth: 275,  height: 300}}>
      <CardContent>
        <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
          {beer.id}
        </Typography>
        <Typography variant="h5" component="div">
          {beer.name}
        </Typography>
        <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>{beer.brewery}</Typography>
        <Typography variant="body2">
          {beer.type}
          <br />
          {beer.alcohol_content}
        </Typography>
      </CardContent>
    </Card>
    ))}
    </>
    )
}


  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        MUI
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container = undefined;
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar component="nav">
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            >
              BeerApp
            </Typography>
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              {navItems.map((item) => (
                <Button key={item} sx={{ color: "#fff" }}>
                  {item}
                </Button>
              ))}
            </Box>
          </Toolbar>
        </AppBar>
        <nav>
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
          >
            {drawer}
          </Drawer>
        </nav>
        <Box component="main" sx={{ p: 3 }}>
          <Toolbar />
          <Typography>
            Welcome to the Beer App! This is a sample application built with React and Material-UI.
            <Button
              variant="contained"
              color="primary"
              onClick={fetchData}
              sx={{ mt: 2 }}
            >
              Fetch Beer Data
            </Button>
            {AllBeer(BeerData)}
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default TopPage;
