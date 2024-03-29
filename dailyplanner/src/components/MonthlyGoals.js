import {w, h} from '../services/dimensions.js'
import React from 'react';
import {useState, useEffect} from 'react';
import { Button, Checkbox, Grid, Typography, Box, Paper, Menu, MenuItem, InputAdornment, IconButton} from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import dayjs from 'dayjs';
import {theme} from './theme.js';
import DeleteIcon from '@mui/icons-material/Delete';
import {Container, FormControl, TextField} from '@mui/material';

import {add_object, delete_object, getAllObjects, connectToIndexedDB, getAllIndex} from '../database/backend.js';
export default function MonthyGoals({style, date}) {
   let [goals, setGoals] = useState([]);
   let [goal, setGoal] = useState(null);
   let [disable, setDisable] = useState(false);
   let month =date.month().toString();
   let year = date.year().toString();

   function check_disable(curr, target) {
    curr=curr.startOf('day');
    target = target.startOf('day');
    if(curr.isBefore(target) && !disable) {
        setDisable(true);
  
    }
    }
check_disable(date, dayjs());
   console.log("goals: ", goals);
   useEffect(
    () => {
        getAllIndex("MonthlyGoals", "MonthYearIndex", [month, year]).then((goals)=> {setGoals(goals);}).catch((err)=> {setGoals([])});
    }, []);
   
 
   const [anchorEl, setAnchorEl] = useState(null);
  let open = Boolean(anchorEl);
  const handleClick = (event) => {
    if(disable) return;
    alert("what "+disable);
    setAnchorEl(event.currentTarget);
    console.log("+ add habit clicked");
    console.log('target: ', event.currentTarget);  
  };
  const handleClose = () => {

    setAnchorEl(null);
  };
  function SetGoals() {
   
        getAllObjects("MonthlyGoals")
        .then(
        
            (goals)=> {
                setGoals(goals);
            }
        );
  }
    
  
   function addGoal(event) {

    if(!goal) return;
    setAnchorEl(null);
        
        let curr_date = dayjs();
        let newGoal = 
        {
            month: curr_date.month().toString(),
            year: curr_date.year().toString(),
            goal: goal,
            checked: false,
            
        };        
      add_object("MonthlyGoals", newGoal).then(
        
        (message)=> {
            getAllIndex("MonthlyGoals", "MonthYearIndex", [month, year])
            .then(
            
                (goals)=> {
                    setGoals(goals);
                }
            );
        }
      ).catch(
        (error)=> {console.log(error);}
      )

      
   }
   function handleCheck(event) {
    let id=(event.currentTarget.getAttribute('customAttribute'));
    connectToIndexedDB().then(
      (db)=> {
        const transaction = db.transaction("MonthlyGoals", "readwrite");
        const objectStore = transaction.objectStore("MonthlyGoals");
        const getRequest = objectStore.get(id);
        getRequest.onsuccess = (event) =>{
          let obj = event.target.result; 
          obj.checked=!obj.checked;
          const putRequest = objectStore.put(obj);
          putRequest.onsuccess = (event) => {
            console.log("object with id: ", id, "updated successfully");
          }

        }
        transaction.onsuccess=(event) => {console.log("transaction success");}
        SetGoals();
        db.close();
      }
     
    )
   }
   function deleteGoal(event) {
    console.log("inside delete goal");
    console.log(event.currentTarget);
    let target=(event.currentTarget.getAttribute('customAttribute'));
      delete_object("MonthlyGoals", target).then(
        (message)=> {
            getAllObjects("MonthlyGoals")
            .then(
            
                (goals)=> {
                    setGoals(goals);
                }
            );
        }
      ).catch(
        (error)=> {console.log(error);}
      )
   }
    return (
        <ThemeProvider theme={theme}>
        <Container align="center" style={{paddingLeft: 10, paddingRight: 10}} sx={{my: 1, width: '100%', marginLeft: 0,
        ...(style? style: null)
      }}>
  
            
           
            <FormControl sx={{width: '100%'}}>
                
            <Typography variant='h5'  sx={{display: 'flex', flexDirection: {xs: 'column', sm: 'row'}, justifyContent: 'space-between'}}>
              <div  style={{width: '100%', display:'flex', justifyContent:'space-between',padding:'0.5rem',}}> Monthly Goals
                <Button disabled={disable} disableRipple onClick={handleClick} sx={{backgroundColor: 'white',color: 'black', boxShadow: '1', width: '7rem', height: '1.6526617647058823rem'}}>+Add Goal</Button></div>
               
          <Menu aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          anchorEl={anchorEl}
          aria-expanded={open ? 'true' : undefined}
          open={open}

          onClose={handleClose}
          style={{display: anchorEl? 'block':'none'}}
          >
          <MenuItem>
       
       
         
          <br/>
          <TextField 
          
          InputProps={{
            
            style: {width: '10rem'},
            endAdornment: (
              
              <InputAdornment position="end">
                <IconButton>
                <img src='submit.png' style={{':hover': {cursor: 'pointer'}}} onClick={addGoal}/>
                  
                </IconButton>
              </InputAdornment>
            ),
            disableUnderline: true,
          }}
          
          label="Add Goal" multiline onChange={(e)=> {if(e.target.value.replace(/[\n\r]+$/, '') == goal){setAnchorEl(null); addGoal();}else{ console.log("goal value: ", goal);setGoal(e.target.value)}}}/>
        
          </MenuItem>
          </Menu>
            </Typography>
            <div style={{overflow: 'scroll', maxHeight: `${h(80)}`}}>
                {
                    goals.length?(
                    goals.map((goal)=> {
                        return (
                    
                        <Paper id={goal.id} align="left" elevation='2' sx={{my: 0.5, height:`${h(24)}` ,width: '100%', display: 'flex', justifyContent: 'space-between', alignItems:'center'}}>
                       
                        <div style={{display: 'inline-block', flexDirection:"row", justifyContent: 'space-between'}}>
                        <Checkbox visibility={disable?'hidden':'visible'}checked={goal.checked} onClick={handleCheck} customAttribute={goal.id}/>
                        <span>{goal.goal}</span> 
                       
                        </div>
                        <Button customAttribute ={goal.id}  sx={{height: '100%'}} onClick={deleteGoal}> <DeleteIcon visible={disable? 'hidden': 'visible'} sx={{opacity:0.6}} customAttribute ={goal.id}/></Button>
                       
                       
                        </Paper>
                        )
                    })
                    ):( <p>No goals found.</p>)
                }
            </div>
                
            </FormControl>
        </Container>
        </ThemeProvider>
        
    )

};
