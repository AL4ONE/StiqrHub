import{R as s,j as e}from"./index-BvKsHq39.js";import{B as W}from"./Breadcrumb-D8hqt6RT.js";import{P as w}from"./PageContainer-B5n1q2IU.js";import{P as L}from"./ParentCard-CnqaPcOJ.js";import{C as m}from"./ChildCard-CAFP0Ce9.js";import{aJ as R,X as M,q as G}from"./index.esm-ugoV-OIv.js";import{B as i}from"./Button-DOY2dwR5.js";import{T as S}from"./Typography-Cd2fCHjT.js";import{D as u,a as C}from"./DialogContent-aWxIG_p7.js";import{D as g}from"./DialogTitle-Bf135FLy.js";import{L as B}from"./List-CXDnDHnm.js";import{L as D}from"./ListItemButton-BYiuU6-z.js";import{L as y}from"./ListItemAvatar-Di53wv5o.js";import{A as k}from"./Avatar-BlvRtYuM.js";import{L as T}from"./ListItemText-CD7h8G0E.js";import{D as f}from"./DialogContentText-DtmwMjmd.js";import{D as j}from"./DialogActions-DaVwf3KU.js";import{S as O}from"./Slide-NBi23ASD.js";import{C as E}from"./CustomTextField-CA-tMAwb.js";import{B as F}from"./Box-Cgsde7yB.js";import{A as P}from"./AppBar-CkvyJJbp.js";import{T as z}from"./Toolbar-CVHZY_A8.js";import{I as V}from"./IconButton-VvYfEoZr.js";import{D as U}from"./Divider-D5riNfjf.js";import{C as q}from"./CustomSelect-BDmPu2Io.js";import{C as X}from"./CustomSwitch-Cv9TCtDA.js";import{F as Q}from"./FormControl-IPqZV1kJ.js";import{I as J}from"./TextField-D_GMeoX3.js";import{M as x}from"./MenuItem-3hOhWRTc.js";import{F as Y}from"./FormControlLabel-CGb6HoDn.js";import{S as H}from"./Stack-BbwedUsx.js";import{u as $}from"./Paper-Dw9Z9lKu.js";import{u as K}from"./useMediaQuery-pGXB1FuV.js";import{C as p}from"./CodeDialog-DOO60z65.js";import{G as d}from"./Grid2-DRIhct5E.js";import"./index-BwqtTtay.js";import"./createSvgIcon-9CZFWFgb.js";import"./ButtonBase-D1rmaemC.js";import"./useSlotProps-DrKo0tpX.js";import"./resolveComponentProps-B6dJeYHq.js";import"./Link-DChSqUmp.js";import"./Card-Chng94uH.js";import"./CardHeader-CutR81r4.js";import"./CardContent-Cx1RTDA8.js";import"./resolveProps-CxWqPvcr.js";import"./Modal-CEdargRK.js";import"./getReactNodeRef-CeXiOENg.js";import"./ownerWindow-DrjrctJu.js";import"./createChainedFunction-BO_9K8Jh.js";import"./useSlot-BWQNm6rb.js";import"./utils-CfOsK_SU.js";import"./Portal-Cu5WyFQi.js";import"./useId-DVmFICJa.js";import"./listItemButtonClasses-BXus4US4.js";import"./listItemTextClasses-Bq8qaM4I.js";import"./debounce-Be36O1Ab.js";import"./dividerClasses-Cy-AcaV9.js";import"./Select-ERgb1aEE.js";import"./Menu-JU-TDbGB.js";import"./Popover-D4GaJhon.js";import"./isHostComponent-DVu5iVWx.js";import"./Grow-pYFqELkc.js";import"./utils-iop7lDec.js";import"./useControlled-CqszgbyI.js";import"./formControlState-Dq1zat_P.js";import"./useFormControl-DVSm7LDD.js";import"./useThemeProps-03R8yy7c.js";import"./Switch-Cb30KIf1.js";import"./SwitchBase-CoR_qOd3.js";import"./isMuiElement-DfwRbZvT.js";import"./createStack-_s5wtiSe.js";import"./composeClasses-mRK-vHC7.js";import"./Tooltip-C41DUAPX.js";import"./Popper-CtgPhGTX.js";import"./toConsumableArray-JHbr3TM4.js";const b=["JohnDeo@gmail.com","SmithRocky@gmail.com"],N=()=>{const[l,t]=s.useState(!1),[n,o]=s.useState(b[1]),c=()=>{t(!0)},a=r=>{t(!1),o(r)};return e.jsxs(e.Fragment,{children:[e.jsx(i,{variant:"contained",color:"primary",fullWidth:!0,onClick:c,children:"Open Simple Dialog"}),e.jsxs(S,{variant:"subtitle1",component:"div",mb:1,textAlign:"center",children:["Selected: ",n]}),e.jsxs(u,{onClose:()=>a(n),open:l,children:[e.jsx(g,{children:"Set backup account"}),e.jsxs(B,{sx:{pt:0},children:[b.map(r=>e.jsxs(D,{onClick:()=>a(r),children:[e.jsx(y,{children:e.jsx(k,{sx:{bgcolor:"primary.light",color:"primary.main"},children:e.jsx(R,{widht:20,height:20})})}),e.jsx(T,{primary:r})]},r)),e.jsxs(D,{autoFocus:!0,onClick:()=>a("addAccount"),children:[e.jsx(y,{children:e.jsx(k,{children:e.jsx(M,{width:20,height:20})})}),e.jsx(T,{primary:"Add account"})]})]})]})]})},Z=()=>{const[l,t]=s.useState(!1),n=()=>{t(!0)},o=()=>{t(!1)};return e.jsxs(e.Fragment,{children:[e.jsx(i,{variant:"contained",color:"secondary",fullWidth:!0,onClick:n,children:"Open Alert Dialog"}),e.jsxs(u,{open:l,onClose:o,"aria-labelledby":"alert-dialog-title","aria-describedby":"alert-dialog-description",children:[e.jsx(g,{id:"alert-dialog-title",children:"Use Google's location service?"}),e.jsx(C,{children:e.jsx(f,{id:"alert-dialog-description",children:"Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running."})}),e.jsxs(j,{children:[e.jsx(i,{color:"error",onClick:o,children:"Disagree"}),e.jsx(i,{onClick:o,autoFocus:!0,children:"Agree"})]})]})]})},_=s.forwardRef(function(t,n){return e.jsx(O,{direction:"up",ref:n,...t})}),ee=()=>{const[l,t]=s.useState(!1),n=()=>{t(!0)},o=()=>{t(!1)};return e.jsxs(e.Fragment,{children:[e.jsx(i,{variant:"contained",color:"success",fullWidth:!0,onClick:n,children:"Open Transition Dialog"}),e.jsxs(u,{open:l,TransitionComponent:_,keepMounted:!0,onClose:o,"aria-describedby":"alert-dialog-slide-description",children:[e.jsx(g,{children:"Use Google's location service?"}),e.jsx(C,{children:e.jsx(f,{id:"alert-dialog-slide-description",children:"Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running."})}),e.jsxs(j,{children:[e.jsx(i,{color:"error",onClick:o,children:"Disagree"}),e.jsx(i,{onClick:o,children:"Agree"})]})]})]})},te=()=>{const[l,t]=s.useState(!1),n=()=>{t(!0)},o=()=>{t(!1)};return e.jsxs(e.Fragment,{children:[e.jsx(i,{variant:"contained",color:"warning",fullWidth:!0,onClick:n,children:"Open Form Dialog"}),e.jsxs(u,{open:l,onClose:o,children:[e.jsx(g,{children:"Subscribe"}),e.jsxs(C,{children:[e.jsx(f,{children:"To subscribe to this website, please enter your email address here. We will send updates occasionally."}),e.jsx(F,{mt:2,children:e.jsx(E,{autoFocus:!0,margin:"dense",id:"name",label:"Email Address",type:"email",fullWidth:!0})})]}),e.jsxs(j,{children:[e.jsx(i,{color:"error",onClick:o,children:"Cancel"}),e.jsx(i,{onClick:o,children:"Subscribe"})]})]})]})},oe=s.forwardRef(function(t,n){return e.jsx(O,{direction:"up",ref:n,...t})}),ne=()=>{const[l,t]=s.useState(!1),n=()=>{t(!0)},o=()=>{t(!1)};return e.jsxs(e.Fragment,{children:[e.jsx(i,{variant:"contained",color:"error",fullWidth:!0,onClick:n,children:"Open Fullscreen Dialog"}),e.jsxs(u,{fullScreen:!0,open:l,onClose:o,TransitionComponent:oe,children:[e.jsx(P,{sx:{position:"relative"},children:e.jsxs(z,{children:[e.jsx(V,{edge:"start",color:"inherit",onClick:o,"aria-label":"close",children:e.jsx(G,{width:24,height:24})}),e.jsx(S,{ml:2,flex:1,variant:"h6",component:"div",children:"Sound"}),e.jsx(i,{autoFocus:!0,color:"inherit",onClick:o,children:"Save"})]})}),e.jsxs(B,{children:[e.jsx(D,{children:e.jsx(T,{primary:"Phone ringtone",secondary:"Titania"})}),e.jsx(U,{}),e.jsx(D,{children:e.jsx(T,{primary:"Default notification ringtone",secondary:"Tethys"})})]})]})]})},ie=()=>{const[l,t]=s.useState(!1),[n,o]=s.useState(!0),[c,a]=s.useState("sm"),r=()=>{t(!0)},h=()=>{t(!1)},I=v=>{a(v.target.value)},A=v=>{o(v.target.checked)};return e.jsxs(e.Fragment,{children:[e.jsx(i,{variant:"contained",color:"primary",fullWidth:!0,onClick:r,children:"Open Maxwidth Dialog"}),e.jsxs(u,{fullWidth:n,maxWidth:c,open:l,onClose:h,children:[e.jsx(g,{children:"Optional sizes"}),e.jsxs(C,{children:[e.jsx(f,{children:"You can set my maximum width and whether to adapt or not."}),e.jsxs(F,{noValidate:!0,component:"form",sx:{display:"flex",flexDirection:"column",m:"auto",width:"fit-content"},children:[e.jsxs(Q,{sx:{mt:2,minWidth:120},children:[e.jsx(J,{htmlFor:"max-width",children:"maxWidth"}),e.jsxs(q,{autoFocus:!0,value:c,onChange:I,label:"maxWidth",children:[e.jsx(x,{value:!1,children:"false"}),e.jsx(x,{value:"xs",children:"xs"}),e.jsx(x,{value:"sm",children:"sm"}),e.jsx(x,{value:"md",children:"md"}),e.jsx(x,{value:"lg",children:"lg"}),e.jsx(x,{value:"xl",children:"xl"})]})]}),e.jsx(Y,{sx:{mt:1},control:e.jsx(X,{checked:n,onChange:A}),label:"Full width"})]})]}),e.jsx(j,{children:e.jsx(i,{color:"error",variant:"contained",onClick:h,children:"Close"})})]})]})},le=()=>{const[l,t]=s.useState(!1),[n,o]=s.useState("paper"),c=h=>()=>{t(!0),o(h)},a=()=>{t(!1)},r=s.useRef(null);return s.useEffect(()=>{if(l){const{current:h}=r;h!==null&&h.focus()}},[l]),e.jsxs(e.Fragment,{children:[e.jsxs(H,{spacing:2,children:[e.jsx(i,{variant:"contained",color:"success",onClick:c("paper"),children:"Scroll with Paper"}),e.jsx(i,{variant:"contained",color:"secondary",onClick:c("body"),children:"Scroll with Body"})]}),e.jsxs(u,{open:l,onClose:a,scroll:n,"aria-labelledby":"scroll-dialog-title","aria-describedby":"scroll-dialog-description",children:[e.jsx(g,{id:"scroll-dialog-title",children:"Subscribe"}),e.jsx(C,{dividers:n==="paper",children:e.jsx(f,{id:"scroll-dialog-description",ref:r,tabIndex:-1,children:[...new Array(50)].map(()=>`Cras mattis consectetur purus sit amet fermentum.
Cras justo odio, dapibus ac facilisis in, egestas eget quam.
Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`).join(`
`)})}),e.jsxs(j,{children:[e.jsx(i,{color:"error",onClick:a,children:"Cancel"}),e.jsx(i,{onClick:a,children:"Subscribe"})]})]})]})},se=()=>{const[l,t]=s.useState(!1),n=$(),o=K(n.breakpoints.down("md")),c=()=>{t(!0)},a=()=>{t(!1)};return e.jsxs(e.Fragment,{children:[e.jsx(i,{variant:"contained",color:"warning",fullWidth:!0,onClick:c,children:"Open Responsive Dialog"}),e.jsxs(u,{fullScreen:o,open:l,onClose:a,"aria-labelledby":"responsive-dialog-title",children:[e.jsx(g,{id:"responsive-dialog-title",children:"Use Google's location service?"}),e.jsx(C,{children:e.jsx(f,{children:"Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running."})}),e.jsxs(j,{children:[e.jsx(i,{autoFocus:!0,onClick:a,children:"Disagree"}),e.jsx(i,{onClick:a,autoFocus:!0,children:"Agree"})]})]})]})},ae=()=>e.jsx(e.Fragment,{children:e.jsx(p,{children:`
import React from "react";
import {
  Typography,
  Button,
  Dialog,
  DialogTitle,
  List,
  ListItemAvatar,
  Avatar,
  ListItemText,
} from '@mui/material';
import { IconUser, IconPlus } from '@tabler/icons';
const emails = ['JohnDeo@gmail.com', 'SmithRocky@gmail.com'];

const [open, setOpen] = React.useState(false);
const [selectedValue, setSelectedValue] = React.useState(emails[1]);

const handleClickOpen = () => {
  setOpen(true);
};

const handleClose = (value: string) => {
  setOpen(false);
  setSelectedValue(value);
};

return (
  <>
    <Button variant="contained" color="primary" fullWidth onClick={handleClickOpen}>
            Open Simple Dialog
        </Button>
        <Typography variant="subtitle1" component="div" mb={1} textAlign="center">
            Selected: {selectedValue}
        </Typography>
        <Dialog onClose={() => handleClose(selectedValue)} open={open}>
            <DialogTitle>Set backup account</DialogTitle>
            <List sx={{ pt: 0 }}>
                {emails.map((email) => (
                    <ListItemButton onClick={() => handleClose(email)} key={email}>
                        <ListItemAvatar>
                            <Avatar sx={{ bgcolor: "primary.light", color: "primary.main" }}>
                                <IconUser widht={20} height={20} />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={email} />
                    </ListItemButton>
                ))}

                <ListItemButton autoFocus onClick={() => handleClose('addAccount')}>
                    <ListItemAvatar>
                        <Avatar>
                            <IconPlus width={20} height={20} />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Add account" />
                </ListItemButton>
            </List>
        </Dialog>
  </>
);`})}),re=()=>e.jsx(e.Fragment,{children:e.jsx(p,{children:`
import React from "react";
import { 
Button, 
Dialog, 
DialogTitle, 
DialogContent, 
DialogContentText, 
DialogActions,
} from '@mui/material';

const [open, setOpen] = React.useState(false);

const handleClickOpen = () => {
    setOpen(true);
};

const handleClose = () => {
    setOpen(false);
};


return (
    <>
        <Button variant="contained" color="secondary" fullWidth onClick={handleClickOpen}>
            Open Alert Dialog
        </Button>
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {"Use Google's location service?"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Let Google help apps determine location. This means sending anonymous
                    location data to Google, even when no apps are running.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button color="error" onClick={handleClose}>Disagree</Button>
                <Button onClick={handleClose} autoFocus>
                    Agree
                </Button>
            </DialogActions>
        </Dialog>
    </>
);`})}),ce=()=>e.jsx(e.Fragment,{children:e.jsx(p,{children:`
import React from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const [open, setOpen] = React.useState(false);

const handleClickOpen = () => {
    setOpen(true);
};

const handleClose = () => {
    setOpen(false);
};


return (
    <>
      <Button variant="contained" color="success" fullWidth onClick={handleClickOpen}>
        Open Transition Dialog
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Use Google's location service?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Let Google help apps determine location. This means sending anonymous location data to
            Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={handleClose}>
            Disagree
          </Button>
          <Button onClick={handleClose}>Agree</Button>
        </DialogActions>
      </Dialog>
    </>
);`})}),de=()=>e.jsx(e.Fragment,{children:e.jsx(p,{children:`
import React from "react";
import { 
Button, 
Dialog, 
DialogTitle, 
DialogContent, 
DialogContentText, 
DialogActions, 
Box 
} from '@mui/material';

import CustomTextField from "../../forms/theme-elements/CustomTextField";

const [open, setOpen] = React.useState(false);

const handleClickOpen = () => {
    setOpen(true);
};

const handleClose = () => {
    setOpen(false);
};


return (
    <>
        <Button variant="contained" color="warning" fullWidth onClick={handleClickOpen}>
            Open Form Dialog
        </Button>
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Subscribe</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    To subscribe to this website, please enter your email address here. We
                    will send updates occasionally.
                </DialogContentText>
                <Box mt={2}>
                    <CustomTextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Email Address"
                        type="email"
                        fullWidth
                    />
                </Box>
            </DialogContent>
            <DialogActions>
                <Button color="error" onClick={handleClose}>Cancel</Button>
                <Button onClick={handleClose}>Subscribe</Button>
            </DialogActions>
        </Dialog>
    </>
);`})}),me=()=>e.jsx(e.Fragment,{children:e.jsx(p,{children:`
import React from "react";
import { Button, Dialog, AppBar, Toolbar, IconButton, Typography, List, ListItemButton, ListItemText, Divider } from '@mui/material';
import Slide from '@mui/material/Slide';
import { IconX } from '@tabler/icons';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const [open, setOpen] = React.useState(false);

const handleClickOpen = () => {
    setOpen(true);
};

const handleClose = () => {
    setOpen(false);
};


return (
    <>
      <Button variant="contained" color="error" fullWidth onClick={handleClickOpen}>
        Open Fullscreen Dialog
      </Button>
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <IconX width={24} height={24} />
            </IconButton>
            <Typography ml={2} flex={1} variant="h6" component="div">
              Sound
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              Save
            </Button>
          </Toolbar>
        </AppBar>
        <List>
          <ListItemButton >
            <ListItemText primary="Phone ringtone" secondary="Titania" />
          </ListItemButton>
          <Divider />
          <ListItemButton >
            <ListItemText primary="Default notification ringtone" secondary="Tethys" />
          </ListItemButton>
        </List>
      </Dialog>
    </>
);`})}),ue=()=>e.jsx(e.Fragment,{children:e.jsx(p,{children:`
import React from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  FormControlLabel,
} from '@mui/material';



const [open, setOpen] = React.useState(false);
const [fullWidth, setFullWidth] = React.useState(true);
const [maxWidth, setMaxWidth] = React.useState('sm');

const handleClickOpen = () => {
    setOpen(true);
};

const handleClose = () => {
    setOpen(false);
};

const handleMaxWidthChange = (event: any) => {
    setMaxWidth(event.target.value);
};

const handleFullWidthChange = (event: any) => {
    setFullWidth(event.target.checked);
};


return (
    <>
      <Button variant="contained" color="primary" fullWidth onClick={handleClickOpen}>
        Open Maxwidth Dialog
      </Button>
      <Dialog fullWidth={fullWidth} maxWidth={maxWidth} open={open} onClose={handleClose}>
        <DialogTitle>Optional sizes</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You can set my maximum width and whether to adapt or not.
          </DialogContentText>
          <Box
            noValidate
            component="form"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              m: 'auto',
              width: 'fit-content',
            }}
          >
            <FormControl sx={{ mt: 2, minWidth: 120 }}>
              <InputLabel htmlFor="max-width">maxWidth</InputLabel>
              <CustomSelect
                autoFocus
                value={maxWidth}
                onChange={handleMaxWidthChange}
                label="maxWidth"
              >
                <MenuItem>false</MenuItem>
                <MenuItem value="xs">xs</MenuItem>
                <MenuItem value="sm">sm</MenuItem>
                <MenuItem value="md">md</MenuItem>
                <MenuItem value="lg">lg</MenuItem>
                <MenuItem value="xl">xl</MenuItem>
              </CustomSelect>
            </FormControl>
            <FormControlLabel
              sx={{ mt: 1 }}
              control={<CustomSwitch checked={fullWidth} onChange={handleFullWidthChange} />}
              label="Full width"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button color="error" variant="contained" onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
);`})}),pe=()=>e.jsx(e.Fragment,{children:e.jsx(p,{children:`
import React from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Stack,
} from '@mui/material';

const [open, setOpen] = React.useState(false);
const [scroll, setScroll] = React.useState('paper');

const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
};

const handleClose = () => {
    setOpen(false);
};

const descriptionElementRef = React.useRef(null);
React.useEffect(() => {
    if (open) {
        const { current: descriptionElement } = descriptionElementRef;
        if (descriptionElement !== null) {
            descriptionElement.focus();
        }
    }
}, [open]);

return (
    <>
      <Stack spacing={2}>
        <Button variant="contained" color="success" onClick={handleClickOpen('paper')}>
          Scroll with Paper
        </Button>
        <Button variant="contained" color="secondary" onClick={handleClickOpen('body')}>
          Scroll with Body
        </Button>
      </Stack>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">Subscribe</DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            {[...new Array(50)]
              .map(
                () => 'Cras mattis consectetur purus sit amet fermentum.
                Cras justo odio, dapibus ac facilisis in, egestas eget quam.
                Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
                Praesent commodo cursus magna, vel scelerisque nisl consectetur et.',
              )
              .join('
')}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleClose}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    </>
  );`})}),he=()=>e.jsx(e.Fragment,{children:e.jsx(p,{children:`
import React from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

const [open, setOpen] = React.useState(false);
const theme = useTheme();
const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

const handleClickOpen = () => {
    setOpen(true);
};

const handleClose = () => {
    setOpen(false);
};

return (
    <>
      <Button variant="contained" color="warning" fullWidth onClick={handleClickOpen}>
        Open Responsive Dialog
      </Button>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{"Use Google's location service?"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Let Google help apps determine location. This means sending anonymous location data to
            Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Disagree
          </Button>
          <Button onClick={handleClose} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </>
);`})}),ge=[{to:"/",title:"Home"},{title:"Dialog"}],Gt=()=>e.jsxs(w,{title:"Dialog",description:"this is Dialog page",children:[e.jsx(W,{title:"Dialog",items:ge}),e.jsx(L,{title:"Dialog",children:e.jsxs(d,{container:!0,spacing:3,children:[e.jsx(d,{size:{xs:12,lg:4,sm:6},display:"flex",alignItems:"stretch",children:e.jsx(m,{title:"Simple",codeModel:e.jsx(ae,{}),children:e.jsx(N,{})})}),e.jsx(d,{size:{xs:12,lg:4,sm:6},display:"flex",alignItems:"stretch",children:e.jsx(m,{title:"Alert",codeModel:e.jsx(re,{}),children:e.jsx(Z,{})})}),e.jsx(d,{size:{xs:12,lg:4,sm:6},display:"flex",alignItems:"stretch",children:e.jsx(m,{title:"Transition",codeModel:e.jsx(ce,{}),children:e.jsx(ee,{})})}),e.jsx(d,{size:{xs:12,lg:4,sm:6},display:"flex",alignItems:"stretch",children:e.jsx(m,{title:"Form",codeModel:e.jsx(de,{}),children:e.jsx(te,{})})}),e.jsx(d,{size:{xs:12,lg:4,sm:6},display:"flex",alignItems:"stretch",children:e.jsx(m,{title:"Full screen",codeModel:e.jsx(me,{}),children:e.jsx(ne,{})})}),e.jsx(d,{size:{xs:12,lg:4,sm:6},display:"flex",alignItems:"stretch",children:e.jsx(m,{title:"Max width",codeModel:e.jsx(ue,{}),children:e.jsx(ie,{})})}),e.jsx(d,{size:{xs:12,lg:4,sm:6},display:"flex",alignItems:"stretch",children:e.jsx(m,{title:"Scrolling Content",codeModel:e.jsx(pe,{}),children:e.jsx(le,{})})}),e.jsx(d,{size:{xs:12,lg:4,sm:6},display:"flex",alignItems:"stretch",children:e.jsx(m,{title:"Responsive Fullscreen",codeModel:e.jsx(he,{}),children:e.jsx(se,{})})})]})})]});export{Gt as default};
